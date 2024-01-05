"use server";

import { prisma } from "../../db";

const getCompanyNewAva = async (id) => {
  const ava = await prisma.Company.findUnique({
    where: { id: id },
    select: {
      image: true,
    },
  });

  return ava.image;
};

export default getCompanyNewAva;
