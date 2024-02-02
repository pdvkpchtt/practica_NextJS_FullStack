"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";
import { getPitchesCount } from "../pitches/getPitchesCount";
import { firstTime, setFirstTime } from "../profile/firstTime";
import { checkCircles } from "./checkCircles";

const sendMessage = async (input, chatId, emptyType = false) => {
  const session = await getServSession();

  const circle = await checkCircles(null, chatId);
  console.log(circle, "fuck messenger");
  var d = new Date();
  d.setDate(d.getDate() - 4);

  var d2 = new Date();
  d2.setDate(d2.getDate() - 6);

  const check = await prisma.message.findFirst({
    where: {
      AND: [
        { chatId: chatId },
        { type: emptyType === true ? "" : circle.circle },
        { createdAt: { gte: new Date(d.toString()).toISOString() } },
      ],
    },
    select: { id: true },
  });

  const checkVacReply = await prisma.message.findFirst({
    where: {
      AND: [
        { chatId: chatId },
        { type: emptyType === true ? "" : "vacancyReply" },
        { createdAt: { gte: new Date(d2.toString()).toISOString() } },
      ],
    },
    select: { id: true, type: true },
  });

  const count = await getPitchesCount(circle.circle);
  if (
    count < 1 &&
    !check?.id &&
    !checkVacReply?.id &&
    circle?.status !== "1-ый"
  )
    return { status: "error", type: circle.circle };

  if (check?.id || checkVacReply?.id) {
    // :)
  } else {
    let isFirst = await firstTime();
    if (
      isFirst === true &&
      (circle?.circle === "pitch" || circle?.circle === "superpitch")
    ) {
      await setFirstTime();
    }
  }

  const message = await prisma.message.create({
    data: {
      text: input,
      unRead: true,
      type:
        emptyType === true
          ? ""
          : check?.id || checkVacReply?.id
          ? ""
          : circle.circle,
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
