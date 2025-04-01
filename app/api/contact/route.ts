import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // 필수 데이터 검증
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "유효하지 않은 이메일 주소입니다." },
        { status: 400 }
      );
    }

    // 트랜스포터 설정 (실제 SMTP 또는 메일 서비스 정보로 대체)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER || "vivian.choooi@gmail.com", // .env 파일에서 사용자 정보를 가져옵니다
        pass: process.env.EMAIL_PASS || "", // 실제 사용할 때는 .env에 비밀번호 설정
      },
    });

    // 이메일 전송 설정
    const mailOptions = {
      from: `${name} <${email}>`,
      to: "vivian.choooi@gmail.com", // 수신할 이메일 주소
      subject: `[MySkinMetrix 문의] ${subject || '일반 문의'}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0891b2; margin-bottom: 16px;">MySkinMetrix 새 문의가 도착했습니다</h2>
          <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
            <strong style="display: block; margin-bottom: 4px;">이름:</strong>
            <p style="margin: 0; color: #334155;">${name}</p>
          </div>
          <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
            <strong style="display: block; margin-bottom: 4px;">이메일:</strong>
            <p style="margin: 0; color: #334155;">${email}</p>
          </div>
          <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
            <strong style="display: block; margin-bottom: 4px;">문의 유형:</strong>
            <p style="margin: 0; color: #334155;">${subject || '일반 문의'}</p>
          </div>
          <div style="margin-bottom: 16px;">
            <strong style="display: block; margin-bottom: 4px;">문의 내용:</strong>
            <p style="margin: 0; color: #334155; white-space: pre-line;">${message}</p>
          </div>
        </div>
      `,
    };

    // 자동 응답 이메일 설정 (문의자에게 전송)
    const autoReplyOptions = {
      from: `MySkinMetrix <vivian.choooi@gmail.com>`,
      to: email,
      subject: `[MySkinMetrix] 문의가 접수되었습니다`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0891b2; margin-bottom: 16px;">MySkinMetrix 문의가 접수되었습니다</h2>
          <p style="margin-bottom: 16px; color: #334155;">안녕하세요, ${name}님!</p>
          <p style="margin-bottom: 16px; color: #334155;">
            문의해주셔서 감사합니다. 귀하의 문의가 성공적으로 접수되었습니다.
            최대한 빠르게 답변 드리겠습니다.
          </p>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              이 이메일은 자동으로 발송되었습니다. 회신하지 마세요.
            </p>
          </div>
        </div>
      `,
    };

    try {
      // 이메일 전송
      await transporter.sendMail(mailOptions);
      
      // 자동 응답 이메일 전송
      await transporter.sendMail(autoReplyOptions);
      
      return NextResponse.json(
        { success: true, message: "문의가 성공적으로 전송되었습니다." },
        { status: 200 }
      );
    } catch (error) {
      console.error("이메일 전송 오류:", error);
      
      // 개발 환경에서는 성공으로 처리 (실제 이메일 전송 없이)
      if (process.env.NODE_ENV === "development") {
        return NextResponse.json(
          { 
            success: true, 
            message: "개발 환경: 이메일 전송이 시뮬레이션되었습니다.",
            dev: true
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { success: false, message: "이메일 전송 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("요청 처리 오류:", error);
    return NextResponse.json(
      { success: false, message: "요청을 처리하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 