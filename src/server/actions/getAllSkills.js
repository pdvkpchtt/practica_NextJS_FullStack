"use server";
import { prisma } from "../db";

export const getAllSkills = async () => {
  const skills = await prisma.skill.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      area: {
        select: {
          label: true,
        },
      },
    },
  });

  return {
    skills,
  };
};
