"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const unfollowCompany = async (companyId) => {
  const session = await getServSession();
  await prisma.Following.deleteMany({
    where: { AND: [{ userId: session?.user?.id }, { companyId: companyId }] },
  });
};
