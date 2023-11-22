import { prisma } from "../db";
import { z } from "zod";

export const updateProfile = async ({ userId, data }) => {
  // валидация
  const validate = z.object({
    name: z.string().min(1, { message: "inputName minlen" }),
    username: z.string().min(1, { message: "inputUsername minlen" }),
    about: z.string().max(120, { message: "inputAbout maxlen" }),
  });

  const validateRes = validate.safeParse({
    name: data.name,
    username: data.username,
    about: data.about,
  });

  if (!validateRes.success)
    return {
      status: "error",
      message: validateRes.error?.errors?.map((i) => i?.message),
    };
  // валидация

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        country: data.country,
        city: data.city,
        about: data.about,
        username: data.username,
        birthDate: data.birthDate || null,
        inSearch: data.inSearch ? data.inSearch : false,
        educationLevel: data.educationLevel?.id
          ? {
              connect: {
                id: data.educationLevel?.id,
              },
            }
          : {},
        Education: {
          deleteMany: {},
          createMany: {
            data: [...data.education],
          },
        },
        WorkExperience: {
          deleteMany: {},
          createMany: {
            data: [...data.workExperience],
          },
        },
        UserSkills: {
          deleteMany: {},
          createMany: {
            data: [...data.UserSkills],
          },
        },
      },
    });
  } catch (err) {
    return { status: "error", message: ["inputUsername unique"] };
  }
  // return user;
};
