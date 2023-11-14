"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getMyProfileInfoTimer = async () => {
  const session = await getServSession();

  const infoAboutUpdates = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      UpdatesToMe: true,
    },
  });

  return infoAboutUpdates.UpdatesToMe.length;
};
