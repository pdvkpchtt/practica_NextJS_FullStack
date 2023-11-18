import { prisma } from "../db";

export const updateProfile = async ({ userId, data }) => {
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
      inSearch: data.inSearch,
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
  return user;
};
