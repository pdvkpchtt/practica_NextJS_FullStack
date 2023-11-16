"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const addContacts = async (phoneNum) => {
  const session = await getServSession();

  const phone = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      phone: phoneNum,
      phoneVerified: new Date(),
    },
  });
};
