"use server";

import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import Letter from "./EmailVerifyForKolya";

export const sendFeedBack = async (compName, compId, compUserName) => {
  const emailHtml = render(
    <Letter
      compName={compName}
      url={process.env.NEXTAUTH_URL + "/companyprofile/" + compUserName}
      comId={compId}
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
    to: "practicacheck.docs@yandex.com",
    subject: "Верификация компании",
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
};
