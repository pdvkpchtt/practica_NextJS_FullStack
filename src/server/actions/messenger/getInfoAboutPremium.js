"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getInfoAboutPremium = async (otherUserId) => {
  const session = getServSession();

  const isAnyPremMessage = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      PremiumMessageGet: {
        // получатель
        select: {
          user: {
            select: { id: true },
          },
        },
      },
      PremiumMessageSent: {
        // отправитель
        select: {
          user: {
            select: { id: true },
          },
        },
      },
    },
  });

  return isAnyPremMessage;
};
