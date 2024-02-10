"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";
import uuid from "react-uuid";
import { sendMailFunc } from "./sendMailFunc";

export const checkUnique = async (mail) => {
  const isUnique = await prisma.User.findUnique({
    where: { email: mail?.toLowerCase() },
  });

  if (isUnique?.id) return { status: "error", message: "unique" };

  const session = await getServSession();
  const token = uuid();

  const setToken = await prisma.User.update({
    where: { id: session?.user?.id },
    data: { tokenForMail: token },
  });

  await sendMailFunc(mail, token);

  return { status: "good" };
};
