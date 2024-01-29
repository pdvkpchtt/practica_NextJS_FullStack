"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getSubscrs = async (myId, cursor, input) => {
  const session = await getServSession();

  const request = await prisma.Following.findMany({
    take: 11,
    where: {
      userId: myId,
      Company: {
        name: {
          contains: input,
          mode: "insensitive",
        },
      },
    },

    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      Company: {
        select: {
          _count: { select: { Following: true } },
          name: true,
          image: true,
          id: true,
          username: true,
        },
      },
    },
  });

  const hasNextPage = request.length > 10;

  let slicedPosts = request;
  if (request.length > 10) {
    slicedPosts = request?.slice(0, -1);
  }
  const result = slicedPosts.map((r) => {
    return {
      name: r?.Company?.name,
      image: r?.Company?.image,
      id: r?.Company?.id,
      username: r?.Company?.username,
      connectionsCount: r?.Company?._count?.Following,
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
