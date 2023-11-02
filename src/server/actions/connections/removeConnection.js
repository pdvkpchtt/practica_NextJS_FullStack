"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const removeConnection = async (userConnectId) => {
  const session = await getServSession();
  await prisma.user.update({
    where: { id: session?.user?.id },
    data: { connections: { disconnect: [{ id: userConnectId }] } },
  });
  await prisma.user.update({
    where: { id: userConnectId },
    data: { connections: { disconnect: [{ id: session?.user?.id }] } },
  });
};
