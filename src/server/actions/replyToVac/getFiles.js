"use server";

import { prisma } from "../../db";

export const getFiles = async (userId) => {
  const data = await prisma.File.findMany({
    where: {
      userId: userId,
    },
  });

  return data;
};
