"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

export default function PersonalColorHome() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 애니메이션 변수
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/70 via-slate-50/70 to-white">
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={isLoaded ? "hidden" : "visible"}
            animate="visible"
            variants={fadeIn}
          >
            <div className="text-center space-y-4 mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50/50 backdrop-blur-sm border border-teal-100/20">
                <div className="h-px w-4 md:w-6 bg-teal-500/50"></div>
                <span className="text-teal-600 font-medium text-xs">
                  이미지 기반 AI 분석
                </span>
                <div className="h-px w-4 md:w-6 bg-teal-500/50"></div>
              </div>
              <h1 className="text-lg md:text-2xl font-bold text-slate-800 tracking-tight">
                나에게 어울리는 컬러를 찾아
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500">
                  퍼스널 컬러 분석
                </span>
              </h1>
            </div>

            <motion.div
              variants={slideUp}
              className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 md:p-6 mb-6"
            >
              {/* 4계절 컬러 미리보기 */}
              <div className="grid grid-cols-4 gap-3 md:gap-4 mb-8">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                  <span className="text-white text-xs md:text-sm font-medium">봄</span>
                </div>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <span className="text-white text-xs md:text-sm font-medium">여름</span>
                </div>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <span className="text-white text-xs md:text-sm font-medium">가을</span>
                </div>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                  <span className="text-white text-xs md:text-sm font-medium">겨울</span>
                </div>
              </div>

              <ul className="space-y-4 md:space-y-6 mb-8">
                <li className="flex gap-3 items-start group">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md shadow-teal-500/10 flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 flex-1 leading-relaxed">
                    <span className="font-medium text-slate-800">얼굴 이미지 촬영 또는 업로드</span>
                    — 정면을 바라보는 자연광 아래에서 촬영된 얼굴 이미지를 준비해주세요.
                  </p>
                </li>
                
                <li className="flex gap-3 items-start group">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md shadow-teal-500/10 flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 flex-1 leading-relaxed">
                    <span className="font-medium text-slate-800">AI 분석 진행</span>
                    — 피부톤, 눈동자, 머리카락 색상을 AI가 자동으로 분석합니다.
                  </p>
                </li>
                
                <li className="flex gap-3 items-start group">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md shadow-teal-500/10 flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 flex-1 leading-relaxed">
                    <span className="font-medium text-slate-800">퍼스널 컬러 결과 확인</span>
                    — 봄/여름/가을/겨울 중 어떤 계절 타입인지와 컬러 팔레트를 확인하세요.
                  </p>
                </li>
                
                <li className="flex gap-3 items-start group">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md shadow-teal-500/10 flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 flex-1 leading-relaxed">
                    <span className="font-medium text-slate-800">컬러 활용 가이드</span>
                    — 패션, 메이크업, 액세서리에 활용할 수 있는 컬러 가이드를 제공합니다.
                  </p>
                </li>
              </ul>

              <div className="flex justify-center">
                <Link
                  href="/personal-color/capture"
                  className="group relative w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-center font-medium shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-300 overflow-hidden text-sm"
                >
                  <span className="relative z-10">퍼스널 컬러 분석 시작하기</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 