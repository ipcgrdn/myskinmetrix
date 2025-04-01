"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 애니메이션 변수
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 relative overflow-hidden">
      {/* 배경 요소 - iOS 16 스타일의 미니멀한 블러 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[50%] bg-gradient-to-b from-cyan-50 to-sky-50 rounded-full mix-blend-normal filter blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-15%] left-[-10%] w-[70%] h-[60%] bg-gradient-to-t from-slate-50 to-cyan-50 rounded-full mix-blend-normal filter blur-[120px] opacity-60"></div>
      </div>

      {/* 헤더 섹션 */}
      <Header />

      {/* 히어로 섹션 - Apple 스타일 타이포그래피와 공간 활용 */}
      <motion.section
        initial={isLoaded ? "hidden" : "visible"}
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-16 md:pb-28 relative z-10"
      >
        <motion.div variants={slideUp} className="text-center mb-12 md:mb-16">
          <span className="text-cyan-600 font-medium text-xs md:text-sm py-1 mb-4 inline-block">
            새로운 뷰티 경험
          </span>
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight tracking-tight mb-4 md:mb-6">
            당신만의 완벽한
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-500">
              뷰티 솔루션
            </span>
          </h1>
          <p className="text-sm md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
            AI 기반의 정밀한 분석으로 당신만을 위한
            <br className="hidden md:block" />
            맞춤형 뷰티 가이드를 제공합니다
          </p>
        </motion.div>

        {/* 두 가지 테스트 선택 카드 - iOS 16 스타일 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* 피부 타입 분석 카드 */}
          <motion.div
            variants={slideUp}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(8,112,184,0.06)] border border-slate-100/60 hover:shadow-[0_20px_40px_rgba(8,112,184,0.08)] transition-all duration-700"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-sky-500 to-blue-600 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
                <div className="bg-white/15 backdrop-blur-2xl rounded-2xl p-4 w-full max-w-xs border border-white/20 shadow-md">
                  <div className="flex gap-3 items-center mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-base">
                        피부 분석
                      </h3>
                      <p className="text-white/80 text-xs">DSPT 시스템</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/90">유수분 밸런스</span>
                        <span className="text-white font-medium">75%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-white h-full rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/90">민감도</span>
                        <span className="text-white font-medium">55%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-white h-full rounded-full"
                          style={{ width: "55%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 md:p-6">
              <h3 className="text-lg md:text-2xl font-semibold mb-3 text-slate-800">
                맞춤형 피부 분석
              </h3>
              <p className="text-slate-500 text-sm mb-5">
                당신의 피부 타입을 정확히 진단하고 맞춤형 케어
                솔루션을 제안합니다.
              </p>
              <Link
                href="/survey"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-xl text-sm font-medium shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <span>시작하기</span>
                <svg
                  className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* 퍼스널 컬러 분석 카드 */}
          <motion.div
            variants={slideUp}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(20,184,166,0.06)] border border-slate-100/60 hover:shadow-[0_20px_40px_rgba(20,184,166,0.08)] transition-all duration-700"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-500 to-emerald-600 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
                <div className="bg-white/15 backdrop-blur-2xl rounded-2xl p-4 w-full max-w-xs border border-white/20 shadow-md">
                  <div className="flex gap-3 items-center mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-base">
                        퍼스널 컬러
                      </h3>
                      <p className="text-white/80 text-xs">봄 웜톤</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 mb-4">
                    {["#20B2AA", "#5F9EA0", "#00CED1", "#48D1CC"].map(
                      (color, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-md ring-1 ring-white/10"
                          style={{ backgroundColor: color }}
                        ></div>
                      )
                    )}
                    {["#40E0D0", "#7FFFD4", "#00FFFF", "#008B8B"].map(
                      (color, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-md ring-1 ring-white/10"
                          style={{ backgroundColor: color }}
                        ></div>
                      )
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/90">어울림 지수</span>
                      <span className="text-white font-medium">92%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-white h-full rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 md:p-6">
              <h3 className="text-lg md:text-2xl font-semibold mb-3 text-slate-800">
                퍼스널 컬러 진단
              </h3>
              <p className="text-slate-500 text-sm mb-5">
                AI가 분석한 당신만의 완벽한 컬러 팔레트로 스타일을 완성하세요.
              </p>
              <Link
                href="/personal-color"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl text-sm font-medium shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <span>시작하기</span>
                <svg
                  className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 특징 섹션 - iOS 16 스타일 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
        className="py-16 md:py-20 relative z-10"
      >
        <div className="container mx-auto px-5 md:px-6">
          <motion.div variants={fadeIn} className="text-center mb-12 md:mb-16">
            <span className="text-cyan-600 font-medium text-xs md:text-sm py-1 mb-3 inline-block">
              주요 기능
            </span>
            <h2 className="text-xl md:text-3xl font-bold text-slate-800 max-w-3xl mx-auto">
              혁신적인 뷰티 테크놀로지로
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-sky-500">
                {" "}
                더 아름다운 당신
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* 특징 카드들 - iOS 16 스타일 */}
            <motion.div
              variants={slideUp}
              className="group relative bg-white p-5 md:p-6 rounded-2xl border border-slate-100/60 shadow-sm hover:shadow-md transition-all duration-500"
            >
              <div className="w-12 h-12 mb-5 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-sky-500 opacity-10 rounded-xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-sky-500 rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-slate-800">
                AI 기반 분석
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                최신 AI 기술로 피부 상태와 톤을 정밀하게 분석하여 과학적이고
                객관적인 결과를 제공합니다.
              </p>
            </motion.div>

            <motion.div
              variants={slideUp}
              className="group relative bg-white p-5 md:p-6 rounded-2xl border border-slate-100/60 shadow-sm hover:shadow-md transition-all duration-500"
            >
              <div className="w-12 h-12 mb-5 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-500 opacity-10 rounded-xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-500 rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-slate-800">
                맞춤형 솔루션
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                개인화된 분석 결과를 바탕으로 최적의 뷰티 케어 방법과 제품을
                추천해드립니다.
              </p>
            </motion.div>

            <motion.div
              variants={slideUp}
              className="group relative bg-white p-5 md:p-6 rounded-2xl border border-slate-100/60 shadow-sm hover:shadow-md transition-all duration-500"
            >
              <div className="w-12 h-12 mb-5 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-600 opacity-10 rounded-xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-slate-800">
                지속적인 케어
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                정기적인 분석과 데이터 트래킹으로 당신의 피부 변화를 꾸준히
                관리해드립니다.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA 섹션 - iOS 16 스타일, 서비스 색상으로 변경 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="py-16 md:py-20 relative z-10"
      >
        <div className="container mx-auto px-5 md:px-6">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-teal-500 to-sky-500"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="relative px-6 py-12 md:py-16 md:px-8">
              <motion.div
                variants={slideUp}
                className="max-w-2xl mx-auto text-center"
              >
                <span className="inline-block text-white font-medium text-xs mb-3">
                  완벽한 뷰티 솔루션
                </span>
                <h2 className="text-xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  지금 바로 시작하세요
                </h2>
                <p className="text-white/80 mb-6 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                  AI 기반의 정밀한 분석으로 당신만의 완벽한 뷰티 경험을
                  시작해보세요.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/survey"
                    className="inline-flex items-center justify-center gap-1 px-5 py-2.5 bg-white text-slate-900 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    피부 분석 시작하기
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/personal-color"
                    className="inline-flex items-center justify-center gap-1 px-5 py-2.5 bg-white/10 backdrop-blur-xl text-white rounded-xl text-sm font-medium border border-white/10 hover:bg-white/15 transition-all duration-300"
                  >
                    퍼스널 컬러 찾기
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 푸터 - iOS 스타일 */}
      <footer className="py-10 relative z-10 border-t border-slate-100">
        <div className="container mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="My Skin Metrix"
                width={24}
                height={24}
                className="mr-2"
              />
              <p className="text-slate-600 text-xs font-medium">
                My Skin Metrix
              </p>
            </div>

            <p className="text-slate-500 text-xs">
              © 2024 My Skin Metrix. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-slate-500 text-xs hover:text-slate-800 transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="text-slate-500 text-xs hover:text-slate-800 transition-colors"
              >
                이용약관
              </Link>
              <Link
                href="/contact"
                className="text-slate-500 text-xs hover:text-slate-800 transition-colors"
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
