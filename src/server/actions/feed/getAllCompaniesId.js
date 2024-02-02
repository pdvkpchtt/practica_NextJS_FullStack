"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getAllCompaniesId = async () => {
  const session = await getServSession();

  const complist = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      HR: {
        select: {
          company: {
            select: {
              id: true,
              name: true,
              image: true,
              username: true,
            },
          },
        },
      },
    },
  });

  return complist?.HR[0]?.company;
};
