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
        vacancyReply: {
          connect: {
            id: vacReply.id,
          },
        },
      },
    });
  }

  const hrCreator = await prisma.Vacancy.findUnique({
    where: { id: vacId },
    select: {
      hrCreator: {
        select: {
          userId: true,
        },
      },
    },
  });

  ///дальше хз как
  ///надо достать chatId с hrCreator и там создать message, который будет сконнекчен с vacReply.id
  ///ща я сделаю
  // проверяем, если чат с hrCreator'ом есть
  const foundChat = await prisma.chat.findFirst({
    where: {
      AND: [
        {
          participants: { some: { id: session?.user?.id } },
        },
        {
          participants: { some: { id: hrCreator?.hrCreator?.userId } },
        },
      ],
    },
    select: { id: true, participants: true },
  });

  // если нет, тосоздаём чат
  if (!foundChat?.id) {
    const chat = await prisma.chat.create({
      data: {
        participants: {
          connect: [
            {
              id: session?.user?.id,
            },
            { id: hrCreator?.hrCreator?.userId },
          ],
        },
      },
    });

    const newmessage = await prisma.message.create({
      data: {
        text: "Отклик на вакансию",
        type: "vacancyReply",
        unRead: true,
        Chat: {
          connect: { id: chat?.id },
        },
        User: {
          connect: { id: session?.user?.id },
        },
        vacancyReply: { connect: { id: vacReply.id } },
      },
    });

    const updchat = await prisma.chat.update({
      where: { id: chat.id },
      data: {
        updatedAt: new Date(),
      },
    });
  } else {
    const newmessage = await prisma.message.create({
      data: {
        text: "Отклик на вакансию",
        type: "vacancyReply",
        unRead: true,
        Chat: {
          connect: { id: foundChat.id },
        },
        User: {
          connect: { id: session?.user?.id },
        },
        vacancyReply: { connect: { id: vacReply.id } },
      },
    });

    const chat = await prisma.chat.update({
      where: { id: foundChat.id },
      data: {
        updatedAt: new Date(),
      },
    });
  }

  // console.log("digitstestomg", foundChat, hrCreator?.hrCreator?.userId);s
};
