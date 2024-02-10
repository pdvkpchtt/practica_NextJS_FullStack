"use server";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import Email from "./Email";

export const sendMailFunc = async (email, token = "") => {
  // email sending
  const emailHtml = render(
    <Email
      url={`${process.env.NEXTAUTH_URL}/api/newmail?token=${token}&email=${email}`}
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
    subject: "Подтверждение почты",
    html: emailHtml,
  };
  // email sending

  await transporter.sendMail(mailOptions);
};
