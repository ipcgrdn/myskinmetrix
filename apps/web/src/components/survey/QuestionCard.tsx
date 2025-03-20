"use client";

import Image from "next/image";
import { useState } from "react";

// 옵션 값 타입 정의
export type OptionValue = number | string | string[];

export interface Option {
  id: string;
  text: string;
  value: string | number;
}

interface QuestionCardProps {
  questionNumber: number;
  question: string;
  description?: string;
  options: Option[];
  selectedValue?: OptionValue;
  onSelect: (value: OptionValue) => void;
  imageUrl?: string;
  type?: "radio" | "checkbox" | "slider";
  onTimingUpdate?: (timing: { questionId: string; startTime: number; endTime: number }) => void;
}

export function QuestionCard({
  questionNumber,
  question,
  description,
  options,
  selectedValue,
  onSelect,
  imageUrl,
  type = "radio",
  onTimingUpdate,
}: QuestionCardProps) {
  const [startTime] = useState(() => Date.now());

  const handleSelect = (value: OptionValue) => {
    if (onTimingUpdate) {
      onTimingUpdate({
        questionId: `Q${questionNumber}`,
        startTime,
        endTime: Date.now()
      });
    }
    onSelect(value);
  };

  // 체크박스 타입인 경우 CheckboxQuestion 컴포넌트 사용
  if (type === "checkbox") {
    return (
      <CheckboxQuestion
        questionNumber={questionNumber}
        question={question}
        description={description}
        options={options}
        selectedValues={Array.isArray(selectedValue) ? selectedValue : []}
        onSelect={(values) => handleSelect(values)}
        imageUrl={imageUrl}
      />
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 md:p-6 mb-6 transition-all duration-300 hover:shadow-xl hover:bg-white/70">
      <div className="flex items-center mb-4 md:mb-6 gap-3">
        <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 md:w-8 md:h-8 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-600 rounded-full text-xs md:text-sm font-medium">
          {questionNumber}
        </span>
        <h2 className="text-sm md:text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800 leading-tight">
          {question}
        </h2>
      </div>

      {description && (
        <p className="text-slate-600 mb-4 md:mb-6 ml-9 text-xs md:text-sm">
          {description}
        </p>
      )}

      {imageUrl && (
        <div className="relative mb-4 md:mb-6 ml-9 w-full h-48">
          <Image
            src={imageUrl}
            alt="질문 이미지"
            fill
            className="rounded-xl object-cover shadow-md"
          />
        </div>
      )}

      <div className="space-y-2 md:space-y-3 md:ml-9">
        {options.map((option) => (
          <div
            key={option.id}
            className={`
              p-3 md:p-4 border rounded-xl cursor-pointer transition-all duration-200
              ${
                selectedValue === option.value
                  ? "border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-md"
                  : "border-slate-100 hover:border-cyan-100 hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50"
              }
            `}
            onClick={() => handleSelect(option.value)}
          >
            <div className="flex items-start">
              <div
                className={`flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 transition-all duration-200
                  ${
                    selectedValue === option.value
                      ? "border-cyan-500 bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "border-slate-300"
                  }
                `}
              >
                {selectedValue === option.value && (
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-slate-700 text-xs md:text-sm leading-relaxed">
                {option.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 체크박스 다중선택 컴포넌트
export function CheckboxQuestion({
  questionNumber,
  question,
  description,
  options,
  selectedValues = [],
  onSelect,
  imageUrl,
}: {
  questionNumber: number;
  question: string;
  description?: string;
  options: Option[];
  selectedValues: string[];
  onSelect: (values: string[]) => void;
  imageUrl?: string;
}) {
  // 체크박스 토글 핸들러
  const handleToggle = (value: string) => {
    let newValues;
    if (selectedValues.includes(value)) {
      // 이미 선택된 값이면 제거
      newValues = selectedValues.filter((v) => v !== value);
    } else {
      // 선택되지 않은 값이면 추가
      newValues = [...selectedValues, value];
    }
    onSelect(newValues);
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 md:p-6 mb-6 transition-all duration-300 hover:shadow-xl hover:bg-white/70">
      <div className="flex items-start mb-4 md:mb-6 gap-3">
        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-600 rounded-full text-xs md:text-sm font-medium">
          {questionNumber}
        </span>
        <h2 className="text-sm md:text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800 leading-tight">
          {question}
        </h2>
      </div>

      {description && (
        <p className="text-slate-600 mb-4 md:mb-6 ml-9 text-xs md:text-sm">
          {description}
        </p>
      )}

      {imageUrl && (
        <div className="relative mb-4 md:mb-6 ml-9 w-full h-48">
          <Image
            src={imageUrl}
            alt="질문 이미지"
            fill
            className="rounded-xl object-cover shadow-md"
          />
        </div>
      )}

      <div className="space-y-2 md:space-y-3 ml-9">
        {options.map((option) => (
          <div
            key={option.id}
            className={`
              p-3 md:p-4 border rounded-xl cursor-pointer transition-all duration-200
              ${
                selectedValues.includes(option.value.toString())
                  ? "border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-md"
                  : "border-slate-100 hover:border-cyan-100 hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50"
              }
            `}
            onClick={() => handleToggle(option.value.toString())}
          >
            <div className="flex items-start">
              <div
                className={`flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-lg border-2 flex items-center justify-center mr-3 mt-0.5 transition-all duration-200
                  ${
                    selectedValues.includes(option.value.toString())
                      ? "border-cyan-500 bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "border-slate-300"
                  }
                `}
              >
                {selectedValues.includes(option.value.toString()) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2 w-2 md:h-3 md:w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-slate-700 text-xs md:text-sm leading-relaxed">
                {option.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SliderQuestion({
  questionNumber,
  question,
  description,
  min = 1,
  max = 10,
  step = 1,
  labels = [],
  selectedValue = 5,
  onSelect,
}: {
  questionNumber: number;
  question: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  labels?: string[];
  selectedValue?: number;
  onSelect: (value: number) => void;
}) {
  const [sliderValue, setSliderValue] = useState(selectedValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
    onSelect(newValue);
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6 transition-all duration-300 hover:shadow-xl hover:bg-white/70">
      <div className="flex items-center mb-6 flex-col md:flex-row gap-2 md:gap-0">
        <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-600 rounded-full text-sm font-medium mr-3">
          {questionNumber}
        </span>
        <h2 className="text-base md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-800 to-blue-800">
          {question}
        </h2>
      </div>

      {description && (
        <p className="text-slate-600 mb-6 md:ml-11 text-sm md:text-base">
          {description}
        </p>
      )}

      <div className="mx-0 md:mx-4 md:ml-11 space-y-6">
        <div className="py-4">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={sliderValue || ""}
            onChange={handleChange}
            className="w-full h-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-500 [&::-webkit-slider-thumb]:to-blue-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-cyan-500/20 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white transition-all duration-300"
          />
        </div>

        <div className="flex justify-between text-sm text-slate-500">
          {labels.length > 0
            ? labels.map((label, index) => (
                <span
                  key={index}
                  className={
                    index === sliderValue - min
                      ? "text-cyan-600 font-medium scale-110 transition-all duration-200"
                      : ""
                  }
                >
                  {label}
                </span>
              ))
            : Array.from({ length: max - min + 1 }, (_, i) => i + min).map(
                (value) => (
                  <span
                    key={value}
                    className={
                      value === sliderValue
                        ? "text-cyan-600 font-medium scale-110 transition-all duration-200"
                        : ""
                    }
                  >
                    {value}
                  </span>
                )
              )}
        </div>
      </div>
    </div>
  );
}
