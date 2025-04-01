"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Share2, Camera, Palette, Check } from "lucide-react";
import toast from "react-hot-toast";

import Header from "@/components/Header";
import ResultShareCard from "@/components/share/ResultShareCard";
import {
  DetailedPersonalColorResult,
  PersonalColorType,
  DetailedPersonalColorType,
} from "@/lib/personalColorAnalyzer";

// 타입별 설명 및 정보
const personalColorDescriptions: Record<
  PersonalColorType,
  { title: string; description: string }
> = {
  springWarm: {
    title: "봄 웜톤",
    description:
      "밝고 선명한 색상이 어울리는 봄 웜톤입니다. 노란빛이 도는 피부와 밝은 눈동자가 특징이며, 생동감 있는 컬러가 잘 어울립니다.",
  },
  summerCool: {
    title: "여름 쿨톤",
    description:
      "부드럽고 연한 파스텔 색상이 어울리는 여름 쿨톤입니다. 붉은빛이 도는 피부와 차분한 눈동자가 특징이며, 부드러운 컬러가 잘 어울립니다.",
  },
  autumnWarm: {
    title: "가을 웜톤",
    description:
      "깊고 풍부한 자연 색상이 어울리는 가을 웜톤입니다. 황금빛이 도는 피부와 깊은 눈동자가 특징이며, 따뜻한 컬러가 잘 어울립니다.",
  },
  winterCool: {
    title: "겨울 쿨톤",
    description:
      "선명하고 대비가 강한 색상이 어울리는 겨울 쿨톤입니다. 푸른빛이 도는 피부와 강렬한 눈동자가 특징이며, 선명한 컬러가 잘 어울립니다.",
  },
};

// 특징 목록 정의
const seasonalCharacteristics: Record<PersonalColorType, string[]> = {
  springWarm: [
    "피부가 노란빛을 띠며 혈색이 좋음",
    "황금빛이 도는 밝은 갈색 머리카락",
    "눈동자는 밝은 갈색 또는 호박색",
    "선명하고 밝은 색상이 잘 어울림",
  ],
  summerCool: [
    "푸른빛이 도는 하얀 피부",
    "재가 섞인 듯한 연한 갈색 머리카락",
    "회색이나 파란빛이 도는 눈동자",
    "부드럽고 연한 파스텔 색상이 잘 어울림",
  ],
  autumnWarm: [
    "황금빛이 도는 피부",
    "깊은 갈색 또는 적갈색 머리카락",
    "진한 갈색 눈동자",
    "풍부하고 따뜻한 어스톤이 잘 어울림",
  ],
  winterCool: [
    "푸른빛이 도는 하얀 피부",
    "진한 갈색 또는 검정 머리카락",
    "검은색 또는 진한 갈색 눈동자",
    "선명하고 대비가 강한 색상이 잘 어울림",
  ],
};

// 메이크업 팁 정의
const makeupTips: Record<PersonalColorType, string> = {
  springWarm:
    "피치, 코랄 계열의 블러셔와 립스틱이 자연스러운 생기를 부여합니다. 아이섀도우는 골드나 피치 계열로 부드럽게 연출하세요.",
  summerCool:
    "로즈, 라벤더 계열의 블러셔와 핑크 계열 립스틱이 잘 어울립니다. 아이섀도우는 라벤더, 그레이 블루 계열로 부드럽게 연출하세요.",
  autumnWarm:
    "테라코타, 브릭 계열의 블러셔와 오렌지 브라운 립스틱이 잘 어울립니다. 아이섀도우는 브라운, 올리브 그린 계열로 깊이감 있게 연출하세요.",
  winterCool:
    "푸시아, 와인 색상의 블러셔와 선명한 레드 립스틱이 잘 어울립니다. 아이섀도우는 네이비, 플럼, 그레이 계열로 또렷하게 연출하세요.",
};

// 패션 코디 팁 정의
const fashionTips: Record<PersonalColorType, string> = {
  springWarm:
    "밝고 생동감 있는 컬러의 옷을 선택하세요. 연한 베이지, 산호색, 선명한 노랑이 잘 어울립니다. 골드 주얼리가 피부톤을 더욱 돋보이게 해줍니다.",
  summerCool:
    "부드럽고 차분한 파스텔 컬러의 옷을 선택하세요. 라벤더, 하늘색, 부드러운 핑크가 잘 어울립니다. 실버 주얼리가 피부톤과 조화를 이룹니다.",
  autumnWarm:
    "풍부하고 깊이 있는 어스 톤 컬러의 옷을 선택하세요. 카키, 머스타드, 버건디가 잘 어울립니다. 골드나 구리 톤의 주얼리가 완벽하게 어울립니다.",
  winterCool:
    "선명하고 대비가 강한 컬러의 옷을 선택하세요. 퓨어 화이트, 블랙, 선명한 레드, 로열 블루가 잘 어울립니다. 플래티넘이나 실버 주얼리가 세련된 느낌을 더합니다.",
};

// 시즌별 배경 그라데이션 색상
const backgroundGradients: Record<PersonalColorType, string> = {
  springWarm: "from-amber-50 via-yellow-50 to-white",
  summerCool: "from-blue-50 via-purple-50 to-white",
  autumnWarm: "from-orange-50 via-amber-50 to-white",
  winterCool: "from-indigo-50 via-blue-50 to-white",
};

// 시즌별 강조 색상
const accentColors: Record<PersonalColorType, string> = {
  springWarm: "text-amber-600",
  summerCool: "text-blue-600",
  autumnWarm: "text-orange-700",
  winterCool: "text-indigo-700",
};

// 시즌별 CTA 배경 그라데이션
const ctaGradients: Record<PersonalColorType, string> = {
  springWarm: "from-amber-500 via-orange-400 to-yellow-500",
  summerCool: "from-blue-500 via-purple-400 to-sky-500",
  autumnWarm: "from-orange-600 via-amber-500 to-yellow-600",
  winterCool: "from-indigo-600 via-blue-600 to-violet-600",
};

// 세부 타입별 설명 추가
const detailedDescriptions: Record<
  DetailedPersonalColorType,
  { title: string; description: string }
> = {
  brightSpring: {
    title: "선명한 봄(Bright Spring)",
    description:
      "생동감 있고 강렬한 색상이 어울리는 밝고 따뜻한 특성을 가진 타입입니다. 선명하고 채도 높은 컬러가 매우 잘 어울립니다.",
  },
  lightSpring: {
    title: "라이트 봄(Light Spring)",
    description:
      "밝고 화사한 파스텔 톤이 잘 어울리는 봄 타입입니다. 밝고 가벼운 느낌의 색상이 피부를 환하게 만들어줍니다.",
  },
  warmSpring: {
    title: "따뜻한 봄(Warm Spring)",
    description:
      "황금빛이 도는 따뜻하고 부드러운 색상이 잘 어울리는 봄 타입입니다. 복숭아색, 황금색 등이 특히 잘 어울립니다.",
  },
  lightSummer: {
    title: "라이트 여름(Light Summer)",
    description:
      "밝고 부드러운 파스텔 톤이 잘 어울리는 여름 타입입니다. 연한 하늘색, 라벤더, 라일락 등이 매우 잘 어울립니다.",
  },
  coolSummer: {
    title: "쿨 여름(Cool Summer)",
    description:
      "차갑고 부드러운 색상이 잘 어울리는 전형적인 여름 타입입니다. 블루 베이스의 차분한 색상이 조화롭습니다.",
  },
  softSummer: {
    title: "소프트 여름(Soft Summer)",
    description:
      "부드럽고 흐릿한 파스텔 톤이 잘 어울리는 여름 타입입니다. 그레이가 섞인 듯한 부드러운 색상이 잘 어울립니다.",
  },
  warmAutumn: {
    title: "따뜻한 가을(Warm Autumn)",
    description:
      "황토색, 올리브, 황금색 등 자연에서 볼 수 있는 따뜻한 색상이 잘 어울리는 가을 타입입니다.",
  },
  deepAutumn: {
    title: "딥 가을(Deep Autumn)",
    description:
      "풍부하고 깊이 있는 어두운 색상이 잘 어울리는 가을 타입입니다. 버건디, 다크 그린 등이 특히 잘 어울립니다.",
  },
  softAutumn: {
    title: "소프트 가을(Soft Autumn)",
    description:
      "부드럽고 따뜻한 자연 색상이 잘 어울리는 가을 타입입니다. 흙과 나무의 색상처럼 중간 톤의 색상이 잘 어울립니다.",
  },
  coolWinter: {
    title: "쿨 겨울(Cool Winter)",
    description:
      "차갑고 선명한 색상이 잘 어울리는 전형적인 겨울 타입입니다. 로얄 블루, 퓨시아 등 차가운 계열의 색상이 돋보입니다.",
  },
  deepWinter: {
    title: "딥 겨울(Deep Winter)",
    description:
      "깊고 강렬한 색상이 잘 어울리는 겨울 타입입니다. 보르도, 다크 네이비 등 짙은 컬러가 특히 잘 어울립니다.",
  },
  brightWinter: {
    title: "브라이트 겨울(Bright Winter)",
    description:
      "강렬하고 선명한 색상이 잘 어울리는 겨울 타입입니다. 선명한 레드, 로얄 블루 등 채도 높은 색상이 잘 어울립니다.",
  },
};

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<DetailedPersonalColorResult | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 이미지 가져오기
    const savedImage =
      typeof window !== "undefined"
        ? sessionStorage.getItem("personalColorImage")
        : null;

    if (!savedImage) {
      // 이미지가 없으면 캡처 페이지로 리다이렉트
      router.push("/personal-color/capture");
      return;
    }

    setImageUrl(savedImage);

    // 저장된 결과 가져오기
    const savedResult =
      typeof window !== "undefined"
        ? sessionStorage.getItem("personalColorResult")
        : null;

    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        setResult(parsedResult);
        setLoading(false);
      } catch (err) {
        console.error("결과 파싱 오류:", err);
        setError("분석 결과를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    } else {
      // 저장된 결과가 없는 경우, 이전 페이지로 이동
      router.push("/personal-color/capture");
    }
  }, [router]);

  // 공유 옵션 토글
  const handleToggleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  // 다시 분석하기
  const handleReanalyze = () => {
    router.push("/personal-color/capture");
  };

  // 결과 공유
  const handleShare = async (method: string) => {
    if (!result) return;

    const shareUrl = window.location.href;

    if (method === "copy") {
      try {
        // URL만 복사
        await navigator.clipboard.writeText(shareUrl);
        toast.success("링크가 복사되었습니다!", {
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#334155",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "12px 16px",
            fontWeight: "500",
            fontSize: "14px",
          },
        });
      } catch (error) {
        console.error("복사 실패:", error);
        toast.error("링크 복사에 실패했습니다.", {
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#334155",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "12px 16px",
            fontWeight: "500",
            fontSize: "14px",
          },
        });
      }
    }
  };

  // ITA 값 설명
  const getITADescription = (ita: number): string => {
    if (ita > 55) return "밝은 피부톤(매우 밝음)";
    if (ita > 41) return "밝은 피부톤(밝음)";
    if (ita > 28) return "중간 피부톤";
    if (ita > 10) return "어두운 피부톤";
    return "매우 어두운 피부톤";
  };

  // 색온도 설명
  const getTemperatureDescription = (temperature: number): string => {
    if (temperature > 25) return "강한 웜톤";
    if (temperature > 10) return "웜톤";
    if (temperature > -10) return "중성톤";
    if (temperature > -25) return "쿨톤";
    return "강한 쿨톤";
  };

  // 신뢰도 텍스트 표시
  const getConfidenceText = (confidence: number): string => {
    if (confidence >= 90) return "매우 높음";
    if (confidence >= 80) return "높음";
    if (confidence >= 70) return "양호";
    if (confidence >= 60) return "보통";
    return "참고용";
  };

  // 로딩 상태일 때 표시할 컴포넌트
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50/70 via-slate-50/70 to-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-teal-500 animate-spin"></div>
          <p className="text-slate-600 animate-pulse">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러가 발생했을 때 표시할 컴포넌트
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50/70 via-slate-50/70 to-white">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            분석 오류 발생
          </h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/personal-color/capture")}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              다시 시도하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 결과가 없을 때 에러 화면
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50/70 via-slate-50/70 to-white">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            결과를 불러올 수 없습니다
          </h2>
          <p className="text-slate-600 mb-6">
            분석 결과를 찾을 수 없습니다. 다시 분석을 시도해주세요.
          </p>
          <button
            onClick={() => router.push("/personal-color/capture")}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            다시 분석하기
          </button>
        </div>
      </div>
    );
  }

  // 결과 화면 - 필요한 데이터 가져오기
  const resultType = result.type as PersonalColorType;
  const detailedType = result.detailedType as DetailedPersonalColorType;
  const resultTitle = personalColorDescriptions[resultType].title;
  const detailedTitle = detailedDescriptions[detailedType].title;
  const detailedDescription = detailedDescriptions[detailedType].description;
  const characteristics = seasonalCharacteristics[resultType];
  const bgGradient =
    backgroundGradients[resultType] ||
    "from-teal-50/70 via-slate-50/70 to-white";
  const accentColor = accentColors[resultType] || "text-teal-600";
  const ctaGradient = ctaGradients[resultType] || "from-teal-500 to-cyan-500";

  // 추천 컬러 팔레트 (향상된 버전 사용)
  const bestColors = result.seasonalHarmonies.bestColors;
  const avoidColors = result.seasonalHarmonies.avoidColors;

  // 피부 특성
  const skinBrightness = result.skinProperties.brightness;
  const skinClarity = result.skinProperties.clarity;
  const dominantColors = result.skinProperties.dominantColors;

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgGradient}`}>
      <Header />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* 결과 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1
              className={`text-2xl md:text-3xl font-bold mb-2 ${accentColor}`}
            >
              {resultTitle}
            </h1>
            <h2 className="text-lg md:text-xl font-medium text-slate-600 mb-2">
              {detailedTitle}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-xs md:text-sm">
              {detailedDescription}
            </p>
            <div className="mt-4 inline-flex items-center bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
              <span className="text-sm font-medium text-teal-700">
                분석 신뢰도: {result.confidence}% (
                {getConfidenceText(result.confidence)})
              </span>
            </div>
          </motion.div>

          {/* 결과 컨텐츠 */}
          <div className="max-w-4xl mx-auto">
            {/* 결과 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden mb-10 border border-white/30"
            >
              <div className="md:flex">
                {/* 이미지 섹션 */}
                <div className="md:w-2/5 relative">
                  {imageUrl && (
                    <div className="relative aspect-square">
                      <Image
                        src={imageUrl}
                        alt="사용자 이미지"
                        fill
                        className="object-cover"
                      />
                      {/* 이미지 위에 결과 타입 배지 */}
                      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
                        {resultTitle}
                      </div>
                    </div>
                  )}
                </div>

                {/* 분석 결과 섹션 */}
                <div className="md:w-3/5 p-6 md:p-8">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                      <Palette className="w-5 h-5 mr-2 text-teal-500" />
                      세부 퍼스널 컬러 타입
                    </h3>
                    <div className="bg-slate-50/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-slate-700">
                          {detailedTitle}
                        </span>
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full shadow-sm ${
                            result.tone === "warm"
                              ? "bg-amber-50 text-amber-700 border border-amber-100"
                              : "bg-blue-50 text-blue-700 border border-blue-100"
                          }`}
                        >
                          {result.tone === "warm" ? "웜톤" : "쿨톤"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        {detailedDescription}
                      </p>
                    </div>
                  </div>

                  {/* 피부 특성 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">
                      피부 특성
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-50/70 backdrop-blur-sm p-3.5 rounded-2xl shadow-sm border border-white/50">
                        <div className="text-xs text-slate-500 mb-1">명도</div>
                        <div className="text-sm font-medium text-slate-700">
                          {skinBrightness === "light"
                            ? "밝은 톤"
                            : skinBrightness === "deep"
                            ? "어두운 톤"
                            : "중간 톤"}
                        </div>
                      </div>
                      <div className="bg-slate-50/70 backdrop-blur-sm p-3.5 rounded-2xl shadow-sm border border-white/50">
                        <div className="text-xs text-slate-500 mb-1">
                          청탁도
                        </div>
                        <div className="text-sm font-medium text-slate-700">
                          {skinClarity === "clear"
                            ? "선명한 톤"
                            : skinClarity === "muted"
                            ? "흐린 톤"
                            : "중간 톤"}
                        </div>
                      </div>
                      <div className="bg-slate-50/70 backdrop-blur-sm p-3.5 rounded-2xl shadow-sm border border-white/50">
                        <div className="text-xs text-slate-500 mb-1">
                          언더톤
                        </div>
                        <div className="text-sm font-medium text-slate-700">
                          {result.colorValues.skinUndertone === "yellow"
                            ? "황색 베이스"
                            : result.colorValues.skinUndertone === "pink"
                            ? "붉은 베이스"
                            : "중성 베이스"}
                        </div>
                      </div>
                    </div>

                    {/* 피부색 팔레트 */}
                    <div className="mt-5 bg-slate-50/70 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50">
                      <div className="text-xs text-slate-500 mb-3">
                        주요 피부색 팔레트
                      </div>
                      <div className="flex gap-3 justify-center">
                        {dominantColors.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-9 h-9 rounded-full border-2 border-white shadow-md"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 특징 */}
                  <div className="mb-6 bg-slate-50/70 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/50">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">
                      주요 특징
                    </h4>
                    <ul className="space-y-2.5">
                      {characteristics.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check
                            size={16}
                            className="text-teal-500 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 컬러 분석 정보 */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">
                      색상 분석 정보
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50/70 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50">
                        <span className="text-slate-500">ITA 값:</span>
                        <span className="ml-1 font-medium text-slate-700">
                          {Math.round(result.colorMetrics.ita)} (
                          {getITADescription(result.colorMetrics.ita)})
                        </span>
                      </div>
                      <div className="bg-slate-50/70 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50">
                        <span className="text-slate-500">색온도:</span>
                        <span className="ml-1 font-medium text-slate-700">
                          {Math.round(result.colorMetrics.temperature)} (
                          {getTemperatureDescription(
                            result.colorMetrics.temperature
                          )}
                          )
                        </span>
                      </div>
                      <div className="bg-slate-50/70 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50">
                        <span className="text-slate-500">대비:</span>
                        <span className="ml-1 font-medium text-slate-700">
                          {Math.round(result.colorMetrics.contrast)} (
                          {result.colorValues.contrastLevel})
                        </span>
                      </div>
                      <div className="bg-slate-50/70 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/50">
                        <span className="text-slate-500">밝기:</span>
                        <span className="ml-1 font-medium text-slate-700">
                          {Math.round(result.colorMetrics.brightness)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-slate-100/30 bg-slate-50/30 backdrop-blur-sm">
                {/* 추천 컬러 팔레트와 피해야 할 색상 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/60">
                    <h4 className="text-sm font-medium text-slate-700 mb-4">
                      추천 컬러 팔레트
                    </h4>
                    <div className="grid grid-cols-5 gap-3">
                      {bestColors.map((color, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-2xl shadow-md border-2 border-white"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/60">
                    <h4 className="text-sm font-medium text-slate-700 mb-4">
                      피해야 할 색상
                    </h4>
                    <div className="grid grid-cols-5 gap-3">
                      {avoidColors.map((color, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-2xl shadow-md border-2 border-white opacity-80"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 메이크업 팁 및 패션 조언 섹션 */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-6 border border-white/30"
              >
                <div className="mb-4">
                  <h4 className="text-base font-bold text-slate-800 mb-2">
                    메이크업 팁
                  </h4>
                  <p className="text-sm text-slate-600">
                    {makeupTips[resultType]}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-6 border border-white/30"
              >
                <div className="mb-4">
                  <h4 className="text-base font-bold text-slate-800 mb-2">
                    패션 스타일링 조언
                  </h4>
                  <p className="text-sm text-slate-600">
                    {fashionTips[resultType]}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 액션 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
            >
              <button
                onClick={handleReanalyze}
                className="px-5 py-3.5 rounded-2xl text-slate-700 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border border-slate-100 flex items-center justify-center gap-2 text-sm"
              >
                <Camera className="w-5 h-5 text-teal-500" />
                <span>다시 분석하기</span>
              </button>

              <div className="relative">
                <button
                  onClick={handleToggleShare}
                  className={`px-5 py-3.5 rounded-2xl text-white bg-gradient-to-r ${ctaGradient} shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 w-full text-sm`}
                >
                  <Share2 className="w-5 h-5" />
                  <span>결과 공유하기</span>
                </button>

                {showShareOptions && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-2 z-10 border border-white/30 w-[280px]">
                    <button
                      onClick={() => handleShare("copy")}
                      className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-50 text-sm flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 text-slate-600 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                      <span>링크 복사하기</span>
                    </button>

                    {/* 이미지 다운로드 버튼 */}
                    <ResultShareCard
                      title={resultTitle}
                      detailedTitle={detailedTitle}
                      imageUrl={imageUrl}
                      colorItems={bestColors}
                      downloadFileName={`myskinmetrix-${resultType}.png`}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
