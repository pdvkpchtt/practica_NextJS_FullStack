"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const checkIfFriend = async (userId) => {
  const session = await getServSession();

  const friend = await prisma.user.findUnique({
    where: { id: userId },
    select: { connections: true },
  });

  const foundFriend = friend?.connections?.find(
    (item) => item.id === session.user.id
  );

  if (foundFriend !== undefined) return true;
  else return false;
};
