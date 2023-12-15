import { prisma } from "../../db";

export const getUpdates = async (myId, cursor) => {
  const updates = await prisma.Updates.findMany({
    take: 11,
    where: {
      userId: myId,
    },
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      text: true,
      type: true,
      createdAt: true,
      userFrom: {
        select: {
          id: true,
          name: true,
          lastname: true,
          username: true,
          image: true,
        },
      },
    },
  });

  const hasNextPage = updates.length > 10;

  let slicedPosts = updates;
  if (updates.length > 10) {
    slicedPosts = updates.slice(0, -1);
  }
  const result = slicedPosts.map((i) => {
    return {
      text: i.text,
      type: i.type,
      createdAt: i.createdAt,
      userFrom: i.userFrom,
      image: i.userFrom?.image,
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
