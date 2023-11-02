"use server";

import { prisma } from "../../db";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";

// пока только один план
// лучше не передавать план в функцию, а тянуть его из юзера по session.user.id
// надо хранить план юзера в юзере

export const getPitchesCount = async (type = "pitch", plan = "standart") => {
  const session = await getServSession();

  let lastDay = new Date(new Date().setHours(0, 0, 0, 0));
  lastDay = new Date(lastDay).toISOString();

  console.log(lastDay, "jopa");

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
      pitchesCount: true,
      superPitchesCount: true,
      name: true,
    },
    where: {
      name: plan,
    },
  });

  if (type === "pitch")
    return pitchesByPlan[0].pitchesCount - todayMessages.length;
  else if (type === "superpitch")
    return pitchesByPlan[0].superPitchesCount - todayMessages.length;
  else return -100;
};
