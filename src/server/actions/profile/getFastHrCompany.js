"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getFastHrCompany = async () => {
  const session = await getServSession();

  const comapny = await prisma.Hr.findMany({
    where: {
      AND: [{ userId: session?.user?.id }, { dataVerified: { not: null } }],
    },
    select: {
      company: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
          contactsCount: true,
        },
      },
    },
  });

  return comapny;
};
