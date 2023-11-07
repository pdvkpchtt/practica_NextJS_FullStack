"use server";

import { getServSession } from "app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const replyToVacancy = async (vacId, message, link) => {
  const session = getServSession();

  const vacReply = await prisma.VacancyReply.create({
    data: {
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
    },
    select: {
      id: true,
    },
  });

  const files = await prisma.File.findMany({
    where: {
      AND: [
        {
          vacancyReplyId: null,
        },
        { user: { id: session?.user?.id } },
      ],
    },
    select: {
      id: true,
    },
  });

  for (const file of files) {
    await prisma.File.update({
      where: {
        id: file.id,
      },
      data: {
        vacancyReplyId: vacId,
      },
    });
  }

  const hrCreator = await prisma.Vacancy.findUnique({
    where: { id: vacId },
    select: {
      hrCreator: {
        id: true,
      },
    },
  });
  ///дальше хз как
  ///надо достать chatId с hrCreator и там создать message, который будет сконнекчен с vacReply.id
};
