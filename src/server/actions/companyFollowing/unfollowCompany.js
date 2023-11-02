"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const unfollowCompany = async (id) => {
  const session = await getServSession();
  await prisma.user.update({
    where: { id: id },
    data: { myCompanyFolowers: { disconnect: [{ id: session?.user?.id }] } },
  });
};
