"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getFriendList = async (myId, cursor, input) => {
  const session = await getServSession();

  const request = await prisma.user.findMany({
    where: {
      id: myId,
    },

    select: {
      connections: {
        take: 11,
        ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
        select: {
          name: true,
          lastname: true,
          image: true,
          id: true,
          username: true,
          _count: {
            select: { connections: true },
          },
          chats: {
            select: {
              id: true,
              participants: { select: { id: true } },
            },
            where: {
              participants: { some: { id: session?.user?.id } },
            },
          },
        },
        where: {
          name: {
            contains: input,
            mode: "insensitive",
          },
        },
      },
    },
  });

  const hasNextPage = request[0]?.connections?.length > 10;

  let slicedPosts = request[0]?.connections;
  if (request[0]?.connections?.length > 10) {
    slicedPosts = request[0]?.connections?.slice(0, -1);
  }
  const result = slicedPosts?.map((r) => {
    return {
      name: r?.name,
      lastname: r?.lastname,
      image: r?.image,
      id: r?.id,
      username: r?.username,
      connectionsCount: r?._count.connections,
      chats: r?.chats[0]?.id,
    };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";

  return {
    data: result || [],
    hasNextPage: hasNextPage,
    cursor: newCursor,
  };
};
