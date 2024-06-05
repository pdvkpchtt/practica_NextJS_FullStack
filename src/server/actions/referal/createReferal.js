"use server";

import { prisma } from "../../db";

export const createReferal = async (id, type = "standart", invitedId) => {
  await prisma.ReferCredit.create({
    data: {
      owner_of_link: { connect: { id: id } },
      invited: { connect: { id: invitedId } },
      type: type,
    },
  });

  await await prisma.user.update({
    where: { id: id },
    data: {
      bonusPitch: { increment: type === "standart" ? 20 : 40 },
      bonusSuperPitch: { increment: type === "standart" ? 40 : 10 },
    },
  });
};
