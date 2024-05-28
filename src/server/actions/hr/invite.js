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
  const new_hr_emailHtml = render(
    <Email
      url={`${process.env.NEXTAUTH_URL}/auth?hrtoken=${token}&company=${compId}`}
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
    to: email,
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
      email: email,
    },
  });

  // если пользователь не зареган
  if (!invitedUser[0]?.id) {
    const new_hr_mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Приглашение",
      html: new_hr_emailHtml,
    };
    console.log(email);
    await transporter.sendMail(new_hr_mailOptions);

    return "good";
  }
  // если пользователь не зареган
  if (invitedUser[0]?.id === session?.user?.id)
    return { status: "error", message: "userMe" };

  const existingHr = await prisma.Hr.findMany({
    select: {
      userId: true,
      dataVerified: true,
    },
    where: {
      AND: [
        {
          userId: invitedUser[0].id,
        },
        {
          companyId: compId,
        },
      ],
    },
  });

  console.log(invitedUser, existingHr, "jiii");

  if (invitedUser.length !== 0) {
    await transporter.sendMail(mailOptions);

    if (existingHr[0]?.userId) {
      return { status: "error", message: "userAlready" };
    }

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
