"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getConnctionsCount = async () => {
  const session = await getServSession();

  let arr = [];
  let arr2 = [];

  const circles = await prisma.User.findFirst({
    select: {
      connections: {
        include: {
          connections: {
            include: { connections: { include: { connections: true } } },
          },
        },
      },
    },
    where: {
      id: session.user.id,
    },
  });

  circles?.connections?.map((i) => arr.push(i.id));
  circles?.connections.map((i2) => i2.connections.map((i) => arr2.push(i)));
  arr2.map((i) => arr.push(i.id));
  arr2.map((i) =>
    i.connections.map((i) => !arr.includes(i.id) && arr.push(i.id))
  );
  arr.push(session.user.id);

  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
    where: {
      userId: { in: arr },
    },
  });

  return posts.length;
};
