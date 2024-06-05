"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";
import { getPitchesCount } from "../pitches/getPitchesCount";
import { firstTime, setFirstTime } from "../profile/firstTime";
import { checkCircles } from "./checkCircles";

export const createChat = async (otherId, message) => {
  const session = await getServSession();

  const circle = await checkCircles(otherId);
  const count = await getPitchesCount(circle.circle, false);

  const userBonuses = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      bonusPitch: true,
      bonusSuperPitch: true,
    },
  });

  if (count < 1 && circle.circle !== "") {
    if (circle.circle === "pitch" && userBonuses.bonusPitch < 1)
      return { status: "error", type: circle.circle };
    else if (circle.circle === "superpitch" && userBonuses.bonusSuperPitch < 1)
      return { status: "error", type: circle.circle };
    else if (circle.circle === "pitch" && userBonuses.bonusPitch >= 1)
      await prisma.user.update({
        where: { id: session?.user?.id },
        data: { bonusPitch: { increment: -1 } },
      });
    else if (circle.circle === "superpitch" && userBonuses.bonusSuperPitch >= 1)
      await prisma.user.update({
        where: { id: session?.user?.id },
        data: { bonusSuperPitch: { increment: -1 } },
      });
    else return { status: "error", type: circle.circle };
  }

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

  let isFirst = await firstTime();
  if (
    isFirst === true &&
    (circle?.circle === "pitch" || circle?.circle === "superpitch")
  ) {
    await setFirstTime();
  }

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
