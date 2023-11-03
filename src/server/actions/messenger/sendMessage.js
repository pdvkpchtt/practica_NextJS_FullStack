"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

const sendMessage = async (input, chatId, type, whoIsSender, otherId) => {
  const session = await getServSession();

  const message = await prisma.message.create({
    data: {
      text: input,
      unRead: true,
      type:
        whoIsSender === "noone"
          ? type
          : whoIsSender === session.user.id
          ? type
          : "",
      Chat: {
        connect: { id: chatId },
      },
      User: {
        connect: { id: session.user.id },
      },
    },
  });

  if (whoIsSender === "noone") {
    const sentPitch = await prisma.PremiumMessage.create({
      data: {
        type: type,
        userGet: {
          connect: {
            id: otherId,
          },
        },
        userSend: {
          connect: { id: session?.user?.id },
        },
      },
    });
  }

  const chat = await prisma.chat.update({
    where: { id: chatId },
    data: {
      updatedAt: new Date(),
    },
  });

  return message;
};

export default sendMessage;
