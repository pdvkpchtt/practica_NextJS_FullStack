"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const firstTime = async () => {
  const session = await getServSession();

  const isFirst = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    select: {
      isFirstTime: true,
    },
  });

  return isFirst.isFirstTime;
};

export const setFirstTime = async () => {
  const session = await getServSession();

  const isFirst = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      isFirstTime: false,
    },
  });
};
