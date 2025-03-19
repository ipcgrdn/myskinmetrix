"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-white text-slate-800 relative overflow-hidden">
      {/* 배경 도형 요소들 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[15%] w-64 h-64 bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 rounded-full mix-blend-multiply blur-3xl opacity-70"></div>
        <div className="absolute top-[35%] left-[10%] w-72 h-72 bg-gradient-to-br from-cyan-100 to-teal-50 rounded-full mix-blend-multiply blur-3xl opacity-70"></div>
        <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full mix-blend-multiply blur-3xl opacity-70"></div>
      </div>

      {/* 헤더 섹션 */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-cyan-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="My Skin Metrix 로고"
              width={44}
              height={44}
              className="mr-2 hidden md:block"
            />
            <h1 className="text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
              My Skin Metrix
            </h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="/about"
              className="text-slate-600 hover:text-cyan-600 transition-colors text-sm font-medium"
            >
              서비스 소개
            </Link>
            <Link
              href="/pricing"
              className="text-slate-600 hover:text-cyan-600 transition-colors text-sm font-medium"
            >
              요금제
            </Link>
            <Link
              href="/survey"
              className="text-slate-600 hover:text-cyan-600 transition-colors text-sm font-medium"
            >
              피부 분석
            </Link>
          </nav>
          <div className="flex gap-4 items-center">
            <Link
              href="/login"
              className="text-slate-600 hover:text-cyan-600 transition-colors text-sm font-medium"
            >
              로그인
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-cyan-500 text-white rounded-md text-sm font-medium shadow-lg hover:shadow-cyan-200 hover:bg-cyan-600 transition-all hidden md:block"
            >
              회원가입
            </Link>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <motion.section
        initial={isLoaded ? "hidden" : "visible"}
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-6 pt-20 pb-24 flex flex-col md:flex-row items-center gap-12 relative z-10"
      >
        <motion.div variants={slideUp} className="md:w-1/2 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-cyan-500"></div>
            <span className="text-cyan-600 font-medium text-sm px-3 py-1 rounded-full bg-cyan-50">
              바우만 피부 타입 분석
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
            과학적
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500">
              {" "}
              피부 분석
            </span>
            으로
            <br />
            맞춤형 솔루션
          </h2>
          <p className="text-sm md:text-lg text-slate-600 max-w-xl">
            바우만 피부 타입 시스템 기반의 과학적 분석으로 16가지 피부 타입을
            정확히 진단하고 맞춤형 관리 방법을 제안합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              href="/survey"
              className="text-sm md:text-base px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl text-center font-medium shadow-xl hover:shadow-cyan-200 hover:shadow-xl transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">무료 분석 시작하기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            <Link
              href="/about"
              className="text-sm md:text-base px-8 py-4 bg-white backdrop-blur-sm border border-cyan-200 text-slate-700 rounded-xl text-center font-medium hover:bg-cyan-50 transition-all"
            >
              자세히 알아보기
            </Link>
          </div>

          {/* 신뢰 배지 */}
          <div className="flex flex-wrap items-center gap-6 pt-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-xs text-slate-500">과학적 진단</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <span className="text-xs text-slate-500">개인정보 보호</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-xs text-slate-500">실시간 결과</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={slideUp}
          className="w-full pt-12 md:pt-0 md:w-1/2 flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 via-cyan-500 to-blue-500"></div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-xs border border-white/30 shadow-lg">
                <div className="flex gap-3 items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
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
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">바우만 피부 타입</h3>
                    <p className="text-white/80 text-sm">DSPT 피부 유형</p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/90">유수분 밸런스 (D/O)</span>
                      <span className="text-white font-medium">75%</span>
                    </div>
                    <div className="w-full bg-white/30 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-300 to-blue-400 h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/90">민감도 (S/R)</span>
                      <span className="text-white font-medium">55%</span>
                    </div>
                    <div className="w-full bg-white/30 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-300 to-red-400 h-2 rounded-full"
                        style={{ width: "55%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/90">색소침착 (P/N)</span>
                      <span className="text-white font-medium">40%</span>
                    </div>
                    <div className="w-full bg-white/30 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-300 to-amber-400 h-2 rounded-full"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/90">노화도 (W/T)</span>
                      <span className="text-white font-medium">60%</span>
                    </div>
                    <div className="w-full bg-white/30 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-300 to-green-400 h-2 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* 16가지 피부 타입 라벨 */}
                <div className="grid grid-cols-4 gap-1 mt-6">
                  {["DSPT", "DSNT", "DRPT", "DRNT"].map((type) => (
                    <div
                      key={type}
                      className={`text-xs text-center py-1 rounded ${type === "DSPT" ? "bg-white/20 text-white" : "text-white/60"}`}
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
        className="py-24 relative z-10"
      >
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeIn}
            className="flex items-center gap-2 justify-center mb-2"
          >
            <div className="h-px w-6 bg-cyan-500"></div>
            <span className="text-cyan-600 font-medium text-sm px-3 py-1 rounded-full bg-cyan-50">
              핵심 기능
            </span>
            <div className="h-px w-6 bg-cyan-500"></div>
          </motion.div>
          <motion.h2
            variants={slideUp}
            className="text-2xl md:text-4xl font-extrabold text-center mb-16 text-slate-800"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500">
              피부과학
            </span>{" "}
            기반 분석 기술
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            <motion.div
              variants={slideUp}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-cyan-100 hover:border-cyan-300 transition-all duration-300 shadow-lg hover:shadow-xl group hover:-translate-y-1"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-slate-800">
                바우만 피부 분석
              </h3>
              <p className="text-slate-600 text-sm md:text-base">
                바우만 피부 타입 시스템을 기반으로 4가지 차원(D/O, S/R, P/N,
                W/T)에서 16가지 피부 타입을 정확하게 진단합니다.
              </p>
            </motion.div>
            <motion.div
              variants={slideUp}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-cyan-100 hover:border-cyan-300 transition-all duration-300 shadow-lg hover:shadow-xl group hover:-translate-y-1"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-slate-800">
                맞춤형 솔루션
              </h3>
              <p className="text-slate-600 text-sm md:text-base">
                진단된 피부 타입에 따라 장벽 기능, 생활 습관 등을 고려한 최적의
                스킨케어 루틴과 제품을 추천합니다.
              </p>
            </motion.div>
            <motion.div
              variants={slideUp}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-cyan-100 hover:border-cyan-300 transition-all duration-300 shadow-lg hover:shadow-xl group hover:-translate-y-1"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-slate-800">
                데이터 추적
              </h3>
              <p className="text-slate-600 text-sm md:text-base">
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
                바우만 피부 타입 시스템
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
                전 세계적으로 인정받는 16가지 피부 타입 분류 체계로, 4가지 주요
                차원에서 피부를 정밀하게 분석하여 개인화된 스킨케어 솔루션을
                제공합니다.
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
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">민감도</h3>
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
                  <h3 className="text-lg md:text-xl font-bold text-slate-800">색소침착</h3>
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
                    <h3 className="text-lg md:text-xl font-bold text-slate-800">노화도</h3>
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
        className="py-28 relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-blue-500 to-teal-500"></div>
            <div className="absolute inset-0 bg-[url('/logo.png')] opacity-20"></div>
            <div className="relative px-8 py-16 md:py-24 md:px-16 border border-white/20">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
              <motion.div
                variants={slideUp}
                className="max-w-2xl mx-auto text-center"
              >
                <h2 className="text-xl md:text-2xl font-extrabold text-white mb-8 leading-tight">
                  지금 바로 과학적인
                  <br />
                  피부 분석을 시작하세요
                </h2>
                <p className="text-white/90 mb-10 text-sm md:text-base max-w-xl mx-auto">
                  바우만 피부 타입 시스템 기반의 정밀 분석으로 당신만을 위한
                  맞춤형 피부 관리 솔루션을 만나보세요.
                </p>
                <Link
                  href="/survey"
                  className="px-10 py-5 bg-white text-white bg-clip-text bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl text-lg md:text-xl font-bold shadow-xl hover:shadow-white/30 hover:bg-white/90 transition-all inline-block border-2 border-transparent hover:border-white/20"
                >
                  무료 분석 시작하기
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 푸터 */}
      <footer className="bg-white py-20 border-t border-indigo-100 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="md:w-1/3 mb-10 md:mb-0">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                  My Skin Metrix
                </h3>
              </div>
              <p className="text-slate-500 max-w-xs mb-6 text-sm">
                바우만 피부 타입 시스템 기반의 과학적 분석으로 당신만의 피부
                타입을 정확히 진단하고 맞춤형 케어 솔루션을 제공합니다.
              </p>

              {/* 소셜 미디어 아이콘 */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-100 hover:text-cyan-600 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.566-.247-2.229-.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-100 hover:text-cyan-600 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259-.012 3.668-.069 4.948-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-100 hover:text-cyan-600 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 md:w-2/3">
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-5">
                  서비스
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      서비스 소개
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      요금제
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      자주 묻는 질문
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-5">회사</h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/terms"
                      className="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      이용약관
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      문의하기
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      개인정보처리방침
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-5">
                  바로가기
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/survey"
                      className="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      피부 분석 시작
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      로그인 / 회원가입
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      고객 지원
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 mt-16 pt-8 flex flex-col md:flex-row items-center justify-center text-slate-400 text-sm">
            <p>© 2024 My Skin Metrix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
