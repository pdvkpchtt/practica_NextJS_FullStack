"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const createChat = async (otherId, message) => {
  const session = await getServSession();

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
      type: "",
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
