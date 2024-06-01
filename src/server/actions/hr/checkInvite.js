"use server";

import { prisma } from "../../db";

export const checkInvite = async (id, email) => {
  const data = await prisma.Invite.findUnique({
    where: { id: id },
    select: { company: { select: { id: true } }, email: true },
  });

  if (!data) return { status: false };
  if (data.email !== email) return { status: false };

  return { status: true, company: data.company.id };
};
