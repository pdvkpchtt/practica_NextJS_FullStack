"use server";

import { prisma } from "../../db";

export const deleteFile = async (fileId) => {
  const data = await prisma.File.delete({
    where: {
      id: fileId,
    },
  });
};
