import { prisma } from "../../db";

export const getCompanies = async (cursor, filters) => {
  const users = await prisma.Company.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      id: true,
      name: true,
      username: true,
      about: true,
      image: true,
      Cities: true,
      employee: true,
      Vacancy: true,
      isStartap: true,
    },
    where: filters?.startFiltering
      ? filters?.input.length > 0
        ? filters?.isStartap !== null
          ? {
              name: { contains: filters?.input, mode: "insensitive" },
              employee: {
                label: {
                  contains: filters?.employee?.label,
                  mode: "insensitive",
                },
              },
              industry: {
                label: {
                  contains: filters?.industry?.label,
                  mode: "insensitive",
                },
              },
              isStartap: filters?.isStartap,
            }
          : {
              name: { contains: filters?.input, mode: "insensitive" },
              employee: {
                label: {
                  contains: filters?.employee?.label,
                  mode: "insensitive",
                },
              },
              industry: {
                label: {
                  contains: filters?.industry?.label,
                  mode: "insensitive",
                },
              },
            }
        : filters?.isStartap !== null
        ? {
            employee: {
              label: {
                contains: filters?.employee?.label,
                mode: "insensitive",
              },
            },
            industry: {
              label: {
                contains: filters?.industry?.label,
                mode: "insensitive",
              },
            },
            isStartap: filters?.isStartap,
          }
        : {
            employee: {
              label: {
                contains: filters?.employee?.label,
                mode: "insensitive",
              },
            },
            industry: {
              label: {
                contains: filters?.industry?.label,
                mode: "insensitive",
              },
            },
          }
      : filters?.input.length > 0
      ? {
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
    // if (users.Company !== null)
    return {
      id: users.id,
      name: users.name,
      username: users.username,
      image: users.image,
      Cities: users.Cities,
      Vacancy: users.Vacancy,
      about: users.about,
      isStartap: users.isStartap,
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
