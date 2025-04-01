"use client";

import { Loader2 } from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { ProgressBar } from "@/components/survey/ProgressBar";
import { NavigationButtons } from "@/components/survey/NavigationButtons";
import {
  QuestionCard,
  SliderQuestion,
  OptionValue,
} from "@/components/survey/QuestionCard";

import {
  surveyQuestions,
  SurveyData,
  saveUserSurveyData,
  getUserSurveyData,
  saveLastCompletedStep,
  getQuestionsByCategory,
  categoryTitles,
} from "@/lib/surveyData";
import Header from "@/components/Header";

export default function SurveyStep() {
  const router = useRouter();
  const params = useParams();
  const stepParam = params.step as string;
  const currentStep = parseInt(stepParam, 10);

  const [answers, setAnswers] = useState<SurveyData>({});
  const [currentAnswer, setCurrentAnswer] = useState<OptionValue | null>(null);
  const [surveyMetadata, setSurveyMetadata] = useState<Required<NonNullable<SurveyData['metadata']>>>(() => {
    const savedData = getUserSurveyData();
    return savedData?.metadata || {
      timings: [],
      startedAt: Date.now(),
      completedAt: 0
    };
  });

  // 현재 질문 가져오기
  const currentQuestion = surveyQuestions[currentStep - 1];

  // 사용자 ID 및 기존 응답 데이터 로드
  useEffect(() => {
    // 올바른 단계 번호인지 확인
    if (
      isNaN(currentStep) ||
      currentStep < 1 ||
      currentStep > surveyQuestions.length
    ) {
      router.push("/survey/1");
      return;
    }

    // 저장된 응답 데이터 로드
    const savedData = getUserSurveyData();
    if (savedData) {
      setAnswers(savedData);
      // 현재 질문에 대한 저장된 응답이 있으면 설정
      if (
        currentQuestion &&
        savedData[currentQuestion.id as keyof SurveyData] !== undefined
      ) {
        setCurrentAnswer(
          savedData[currentQuestion.id as keyof SurveyData] as OptionValue
        );
      } else if (currentQuestion && currentQuestion.type === "checkbox") {
        // 체크박스 타입이고 저장된 응답이 없으면 빈 배열로 초기화
        setCurrentAnswer([]);
      }
    } else if (currentQuestion && currentQuestion.type === "checkbox") {
      // 저장된 데이터가 없고 체크박스 타입인 경우 빈 배열로 초기화
      setCurrentAnswer([]);
    }
  }, [currentStep, router, currentQuestion]);

  // 답변 선택 처리
  const handleSelect = (value: OptionValue) => {
    setCurrentAnswer(value);
  };

  // 응답 시간 업데이트 처리
  const handleTimingUpdate = (timing: { questionId: string; startTime: number; endTime: number }) => {
    setSurveyMetadata(prev => ({
      ...prev,
      timings: [...prev.timings, timing]
    }));
  };

  // 다음 단계로 이동
  const handleNext = () => {
    // 현재 응답 저장
    const updatedAnswers: SurveyData = {
      ...answers,
      [currentQuestion.id]: currentAnswer,
      metadata: {
        ...surveyMetadata,
        completedAt: currentStep === surveyQuestions.length ? Date.now() : surveyMetadata.completedAt
      }
    };

    setAnswers(updatedAnswers);
    saveUserSurveyData(updatedAnswers);
    saveLastCompletedStep(currentStep);

    // 마지막 질문이면 결과 페이지로 이동
    if (currentStep === surveyQuestions.length) {
      router.push("/survey/result");
    } else {
      router.push(`/survey/${currentStep + 1}`);
    }
  };

  // 이전 단계로 이동
  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(`/survey/${currentStep - 1}`);
    }
  };

  // 질문이 로드되지 않은 경우
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // 현재 카테고리의 질문 수 계산
  const currentCategoryQuestions = getQuestionsByCategory(
    currentQuestion.category
  );

  // 현재 카테고리 내에서의 질문 번호 계산
  const categoryQuestionIndex =
    currentCategoryQuestions.findIndex((q) => q.id === currentQuestion.id) + 1;

  // 다음 버튼 활성화 여부 (체크박스는 항상 넘어갈 수 있음)
  const isNextDisabled =
    currentQuestion.type !== "checkbox" && currentAnswer === null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/70 via-slate-50/70 to-white">
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 md:px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={surveyQuestions.length}
          />

          {/* 카테고리 제목 표시 */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50/50 backdrop-blur-sm border border-cyan-100/20">
              <div className="h-px w-4 bg-cyan-500/50"></div>
              <h3 className="text-cyan-600 font-medium text-xs">
                {categoryTitles[currentQuestion.category]}
              </h3>
              <div className="h-px w-4 bg-cyan-500/50"></div>
            </div>
          </div>

          {/* 질문 표시 */}
          {currentQuestion.type === "slider" ? (
            <SliderQuestion
              questionNumber={categoryQuestionIndex}
              question={currentQuestion.question}
              description={currentQuestion.description}
              min={currentQuestion.sliderConfig?.min || 1}
              max={currentQuestion.sliderConfig?.max || 10}
              step={currentQuestion.sliderConfig?.step || 1}
              labels={currentQuestion.sliderConfig?.labels}
              selectedValue={currentAnswer as number}
              onSelect={handleSelect}
            />
          ) : (
            <QuestionCard
              questionNumber={categoryQuestionIndex}
              question={currentQuestion.question}
              description={currentQuestion.description}
              options={currentQuestion.options || []}
              selectedValue={currentAnswer as OptionValue}
              onSelect={handleSelect}
              imageUrl={currentQuestion.imageUrl}
              type={currentQuestion.type as "radio" | "checkbox"}
              onTimingUpdate={handleTimingUpdate}
            />
          )}

          {/* 네비게이션 버튼 */}
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={surveyQuestions.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isNextDisabled={isNextDisabled}
          />
        </div>
      </main>
    </div>
  );
}
