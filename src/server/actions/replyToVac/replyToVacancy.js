"use server";

import { getServSession } from "app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const replyToVacancy = async (vacId, message, link) => {
  const session = getServSession();

  const vacReply = await prisma.VacancyReply({
    user: {
      connect: {
        id: session?.user?.id,
      },
    },
    Vacancy: {
      connect: {
        id: vacId,
      },
    },
    message: message,
    link: link,
  });
};
