"use server";

import { getServSession } from "app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const replyToVacancy = async (vacId, link, message) => {
  const session = await getServSession();

  const vacReply = await prisma.VacancyReply.create({
    data: {
      user: {
        connect: {
          id: session?.user?.id,
        },
      },
      vacancy: {
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

  //// ёбка с файлами
  // const files = await prisma.File.findMany({
  //   where: {
  //     AND: [
  //       {
  //         vacancyReplyId: null,
  //       },
  //       { user: { id: session?.user?.id } },
  //     ],
  //   },
  //   select: {
  //     id: true,
  //   },
  // });

  // for (const file of files) {
  //   await prisma.File.update({
  //     where: {
  //       id: file.id,
  //     },
  //     data: {
  //       vacancyReply: {
  //         connect: {
  //           id: vacReply.id,
  //         },
  //       },
  //     },
  //   });
  // }
  //// ёбка с файлами

  const hrCreator = await prisma.Vacancy.findUnique({
    where: { id: vacId },
    select: {
      hrCreator: {
        select: {
          id: true,
        },
      },
    },
  });

  ///дальше хз как
  ///надо достать chatId с hrCreator и там создать message, который будет сконнекчен с vacReply.id
  ///ща я сделаю
  const foundChat = await prisma.chat.findFirst({
    where: {
      AND: [
        {
          participants: { some: { id: session?.user?.id } },
        },
        {
          participants: { some: { id: hrCreator?.hrCreator?.id } },
        },
      ],
    },
    select: { id: true, participants: true },
  });

  console.log("22231321", foundChat, hrCreator?.hrCreator?.id);
};
