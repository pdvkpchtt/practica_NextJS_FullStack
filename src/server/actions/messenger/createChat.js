"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";
import { checkCircles } from "./checkCircles";

export const createChat = async (otherId, message) => {
  const session = await getServSession();

  const circle = await checkCircles(otherId);

  const chat = await prisma.chat.create({
    data: {
      participants: {
        connect: [
          {
            id: session?.user?.id,
          },
          { id: otherId },
        ],
      },
    },
  });

  const newmessage = await prisma.message.create({
    data: {
      text: message,
      type: circle.circle,
      unRead: true,
      Chat: {
        connect: { id: chat?.id },
      },
      User: {
        connect: { id: session?.user?.id },
      },
    },
  });

  return chat.id;
};
