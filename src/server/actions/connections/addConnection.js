"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const addConnection = async (userConnectId) => {
  const session = await getServSession();
  await prisma.user.update({
    where: { id: session?.user?.id },
    data: { connections: { connect: [{ id: userConnectId }] } },
  });
  await prisma.user.update({
    where: { id: userConnectId },
    data: { connections: { connect: [{ id: session?.user?.id }] } },
  });
  await prisma.FriendRequests.deleteMany({
    where: {
      AND: [
        {
          userSendId: { equals: userConnectId },
        },
        {
          userGetId: { equals: session?.user?.id },
        },
      ],
    },
  });

  await prisma.Updates.deleteMany({
    where: {
      AND: [
        {
          userFromId: { equals: userConnectId },
        },
        {
          userId: { equals: session?.user?.id },
        },
      ],
    },
  });

  await prisma.Updates.deleteMany({
    where: {
      AND: [
        {
          userFromId: { equals: session?.user?.id },
        },
        {
          userId: { equals: userConnectId },
        },
      ],
    },
  });

  await prisma.PremiumMessage.deleteMany({
    where: {
      OR: [
        {
          AND: [
            { userGetId: { equals: session?.user?.id } },
            { userSendId: { equals: userConnectId } },
          ],
        },
        {
          AND: [
            { userGetId: { equals: userConnectId } },
            { userSendId: { equals: session?.user?.id } },
          ],
        },
      ],
    },
  });
};
