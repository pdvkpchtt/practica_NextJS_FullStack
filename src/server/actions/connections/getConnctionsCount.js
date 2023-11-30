"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getConnctionsCount = async () => {
  const session = await getServSession();

  const data = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      _count: {
        select: { connections: true },
      },
    },
  });

  return data._count.connections;
};
