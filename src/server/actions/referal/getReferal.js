"use server";

import { prisma } from "../../db";

export const getReferal = async () => {
  const data = await prisma.ReferalPlan.findMany({});

  return data;
};
