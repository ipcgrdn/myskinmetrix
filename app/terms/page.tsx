"use client";

import Header from "@/components/Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TermsOfService() {
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
              이용약관
            </h1>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/40 p-6 md:p-8 mb-8">
            <div className="prose prose-slate max-w-none text-sm md:text-base">
              <p className="text-slate-500 mb-6">
                마이스킨메트릭스(이하 &quot;서비스&quot;)를 이용해 주셔서 감사합니다. 본 이용약관은 서비스 이용에 관한 조건과 절차, 이용자와 당사의 권리, 의무, 책임사항 등을 규정합니다.
              </p>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">제1조 (목적)</h2>
              <p className="text-slate-600 mb-6">
                본 약관은 마이스킨메트릭스가 제공하는 서비스의 이용 조건과 절차 및 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">제2조 (정의)</h2>
              <p className="text-slate-600 mb-4">
                본 약관에서 사용하는 용어의 정의는 다음과 같습니다:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                <li>
                  <span className="font-medium">&quot;서비스&quot;</span>란 마이스킨메트릭스가 제공하는 퍼스널 컬러 분석 및 피부 타입 분석 서비스를 의미합니다.
                </li>
                <li>
                  <span className="font-medium">&quot;이용자&quot;</span>란 서비스에 접속하여 이용약관에 따라 서비스를 이용하는 모든 사용자를 의미합니다.
                </li>
              </ul>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">제3조 (약관의 효력과 변경)</h2>
              <p className="text-slate-600 mb-4">
                1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.
              </p>
              <p className="text-slate-600 mb-4">
                2. 당사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지함으로써 효력이 발생합니다.
              </p>
              <p className="text-slate-600 mb-6">
                3. 이용자가 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단할 수 있습니다. 계속적인 서비스 이용은 변경된 약관에 대한 동의로 간주됩니다.
              </p>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">제4조 (서비스 이용)</h2>
              <p className="text-slate-600 mb-4">
                1. 서비스는 웹브라우저를 통해 제공되며, 별도의 회원가입 없이 이용 가능합니다.
              </p>
              <p className="text-slate-600 mb-4">
                2. 이용자는 서비스를 이용하기 위해 카메라 접근 권한을 허용해야 할 수 있습니다.
              </p>
              <p className="text-slate-600 mb-6">
                3. 서비스의 일부 기능은 기술적 제약이나 브라우저 종류, 기기 환경에 따라 제한될 수 있습니다.
              </p>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">제5조 (서비스 제공의 제한)</h2>
              <p className="text-slate-600 mb-4">
                다음 각 호의 경우 서비스 제공이 제한될 수 있습니다:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                <li>서비스 시스템의 정기 점검, 교체, 고장, 장애 등의 부득이한 사유가 발생한 경우</li>
                <li>천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우</li>
                <li>기타 당사가 서비스를 제공할 수 없는 사유가 발생한 경우</li>
              </ul>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">제6조 (이용자의 의무)</h2>
              <p className="text-slate-600 mb-4">
                이용자는 다음 각 호의 행위를 해서는 안 됩니다:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                <li>서비스의 안정적 운영을 방해하는 행위</li>
                <li>다른 이용자의 이용을 방해하는 행위</li>
                <li>타인의 개인정보를 침해하는 행위</li>
                <li>서비스를 이용하여 법령이나 이 약관을 위반하는 행위</li>
                <li>기타 사회적 통념에 반하는 행위</li>
              </ul>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">제7조 (결과의 활용)</h2>
              <p className="text-slate-600 mb-6">
                서비스를 통해 제공되는 분석 결과는 참고용으로만 사용하시기 바랍니다. 당사는 분석 결과의 정확성을 보장하지 않으며, 결과에 따른 개인의 결정이나 행동에 대해 책임지지 않습니다.
              </p>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">제8조 (지적재산권)</h2>
              <p className="text-slate-600 mb-6">
                서비스 내의 모든 콘텐츠에 대한 저작권 및 지적재산권은 당사에 귀속됩니다. 이용자는 당사의 사전 서면 동의 없이 이를 상업적으로 이용할 수 없습니다.
              </p>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">제9조 (면책조항)</h2>
              <p className="text-slate-600 mb-4">
                1. 당사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지, 제3자의 불법행위 등 당사의 합리적인 통제범위를 벗어난 사유로 발생한 서비스 중단에 대해서는 책임을 지지 않습니다.
              </p>
              <p className="text-slate-600 mb-4">
                2. 당사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
              </p>
              <p className="text-slate-600 mb-6">
                3. 서비스에서 제공하는 분석 결과는 참고 정보일 뿐이며, 이로 인해 발생하는 문제에 대해 당사는 법적 책임을 지지 않습니다.
              </p>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">제10조 (준거법 및 관할법원)</h2>
              <p className="text-slate-600 mb-6">
                본 약관의 해석 및 서비스 이용과 관련된 분쟁은 대한민국 법을 준거법으로 하며, 분쟁 발생 시 서울중앙지방법원을 제1심 관할법원으로 합니다.
              </p>

              <h2 className="text-lg font-semibold text-slate-800 mb-3 mt-6">제11조 (기타)</h2>
              <p className="text-slate-600 mb-6">
                본 약관에 명시되지 않은 사항은 관련 법령 및 당사가 정한 서비스의 운영정책, 규칙 등에 따릅니다.
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