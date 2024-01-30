"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getFirstCompany = async () => {
  const session = await getServSession();

  const firstCompanyUsername = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      Company: {
        select: {
          username: true,
        },
      },
    },
  });

  if (firstCompanyUsername?.Company?.length > 0)
    return firstCompanyUsername?.Company[0].username;
  else return null;
};
