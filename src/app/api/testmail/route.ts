import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const GET = async (req: NextRequest) => {
  const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: "unix",
    path: "/usr/sbin/sendmail", // your local MTA binary
  });

  const mail = await transporter.sendMail({
    from: "noreply@jatin.softwarelelo.in",
    to: "rathorjatin70@gmail.com",
    subject: "Test",
    text: "Hello from nodemailer via local MTA!",
  });
  console.log(mail);
  return NextResponse.json({
    message: "success",
  });
};
