"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const checkCircles = async (otherUserId = null, chatId = null) => {
  const session = await getServSession();

  if (otherUserId) {
    const user = await prisma.user.findFirst({
      where: { OR: [{ id: otherUserId }, { username: otherUserId }] },
      select: {
        connections: {
          include: {
            connections: {
              include: { connections: { include: { connections: true } } },
            },
          },
        },
      },
    });

    let arr2 = [];
    user?.connections?.map((i) =>
      i?.connections?.map((i2) => i2?.connections?.map((i3) => arr2?.push(i3)))
    );
    let arr1 = [];
    user?.connections?.map(
      (i) => i?.id === session?.user?.id && arr1?.push(i?.id)
    );
    let arr3 = [];
    arr2?.map((i) => i?.id === session?.user?.id && arr3?.push(i?.id));

    const isFirstCircle = arr1;
    const isSecondCircle = user?.connections
      ?.map((i2) => i2?.connections?.map((i) => i?.id === session?.user?.id))
      ?.map((i) => i?.find((i2) => i2 === true));
    const isThirdCircle = arr3;

    return {
      circle:
        isFirstCircle?.length > 0
          ? ""
          : isSecondCircle?.find((i2) => i2 === true)
          ? "pitch"
          : isThirdCircle?.length > 0
          ? "superpitch"
          : "superpitch",
    };
  } else {
    const chat = await prisma.Chat.findUnique({
      where: { id: chatId },
      select: {
        participants: {
          select: {
            id: true,
          },
          where: {
            NOT: { id: session?.user?.id },
          },
        },
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: chat?.participants[0].id },
          { username: chat?.participants[0].id },
        ],
      },
      select: {
        connections: {
          include: {
            connections: {
              include: { connections: { include: { connections: true } } },
            },
          },
        },
      },
    });

    let arr2 = [];
    user?.connections?.map((i) =>
      i?.connections?.map((i2) => i2?.connections?.map((i3) => arr2?.push(i3)))
    );
    let arr1 = [];
    user?.connections?.map(
      (i) => i?.id === session?.user?.id && arr1?.push(i?.id)
    );
    let arr3 = [];
    arr2?.map((i) => i?.id === session?.user?.id && arr3?.push(i?.id));

    const isFirstCircle = arr1;
    const isSecondCircle = user?.connections
      ?.map((i2) => i2?.connections?.map((i) => i?.id === session?.user?.id))
      ?.map((i) => i?.find((i2) => i2 === true));
    const isThirdCircle = arr3;

    return {
      circle:
        isFirstCircle?.length > 0
          ? ""
          : isSecondCircle?.find((i2) => i2 === true)
          ? "pitch"
          : isThirdCircle?.length > 0
          ? "superpitch"
          : "superpitch",
    };
  }
};
