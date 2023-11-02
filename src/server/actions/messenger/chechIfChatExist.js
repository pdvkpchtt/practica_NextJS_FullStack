"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const chechIfChatExist = async (userId) => {
  const session = await getServSession();

  const chat = await prisma.chat.findFirst({
    where: {
      AND: [
        {
          participants: { some: { id: session.user.id } },
        },
        {
          participants: { some: { id: userId } },
        },
      ],
    },
    select: { id: true, participants: true },
  });
  console.log(chat, "jopa");

  return { id: chat?.id };
};
