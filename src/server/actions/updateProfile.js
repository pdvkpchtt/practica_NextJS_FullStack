import { prisma } from "../db";
import { z } from "zod";

export const updateProfile = async ({ userId, data }) => {
  // валидация
  const validate = z.object({
    name: z
      .string()
      .min(1, { message: "inputName minlen" })
      .refine(
        (value) => !/[`!@#$%^&*()+\-=\[\]{};._':"\\|,<>\/?~]/.test(value),
        {
          message: "inputName бля",
        }
      ),
    lastname: z
      .string()
      .refine(
        (value) => !/[`!@#$%^&*()+\-=\[\]{};._':"\\|,<>\/?~]/.test(value),
        {
          message: "inputLastname бля",
        }
      ),
    username: z
      .string()
      .min(1, { message: "inputUsername minlen" })
      .refine((value) => !/[`!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/.test(value), {
        message: "inputUsername regex",
      }),
    about: z.string().max(240, { message: "inputAbout maxlen" }),
    birthDate: z
      .string()
      .min(10, { message: "inputBirth minlen" })
      .refine(
        (value) =>
          /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19\d\d|20[0-2]\d)$/.test(
            value
          ),
        { message: "inputBirth бля" }
      )
      .optional()
      .or(z.literal("")),
  });

  const validateRes = validate.safeParse({
    name: data.name,
    lastname: data.lastname,
    username: data.username,
    about: data.about !== null ? data.about : "",
    birthDate: data.birthDate !== null ? data.birthDate : "",
  });

  const checkusername = await prisma.user.findFirst({
    where: { username: data.username, id: { not: userId } },
    select: { id: true },
  });

  if (!validateRes.success || checkusername?.id)
    return {
      status: "error",
      message: validateRes.error?.errors?.map((i) => i?.message),
      submsg: checkusername?.id ? "inputUsername unique" : null,
    };
  // валидация

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        lastname: data.lastname,
        fullname: data.name + " " + data.lastname,
        city: data.city,
        about: data.about,
        username: data.username.split(" ").join(""),
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
    // return user;
  } catch (err) {
    return {
      status: "error",
      message: validateRes.error?.errors?.map((i) => i?.message),
      submsg: "educatWork check",
    };
  }
};
