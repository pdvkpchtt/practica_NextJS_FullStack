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
};
