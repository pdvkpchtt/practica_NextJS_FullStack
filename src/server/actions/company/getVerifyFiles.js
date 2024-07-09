"use server";

import { prisma } from "../../db";

export const getVerifyFiles = async (compId) => {
  const data = await prisma.VerifyFile.findMany({
    where: {
      companyId: compId,
    },
  });

  return data;
};
