"use server";

import { prisma } from "../../db";

export const getFiles = async (userId, vacId) => {
  const data = await prisma.File.findMany({
    where: {
      userId: userId,
      vacancyId: vacId,
    },
  });

  return data;
};
