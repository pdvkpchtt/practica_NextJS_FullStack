"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const followCompany = async (id) => {
  const session = await getServSession();
  await prisma.user.update({
    where: { id: id },
    data: { myCompanyFolowers: { connect: [{ id: session?.user?.id }] } },
  });
};
