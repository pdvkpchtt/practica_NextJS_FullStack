"use server";

import { prisma } from "../../db";

export const setView = async (vacId, userId) => {
  try {
    await prisma.VacancyViews.create({
      data: {
        User: {
          connect: { id: userId },
        },
        Vacancy: { connect: { id: vacId } },
      },
    });
  } catch (err) {
    console.log("view is already here");
  }
};
