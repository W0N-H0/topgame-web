import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { information } from "@/const/information.const";

export type EmailData = {
  name: string;
  contact: string;
  company: string;
  item: string;
  address: string;
  addressDetail: string;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.NEXT_PUBLIC_AUTH_USER, // 지메일 아이디
    pass: process.env.NEXT_PUBLIC_AUTH_PASS, // 지메일 패스워드
  },
});

export async function POST(request: NextRequest) {
  const rawBody = await request.text(); // 스트림을 읽어서 문자열로 변환
  const body = JSON.parse(rawBody); // 문자열을 파싱해서 객체로 변환
  const { name, contact, company, item, address, addressDetail } =
    body as EmailData;

  const mailData = {
    to: information.mail,
    subject: `${name}(${company})님의 상담신청`,
    html: `
      <h1>신청자: ${name}(${company})</h1>
      <br></br>
      <div>품목: ${item}</div>
      <p>문의자 연락처: ${contact}</p>
      <p>문의자 주소: ${address} ${addressDetail}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailData);
    // console.log("Message sent: %s", info.messageId);
    return NextResponse.json({ success: true, messageId: info });
  } catch (error) {
    // console.error("Error sending email:", error);
    return { success: false, error: error };
  }
}
