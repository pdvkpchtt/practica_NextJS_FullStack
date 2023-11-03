"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getInfoAboutPremium = async (userId) => {
  const session = await getServSession();

  const isAnyPremMessage = await prisma.PremiumMessage.findMany({
    // отпраил кому
    select: {
      id: true,
      type: true,
      userGetId: true,
      userSendId: true,
      createdAt: true,
      userGet: true,
      userSend: true,
    },
    where: { userGetId: userId, userSendId: session.user.id },
  });
  const isAnyPremMessage2 = await prisma.PremiumMessage.findMany({
    // отпраил кому
    select: {
      id: true,
      type: true,
      userGetId: true,
      userSendId: true,
      createdAt: true,
      userGet: true,
      userSend: true,
    },
    where: { userSendId: userId, userGetId: session.user.id },
  });

  return {
    whatISent: isAnyPremMessage,
    whatIGet: isAnyPremMessage2,
    whoIsSender:
      isAnyPremMessage.length === 0 && isAnyPremMessage2.length === 0
        ? "noone"
        : isAnyPremMessage.length > 0
        ? session.user.id
        : userId,
  };
};
