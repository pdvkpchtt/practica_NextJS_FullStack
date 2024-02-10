"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const checkAndChange = async (token, email) => {
  const session = await getServSession();

  const isUnique = await prisma.User.findFirst({
    where: { AND: [{ tokenForMail: token }, { id: session?.user?.id }] },
    select: { id: true },
  });

  if (!isUnique?.id) return { status: "error" };

  const newMail = await prisma.User.update({
    where: { id: session?.user?.id },
    data: {
      email: email,
      tokenForMail: null,
    },
  });

  return { status: "good" };
};
