"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getRecruters = async (companyId, cursor, input) => {
  const session = await getServSession();

  const hrs = await prisma.Hr.findMany({
    take: 11,
    where:
      input?.length === 0
        ? { company: { some: { id: companyId } }, dataVerified: { not: null } }
        : {
            company: { some: { id: companyId } },
            dataVerified: { not: null },
            user: { name: { contains: input, mode: "insensitive" } },
          },
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      dataVerified: true,
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
              participants: { some: { id: session?.user?.id } },
            },
          },
        },
      },
    },
  });

  const hasNextPage = hrs.length > 10;

  let slicedPosts = hrs;
  if (hrs.length > 10) {
    slicedPosts = hrs.slice(0, -1);
  }
  const result = slicedPosts.map((r) => {
    if (r.dataVerified !== null)
      return {
        name: r?.user?.name,
        lastname: r?.user?.lastname,
        image: r?.user?.image,
        id: r?.user?.id,
        username: r?.user?.username,
        connectionsCount: r?.user?._count?.connections,
        chats: r?.user?.chats[0]?.id,
      };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";
  console.log(result);
  return {
    data: result,
    hasNextPage: hasNextPage,
    cursor: newCursor,
    role: session?.user?.role,
  };
};
