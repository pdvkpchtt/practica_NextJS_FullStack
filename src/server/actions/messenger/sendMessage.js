"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

const sendMessage = async (input, chatId) => {
  const session = await getServSession();

  const message = await prisma.message.create({
    data: {
      text: input,
      unRead: true,
      type: !type
        ? ""
        : type === "pitch"
        ? "pitch"
        : type === "superpitch"
        ? "superpitch"
        : "",
      Chat: {
        connect: { id: chatId },
      },
      User: {
        connect: { id: session.user.id },
      },
    },
  });

  const chat = await prisma.chat.update({
    where: { id: chatId },
    data: {
      updatedAt: new Date(),
    },
  });

  return message;
};

export default sendMessage;
