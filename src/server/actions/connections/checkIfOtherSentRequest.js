"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const checkIfOtherSentRequest = async (userId) => {
  const session = await getServSession();

  const sent = await prisma.user.findUnique({
    where: { id: userId },
    select: { ISendRequest: true },
  });

  const ifSent = sent?.ISendRequest?.find(
    (item) => item.userGetId === session.user.id
  );

  if (ifSent !== undefined) return true;
  else return false;
};
