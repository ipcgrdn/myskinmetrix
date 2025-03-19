"use client";

import { Loader2 } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { ProgressBar } from "@/components/survey/ProgressBar";
import { NavigationButtons } from "@/components/survey/NavigationButtons";
import { QuestionCard, SliderQuestion } from "@/components/survey/QuestionCard";

import {
  surveyQuestions,
  SurveyData,
  saveUserSurveyData,
  getUserSurveyData,
  saveLastCompletedStep,
  getQuestionsByCategory,
  categoryTitles,
} from "@/lib/surveyData";
import { getUserId } from "@/lib/userIdentifier";

export default function SurveyStep() {
  const router = useRouter();
  const params = useParams();
  const stepParam = params.step as string;
  const currentStep = parseInt(stepParam, 10);

  const [answers, setAnswers] = useState<SurveyData>({});
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  const [_, setUserId] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("");

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

    const id = getUserId();
    setUserId(id);

    // 현재 질문의 카테고리 설정
    if (currentQuestion) {
      setCurrentCategory(currentQuestion.category);
    }

    // 저장된 응답 데이터 로드
    const savedData = getUserSurveyData();
    if (savedData) {
      setAnswers(savedData);
      // 현재 질문에 대한 저장된 응답이 있으면 설정
      if (currentQuestion && savedData[currentQuestion.id] !== undefined) {
        setCurrentAnswer(savedData[currentQuestion.id]);
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
  const handleSelect = (value: any) => {
    setCurrentAnswer(value);
  };

  // 다음 단계로 이동
  const handleNext = () => {
    // 현재 응답 저장
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: currentAnswer,
    };

    setAnswers(updatedAnswers);
    saveUserSurveyData(updatedAnswers);
    saveLastCompletedStep(currentStep);

    // 마지막 질문이면 결과 페이지로 이동
    if (currentStep === surveyQuestions.length) {
      router.push("/result");
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
  const currentCategoryQuestions = getQuestionsByCategory(currentQuestion.category);
  const categoryQuestionCount = currentCategoryQuestions.length;
  
  // 현재 카테고리 내에서의 질문 번호 계산
  const categoryQuestionIndex = currentCategoryQuestions.findIndex((q) => q.id === currentQuestion.id) + 1;

  // 다음 버튼 활성화 여부 (체크박스는 항상 넘어갈 수 있음)
  const isNextDisabled =
    currentQuestion.type !== "checkbox" && currentAnswer === null;

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
      <main className="container mx-auto px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={surveyQuestions.length}
          />
          
          {/* 카테고리 제목 표시 */}
          <div className="mb-4 text-center">
            <div className="bg-cyan-100 inline-block px-4 py-2 rounded-full mb-2">
              <h3 className="text-cyan-800 font-medium text-sm">
                {categoryTitles[currentQuestion.category]}
              </h3>
            </div>
            <div className="text-xs text-slate-500">
              질문 {categoryQuestionIndex}/{categoryQuestionCount} · 전체 {currentStep}/{surveyQuestions.length}
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
              selectedValue={currentAnswer}
              onSelect={handleSelect}
            />
          ) : (
            <QuestionCard
              questionNumber={categoryQuestionIndex}
              question={currentQuestion.question}
              description={currentQuestion.description}
              options={currentQuestion.options || []}
              selectedValue={currentAnswer}
              onSelect={handleSelect}
              imageUrl={currentQuestion.imageUrl}
              type={currentQuestion.type}
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
