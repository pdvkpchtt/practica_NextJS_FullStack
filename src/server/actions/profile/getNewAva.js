"use server";

import { prisma } from "../../db";

const getNewAva = async (id) => {
  const ava = await prisma.user.findUnique({
    where: { id: id },
    select: {
      image: true,
    },
  });

  return ava.image;
};

export default getNewAva;
