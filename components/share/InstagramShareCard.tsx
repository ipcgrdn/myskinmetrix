import toast from "react-hot-toast";
import QRCode from "qrcode";
import Image from "next/image";
import { useState } from "react";

// 인스타그램 스토리 공유를 위한 컴포넌트 Props
interface InstagramShareCardProps {
  skinType: string;
  scores: {
    name: string;
    value: number;
  }[];
}

// 디자인 스타일 타입
type DesignStyle = "pastel" | "neon";

export default function InstagramShareCard({
  skinType,
  scores,
}: InstagramShareCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  // 커스텀 토스트 스타일
  const toastStyle = {
    borderRadius: "12px",
    background: "#ffffff",
    color: "#334155",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "12px 16px",
    fontWeight: "500",
    fontSize: "14px",
  };

  // 인스타그램 공유 처리
  const handleInstagramShare = async (style: DesignStyle) => {
    if (isGenerating) return;

    // 토스트 ID
    const toastId = "instagram-share";

    try {
      setIsGenerating(true);

      // 로딩 토스트
      toast.loading(
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500" />
          <span>인스타그램 공유 이미지 생성 중...</span>
        </div>,
        { id: toastId, style: toastStyle, duration: 5000 }
      );

      // QR 코드 생성
      const qrCodeDataUrl = await QRCode.toDataURL(
        "https://myskinmetrix.vercel.app",
        {
          width: 180,
          margin: 1,
          color: {
            dark: style === "neon" ? "#FFFFFF" : "#1F2937",
            light: "#00000000", // transparent background
          },
        }
      );

      // QR 코드 이미지 로드
      const qrImage = new window.Image();
      await new Promise<void>((resolve, reject) => {
        qrImage.onload = () => resolve();
        qrImage.onerror = reject;
        qrImage.src = qrCodeDataUrl;
      });

      // 캔버스 직접 생성
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("캔버스 컨텍스트를 생성할 수 없습니다");
      }

      if (style === "neon") {
        // ----- 사이버펑크/메탈릭 스타일 디자인 적용 -----

        // 사이버펑크 스타일 그라데이션 배경
        const bgGradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        bgGradient.addColorStop(0, "#050A30"); // 딥 네이비
        bgGradient.addColorStop(0.4, "#132052"); // 다크 블루
        bgGradient.addColorStop(0.8, "#0C1E4E"); // 미드나잇 블루
        bgGradient.addColorStop(1, "#061539"); // 딥 블루
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 메탈릭 질감을 위한 오버레이
        const overlayGradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height * 0.5
        );
        overlayGradient.addColorStop(0, "rgba(100, 220, 255, 0.05)");
        overlayGradient.addColorStop(0.5, "rgba(200, 255, 255, 0.03)");
        overlayGradient.addColorStop(1, "rgba(100, 220, 255, 0.05)");
        ctx.fillStyle = overlayGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 사이버펑크 스타일의 기하학적 요소 추가
        // 네온 서클
        ctx.fillStyle = "rgba(0, 255, 255, 0.08)";
        ctx.beginPath();
        ctx.arc(
          canvas.width * 0.8,
          canvas.height * 0.2,
          canvas.width * 0.4,
          0,
          2 * Math.PI
        );
        ctx.fill();

        // 네온 라인 추가
        ctx.strokeStyle = "rgba(255, 0, 255, 0.1)";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.3);
        ctx.lineTo(canvas.width, canvas.height * 0.3);
        ctx.stroke();

        ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.32);
        ctx.lineTo(canvas.width, canvas.height * 0.32);
        ctx.stroke();

        // ----- 메인 콘텐츠 영역 -----

        // 여백 계산
        const contentPadding = canvas.width * 0.08;
        const cardWidth = canvas.width - contentPadding * 2;

        // 상단 로고 영역 - 메탈릭 효과 추가
        const headerY = canvas.height * 0.12;

        // 로고 텍스트 (네온 효과 적용)
        ctx.textAlign = "center";

        // 텍스트 그림자 효과
        ctx.shadowColor = "#00FFFF";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.font =
          "900 68px SF Pro Display, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("MY SKIN METRIX", canvas.width / 2, headerY);

        // 그림자 초기화
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        // 서브 헤딩
        ctx.font =
          "500 28px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fillText("AI 피부 분석 결과", canvas.width / 2, headerY + 60);

        // 날짜 추가 (메탈릭 스타일)
        const today = new Date();
        const formattedDate = `${today.getFullYear()}.${String(
          today.getMonth() + 1
        ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
        ctx.font =
          "400 22px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "rgba(150, 200, 255, 0.8)";
        ctx.fillText(formattedDate, canvas.width / 2, headerY + 100);

        // 피부 타입 섹션 - 사이버펑크 스타일로 강조
        const typeY = headerY + 180;

        // 도입 문구
        ctx.font =
          "500 28px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("나의 피부 타입", canvas.width / 2, typeY);

        // 피부 타입 값 - 네온 효과 적용
        ctx.shadowColor = "#00FFFF";
        ctx.shadowBlur = 20;
        ctx.fillStyle = "#FFFFFF";
        ctx.font =
          "900 100px SF Pro Display, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillText(skinType, canvas.width / 2, typeY + 120);
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        // 구분 요소 (네온 스타일 점)
        ctx.fillStyle = "#00FFFF";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, typeY + 160, 5, 0, 2 * Math.PI);
        ctx.fill();

        // 점수 그리드 섹션 - 메탈릭/사이버펑크 스타일
        const scores4 = scores.slice(0, 4);
        const gridStartY = typeY + 220;
        const itemHeight = 100;
        const itemSpacing = 25;
        const itemWidth = cardWidth;

        // 점수 항목들 - 가독성 개선
        scores4.forEach((score, index) => {
          const itemY = gridStartY + (itemHeight + itemSpacing) * index;

          // 항목명 (왼쪽 정렬, 가독성 개선)
          ctx.font =
            "600 30px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
          ctx.textAlign = "left";
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(score.name, contentPadding, itemY);

          // 점수값 (오른쪽 정렬, 네온 효과 추가)
          const scoreValue = Math.round(score.value);
          ctx.font =
            "700 45px SF Pro Display, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
          ctx.textAlign = "right";

          // 점수값 네온 효과
          ctx.shadowColor = "#00FFFF";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(`${scoreValue}`, canvas.width - contentPadding, itemY);
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;

          // 게이지 배경 (가독성 개선, 두께 증가)
          const gaugeY = itemY + 35;
          const gaugeHeight = 10; // 두께 증가
          const gaugeWidth = itemWidth;
          const gaugeX = contentPadding;

          ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
          roundRect(
            ctx,
            gaugeX,
            gaugeY,
            gaugeWidth,
            gaugeHeight,
            gaugeHeight / 2
          );

          // 게이지 채우기 (네온 색상)
          const fillWidth = (scoreValue / 100) * gaugeWidth;

          // 네온 색상 적용한 그라데이션
          const colors = [
            ["#00FFFF", "#0EA5E9"], // 사이언/블루
            ["#FF00FF", "#E879F9"], // 마젠타/퍼플
            ["#00FF99", "#10B981"], // 네온 그린
            ["#FFD700", "#F59E0B"], // 골드/앰버
          ];

          const gaugeGradient = ctx.createLinearGradient(
            gaugeX,
            gaugeY,
            gaugeX + fillWidth,
            gaugeY
          );

          gaugeGradient.addColorStop(0, colors[index][0]);
          gaugeGradient.addColorStop(1, colors[index][1]);

          // 게이지 네온 효과
          ctx.shadowColor = colors[index][0];
          ctx.shadowBlur = 8;
          ctx.fillStyle = gaugeGradient;
          roundRect(
            ctx,
            gaugeX,
            gaugeY,
            fillWidth,
            gaugeHeight,
            gaugeHeight / 2
          );
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        });

        // 하단 CTA 영역
        const ctaY = canvas.height - 380;

        // CTA 배경 (미묘한 사이버펑크 느낌의 버튼)
        const ctaBtnWidth = cardWidth * 0.7;
        const ctaBtnHeight = 70;
        const ctaBtnX = canvas.width / 2 - ctaBtnWidth / 2;
        const ctaBtnY = ctaY - 20;

        // 버튼 배경 그라데이션
        const ctaGradient = ctx.createLinearGradient(
          ctaBtnX,
          ctaBtnY,
          ctaBtnX + ctaBtnWidth,
          ctaBtnY + ctaBtnHeight
        );
        ctaGradient.addColorStop(0, "rgba(0, 200, 255, 0.2)");
        ctaGradient.addColorStop(1, "rgba(0, 80, 255, 0.1)");

        // 버튼 네온 효과
        ctx.shadowColor = "rgba(0, 200, 255, 0.5)";
        ctx.shadowBlur = 15;
        ctx.fillStyle = ctaGradient;
        roundRect(ctx, ctaBtnX, ctaBtnY, ctaBtnWidth, ctaBtnHeight, 35);
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        // 네온 테두리
        ctx.strokeStyle = "rgba(0, 255, 255, 0.4)";
        ctx.lineWidth = 1.5;
        roundRect(ctx, ctaBtnX, ctaBtnY, ctaBtnWidth, ctaBtnHeight, 35, true);

        // CTA 텍스트 (네온 효과)
        ctx.font =
          "700 32px SF Pro Display, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "center";
        ctx.shadowColor = "#00FFFF";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(
          "나도 피부 분석 받아보기",
          canvas.width / 2,
          ctaY + ctaBtnHeight / 3 + 5
        );
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        // URL 표시 (미니멀하게)
        ctx.font =
          "500 26px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "rgba(150, 200, 255, 0.9)";
        ctx.fillText("myskinmetrix.vercel.app", canvas.width / 2, ctaY + 100);

        // QR 코드 추가 (네온 효과 적용)
        ctx.save();
        ctx.shadowColor = "#00FFFF";
        ctx.shadowBlur = 15;
        ctx.drawImage(
          qrImage,
          canvas.width / 2 - 90, // 중앙 정렬을 위해 QR 코드 너비의 절반을 뺌
          ctaY + 120, // URL 텍스트 아래에 위치
          180, // 너비
          180 // 높이
        );
        ctx.restore();

        // 푸터 위치 조정
        ctx.font =
          "400 18px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.textAlign = "center";
        ctx.fillText(
          "© My Skin Metrix 2024",
          canvas.width / 2,
          canvas.height - 30
        );
      } else {
        // ----- 글래스모피즘 스타일 디자인 적용 -----

        // 부드러운 그라데이션 배경
        const bgGradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        bgGradient.addColorStop(0, "#E8F5F8"); // 매우 연한 시안
        bgGradient.addColorStop(0.4, "#F0FAFF"); // 매우 연한 하늘색
        bgGradient.addColorStop(0.8, "#F8FDFF"); // 거의 흰색
        bgGradient.addColorStop(1, "#F0F9FF"); // 연한 하늘색
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 배경 패턴 - 부드러운 형태
        ctx.fillStyle = "rgba(6, 182, 212, 0.03)"; // 반투명 시안
        for (let i = 0; i < 5; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius =
            Math.random() * canvas.width * 0.4 + canvas.width * 0.1;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
        }

        // 브랜드 특성 곡선 추가
        ctx.strokeStyle = "rgba(6, 182, 212, 0.08)";
        ctx.lineWidth = 40;
        ctx.beginPath();
        ctx.arc(
          canvas.width * 0.5,
          canvas.height * 0.4,
          canvas.width * 0.7,
          Math.PI * 1.2,
          Math.PI * 1.8
        );
        ctx.stroke();

        ctx.strokeStyle = "rgba(8, 145, 178, 0.05)";
        ctx.lineWidth = 25;
        ctx.beginPath();
        ctx.arc(
          canvas.width * 0.2,
          canvas.height * 0.8,
          canvas.width * 0.6,
          Math.PI * 0.1,
          Math.PI * 0.6
        );
        ctx.stroke();

        // ----- 메인 콘텐츠 영역 -----

        // 여백 계산
        const contentPadding = canvas.width * 0.08;
        const cardWidth = canvas.width - contentPadding * 2;

        // 상단 로고 영역 - 브랜드 컬러 적용
        const headerY = canvas.height * 0.12;

        // 로고 텍스트
        ctx.textAlign = "center";
        ctx.font =
          "900 68px SF Pro Display, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "#0891B2"; // 브랜드 시안 컬러
        ctx.fillText("MY SKIN METRIX", canvas.width / 2, headerY);

        // 서브 헤딩
        ctx.font =
          "500 28px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "#0E7490";
        ctx.fillText("AI 피부 분석 결과", canvas.width / 2, headerY + 60);

        // 날짜 추가
        const today = new Date();
        const formattedDate = `${today.getFullYear()}.${String(
          today.getMonth() + 1
        ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
        ctx.font =
          "400 22px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "#64748B"; // 슬레이트 컬러
        ctx.fillText(formattedDate, canvas.width / 2, headerY + 100);

        // ----- 메인 카드 영역 - 글래스모피즘 효과 -----
        const cardY = headerY + 140;
        const cardHeight = canvas.height * 0.6;
        const cardRadius = 40;

        // 카드 그림자 (글래스모피즘 효과를 위한 다중 그림자)
        ctx.shadowColor = "rgba(0, 0, 0, 0.06)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 20;

        // 카드 배경 - 글래스모피즘
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        roundRect(
          ctx,
          contentPadding,
          cardY,
          cardWidth,
          cardHeight,
          cardRadius
        );

        // 그림자 초기화
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // 카드 스트로크 - 글래스 효과
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 1;
        roundRect(
          ctx,
          contentPadding,
          cardY,
          cardWidth,
          cardHeight,
          cardRadius,
          true
        );

        // 카드 하이라이트 - 상단 엣지
        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(
          contentPadding + cardRadius,
          cardY + cardRadius,
          cardRadius,
          Math.PI,
          Math.PI * 1.5
        );
        ctx.lineTo(contentPadding + cardWidth - cardRadius, cardY);
        ctx.arc(
          contentPadding + cardWidth - cardRadius,
          cardY + cardRadius,
          cardRadius,
          Math.PI * 1.5,
          Math.PI * 2
        );
        ctx.stroke();

        // 피부 타입 섹션
        const typeY = cardY + 80;

        // 도입 문구
        ctx.font =
          "500 28px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "#334155"; // 슬레이트
        ctx.fillText("나의 피부 타입", canvas.width / 2, typeY);

        // 피부 타입 값 - 큰 폰트와 브랜드 컬러
        ctx.font =
          "900 100px SF Pro Display, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";

        // 그라데이션 텍스트
        const typeGradient = ctx.createLinearGradient(
          canvas.width / 2 - 150,
          typeY + 60,
          canvas.width / 2 + 150,
          typeY + 120
        );
        typeGradient.addColorStop(0, "#0891B2"); // 시안
        typeGradient.addColorStop(1, "#0EA5E9"); // 스카이 블루

        ctx.fillStyle = typeGradient;
        ctx.fillText(skinType, canvas.width / 2, typeY + 120);

        // 구분선 - 미니멀 라인
        ctx.strokeStyle = "rgba(14, 116, 144, 0.2)"; // 반투명 시안
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(contentPadding + cardWidth * 0.2, typeY + 160);
        ctx.lineTo(contentPadding + cardWidth * 0.8, typeY + 160);
        ctx.stroke();

        // 점수 그리드 섹션 - 미니멀 디자인
        const scores4 = scores.slice(0, 4);
        const gridStartY = typeY + 220;
        const itemHeight = 90;
        const itemSpacing = 25;
        const itemWidth = cardWidth * 0.85;
        const gridX = contentPadding + (cardWidth - itemWidth) / 2;

        // 점수 항목들 - 미니멀하고 깨끗한 디자인
        scores4.forEach((score, index) => {
          const itemY = gridStartY + (itemHeight + itemSpacing) * index;

          // 항목명 (왼쪽 정렬)
          ctx.font =
            "600 26px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
          ctx.textAlign = "left";
          ctx.fillStyle = "#334155"; // 슬레이트
          ctx.fillText(score.name, gridX, itemY);

          // 점수값 (오른쪽 정렬)
          const scoreValue = Math.round(score.value);
          ctx.font =
            "700 40px SF Pro Display, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
          ctx.textAlign = "right";
          ctx.fillStyle = "#0E7490"; // 다크 시안
          ctx.fillText(`${scoreValue}`, gridX + itemWidth, itemY);

          // 게이지 배경
          const gaugeY = itemY + 30;
          const gaugeHeight = 8;
          const gaugeWidth = itemWidth;
          const gaugeX = gridX;

          // 게이지 배경에 그림자 추가 (입체감)
          ctx.shadowColor = "rgba(0, 0, 0, 0.05)";
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 2;

          ctx.fillStyle = "rgba(226, 232, 240, 0.6)"; // 연한 슬레이트
          roundRect(
            ctx,
            gaugeX,
            gaugeY,
            gaugeWidth,
            gaugeHeight,
            gaugeHeight / 2
          );

          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;

          // 게이지 채우기
          const fillWidth = (scoreValue / 100) * gaugeWidth;

          // 각 항목별 브랜드 컬러 그라데이션
          const gradientColors = [
            ["#06B6D4", "#0EA5E9"], // 시안-스카이
            ["#06B6D4", "#0284C7"], // 시안-블루
            ["#0891B2", "#0EA5E9"], // 다크시안-스카이
            ["#0E7490", "#0284C7"], // 딥시안-블루
          ];

          const gaugeGradient = ctx.createLinearGradient(
            gaugeX,
            gaugeY,
            gaugeX + fillWidth,
            gaugeY
          );

          gaugeGradient.addColorStop(0, gradientColors[index][0]);
          gaugeGradient.addColorStop(1, gradientColors[index][1]);

          ctx.fillStyle = gaugeGradient;
          roundRect(
            ctx,
            gaugeX,
            gaugeY,
            fillWidth,
            gaugeHeight,
            gaugeHeight / 2
          );
        });

        // ----- 하단 CTA 영역 - 플로팅 버튼 스타일 -----
        const ctaY = canvas.height - 380;

        // CTA 버튼 - 글래스모피즘 스타일
        const ctaBtnWidth = cardWidth * 0.7;
        const ctaBtnHeight = 70;
        const ctaBtnX = canvas.width / 2 - ctaBtnWidth / 2;
        const ctaBtnY = ctaY - 20;

        // 그림자 효과 (플로팅 느낌)
        ctx.shadowColor = "rgba(6, 182, 212, 0.3)";
        ctx.shadowBlur = 25;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 8;

        // 버튼 배경 그라데이션
        const ctaGradient = ctx.createLinearGradient(
          ctaBtnX,
          ctaBtnY,
          ctaBtnX + ctaBtnWidth,
          ctaBtnY + ctaBtnHeight
        );
        ctaGradient.addColorStop(0, "#06B6D4"); // 시안
        ctaGradient.addColorStop(1, "#0891B2"); // 다크 시안

        ctx.fillStyle = ctaGradient;
        roundRect(ctx, ctaBtnX, ctaBtnY, ctaBtnWidth, ctaBtnHeight, 35);

        // 그림자 초기화
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        // CTA 텍스트
        ctx.font =
          "700 30px SF Pro Display, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(
          "나도 피부 분석 받아보기",
          canvas.width / 2,
          ctaBtnY + ctaBtnHeight / 2 + 10
        );

        // URL 표시
        ctx.font =
          "500 26px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "rgba(71, 85, 105, 0.9)";
        ctx.textAlign = "center";
        ctx.fillText("myskinmetrix.vercel.app", canvas.width / 2, ctaY + 100);

        // QR 코드 추가 (파스텔 스타일)
        ctx.drawImage(qrImage, canvas.width / 2 - 90, ctaY + 120, 180, 180);

        // 푸터 위치 조정
        ctx.font =
          "400 18px SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "rgba(71, 85, 105, 0.6)";
        ctx.textAlign = "center";
        ctx.fillText(
          "© My Skin Metrix 2024",
          canvas.width / 2,
          canvas.height - 30
        );
      }

      // 이미지 URL 생성
      const imageUrl = canvas.toDataURL("image/png");

      // 모바일 기기 감지
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

      // 이미지 저장 및 인스타그램 열기
      await saveImageToDevice(imageUrl, style, isMobile, isIOS, toastId);
    } catch (error) {
      console.error("인스타그램 공유 실패:", error);

      // 에러 토스트
      toast.error(
        <div className="flex items-center space-x-2">
          <div>
            <p className="font-semibold">공유 준비 실패</p>
            <p className="text-xs text-slate-500">잠시 후 다시 시도해주세요</p>
          </div>
        </div>,
        { id: toastId, style: toastStyle, duration: 3000 }
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // 디바이스에 이미지 저장 후 인스타그램 열기
  const saveImageToDevice = async (
    imageUrl: string,
    style: DesignStyle,
    isMobile: boolean,
    isIOS: boolean,
    toastId: string
  ) => {
    try {
      // 이미지 다운로드
      const fileName = `내_피부타입_${skinType.replace(
        /\s+/g,
        "_"
      )}_${style}.png`;

      if (isMobile) {
        // 모바일 브라우저 특성 파악
        const isChrome = /Chrome/i.test(navigator.userAgent);

        // 모바일에서는 Web Share API 시도 (Android의 Chrome과 최신 iOS에서 지원)
        if (navigator.share) {
          try {
            // Blob 생성
            const blob = await (await fetch(imageUrl)).blob();
            const file = new File([blob], fileName, { type: "image/png" });

            toast.loading("이미지 공유 준비 중...", {
              id: toastId,
              style: toastStyle,
            });

            // 공유 시트를 통해 저장 (files와 url 모두 제공)
            // iOS에서는 AirDrop이나 다른 앱으로의 공유가 가능하도록 url도 함께 제공
            const blobUrl = URL.createObjectURL(blob);

            try {
              // 파일 공유 우선 시도
              if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                  title: "내 피부 타입 분석 결과",
                  text: `내 피부 타입은 ${skinType}입니다!`,
                  files: [file],
                  url: window.location.href, // 현재 URL도 공유 (선택사항)
                });
              } else {
                // 파일 공유가 불가능한 경우 URL만 공유
                await navigator.share({
                  title: "내 피부 타입 분석 결과",
                  text: `내 피부 타입은 ${skinType}입니다!`,
                  url: window.location.href,
                });

                // URL만 공유한 경우에는 이미지 직접 다운로드도 제공
                const link = document.createElement("a");
                link.href = imageUrl;
                link.download = fileName;
                link.click();
              }

              // 성공 메시지 표시 (인스타그램으로 바로 이동하는 옵션 포함)
              toast.success(
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2 font-semibold">
                    <span>이미지가 공유되었습니다!</span>
                  </div>
                  <p className="text-xs mt-1 text-slate-500">
                    이미지를 인스타그램에 공유하시겠습니까?
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => {
                        try {
                          window.location.href = "instagram://story-camera";
                        } catch (error) {
                          console.error("인스타그램 앱 열기 실패:", error);
                        }
                      }}
                      className="px-4 py-1 bg-gradient-to-r from-rose-400 to-orange-400 text-white text-sm rounded-full shadow-sm hover:shadow-md transition-all flex-1"
                    >
                      인스타그램 스토리 열기
                    </button>
                    <button
                      onClick={() => {
                        toast.dismiss(toastId);
                      }}
                      className="px-4 py-1 bg-slate-200 text-slate-700 text-sm rounded-full shadow-sm hover:shadow-md transition-all"
                    >
                      닫기
                    </button>
                  </div>
                </div>,
                { id: toastId, style: toastStyle, duration: 8000 }
              );

              // Blob URL 해제
              URL.revokeObjectURL(blobUrl);
            } catch (error) {
              console.warn("Web Share API 공유 실패:", error);
              // Web Share API 실패 시 fallback 메커니즘 제공

              // 일반 다운로드 링크 제공
              const link = document.createElement("a");
              link.href = imageUrl;
              link.download = fileName;
              link.click();

              // 사용자에게 알림
              toast.success(
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2 font-semibold">
                    <span>이미지가 저장되었습니다!</span>
                  </div>
                  <p className="text-xs mt-1 text-slate-500">
                    이미지를 인스타그램 스토리에 업로드해보세요
                  </p>
                  <button
                    onClick={() => {
                      try {
                        window.location.href = "instagram://story-camera";
                      } catch (error) {
                        console.error("인스타그램 앱 열기 실패:", error);
                      }
                    }}
                    className="mt-2 px-4 py-1 bg-gradient-to-r from-rose-400 to-orange-400 text-white text-sm rounded-full shadow-sm hover:shadow-md transition-all"
                  >
                    인스타그램 스토리 열기
                  </button>
                </div>,
                { id: toastId, style: toastStyle, duration: 8000 }
              );

              // Blob URL 해제
              URL.revokeObjectURL(blobUrl);
            }

            // Web Share API 시도 이후에도 계속 진행할 수 있도록
            // 여기에 return을 제거했습니다.
          } catch (error) {
            console.warn("Web Share API 초기화 실패:", error);
            // 실패 시 기본 방법으로 진행
          }
        }

        // Web Share API 실패 또는 지원되지 않는 경우
        if (isIOS) {
          // iOS에서는 이미지를 길게 누르도록 안내
          toast.success(
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 font-semibold">
                <span>이미지를 저장하려면:</span>
              </div>
              <p className="text-xs mt-1 text-slate-500">
                1. 아래 이미지를 길게 터치하세요
              </p>
              <p className="text-xs mt-1 text-slate-500">
                2. &quot;사진에 추가&quot; 옵션을 선택하세요
              </p>
              <div className="mt-2 flex justify-center">
                <Image
                  src={imageUrl}
                  alt="결과 이미지"
                  width={300}
                  height={500}
                  className="w-3/4 h-auto rounded-md shadow-sm"
                  unoptimized
                />
              </div>
              <button
                onClick={() => {
                  try {
                    window.location.href = "instagram://story-camera";
                  } catch (error) {
                    console.error("인스타그램 앱 열기 실패:", error);
                  }
                }}
                className="mt-3 px-4 py-1 bg-gradient-to-r from-rose-400 to-orange-400 text-white text-sm rounded-full shadow-sm hover:shadow-md transition-all"
              >
                이미지 저장 후 인스타그램 열기
              </button>
            </div>,
            { id: toastId, style: toastStyle, duration: 15000 }
          );
        } else {
          // Android에서는 DownloadManager를 사용
          try {
            // 안드로이드 전용 다운로드 로직
            toast.loading("이미지 저장 중...", {
              id: toastId,
              style: toastStyle,
            });

            if (isChrome) {
              // Chrome에서는 a 태그로 다운로드 시도
              const link = document.createElement("a");
              link.href = imageUrl;
              link.download = fileName;
              link.click();

              // 성공 메시지와 인스타그램 버튼 표시
              toast.success(
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2 font-semibold">
                    <span>이미지가 저장되었습니다!</span>
                  </div>
                  <p className="text-xs mt-1 text-slate-500">
                    갤러리에서 이미지를 확인하세요
                  </p>
                  <button
                    onClick={() => {
                      try {
                        window.location.href = "instagram://story-camera";
                      } catch (error) {
                        console.error("인스타그램 앱 열기 실패:", error);
                      }
                    }}
                    className="mt-2 px-4 py-1 bg-gradient-to-r from-rose-400 to-orange-400 text-white text-sm rounded-full shadow-sm hover:shadow-md transition-all"
                  >
                    인스타그램 스토리 열기
                  </button>
                </div>,
                { id: toastId, style: toastStyle, duration: 8000 }
              );
            } else {
              // fetch를 사용하여 이미지를 가져오고 blob URL 생성
              fetch(imageUrl)
                .then((response) => response.blob())
                .then((blob) => {
                  // blob URL 생성
                  const blobUrl = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = blobUrl;
                  link.download = fileName;
                  link.click();

                  // blob URL 해제
                  URL.revokeObjectURL(blobUrl);

                  // 성공 메시지와 인스타그램 버튼 표시
                  toast.success(
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2 font-semibold">
                        <span>이미지가 저장되었습니다!</span>
                      </div>
                      <p className="text-xs mt-1 text-slate-500">
                        갤러리에서 이미지를 확인하세요
                      </p>
                      <button
                        onClick={() => {
                          try {
                            window.location.href = "instagram://story-camera";
                          } catch (error) {
                            console.error("인스타그램 앱 열기 실패:", error);
                          }
                        }}
                        className="mt-2 px-4 py-1 bg-gradient-to-r from-rose-400 to-orange-400 text-white text-sm rounded-full shadow-sm hover:shadow-md transition-all"
                      >
                        인스타그램 스토리 열기
                      </button>
                    </div>,
                    { id: toastId, style: toastStyle, duration: 8000 }
                  );
                })
                .catch((error) => {
                  console.error("이미지 다운로드 실패:", error);
                  toast.error(
                    "이미지 저장에 실패했습니다. 스크린샷을 사용해보세요.",
                    { id: toastId, style: toastStyle }
                  );
                });
            }
          } catch (error) {
            console.error("이미지 다운로드 실패:", error);
            toast.error(
              "이미지 저장에 실패했습니다. 스크린샷을 사용해보세요.",
              { id: toastId, style: toastStyle }
            );
          }
        }
      } else {
        // 데스크톱에서는 다운로드만 실행하고 이동하지 않음
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = fileName;
        link.click();

        // 성공 토스트 (데스크톱) - 안내 메시지만 표시
        toast.success(
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 font-semibold">
              <span>이미지가 저장되었습니다!</span>
            </div>
            <p className="text-xs mt-1 text-slate-500">
              인스타그램에서 저장된 이미지를 스토리에 업로드해보세요
            </p>
          </div>,
          { id: toastId, style: toastStyle, duration: 4000 }
        );
      }
    } catch (error) {
      console.error("이미지 저장 실패:", error);

      // 에러 토스트
      toast.error(
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 font-semibold">
            <span>이미지 저장 실패</span>
          </div>
          <p className="text-xs mt-1 text-slate-500">
            잠시 후 다시 시도해주세요
          </p>
        </div>,
        { id: toastId, style: toastStyle, duration: 3000 }
      );
    }
  };

  // 둥근 사각형 그리기 함수
  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    stroke = false
  ) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
      ctx.stroke();
    } else {
      ctx.fill();
    }
  }
  return (
    <div className="w-full flex flex-col md:flex-row gap-2">
      {/* 파스텔 스타일 공유 버튼 */}
      <button
        onClick={() => handleInstagramShare("pastel")}
        disabled={isGenerating}
        className="w-full py-3 px-4 flex items-center justify-center gap-2 font-medium text-slate-800 rounded-xl shadow-md bg-gradient-to-r from-pink-300 to-purple-300 text-xs md:text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-300"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path
            d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8688 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.01875 7.05469 0.075C5.77969 0.13125 4.90313 0.33281 4.14375 0.63C3.35156 0.9375 2.68125 1.35469 2.01563 2.01563C1.35469 2.68125 0.9375 3.35156 0.63 4.14375C0.33281 4.90313 0.13125 5.77969 0.075 7.05469C0.01875 8.33438 0 8.74219 0 12C0 15.2578 0.01875 15.6656 0.075 16.9453C0.13125 18.2203 0.33281 19.0969 0.63 19.8563C0.9375 20.6484 1.35469 21.3188 2.01563 21.9844C2.68125 22.6406 3.35156 23.0625 4.14375 23.37C4.90313 23.6672 5.77969 23.8688 7.05469 23.925C8.33438 23.9813 8.74219 24 12 24C15.2578 24 15.6656 23.9813 16.9453 23.925C18.2203 23.8688 19.0969 23.6672 19.8563 23.37C20.6484 23.0625 21.3188 22.6453 21.9844 21.9844C22.6406 21.3188 23.0625 20.6484 23.37 19.8563C23.6672 19.0969 23.8688 18.2203 23.925 16.9453C23.9813 15.6656 24 15.2578 24 12C24 8.74219 23.9813 8.33438 23.925 7.05469C23.8688 5.77969 23.6672 4.90313 23.37 4.14375C23.0625 3.35156 22.6453 2.68125 21.9844 2.01563C21.3188 1.35938 20.6484 0.9375 19.8563 0.63C19.0969 0.33281 18.2203 0.13125 16.9453 0.075C15.6656 0.01875 15.2578 0 12 0Z"
            fill="#1F2937"
          />
          <path
            d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 16.0031C9.79219 16.0031 7.99688 14.2078 7.99688 12C7.99688 9.79219 9.79219 7.99688 12 7.99688C14.2078 7.99688 16.0031 9.79219 16.0031 12C16.0031 14.2078 14.2078 16.0031 12 16.0031Z"
            fill="#1F2937"
          />
          <path
            d="M19.8469 5.59214C19.8469 6.38902 19.2 7.0312 18.4078 7.0312C17.6109 7.0312 16.9688 6.38433 16.9688 5.59214C16.9688 4.79526 17.6156 4.15308 18.4078 4.15308C19.2 4.15308 19.8469 4.79995 19.8469 5.59214Z"
            fill="#1F2937"
          />
        </svg>
        <span>인스타그램 스토리에 공유하기 - 파스텔</span>
      </button>

      {/* 네온 스타일 공유 버튼 */}
      <button
        onClick={() => handleInstagramShare("neon")}
        disabled={isGenerating}
        className="w-full py-3 px-4 flex items-center justify-center gap-2 font-medium text-white rounded-xl shadow-lg bg-gradient-to-r from-fuchsia-600 to-blue-600 text-xs md:text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-300"
        style={{
          boxShadow: "0 0 20px rgba(0, 200, 255, 0.3)",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path
            d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8688 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.01875 7.05469 0.075C5.77969 0.13125 4.90313 0.33281 4.14375 0.63C3.35156 0.9375 2.68125 1.35469 2.01563 2.01563C1.35469 2.68125 0.9375 3.35156 0.63 4.14375C0.33281 4.90313 0.13125 5.77969 0.075 7.05469C0.01875 8.33438 0 8.74219 0 12C0 15.2578 0.01875 15.6656 0.075 16.9453C0.13125 18.2203 0.33281 19.0969 0.63 19.8563C0.9375 20.6484 1.35469 21.3188 2.01563 21.9844C2.68125 22.6406 3.35156 23.0625 4.14375 23.37C4.90313 23.6672 5.77969 23.8688 7.05469 23.925C8.33438 23.9813 8.74219 24 12 24C15.2578 24 15.6656 23.9813 16.9453 23.925C18.2203 23.8688 19.0969 23.6672 19.8563 23.37C20.6484 23.0625 21.3188 22.6453 21.9844 21.9844C22.6406 21.3188 23.0625 20.6484 23.37 19.8563C23.6672 19.0969 23.8688 18.2203 23.925 16.9453C23.9813 15.6656 24 15.2578 24 12C24 8.74219 23.9813 8.33438 23.925 7.05469C23.8688 5.77969 23.6672 4.90313 23.37 4.14375C23.0625 3.35156 22.6453 2.68125 21.9844 2.01563C21.3188 1.35938 20.6484 0.9375 19.8563 0.63C19.0969 0.33281 18.2203 0.13125 16.9453 0.075C15.6656 0.01875 15.2578 0 12 0Z"
            fill="white"
          />
          <path
            d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 16.0031C9.79219 16.0031 7.99688 14.2078 7.99688 12C7.99688 9.79219 9.79219 7.99688 12 7.99688C14.2078 7.99688 16.0031 9.79219 16.0031 12C16.0031 14.2078 14.2078 16.0031 12 16.0031Z"
            fill="white"
          />
          <path
            d="M19.8469 5.59214C19.8469 6.38902 19.2 7.0312 18.4078 7.0312C17.6109 7.0312 16.9688 6.38433 16.9688 5.59214C16.9688 4.79526 17.6156 4.15308 18.4078 4.15308C19.2 4.15308 19.8469 4.79995 19.8469 5.59214Z"
            fill="white"
          />
        </svg>
        <span>인스타그램 스토리에 공유하기 - 네온</span>
      </button>
    </div>
  );
}
