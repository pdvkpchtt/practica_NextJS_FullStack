import { prisma } from "../../db";

export const getUsersBookmarks = async (userId, cursor) => {
  const bookmarks = await prisma.bookmarks.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    where: {
      userId: userId,
    },
    select: {
      id: true,
      user: true,
      vacancy: {
        select: {
          id: true,
          name: true,
          description: true,
          shortDescription: true,
          conditions: true,
          waitings: true,
          salaryStart: true,
          salaryEnd: true,
          format: {
            select: {
              id: true,
              text: true,
            },
          },
          hrCreator: {
            select: {
              user: {
                select: {
                  username: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
          contract: {
            select: {
              id: true,
              label: true,
            },
          },
          currency: {
            select: {
              id: true,
              label: true,
            },
          },
          experience: {
            select: {
              id: true,
              text: true,
            },
          },
          educationLevel: {
            select: {
              id: true,
              text: true,
            },
          },
          Company: {
            select: {
              id: true,
              userId: true,
              username: true,
              name: true,
              image: true,
            },
          },
          Location: {
            select: {
              label: true,
            },
          },
          vacArea: {
            select: {
              label: true,
            },
          },
          VacancySkills: {
            select: {
              skillId: true,
              skill: {
                select: {
                  name: true,
                  type: true,
                },
              },
            },
          },
          Bookmarks: true,
        },
      },
    },
  });

  const hasNextPage = bookmarks.length > 10;
  let slicedPosts = bookmarks;
  if (bookmarks.length > 10) {
    slicedPosts = bookmarks.slice(0, -1);
  }

  const result = slicedPosts.map((item) => {
    item.vacancy.hrCreator = item?.vacancy?.hrCreator?.user;
    return item;
  });
  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";
  return {
    data: result,
    hasNextPage: hasNextPage,
    cursor: newCursor,
  };
};
