"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const checkCircles = async (otherUserId) => {
  const session = await getServSession();

  const firstCircle = await prisma.User.findFirst({
    select: {
      connections: {
        select: { id: true },
        where: { id: otherUserId },
      },
    },
    where: {
      id: session.user.id,
    },
  });

  const secondCircle = await prisma.User.findFirst({
    select: {
      connections: {
        select: {
          connections: { select: { id: true }, where: { id: otherUserId } },
        },
      },
    },
    where: {
      id: session.user.id,
    },
  });

  const thirdCircle = await prisma.User.findFirst({
    select: {
      connections: {
        select: {
          connections: {
            select: {
              connections: { select: { id: true }, where: { id: otherUserId } },
            },
          },
        },
      },
    },
    where: {
      id: session.user.id,
    },
  });

  let arr2 = [];
  secondCircle.connections.map(
    (i) => i.connections.length > 0 && arr2.push(i.connections)
  );

  let arr3 = [];
  thirdCircle.connections.map((i) =>
    i.connections.map(
      (i2) => i2.connections.length > 0 && arr3.push(i2.connections)
    )
  );

  return {
    firstCircle: firstCircle?.connections?.length
      ? firstCircle?.connections[0]
      : null,
    secondCircle: arr2.length ? arr2[0][0] : null,
    thirdCircle: arr3.length ? arr3[0][0] : null,
    circle: firstCircle?.connections?.length
      ? 1
      : arr2.length
      ? 2
      : arr3.length
      ? 3
      : 4,
  };
};
