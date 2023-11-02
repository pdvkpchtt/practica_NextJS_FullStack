"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const sendFriendRequest = async (userConnectId) => {
  const session = await getServSession();

  await prisma.FriendRequests.create({
    data: {
      userSend: { connect: { id: session.user.id } },
      userGet: { connect: { id: userConnectId } },
    },
  });

  await prisma.Updates.create({
    data: {
      text: "Пользователь пока не подтвердил связь",
      type: "request sent",
      user: { connect: { id: session.user.id } },
      userFrom: { connect: { id: userConnectId } },
    },
  });

  await prisma.Updates.create({
    data: {
      text: "Пользователь отправил запрос о дружбе",
      type: "request get",
      user: { connect: { id: userConnectId } },
      userFrom: { connect: { id: session.user.id } },
    },
  });
};
