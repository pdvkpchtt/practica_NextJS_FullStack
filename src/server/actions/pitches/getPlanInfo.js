"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getPlanInfo = async () => {
  const session = await getServSession();

  const plan = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      plan: true,
    },
  });

  return plan.plan;
};
