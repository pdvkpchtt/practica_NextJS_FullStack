import { prisma } from "../db";

export const getPeoples = async (cursor, filters) => {
  const users = await prisma.user.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      country: true,
      about: true,
      role: true,
      city: true,
      Company: {
        select: {
          name: true,
        },
      },
      Education: { select: { name: true } },
      educationLevel: { select: { text: true } },
      WorkExperience: { select: { post: true } },
      UserSkills: {
        select: {
          id: true,
          skillId: true,
          skill: {
            select: {
              name: true,
              type: true,
            },
          },
        },
      },
    },
    where: filters?.startFiltering
      ? filters?.input.length > 0
        ? filters?.input[0] === "@"
          ? {
              username: {
                contains: filters?.input.slice(1),
                mode: "insensitive",
              },
              city: {
                contains: filters?.peoplecity?.label,
                mode: "insensitive",
              },
              educationLevel: {
                text: {
                  contains: filters?.educationLevel?.label,
                  mode: "insensitive",
                },
              },

              WorkExperience:
                filters?.workExperience?.label?.length > 0
                  ? filters?.workExperience?.label === "Есть"
                    ? {
                        some: {},
                      }
                    : { none: {} }
                  : {},
              UserSkills:
                filters?.UserSkills?.length > 0
                  ? {
                      some: {
                        skillId: {
                          in: filters?.UserSkills?.map(
                            (item) => true && item.id
                          ),
                        },
                      },
                    }
                  : {},
            }
          : {
              name: { contains: filters?.input, mode: "insensitive" },
              city: {
                contains: filters?.peoplecity?.label,
                mode: "insensitive",
              },
              educationLevel: {
                text: {
                  contains: filters?.educationLevel?.label,
                  mode: "insensitive",
                },
              },

              WorkExperience:
                filters?.workExperience?.label?.length > 0
                  ? filters?.workExperience?.label === "Есть"
                    ? {
                        some: {},
                      }
                    : { none: {} }
                  : {},
              UserSkills:
                filters?.UserSkills?.length > 0
                  ? {
                      some: {
                        skillId: {
                          in: filters?.UserSkills?.map(
                            (item) => true && item.id
                          ),
                        },
                      },
                    }
                  : {},
            }
        : {
            city: {
              contains: filters?.peoplecity?.label,
              mode: "insensitive",
            },
            educationLevel: {
              text: {
                contains: filters?.educationLevel?.label,
                mode: "insensitive",
              },
            },
            WorkExperience:
              filters?.workExperience?.label?.length > 0
                ? filters?.workExperience?.label === "Есть"
                  ? {
                      some: {},
                    }
                  : { none: {} }
                : {},
            UserSkills:
              filters?.UserSkills?.length > 0
                ? {
                    some: {
                      skillId: {
                        in: filters?.UserSkills?.map((item) => true && item.id),
                      },
                    },
                  }
                : {},
          }
      : filters?.input.length > 0
      ? filters?.input[0] === "@"
        ? {
            username: {
              contains: filters?.input.slice(1),
              mode: "insensitive",
            },
          }
        : {
            name: { contains: filters?.input, mode: "insensitive" },
          }
      : {},
  });

  const hasNextPage = users.length > 10;
  let slicedPosts = users;
  if (users.length > 10) {
    slicedPosts = users.slice(0, -1);
  }
  const result = slicedPosts.map((users) => {
    if (users.role !== "company")
      return {
        id: users.id,
        name: users.name,
        username: users.username,
        image: users.image,
        country: users.country,
        city: users.city,
        UserSkills: users.UserSkills,
        Company: users.Company,
        educationLevel: users.educationLevel,
        about: users.about,
        // Education: users.Education,
        // WorkExperience: users.WorkExperience,
      };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";

  return {
    data: result,
    hasNextPage: hasNextPage,
    cursor: newCursor,
  };
};
