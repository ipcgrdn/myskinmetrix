"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 애니메이션 변수
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/70 via-white to-white">
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <motion.div
          initial={isLoaded ? "hidden" : "visible"}
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center space-y-4 mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50/60 backdrop-blur-sm border border-slate-100/40">
              <div className="h-px w-4 md:w-6 bg-slate-400/40"></div>
              <span className="text-slate-600 font-medium text-xs">
                정책 안내
              </span>
              <div className="h-px w-4 md:w-6 bg-slate-400/40"></div>
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-slate-800 tracking-tight">
              개인정보 처리방침
            </h1>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/40 p-6 md:p-8 mb-8">
            <div className="prose prose-slate max-w-none text-sm md:text-base">
              <p className="text-slate-500 mb-6">
                마이스킨메트릭스(이하 &quot;서비스&quot;)는 사용자의 개인정보 보호를 매우 중요하게 생각합니다. 
                본 개인정보 처리방침은 서비스 이용 시 어떤 정보가 수집되고 어떻게 사용되는지 안내합니다.
              </p>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">1. 수집하는 개인정보 항목</h2>
              <p className="text-slate-600 mb-4">
                서비스는 다음과 같은 정보를 수집할 수 있습니다:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                <li>
                  <span className="font-medium">이미지 데이터</span>: 퍼스널 컬러 분석을 위해 업로드하거나 촬영한 얼굴 이미지
                </li>
                <li>
                  <span className="font-medium">설문 응답</span>: 피부 타입 분석을 위한 설문 응답 정보
                </li>
                <li>
                  <span className="font-medium">기기 정보</span>: 브라우저 유형, 접속 기기, 화면 해상도 등
                </li>
              </ul>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">2. 개인정보 수집 목적</h2>
              <p className="text-slate-600 mb-4">
                수집된 정보는 다음과 같은 목적으로 사용됩니다:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                <li>퍼스널 컬러 및 피부 타입 분석 서비스 제공</li>
                <li>서비스 품질 향상 및 사용자 경험 개선</li>
                <li>서비스 이용 통계 분석</li>
              </ul>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">3. 개인정보 보관 및 파기</h2>
              <p className="text-slate-600 mb-6">
                서비스는 사용자의 개인정보를 다음과 같이 처리합니다:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                <li>
                  <span className="font-medium">이미지 데이터</span>: 분석이 완료된 후 사용자의 브라우저 세션 스토리지에만 임시 저장되며, 세션 종료 시 자동으로 삭제됩니다. 서버에 영구 저장되지 않습니다.
                </li>
                <li>
                  <span className="font-medium">설문 응답</span>: 분석이 완료된 후 사용자의 브라우저 세션 스토리지에만 임시 저장되며, 세션 종료 시 자동으로 삭제됩니다. 서버에 영구 저장되지 않습니다.
                </li>
              </ul>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">4. 개인정보의 제3자 제공</h2>
              <p className="text-slate-600 mb-6">
                서비스는 사용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외적으로 제공될 수 있습니다:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">5. 사용자의 권리</h2>
              <p className="text-slate-600 mb-4">
                사용자는 다음과 같은 권리를 가집니다:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                <li>개인정보 접근, 수정, 삭제 요청</li>
                <li>서비스 이용 중단 요청</li>
              </ul>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">6. 개인정보 보호조치</h2>
              <p className="text-slate-600 mb-6">
                서비스는 사용자의 개인정보를 안전하게 처리하기 위해 다음과 같은 조치를 취합니다:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                <li>HTTPS 프로토콜을 통한 안전한 데이터 전송</li>
                <li>클라이언트 측 처리를 통한 서버 저장 최소화</li>
              </ul>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">7. 쿠키 사용</h2>
              <p className="text-slate-600 mb-6">
                서비스는 사용자의 편의를 위해 쿠키를 사용할 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있으며, 이 경우 서비스 이용에 일부 제한이 있을 수 있습니다.
              </p>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">8. 개인정보 처리방침 변경</h2>
              <p className="text-slate-600 mb-6">
                본 개인정보 처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 수 있으며, 변경 시 서비스 내 공지사항을 통해 고지할 것입니다.
              </p>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">9. 문의하기</h2>
              <p className="text-slate-600 mb-6">
                개인정보 처리방침에 관한 문의사항은 <Link href="/contact" className="text-cyan-500 hover:text-cyan-600 transition-colors">문의하기</Link> 페이지를 통해 연락해 주시기 바랍니다.
              </p>

              <div className="text-slate-500 text-sm mt-8">
                <p>시행일자: 2025년 3월 31일</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 