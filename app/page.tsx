"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
    <div className="min-h-screen bg-gradient-to-b from-teal-50/70 via-cyan-50/70 to-white text-slate-800 relative overflow-hidden">
      {/* 배경 도형 요소들 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[15%] w-96 h-96 bg-gradient-to-br from-fuchsia-100/40 to-fuchsia-50/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute top-[35%] left-[10%] w-[32rem] h-[32rem] bg-gradient-to-br from-cyan-100/40 to-teal-50/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[36rem] h-[36rem] bg-gradient-to-br from-cyan-50/40 to-blue-50/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
      </div>

      {/* 헤더 섹션 */}
      <Header />

      {/* 히어로 섹션 */}
      <motion.section
        initial={isLoaded ? "hidden" : "visible"}
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 md:px-6 pt-12 md:pt-24 pb-16 md:pb-32 flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10"
      >
        <motion.div
          variants={slideUp}
          className="md:w-1/2 space-y-6 md:space-y-8 text-center md:text-left"
        >
          <div className="flex items-center gap-2 mb-4 md:mb-6 justify-center md:justify-start">
            <div className="h-px w-8 md:w-10 bg-cyan-500/50"></div>
            <span className="text-cyan-600 font-medium text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-cyan-50/50 backdrop-blur-sm border border-cyan-100/20 whitespace-nowrap">
              맞춤형 피부 타입 분석
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            과학적
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500">
              {" "}
              피부 분석
            </span>
            으로
            <br />
            맞춤형 솔루션
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-xl leading-relaxed mx-auto md:mx-0">
            16가지 피부 타입 시스템 기반의 과학적 분석으로 피부 타입을 정확히
            진단하고 맞춤형 관리 방법을 제안합니다.
          </p>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-4 md:pt-8 justify-center md:justify-start">
            <Link
              href="/survey"
              className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-center font-medium shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 overflow-hidden text-xs md:text-base"
            >
              <span className="relative z-10">무료 분석 시작하기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </Link>
          </div>

          {/* 신뢰 배지 */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-4 md:pt-12 justify-center md:justify-start">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-cyan-50/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-cyan-100/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-xs md:text-sm text-slate-500">
                과학적 진단
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-cyan-50/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-cyan-100/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <span className="text-xs md:text-sm text-slate-500">
                개인정보 보호
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-cyan-50/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-cyan-100/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-xs md:text-sm text-slate-500">
                실시간 결과
              </span>
            </div>
          </div>
        </motion.div>

        {/* 피부 분석 결과 카드 */}
        <motion.div
          variants={slideUp}
          className="w-full md:w-1/2 flex justify-center px-4 md:px-0"
        >
          <div className="relative w-full max-w-[300px] md:max-w-md aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 via-cyan-500 to-blue-500"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 w-full max-w-xs border border-white/30 shadow-lg">
                <div className="flex gap-3 items-center mb-4 md:mb-6">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 md:h-6 md:w-6 text-white"
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
                    <h3 className="text-white font-medium text-xs md:text-base">
                      맞춤형 피부 타입
                    </h3>
                    <p className="text-white/80 text-[10px] md:text-sm">
                      DSPT 피부 유형
                    </p>
                  </div>
                </div>
                <div className="space-y-3 md:space-y-5">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] md:text-xs mb-1">
                      <span className="text-white/90">유수분 밸런스 (D/O)</span>
                      <span className="text-white font-medium">75%</span>
                    </div>
                    <div className="w-full bg-white/30 h-1 md:h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-300 to-blue-400 h-full rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] md:text-xs mb-1">
                      <span className="text-white/90">민감도 (S/R)</span>
                      <span className="text-white font-medium">55%</span>
                    </div>
                    <div className="w-full bg-white/30 h-1 md:h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-300 to-red-400 h-full rounded-full"
                        style={{ width: "55%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] md:text-xs mb-1">
                      <span className="text-white/90">색소침착 (P/N)</span>
                      <span className="text-white font-medium">40%</span>
                    </div>
                    <div className="w-full bg-white/30 h-1 md:h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-300 to-amber-400 h-full rounded-full"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] md:text-xs mb-1">
                      <span className="text-white/90">노화도 (W/T)</span>
                      <span className="text-white font-medium">60%</span>
                    </div>
                    <div className="w-full bg-white/30 h-1 md:h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-300 to-green-400 h-full rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* 16가지 피부 타입 라벨 */}
                <div className="grid grid-cols-4 gap-0.5 md:gap-1 mt-3 md:mt-6">
                  {["DSPT", "DSNT", "DRPT", "DRNT"].map((type) => (
                    <div
                      key={type}
                      className={`text-[8px] md:text-xs text-center py-0.5 md:py-1 rounded ${
                        type === "DSPT"
                          ? "bg-white/20 text-white"
                          : "text-white/60"
                      }`}
                    >
                      {type}
                    </div>
                  ))}
                  {["OSPT", "OSNT", "ORPT", "ORNT"].map((type) => (
                    <div
                      key={type}
                      className="text-xs text-center py-1 rounded text-white/60"
                    >
                      {type}
                    </div>
                  ))}
                  {["DSPT", "DSNT", "DRPT", "DRNT"].map((type) => (
                    <div
                      key={`2-${type}`}
                      className="text-xs text-center py-1 rounded text-white/60"
                    >
                      {type}
                    </div>
                  ))}
                  {["OSPT", "OSNT", "ORPT", "ORNT"].map((type) => (
                    <div
                      key={`2-${type}`}
                      className="text-xs text-center py-1 rounded text-white/60"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* 특징 섹션 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
        className="py-16 md:py-32 relative z-10"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeIn}
            className="flex items-center gap-2 justify-center mb-4"
          >
            <div className="h-px w-4 md:w-6 bg-cyan-500/50"></div>
            <span className="text-cyan-600 font-medium text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-cyan-50/50 backdrop-blur-sm border border-cyan-100/20">
              핵심 기능
            </span>
            <div className="h-px w-4 md:w-6 bg-cyan-500/50"></div>
          </motion.div>
          <motion.h2
            variants={slideUp}
            className="text-lg md:text-2xl lg:text-3xl font-bold text-center mb-12 md:mb-20 text-slate-800 tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500">
              피부과학
            </span>{" "}
            기반 분석 기술
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <motion.div
              variants={slideUp}
              className="group bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-cyan-100/20 hover:border-cyan-200/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 transform group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-teal-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 md:w-8 md:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-bold mb-3 md:mb-4 text-slate-800">
                맞춤형 피부 분석
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                과학적 피부 타입 시스템을 기반으로 4가지 차원(D/O, S/R, P/N,
                W/T)에서 16가지 피부 타입을 정확하게 진단합니다.
              </p>
            </motion.div>
            <motion.div
              variants={slideUp}
              className="group bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-cyan-100/20 hover:border-cyan-200/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 transform group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-teal-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 md:w-8 md:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-bold mb-3 md:mb-4 text-slate-800">
                맞춤형 솔루션
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                진단된 피부 타입에 따라 장벽 기능, 생활 습관 등을 고려한 최적의
                스킨케어 루틴과 제품을 추천합니다.
              </p>
            </motion.div>
            <motion.div
              variants={slideUp}
              className="group bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-cyan-100/20 hover:border-cyan-200/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 transform group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-teal-500/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 md:w-8 md:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-bold mb-3 md:mb-4 text-slate-800">
                데이터 추적
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                시간에 따른 피부 변화를 추적하고 시각화하여 케어 효과를 확인하고
                최적의 관리 방법을 찾아드립니다.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 바우만 시스템 설명 섹션 - 새로 추가 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
        className="py-20 bg-gradient-to-b from-white to-cyan-50 relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div variants={slideUp} className="text-center mb-16">
              <h2 className="text-xl md:text-4xl font-extrabold text-slate-800 mb-6">
                맞춤형 피부 타입 시스템
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
                과학적 피부 타입 시스템을 기반으로 정밀 분석으로 16가지 피부
                타입을 진단하여 개인화된 스킨케어 솔루션을 제공합니다.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                variants={slideUp}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-lg">D/O</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">
                    유수분 밸런스
                  </h3>
                </div>
                <p className="text-slate-600 text-sm md:text-base">
                  건성(Dry), 지성(Oily), 복합성(Combination) 여부를 분석하여
                  최적의 수분, 유분 공급 방법을 찾아드립니다.
                </p>
              </motion.div>

              <motion.div
                variants={slideUp}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-lg">S/R</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">
                    민감도
                  </h3>
                </div>
                <p className="text-slate-600 text-sm md:text-base">
                  민감성(Sensitive), 저항성(Resistant) 여부를 분석하여 피부
                  자극을 최소화하는 안전한 케어 방법을 제안합니다.
                </p>
              </motion.div>

              <motion.div
                variants={slideUp}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-lg">P/N</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">
                    색소침착
                  </h3>
                </div>
                <p className="text-slate-600 text-sm md:text-base">
                  색소침착(Pigmented), 비색소침착(Non-pigmented) 여부를 분석하여
                  균일한 피부톤을 위한 솔루션을 제공합니다.
                </p>
              </motion.div>

              <motion.div
                variants={slideUp}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-lg">W/T</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">
                    노화도
                  </h3>
                </div>
                <p className="text-slate-600 text-sm md:text-base">
                  주름형성(Wrinkled), 탄력있는(Tight) 여부를 분석하여 연령대에
                  맞는 안티에이징 솔루션을 제공합니다.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA 섹션 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="py-16 relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="relative rounded-[2.5rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-blue-500 to-teal-500"></div>
            <div className="absolute inset-0 bg-[url('/logo.png')] opacity-10 mix-blend-overlay"></div>
            <div className="relative px-8 py-20 md:py-28 md:px-16 border border-white/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <motion.div
                variants={slideUp}
                className="max-w-2xl mx-auto text-center"
              >
                <h2 className="text-lg md:text-3xl font-bold text-white mb-8 leading-tight tracking-tight">
                  지금 바로 맞춤형
                  <br />
                  피부 분석을 시작하세요
                </h2>
                <p className="text-white/90 mb-12 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
                  과학적 피부 타입 시스템 기반의 정밀 분석으로 당신만을 위한
                  맞춤형 피부 관리 솔루션을 만나보세요.
                </p>
                <Link
                  href="/survey"
                  className="group relative inline-flex items-center justify-center px-8 md:px-12 py-3 md:py-5 bg-white text-slate-800 rounded-full text-sm md:text-lg font-semibold shadow-xl hover:shadow-white/30 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                    무료 분석 시작하기
                  </span>
                  <div className="absolute inset-0 bg-white/90 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 푸터 */}
      <footer className="bg-white py-20 relative z-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-center text-slate-400 text-sm">
        <p>© 2024 My Skin Metrix. All rights reserved.</p>
      </footer>
    </div>
  );
}
