"use server";

import { prisma } from "../../db";

export const changeReplyStatus = async (vacRepId, status, msgId) => {
  console.log(vacRepId, "ochello");

  const vacId = await prisma.VacancyReply.update({
    where: { id: vacRepId },
    data: {
      status: status,
    },
  });

  console.log(msgId, "samogon");

  if (status === "declined")
    await prisma.Message.update({
      where: { id: msgId },
      data: {
        type: "vacancyReplyDeclined",
      },
    });
};
