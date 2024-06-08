"use server";

import { prisma } from "../../db";

export const createReferal = async (id, type = "starter", invitedId) => {
  await prisma.ReferCredit.create({
    data: {
      owner_of_link: { connect: { id: id } },
      invited: { connect: { id: invitedId } },
      type: type,
    },
  });

  if (type === "starter")
    await prisma.user.update({
      where: { id: id },
      data: {
        bonusPitch: { increment: 20 },
        bonusSuperPitch: { increment: 40 },
      },
    });
  else
    await prisma.user.update({
      where: { id: id },
      data: {
        bonusPitch: { increment: 40 },
        bonusSuperPitch: { increment: 10 },
      },
    });
};
