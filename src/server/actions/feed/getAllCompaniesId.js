"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getAllCompaniesId = async () => {
  const session = await getServSession();

  const complist = await prisma.Hr.findMany({
    where: {
      AND: [{ userId: session?.user?.id }, { dataVerified: { not: null } }],
    },
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
  });

  return complist.map(
    (i) =>
      true && {
        id: i.company.id,
        name: i.company.name,
        username: i.company.username,
        image: i?.company?.image,
      }
  );
};
