"use server";

import { prisma } from "../../db";

export const getSubscriptions = async () => {
  const plans = await prisma.Plan.findMany({});

  const result = plans.map((i) => {
    if (i.name !== "standart")
      return {
        name: i.name,
        pitchesCount:
          i.pitchesCount -
          plans.find((i) => i.name === "standart").pitchesCount,
        superPitchesCount:
          i.superPitchesCount -
          plans.find((i) => i.name === "standart").superPitchesCount,
        contacts: i.contacts,
        durationDays: i.durationDays,
        price: i.price,
      };
  });

  return result;
};
