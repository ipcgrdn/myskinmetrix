"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

import {
  getUserSurveyData,
  SurveyData,
  analyzeSkinType,
  getSkinTypeDescription,
  getSimpleSkinTypeDescription,
  SkinTypeString,
} from "@/lib/surveyData";
import { getUserId } from "@/lib/userIdentifier";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// 토스트 스타일 설정
const toastOptions = {
  success: {
    icon: '✓',
    style: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '12px 16px',
      color: '#0891b2',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
    },
  },
  error: {
    icon: '✕',
    style: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '12px 16px',
      color: '#e11d48',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
    },
  },
  loading: {
    icon: '◌',
    style: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '12px 16px',
      color: '#0891b2',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
    },
  },
};

// API 호출 함수
async function saveSurveyResult(answers: SurveyData, result: AnalysisResult) {
  const tempId = getUserId();

  try {
    const response = await fetch(`${API_URL}/survey/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-temp-id': tempId,
      },
      credentials: 'include', // CORS 인증 정보 포함
      body: JSON.stringify({
        answers,
        result,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save survey result');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving survey result:', error);
    throw error;
  }
}

// 결과 타입 정의
interface AnalysisResult {
  skinType: string;
  scores: {
    doScore: number;
    srScore: number;
    pnScore: number;
    wtScore: number;
    barrierScore: number;
    lifestyleScore: number;
  };
}

export default function ResultPage() {
  const router = useRouter();
  const navigateToSurvey = useCallback(() => {
    router.push("/survey");
  }, [router]);

  const hasInitialized = useRef(false);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function processAndSaveSurvey() {
      if (hasInitialized.current) return;
      hasInitialized.current = true;

      // 설문 데이터 불러오기
      const data = getUserSurveyData();
      if (!data || Object.keys(data).length === 0) {
        // 설문 데이터가 없으면 설문 시작 페이지로 이동
        navigateToSurvey();
        return;
      }

      setSurveyData(data);

      // 맞춤형 피부 타입 분석 실행
      const result = analyzeSkinType(data);
      setAnalysisResult(result);

      // 백엔드에 결과 저장
      setIsSaving(true);
      const savePromise = saveSurveyResult(data, result)
        .then(() => {
          toast.success('분석 결과가 성공적으로 저장되었습니다.', toastOptions.success);
        })
        .catch(() => {
          toast.error('분석 결과 저장에 실패했습니다.', toastOptions.error);
        })
        .finally(() => {
          setIsSaving(false);
        });

      toast.promise(savePromise, {
        loading: '분석 결과를 저장하고 있습니다...',
        success: null,
        error: null,
      }, {
        ...toastOptions.loading,
        position: 'bottom-right',
      });

      setIsLoading(false);
    }

    processAndSaveSurvey();
  }, [navigateToSurvey]);

  // 로딩 중이거나 데이터가 없는 경우
  if (isLoading || !surveyData || !analysisResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '12px',
            },
          }}
        />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">
            {isSaving ? "결과를 저장하고 있습니다..." : "결과를 분석하고 있습니다..."}
          </p>
        </div>
      </div>
    );
  }

  // 스코어 배열 (레이더 차트용)
  const scores = [
    { name: "유수분 밸런스", value: analysisResult.scores.doScore },
    { name: "민감도", value: 100 - analysisResult.scores.srScore }, // 값 반전
    { name: "색소침착", value: 100 - analysisResult.scores.pnScore }, // 값 반전
    { name: "노화도", value: 100 - analysisResult.scores.wtScore }, // 값 반전
    { name: "장벽 기능", value: analysisResult.scores.barrierScore },
    { name: "생활 습관", value: analysisResult.scores.lifestyleScore },
  ];

  // 맞춤형 피부 타입 분석 결과
  const skinType = analysisResult.skinType; // "DSPT", "ORNT" 등과 같은 형식

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/70 via-slate-50/70 to-white">
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '12px',
          },
        }}
      />
      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/20">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="My Skin Metrix 로고"
              width={32}
              height={32}
              className="w-8 h-8 hidden md:block"
            />
            <h1 className="text-sm md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
              My Skin Metrix
            </h1>
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50/50 backdrop-blur-sm border border-cyan-100/20 mb-4">
              <div className="h-px w-4 md:w-6 bg-cyan-500/50"></div>
              <span className="text-cyan-600 font-medium text-xs">
                분석 결과
              </span>
              <div className="h-px w-4 md:w-6 bg-cyan-500/50"></div>
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-blue-800 mb-2">
              당신의 피부 타입은 {skinType}입니다
            </h1>
            <p className="text-xs md:text-sm text-slate-600">
              과학적 피부 타입 분류 시스템에 따른 분석 결과입니다.
            </p>
          </div>

          {/* 결과 요약 */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 md:p-8 mb-6 transition-all duration-300 hover:shadow-xl hover:bg-white/70">
            <h2 className="text-base md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800 mb-6">
              피부 타입 상세 분석
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-6">
                {/* 피부 타입 레이더 차트 */}
                <div className="bg-gradient-to-r from-cyan-50/50 to-blue-50/50 backdrop-blur-sm rounded-xl p-4 md:p-6 flex items-center justify-center h-64 border border-white/20">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      data={scores}
                    >
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis
                        dataKey="name"
                        tick={{ fill: "#475569", fontSize: 10 }}
                        axisLine={{ stroke: "#e2e8f0" }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fill: "#475569", fontSize: 10 }}
                        stroke="#e2e8f0"
                      />
                      <Radar
                        name="점수"
                        dataKey="value"
                        stroke="#0891b2"
                        fill="#0891b2"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* 주요 점수 표시 */}
                <div className="space-y-4">
                  {/* D/O 유수분 밸런스 점수 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs md:text-sm text-slate-700 font-medium">
                        유수분 밸런스
                      </span>
                      <span className="text-xs md:text-sm text-cyan-600 font-medium">
                        {analysisResult.scores.doScore}점
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${analysisResult.scores.doScore}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                      {analysisResult.scores.doScore < 50
                        ? "건성(D)"
                        : "지성(O)"}
                    </p>
                  </div>

                  {/* S/R 민감도 점수 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs md:text-sm text-slate-700 font-medium">
                        민감도
                      </span>
                      <span className="text-xs md:text-sm text-cyan-600 font-medium">
                        {100 - analysisResult.scores.srScore}점
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${100 - analysisResult.scores.srScore}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                      {analysisResult.scores.srScore < 50
                        ? "민감성(S)"
                        : "저항성(R)"}
                    </p>
                  </div>

                  {/* P/N 색소침착 점수 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs md:text-sm text-slate-700 font-medium">
                        색소침착
                      </span>
                      <span className="text-xs md:text-sm text-cyan-600 font-medium">
                        {100 - analysisResult.scores.pnScore}점
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${100 - analysisResult.scores.pnScore}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                      {analysisResult.scores.pnScore < 50
                        ? "색소침착(P)"
                        : "비색소침착(N)"}
                    </p>
                  </div>

                  {/* W/T 노화도 점수 */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs md:text-sm text-slate-700 font-medium">
                        노화도
                      </span>
                      <span className="text-xs md:text-sm text-cyan-600 font-medium">
                        {100 - analysisResult.scores.wtScore}점
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${100 - analysisResult.scores.wtScore}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                      {analysisResult.scores.wtScore < 50
                        ? "주름형(W)"
                        : "탄력형(T)"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-start gap-4">
                <div className="bg-gradient-to-r from-cyan-50/50 to-blue-50/50 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-sm md:text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800 mb-2">
                    피부 타입 정의
                  </h3>
                  <p className="text-cyan-600 text-lg md:text-xl font-bold mb-3">
                    {skinType}
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {getSimpleSkinTypeDescription(skinType as SkinTypeString)}
                  </p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-sm md:text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800 mb-2">
                    피부 타입 설명
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {getSkinTypeDescription(skinType as SkinTypeString)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 부가 지표 */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 md:p-8 mb-6 transition-all duration-300 hover:shadow-xl hover:bg-white/70">
            <h2 className="text-base md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800 mb-6">
              피부 건강 부가 지표
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 피부 장벽 기능 */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs md:text-sm text-slate-700 font-medium">
                    피부 장벽 기능
                  </span>
                  <span className="text-xs md:text-sm text-cyan-600 font-medium">
                    {analysisResult.scores.barrierScore}점
                  </span>
                </div>
                <div className="w-full h-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${analysisResult.scores.barrierScore}%` }}
                  ></div>
                </div>
                <p className="text-[10px] md:text-xs text-slate-600 mt-2 leading-relaxed">
                  {analysisResult.scores.barrierScore < 40
                    ? "피부 장벽이 약해 외부 자극에 취약합니다. 부드러운 세안과 보습에 집중하세요."
                    : analysisResult.scores.barrierScore < 70
                      ? "피부 장벽이 보통 수준입니다. 규칙적인 관리로 개선할 수 있어요."
                      : "피부 장벽이 건강합니다. 현재의 관리 방법을 유지하세요."}
                </p>
              </div>

              {/* 생활 습관 영향도 */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs md:text-sm text-slate-700 font-medium">
                    생활 습관 영향도
                  </span>
                  <span className="text-xs md:text-sm text-cyan-600 font-medium">
                    {analysisResult.scores.lifestyleScore}점
                  </span>
                </div>
                <div className="w-full h-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${analysisResult.scores.lifestyleScore}%`,
                    }}
                  ></div>
                </div>
                <p className="text-[10px] md:text-xs text-slate-600 mt-2 leading-relaxed">
                  {analysisResult.scores.lifestyleScore < 40
                    ? "생활 습관이 피부에 부정적 영향을 주고 있어요. 수면, 식이, 스트레스 관리에 신경 쓰세요."
                    : analysisResult.scores.lifestyleScore < 70
                      ? "생활 습관이 보통 수준으로 피부에 영향을 주고 있어요. 개선의 여지가 있습니다."
                      : "생활 습관이 피부 건강에 긍정적 영향을 주고 있어요. 현재 습관을 유지하세요."}
                </p>
              </div>
            </div>
          </div>

          {/* 추천 액션 */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 md:p-8 mb-6 transition-all duration-300 hover:shadow-xl hover:bg-white/70">
            <h2 className="text-base md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800 mb-6">
              맞춤 관리 추천
            </h2>

            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 md:w-8 md:h-8 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md shadow-teal-500/10 flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 md:h-4 md:w-4"
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
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-slate-800 mb-1">
                    클렌징 제안
                  </h3>
                  <p className="text-[10px] md:text-xs text-slate-600 leading-relaxed">
                    {skinType.charAt(0) === "D"
                      ? "부드러운 밀크/크림 타입 클렌저를 사용하여 피부 보습막을 유지하세요."
                      : skinType.charAt(0) === "O"
                        ? "가볍고 산뜻한 젤 타입 클렌저로 유분을 효과적으로 제거하세요."
                        : "피부 타입에 맞는 클렌저를 선택하세요."}
                    {skinType.charAt(1) === "S" &&
                      " 향료와 알코올이 함유되지 않은 저자극 제품을 선택하세요."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 md:w-8 md:h-8 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md shadow-teal-500/10 flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 md:h-4 md:w-4"
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
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-slate-800 mb-1">
                    스킨케어 성분 추천
                  </h3>
                  <p className="text-[10px] md:text-xs text-slate-600 leading-relaxed">
                    {skinType.charAt(0) === "D"
                      ? "세라마이드, 히알루론산, 글리세린 등 보습 성분이 풍부한 제품을 사용하세요."
                      : skinType.charAt(0) === "O"
                        ? "나이아신아마이드, 살리실산, 티트리 오일 등 피지 조절에 도움이 되는 성분을 사용하세요."
                        : "피부 타입에 맞는 성분을 선택하세요."}
                    {skinType.charAt(2) === "P" &&
                      " 비타민C, 알부틴, 트레티노인 등 미백 성분을 함유한 제품을 사용하세요."}
                    {skinType.charAt(3) === "W" &&
                      " 레티놀, 펩타이드, AHA/BHA 등 항노화 성분을 함유한 제품을 사용하세요."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 md:w-8 md:h-8 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md shadow-teal-500/10 flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 md:h-4 md:w-4"
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
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-slate-800 mb-1">
                    주의사항
                  </h3>
                  <p className="text-[10px] md:text-xs text-slate-600 leading-relaxed">
                    {analysisResult.scores.srScore < 50
                      ? "민감한 피부이므로 새로운 제품 사용 전 필히 패치 테스트를 진행하세요."
                      : ""}
                    {analysisResult.scores.pnScore < 50
                      ? " 자외선 차단제를 꼭 사용하고, 자외선에 장시간 노출되지 않도록 주의하세요."
                      : ""}
                    {analysisResult.scores.wtScore < 50
                      ? " 피부에 자극을 주는 과도한 스크럽이나 필링은 피하고 부드러운 각질 관리를 해주세요."
                      : ""}
                    {analysisResult.scores.barrierScore < 50
                      ? " 피부 장벽 강화를 위해 자극적인 성분은 피하고 진정, 보습에 집중하세요."
                      : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                href="/detail-analysis"
                className="group relative w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-center font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 overflow-hidden text-xs md:text-sm"
              >
                <span className="relative z-10">상세 분석 결과 확인하기</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </Link>
            </div>
          </div>

          {/* 계정 생성 유도 */}
          <div className="bg-gradient-to-r from-cyan-50/50 to-blue-50/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 text-center border border-white/20">
            <h2 className="text-base md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800 mb-2">
              결과를 저장하고 변화를 추적하세요
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mb-6 leading-relaxed">
              회원가입 시 시간에 따른 피부 변화 추적, 상세 분석 리포트 및
              <br className="hidden md:block" /> 맞춤형 제품 추천을 받아보실 수
              있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                className="group relative px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-center font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 overflow-hidden text-xs md:text-sm"
              >
                <span className="relative z-10">회원가입하기</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </Link>
              <Link
                href="/"
                className="px-6 py-2.5 bg-white/60 backdrop-blur-sm text-slate-700 rounded-full text-center font-medium shadow-sm hover:bg-white/80 transition-all duration-300 text-xs md:text-sm border border-white/20"
              >
                나중에 하기
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
