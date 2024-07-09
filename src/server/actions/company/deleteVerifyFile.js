"use server";

import { prisma } from "../../db";

export const deleteVerifyFile = async (fileId) => {
  const data = await prisma.VerifyFile.delete({
    where: {
      id: fileId,
    },
  });
};
