"use server";

import { prisma } from "../../db";

export const getAvaServ = async (id, company = false) => {
  if (company === false) {
    const ava = await prisma.user.findUnique({
      where: { id: id },
      data: {
        image: true,
      },
    });

    return ava.image;
  }
};
