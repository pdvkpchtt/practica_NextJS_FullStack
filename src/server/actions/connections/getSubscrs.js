"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getSubscrs = async (myId, cursor, input) => {
  const session = await getServSession();

  const request = await prisma.user.findMany({
    take: 11,
    where: {
      id: myId,
    },

    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      companiesIFollow: {
        select: {
          _count: { select: { myCompanyFolowers: true } },
          Company: {
            select: {
              name: true,
              image: true,
              id: true,
              username: true,
            },
          },
        },
        where: {
          Company: {
            name: {
              contains: input,
              mode: "insensitive",
            },
          },
        },
      },
    },
  });

  const hasNextPage = request[0].companiesIFollow.length > 10;

  let slicedPosts = request[0].companiesIFollow;
  if (request[0].companiesIFollow.length > 10) {
    slicedPosts = request[0].companiesIFollow?.slice(0, -1);
  }
  const result = slicedPosts.map((r) => {
    return {
      name: r?.Company?.name,
      image: r?.Company?.image,
      id: r?.Company?.id,
      username: r?.Company?.username,
      connectionsCount: r?._count?.myCompanyFolowers,
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
