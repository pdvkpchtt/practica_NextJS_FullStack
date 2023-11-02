"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const checkIfRequestSent = async (userId) => {
  const session = await getServSession();

  const requests = await prisma.user.findUnique({
    where: { id: userId },
    select: { IGetRequest: { select: { userSendId: true } } },
  });

  const foundRequest = requests?.IGetRequest?.find(
    (item) => item.userSendId === session?.user?.id
  );

  if (foundRequest !== undefined) return true;
  else return false;
};
