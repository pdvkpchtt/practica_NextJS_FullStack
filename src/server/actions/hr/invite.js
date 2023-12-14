"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";
import { uuid } from "uuidv4";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import Email from "./Email";

export const invite = async (email, compId, compName) => {
  // email sending
  const session = await getServSession();

  const token = uuid();
  const emailHtml = render(
    <Email
      url={`${process.env.NEXTAUTH_URL}/api/hr/verify?token=${token}`}
      compName={compName}
    />
  );

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email.toLowerCase(),
    subject: "Приглашение",
    html: emailHtml,
  };
  // email sending

  // creating hr
  const invitedUser = await prisma.user.findMany({
    select: {
      id: true,
    },
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!invitedUser[0]?.id) return { status: "error", message: "userExist" };
  if (invitedUser[0]?.id === session?.user?.id)
    return { status: "error", message: "userMe" };

  const existingHr = await prisma.Hr.findMany({
    select: {
      userId: true,
    },
    where: {
      userId: invitedUser[0].id,
    },
  });

  if (existingHr[0]?.id) return { status: "error", message: "userHr" };

  console.log(invitedUser, existingHr, "jiii");
  // console.log(existingHr, "jopa2");

  if (invitedUser.length !== 0 && existingHr.length === 0) {
    await transporter.sendMail(mailOptions);

    const data = await prisma.Hr.create({
      data: {
        user: { connect: { id: invitedUser[0].id } },
        company: {
          connect: {
            id: compId,
          },
        },
        token: token,
      },
      select: {
        token: true,
      },
    });

    return data?.token === token;
  }
  // creating hr
};
