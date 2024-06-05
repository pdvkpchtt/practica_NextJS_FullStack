"use server";

import { prisma } from "../../db";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";

// пока только один план
// лучше не передавать план в функцию, а тянуть его из юзера по session.user.id
// надо хранить план юзера в юзере

export const getPitchesCount = async (type = "pitch", withBonuses = true) => {
  const session = await getServSession();

  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: { planId: true, bonusPitch: true, bonusSuperPitch: true },
  });

  let lastDay = new Date(new Date().setHours(0, 0, 0, 0));
  lastDay = new Date(lastDay).toISOString();

  const todayMessages = await prisma.Message.findMany({
    select: {
      text: true,
      type: true,
      createdAt: true,
    },
    where: {
      userId: session.user.id,
      type: type,
      createdAt: {
        gte: lastDay,
      },
    },
  });

  const pitchesByPlan = await prisma.Plan.findMany({
    select: {
      id: true,
      pitchesCount: true,
      superPitchesCount: true,
      name: true,
    },
    where: {
      id: user.planId,
    },
  });

  if (type === "pitch")
    return pitchesByPlan[0].pitchesCount - todayMessages.length + withBonuses
      ? user.bonusPitch
      : 0;
  else if (type === "superpitch")
    return pitchesByPlan[0].superPitchesCount -
      todayMessages.length +
      withBonuses
      ? user.bonusSuperPitch
      : 0;
  else return -100;
};
