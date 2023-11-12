"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";
import { checkCircles } from "./checkCircles";

const sendMessage = async (input, chatId) => {
  const session = await getServSession();

  const circle = await checkCircles(null, chatId);

  var d = new Date();
  d.setDate(d.getDate() - 4);

  const check = await prisma.message.findFirst({
    where: {
      AND: [
        { chatId: chatId },
        { type: circle.circle },
        { createdAt: { gte: new Date(d.toString()).toISOString() } },
      ],
    },
    select: { id: true },
  });

  const message = await prisma.message.create({
    data: {
      text: input,
      unRead: true,
      type: check?.id ? "" : circle.circle,
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
