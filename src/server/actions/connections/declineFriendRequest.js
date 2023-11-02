"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const declineFriendRequest = async (userConnectId) => {
  const session = await getServSession();

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
      NOT: { type: "reaction" },
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
      NOT: { type: "reaction" },
    },
  });
};
