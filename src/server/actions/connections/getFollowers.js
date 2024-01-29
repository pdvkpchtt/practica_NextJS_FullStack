"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getFollowers = async (companyId, cursor, input) => {
  const session = await getServSession();

  const followers = await prisma.Following.findMany({
    take: 11,
    where:
      input?.length === 0
        ? {
            Company: { id: companyId },
          }
        : {
            Company: { id: companyId },
            user: { name: { contains: input, mode: "insensitive" } },
          },
    // input?.length === 0
    //   ? { companyId: companyId, dataVerified: { not: null } }
    //   : {
    //       companyId: companyId,
    //       dataVerified: { not: null },
    //       user: { name: { contains: input, mode: "insensitive" } },
    //     },
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      user: {
        select: {
          id: true,
          name: true,
          lastname: true,
          image: true,
          username: true,
          _count: {
            select: {
              connections: true,
            },
          },
          chats: {
            select: {
              id: true,
              participants: { select: { id: true } },
            },
            where: {
              participants: { some: { id: session?.user?.user?.id } },
            },
          },
        },
      },
    },
  });

  const hasNextPage = followers.length > 10;

  let slicedFollowers = followers;
  if (followers.length > 10) {
    slicedFollowers = followers.slice(0, -1);
  }
  const result = slicedFollowers.map((r) => {
    return {
      lastname: r?.user?.lastname,
      name: r?.user?.name,
      image: r?.user?.image,
      id: r?.user?.id,
      username: r?.user?.username,
      connectionsCount: r?.user?._count?.connections,
      chats: r?.user?.chats,
    };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";
  console.log("followers", result);
  return {
    data: result,
    hasNextPage: hasNextPage,
    cursor: newCursor,
  };
};
