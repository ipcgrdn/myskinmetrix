"use client";

import { useState } from "react";

export interface Option {
  id: string;
  text: string;
  value: any;
}

interface QuestionCardProps {
  questionNumber: number;
  question: string;
  description?: string;
  options: Option[];
  selectedValue?: any;
  onSelect: (value: any) => void;
  imageUrl?: string;
  type?: string;
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
}: QuestionCardProps) {
  // 체크박스 타입인 경우 CheckboxQuestion 컴포넌트 사용
  if (type === "checkbox") {
    return (
      <CheckboxQuestion
        questionNumber={questionNumber}
        question={question}
        description={description}
        options={options}
        selectedValues={selectedValue || []}
        onSelect={onSelect}
        imageUrl={imageUrl}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-cyan-100 p-4 md:p-8 mb-6 transition-all">
      <div className="flex items-center mb-6 flex-col md:flex-row gap-2 md:gap-0">
        <span className="flex items-center justify-center w-8 h-8 bg-cyan-100 text-cyan-600 rounded-full text-sm font-medium mr-3">
          {questionNumber}
        </span>
        <h2 className="text-base md:text-lg font-semibold text-slate-800">
          {question}
        </h2>
      </div>

      {description && (
        <p className="text-slate-600 mb-6 md:ml-11 text-sm md:text-base">
          {description}
        </p>
      )}

      {imageUrl && (
        <div className="mb-6 md:ml-11">
          <img
            src={imageUrl}
            alt="질문 이미지"
            className="rounded-lg max-w-full h-auto"
          />
        </div>
      )}

      <div className="space-y-3 md:ml-11">
        {options.map((option) => (
          <div
            key={option.id}
            className={`
              p-4 border rounded-lg cursor-pointer transition-all
              ${
                selectedValue === option.value
                  ? "border-cyan-500 bg-cyan-50"
                  : "border-slate-200 hover:border-cyan-200 hover:bg-cyan-50/50"
              }
            `}
            onClick={() => onSelect(option.value)}
          >
            <div className="flex items-center">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3
                  ${
                    selectedValue === option.value
                      ? "border-cyan-500 bg-cyan-500"
                      : "border-slate-300"
                  }
                `}
              >
                {selectedValue === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-slate-700 text-sm md:text-base">
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
      newValues = selectedValues.filter(v => v !== value);
    } else {
      // 선택되지 않은 값이면 추가
      newValues = [...selectedValues, value];
    }
    onSelect(newValues);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-cyan-100 p-4 md:p-8 mb-6 transition-all">
      <div className="flex items-center mb-6 flex-col md:flex-row gap-2 md:gap-0">
        <span className="flex items-center justify-center w-8 h-8 bg-cyan-100 text-cyan-600 rounded-full text-sm font-medium mr-3">
          {questionNumber}
        </span>
        <h2 className="text-base md:text-lg font-semibold text-slate-800">
          {question}
        </h2>
      </div>

      {description && (
        <p className="text-slate-600 mb-6 md:ml-11 text-sm md:text-base">
          {description}
        </p>
      )}

      {imageUrl && (
        <div className="mb-6 md:ml-11">
          <img
            src={imageUrl}
            alt="질문 이미지"
            className="rounded-lg max-w-full h-auto"
          />
        </div>
      )}

      <div className="space-y-3 md:ml-11">
        {options.map((option) => (
          <div
            key={option.id}
            className={`
              p-4 border rounded-lg cursor-pointer transition-all
              ${
                selectedValues.includes(option.value)
                  ? "border-cyan-500 bg-cyan-50"
                  : "border-slate-200 hover:border-cyan-200 hover:bg-cyan-50/50"
              }
            `}
            onClick={() => handleToggle(option.value)}
          >
            <div className="flex items-center">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center mr-3
                  ${
                    selectedValues.includes(option.value)
                      ? "border-cyan-500 bg-cyan-500"
                      : "border-slate-300"
                  }
                `}
              >
                {selectedValues.includes(option.value) && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3 text-white" 
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
              <span className="text-slate-700 text-sm md:text-base">
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
    <div className="bg-white rounded-xl shadow-lg border border-cyan-100 p-4 md:p-8 mb-6">
      <div className="flex items-center mb-6 flex-col md:flex-row gap-2 md:gap-0">
        <span className="flex items-center justify-center w-8 h-8 bg-cyan-100 text-cyan-600 rounded-full text-sm font-medium mr-3">
          {questionNumber}
        </span>
        <h2 className="text-base md:text-xl font-semibold text-slate-800">
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
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        <div className="flex justify-between text-sm text-slate-500">
          {labels.length > 0
            ? labels.map((label, index) => (
                <span
                  key={index}
                  className={
                    index === sliderValue - min
                      ? "text-cyan-600 font-medium"
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
                      value === sliderValue ? "text-cyan-600 font-medium" : ""
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
