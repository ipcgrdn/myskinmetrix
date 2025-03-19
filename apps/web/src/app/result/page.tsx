"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getUserId } from "@/lib/userIdentifier";
import { 
  getUserSurveyData, 
  SurveyData, 
  analyzeBaumannSkinType, 
  getBaumannTypeDescription,
  getSimpleSkinTypeDescription
} from "@/lib/surveyData";

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

  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [_, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 사용자 ID 확인
    const id = getUserId();
    setUserId(id);

    // 설문 데이터 불러오기
    const data = getUserSurveyData();
    if (!data || Object.keys(data).length === 0) {
      // 설문 데이터가 없으면 설문 시작 페이지로 이동
      router.push("/survey");
      return;
    }

    setSurveyData(data);
    
    // 바우만 피부 타입 분석 실행
    const result = analyzeBaumannSkinType(data);
    setAnalysisResult(result);
    
    setIsLoading(false);

    // 여기서 백엔드 API 호출해서 결과를 가져오는 코드 추가 예정
  }, [router]);

  // 로딩 중이거나 데이터가 없는 경우
  if (isLoading || !surveyData || !analysisResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">결과를 분석하고 있습니다...</p>
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

  // 바우만 피부 타입 분석 결과
  const skinType = analysisResult.skinType; // "DSPT", "ORNT" 등과 같은 형식

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-slate-50 to-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-cyan-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="My Skin Metrix 로고"
              width={44}
              height={44}
              className="mr-2 hidden md:block"
            />
            <h1 className="text-lg md:text-xl font-semibold text-cyan-600">
              My Skin Metrix
            </h1>
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
              당신의 피부 타입은 {skinType}입니다
            </h1>
            <p className="text-slate-600 text-sm md:text-base mb-6">
              바우만 피부 타입 분류 시스템에 따른 분석 결과입니다.
            </p>
            <div className="w-24 h-1 bg-cyan-200 mx-auto mb-8 rounded-full"></div>
          </div>

          {/* 결과 요약 */}
          <div className="bg-white rounded-xl shadow-lg border border-cyan-100 p-8 mb-10">
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-6">
              피부 타입 상세 분석
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* 피부 타입 레이더 차트 (실제 구현 시 차트 라이브러리 필요) */}
                <div className="bg-cyan-50 rounded-xl p-6 flex items-center justify-center h-64">
                  <p className="text-center text-sm text-slate-600">
                    이곳에 레이더 차트가 표시됩니다.<br />
                    6가지 지표: {scores.map(s => s.name).join(', ')}
                  </p>
                </div>

                {/* 주요 점수 표시 */}
                <div className="space-y-4">
                  {/* D/O 유수분 밸런스 점수 */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700 font-medium">
                        유수분 밸런스
                      </span>
                      <span className="text-cyan-600 font-medium">
                        {analysisResult.scores.doScore}점
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full"
                        style={{ width: `${analysisResult.scores.doScore}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {analysisResult.scores.doScore < 50 ? "건성(D)" : "지성(O)"}
                    </p>
                  </div>

                  {/* S/R 민감도 점수 */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700 font-medium">
                        민감도
                      </span>
                      <span className="text-cyan-600 font-medium">
                        {100 - analysisResult.scores.srScore}점
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full"
                        style={{ width: `${100 - analysisResult.scores.srScore}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {analysisResult.scores.srScore < 50 ? "민감성(S)" : "저항성(R)"}
                    </p>
                  </div>

                  {/* P/N 색소침착 점수 */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700 font-medium">
                        색소침착
                      </span>
                      <span className="text-cyan-600 font-medium">
                        {100 - analysisResult.scores.pnScore}점
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full"
                        style={{ width: `${100 - analysisResult.scores.pnScore}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {analysisResult.scores.pnScore < 50 ? "색소침착(P)" : "비색소침착(N)"}
                    </p>
                  </div>

                  {/* W/T 노화도 점수 */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-700 font-medium">
                        노화도
                      </span>
                      <span className="text-cyan-600 font-medium">
                        {100 - analysisResult.scores.wtScore}점
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full"
                        style={{ width: `${100 - analysisResult.scores.wtScore}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {analysisResult.scores.wtScore < 50 ? "주름형(W)" : "탄력형(T)"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100 mb-6 w-full">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    피부 타입 정의
                  </h3>
                  <p className="text-cyan-600 text-xl md:text-2xl font-bold mb-4">
                    {skinType}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {getSimpleSkinTypeDescription(skinType)}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-cyan-100 w-full">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    피부 타입 설명
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {getBaumannTypeDescription(skinType)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 부가 지표 */}
          <div className="bg-white rounded-xl shadow-lg border border-cyan-100 p-8 mb-10">
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-6">
              피부 건강 부가 지표
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 피부 장벽 기능 */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-700 font-medium">
                    피부 장벽 기능
                  </span>
                  <span className="text-cyan-600 font-medium">
                    {analysisResult.scores.barrierScore}점
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full"
                    style={{ width: `${analysisResult.scores.barrierScore}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  {analysisResult.scores.barrierScore < 40 ? 
                    "피부 장벽이 약해 외부 자극에 취약합니다. 부드러운 세안과 보습에 집중하세요." : 
                    analysisResult.scores.barrierScore < 70 ?
                    "피부 장벽이 보통 수준입니다. 규칙적인 관리로 개선할 수 있어요." :
                    "피부 장벽이 건강합니다. 현재의 관리 방법을 유지하세요."}
                </p>
              </div>

              {/* 생활 습관 영향도 */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-700 font-medium">
                    생활 습관 영향도
                  </span>
                  <span className="text-cyan-600 font-medium">
                    {analysisResult.scores.lifestyleScore}점
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full"
                    style={{ width: `${analysisResult.scores.lifestyleScore}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  {analysisResult.scores.lifestyleScore < 40 ? 
                    "생활 습관이 피부에 부정적 영향을 주고 있어요. 수면, 식이, 스트레스 관리에 신경 쓰세요." : 
                    analysisResult.scores.lifestyleScore < 70 ?
                    "생활 습관이 보통 수준으로 피부에 영향을 주고 있어요. 개선의 여지가 있습니다." :
                    "생활 습관이 피부 건강에 긍정적 영향을 주고 있어요. 현재 습관을 유지하세요."}
                </p>
              </div>
            </div>
          </div>

          {/* 추천 액션 */}
          <div className="bg-white rounded-xl shadow-lg border border-cyan-100 p-8 mb-10">
            <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-6">
              맞춤 관리 추천
            </h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start flex-col md:flex-row gap-2 md:gap-0">
                <div className="w-8 h-8 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
                <div>
                  <h3 className="text-slate-800 font-medium mb-1">
                    클렌징 제안
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base">
                    {skinType.charAt(0) === 'D' 
                      ? "부드러운 밀크/크림 타입 클렌저를 사용하여 피부 보습막을 유지하세요."
                      : skinType.charAt(0) === 'O'
                      ? "가볍고 산뜻한 젤 타입 클렌저로 유분을 효과적으로 제거하세요."
                      : "피부 타입에 맞는 클렌저를 선택하세요."}
                    {skinType.charAt(1) === 'S' && " 향료와 알코올이 함유되지 않은 저자극 제품을 선택하세요."}
                  </p>
                </div>
              </div>

              <div className="flex items-start flex-col md:flex-row gap-2 md:gap-0">
                <div className="w-8 h-8 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
                <div>
                  <h3 className="text-slate-800 font-medium mb-1">스킨케어 성분 추천</h3>
                  <p className="text-slate-600 text-sm md:text-base">
                    {skinType.charAt(0) === 'D' 
                      ? "세라마이드, 히알루론산, 글리세린 등 보습 성분이 풍부한 제품을 사용하세요."
                      : skinType.charAt(0) === 'O'
                      ? "나이아신아마이드, 살리실산, 티트리 오일 등 피지 조절에 도움이 되는 성분을 사용하세요."
                      : "피부 타입에 맞는 성분을 선택하세요."}
                    {skinType.charAt(2) === 'P' && " 비타민C, 알부틴, 트레티노인 등 미백 성분을 함유한 제품을 사용하세요."}
                    {skinType.charAt(3) === 'W' && " 레티놀, 펩타이드, AHA/BHA 등 항노화 성분을 함유한 제품을 사용하세요."}
                  </p>
                </div>
              </div>

              <div className="flex items-start flex-col md:flex-row gap-2 md:gap-0">
                <div className="w-8 h-8 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
                <div>
                  <h3 className="text-slate-800 font-medium mb-1">주의사항</h3>
                  <p className="text-slate-600 text-sm md:text-base">
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
                className="px-6 py-2 bg-cyan-500 text-white rounded-md text-center font-medium shadow-md hover:bg-cyan-600 transition-all text-sm md:text-base"
              >
                상세 분석 결과 확인하기
              </Link>
            </div>
          </div>

          {/* 계정 생성 유도 */}
          <div className="bg-gradient-to-r from-cyan-100 to-cyan-100 rounded-xl p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              결과를 저장하고 변화를 추적하세요
            </h2>
            <p className="text-slate-700 text-sm md:text-base mb-6">
              회원가입 시 시간에 따른 피부 변화 추적, 상세 분석 리포트 및 맞춤형
              제품 추천을 받아보실 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-6 py-2 bg-cyan-500 text-white rounded-md text-center font-medium shadow-md hover:bg-cyan-600 transition-all text-sm md:text-base"
              >
                회원가입하기
              </Link>
              <Link
                href="/"
                className="px-6 py-2 bg-white text-slate-700 rounded-md text-center font-medium shadow-sm hover:bg-slate-50 transition-all text-sm md:text-base"
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
