"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  getUserSurveyData,
  SurveyData,
  analyzeSkinType,
  getSkinTypeDescription,
  getSimpleSkinTypeDescription,
  SkinTypeString,
} from "@/lib/surveyData";
import InstagramShareCard from "@/components/share/InstagramShareCard";

// 토스트 스타일 설정
const toastOptions = {
  style: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "12px 16px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
  },
  success: {
    icon: "✓",
    style: {
      color: "#0891b2",
    },
    duration: 3000,
  },
  error: {
    icon: "✕",
    style: {
      color: "#e11d48",
    },
    duration: 5000,
  },
  loading: {
    icon: "◌",
    style: {
      color: "#0891b2",
    },
  },
};

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
  reliability: {
    score: number;
    flags: string[];
    inconsistencies: string[];
  };
  recommendations: string[];
}

// 지표 설명 타입 정의
type IndicatorLevel = "high" | "medium" | "low";
type IndicatorDescription = {
  description: string;
  high: string;
  medium: string;
  low: string;
};
type IndicatorName =
  | "유수분 밸런스"
  | "민감도"
  | "색소침착"
  | "노화도"
  | "장벽 기능"
  | "생활 습관";

const indicatorDescriptions: Record<IndicatorName, IndicatorDescription> = {
  "유수분 밸런스": {
    description: "피부의 유분과 수분 밸런스를 나타내는 지표입니다.",
    high: "지성에 가까운 상태로, 유분 조절이 필요합니다.",
    medium: "균형 잡힌 유수분을 가지고 있습니다.",
    low: "건성에 가까운 상태로, 보습이 필요합니다.",
  },
  민감도: {
    description: "외부 자극에 대한 피부의 반응성을 나타내는 지표입니다.",
    high: "자극에 강한 피부 상태입니다.",
    medium: "적절한 민감도를 가지고 있습니다.",
    low: "민감한 피부 상태로, 자극을 조심해야 합니다.",
  },
  색소침착: {
    description: "멜라닌 색소 침착 정도와 경향을 나타내는 지표입니다.",
    high: "색소침착이 적은 편입니다.",
    medium: "보통 수준의 색소침착을 보입니다.",
    low: "색소침착이 쉽게 발생하는 상태입니다.",
  },
  노화도: {
    description: "피부 탄력과 주름 상태를 나타내는 지표입니다.",
    high: "탄력있고 건강한 피부 상태입니다.",
    medium: "보통 수준의 노화도를 보입니다.",
    low: "노화 징후가 있어 관리가 필요합니다.",
  },
  "장벽 기능": {
    description: "피부의 보호 장벽 기능을 나타내는 지표입니다.",
    high: "건강한 피부 장벽을 가지고 있습니다.",
    medium: "보통 수준의 장벽 기능을 보입니다.",
    low: "약화된 장벽 기능으로 보호가 필요합니다.",
  },
  "생활 습관": {
    description: "피부 건강에 영향을 미치는 생활 습관 점수입니다.",
    high: "피부 건강에 좋은 생활 습관을 가지고 있습니다.",
    medium: "개선의 여지가 있는 생활 습관입니다.",
    low: "피부 건강을 위해 생활 습관 개선이 필요합니다.",
  },
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: IndicatorName;
      value: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload;
  const desc = indicatorDescriptions[data.name];
  const level: IndicatorLevel =
    data.value >= 70 ? "high" : data.value >= 40 ? "medium" : "low";

  return (
    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 max-w-xs">
      <h4 className="font-semibold text-slate-800 mb-1">{data.name}</h4>
      <p className="text-cyan-600 font-medium mb-2">
        {Math.round(data.value)}점
      </p>
      <p className="text-xs text-slate-600 mb-2">{desc.description}</p>
      <p className="text-xs font-medium text-slate-700">{desc[level]}</p>
    </div>
  );
};

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

  useEffect(() => {
    async function fetchResult() {
      if (hasInitialized.current) return;
      hasInitialized.current = true;

      try {
        const data = getUserSurveyData();
        if (!data || Object.keys(data).length === 0) {
          navigateToSurvey();
          return;
        }

        setSurveyData(data);
        const result = analyzeSkinType(data);
        setAnalysisResult(result);
      } catch (error) {
        console.error("Error fetching result:", error);
        toast.error(
          "결과를 불러오는데 실패했습니다.\n잠시 후 다시 시도해주세요.",
          {
            ...toastOptions,
            ...toastOptions.error,
          }
        );
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    }

    fetchResult();
  }, [router, navigateToSurvey]);

  // 로딩 중이거나 데이터가 없는 경우
  if (isLoading || !surveyData || !analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50/70 via-slate-50/70 to-white">
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: toastOptions.style,
          }}
        />
        <div className="container mx-auto px-4 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <div className="text-center space-y-4">
              {/* 로딩 스피너 */}
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 border-4 border-cyan-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
              </div>

              {/* 로딩 진행 표시 */}
              <div className="w-full h-1.5 bg-cyan-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-loading"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 스코어 배열 정의 (레이더 차트용)
  const scores = [
    { name: "유수분 밸런스", value: analysisResult.scores.doScore },
    { name: "민감도", value: 100 - analysisResult.scores.srScore },
    { name: "색소침착", value: 100 - analysisResult.scores.pnScore },
    { name: "노화도", value: 100 - analysisResult.scores.wtScore },
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
          style: toastOptions.style,
        }}
      />
      {/* 헤더 */}
      <Header />

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
              피부 타입 분석
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-6">
                {/* 피부 타입 레이더 차트 */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4">
                  <div className="w-full h-[400px]">
                    <ResponsiveContainer>
                      <RadarChart data={scores}>
                        <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                        <PolarAngleAxis
                          dataKey="name"
                          tick={{ fill: "#475569", fontSize: 12 }}
                          tickLine={{ stroke: "#e2e8f0" }}
                        />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 100]}
                          tick={{ fill: "#475569", fontSize: 10 }}
                          stroke="#e2e8f0"
                          tickCount={5}
                        />
                        <Radar
                          name="피부 상태"
                          dataKey="value"
                          stroke="#0891b2"
                          fill="#0891b2"
                          fillOpacity={0.3}
                          animationBegin={0}
                          animationDuration={2000}
                          animationEasing="ease-out"
                        />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
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
                    <p className="text-[10px] md:text-xs text-slate-500 mt-1 flex justify-between">
                      <span>건성(D)</span>
                      <span>지성(O)</span>
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
                    <p className="text-[10px] md:text-xs text-slate-500 mt-1 flex justify-between">
                      <span>저항성(R)</span>
                      <span>민감성(S)</span>
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
                    <p className="text-[10px] md:text-xs text-slate-500 mt-1 flex justify-between">
                      <span>비색소침착(N)</span>
                      <span>색소침착(P)</span>
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
                    <p className="text-[10px] md:text-xs text-slate-500 mt-1 flex justify-between">
                      <span>탄력형(T)</span>
                      <span>주름형(W)</span>
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
          <div className="bg-white/60 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 transition-all duration-300 hover:shadow-lg mb-6">
            <h3 className="text-sm md:text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800 mb-4">
              부가 지표
            </h3>
            <div className="space-y-6">
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

          {/* 분석 신뢰도 */}
          <div className="bg-white/60 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 transition-all duration-300 hover:shadow-lg mb-6">
            <h3 className="text-sm md:text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800 mb-4">
              분석 신뢰도
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs md:text-sm text-slate-700 font-medium">
                    신뢰도 점수
                  </span>
                  <span className="text-xs md:text-sm text-cyan-600 font-medium">
                    {analysisResult.reliability.score}점
                  </span>
                </div>
                <div className="w-full h-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      analysisResult.reliability.score >= 80
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                        : analysisResult.reliability.score >= 60
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                        : "bg-gradient-to-r from-amber-500 to-orange-500"
                    }`}
                    style={{
                      width: `${analysisResult.reliability.score}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* 신뢰도 관련 메시지 */}
              {analysisResult.reliability.flags.length > 0 && (
                <div className="bg-amber-50/50 backdrop-blur-sm border border-amber-100/20 rounded-lg p-3">
                  <p className="text-[10px] md:text-xs text-amber-700 font-medium mb-2">
                    분석 신뢰도에 영향을 주는 요소:
                  </p>
                  <ul className="space-y-1">
                    {analysisResult.reliability.flags.map((flag, index) => (
                      <li
                        key={index}
                        className="text-[10px] md:text-xs text-amber-600 flex items-start gap-2"
                      >
                        <span className="text-amber-500">•</span>
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 응답 일관성 문제 */}
              {analysisResult.reliability.inconsistencies.length > 0 && (
                <div className="bg-blue-50/50 backdrop-blur-sm border border-blue-100/20 rounded-lg p-3">
                  <p className="text-[10px] md:text-xs text-blue-700 font-medium mb-2">
                    응답 일관성 체크:
                  </p>
                  <ul className="space-y-1">
                    {analysisResult.reliability.inconsistencies.map(
                      (inconsistency, index) => (
                        <li
                          key={index}
                          className="text-[10px] md:text-xs text-blue-600 flex items-start gap-2"
                        >
                          <span className="text-blue-500">•</span>
                          {inconsistency}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
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
          </div>
          
          {/* 인스타그램 공유 섹션 - 시선을 사로잡는 디자인 */}
          <div className="relative overflow-hidden bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-lg p-6 md:p-8 mt-8 mb-6 border border-purple-100">
            {/* 장식 요소 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200 to-transparent rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-200 to-transparent rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              {/* 마케팅 카피 */}
              <div className="text-center mb-6">
                <h3 className="text-sm md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  친구들에게 내 피부 타입 공유하기
                </h3>
                <p className="text-slate-600 mt-2 text-xs md:text-sm">
                  내 피부 타입을 친구들에게 공유하고 서로 비교해보세요!
                </p>
              </div>

              {/* 인스타그램 공유 컴포넌트 */}
              <InstagramShareCard skinType={skinType} scores={scores} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
