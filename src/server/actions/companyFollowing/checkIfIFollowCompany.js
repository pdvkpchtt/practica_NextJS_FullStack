"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const checkIfIFollowCompany = async (id) => {
  const session = await getServSession();

  const following = await prisma.Following.findMany({
    where: { userId: session?.user?.id },
    select: { companyId: true },
  });

  const foundFriend = following?.find((item) => item.companyId === id);

  if (foundFriend !== undefined) return true;
  else return false;
};
