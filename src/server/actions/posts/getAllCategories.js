"use server";
import { prisma } from "../../db";

export const getAllCategories = async () => {
  const categories = await prisma.PostCategories.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return categories;
};
