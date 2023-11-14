"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getOtherProfileWithTimer = async ({ userId }) => {
  const session = await getServSession();
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      UpdatesToMe: true,
      connections: true,
      ISendRequest: true,
      IGetRequest: true,
    },
  });

  return {
    requestStatus:
      user?.IGetRequest?.find(
        (item) => item.userSendId === session?.user?.id
      ) !== undefined
        ? true
        : false,
    friendStatus:
      user?.connections?.find((item) => item.id === session.user.id) !==
      undefined
        ? true
        : false,
    ifHeSentRequest:
      user?.ISendRequest?.find((item) => item.userGetId === session.user.id) !==
      undefined
        ? true
        : false,
  };
};
