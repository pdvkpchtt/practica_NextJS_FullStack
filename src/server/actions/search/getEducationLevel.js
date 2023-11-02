"use server";

import { prisma } from "../../db";

export const getEducationLevel = async () => {
  const educationLevel = await prisma.EducationLevel.findMany({
    select: { id: true, text: true },
  });

  return educationLevel.map((i) => ({ id: i.id, label: i.text }));
};
