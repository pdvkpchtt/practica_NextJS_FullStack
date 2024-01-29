"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const followCompany = async (companyId) => {
  const session = await getServSession();
  await prisma.Following.create({
    data: {
      user: {
        connect: { id: session?.user?.id },
      },
      Company: { connect: { id: companyId } },
    },
  });
};
