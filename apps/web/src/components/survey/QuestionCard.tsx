'use client';

import { useState } from 'react';

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
}

export function QuestionCard({
  questionNumber,
  question,
  description,
  options,
  selectedValue,
  onSelect,
  imageUrl
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-8 mb-6 transition-all">
      <div className="flex items-center mb-6">
        <span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-600 rounded-full text-sm font-medium mr-3">
          {questionNumber}
        </span>
        <h2 className="text-xl font-semibold text-slate-800">{question}</h2>
      </div>
      
      {description && (
        <p className="text-slate-600 mb-6 ml-11">{description}</p>
      )}
      
      {imageUrl && (
        <div className="mb-6 ml-11">
          <img 
            src={imageUrl} 
            alt="질문 이미지"
            className="rounded-lg max-w-full h-auto"
          />
        </div>
      )}
      
      <div className="space-y-3 ml-11">
        {options.map((option) => (
          <div
            key={option.id}
            className={`
              p-4 border rounded-lg cursor-pointer transition-all
              ${selectedValue === option.value 
                ? 'border-teal-500 bg-teal-50' 
                : 'border-slate-200 hover:border-teal-200 hover:bg-teal-50/50'}
            `}
            onClick={() => onSelect(option.value)}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                  ${selectedValue === option.value 
                    ? 'border-teal-500 bg-teal-500' 
                    : 'border-slate-300'
                  }
                `}
              >
                {selectedValue === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-slate-700">{option.text}</span>
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
  onSelect
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
    <div className="bg-white rounded-xl shadow-lg border border-teal-100 p-8 mb-6">
      <div className="flex items-center mb-6">
        <span className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-600 rounded-full text-sm font-medium mr-3">
          {questionNumber}
        </span>
        <h2 className="text-xl font-semibold text-slate-800">{question}</h2>
      </div>
      
      {description && (
        <p className="text-slate-600 mb-6 ml-11">{description}</p>
      )}
      
      <div className="ml-11 space-y-6">
        <div className="py-4">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={sliderValue}
            onChange={handleChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
        </div>
        
        <div className="flex justify-between text-sm text-slate-500">
          {labels.length > 0 
            ? labels.map((label, index) => (
                <span key={index} className={
                  index === sliderValue - min ? 'text-teal-600 font-medium' : ''
                }>
                  {label}
                </span>
              ))
            : Array.from({ length: max - min + 1 }, (_, i) => i + min).map((value) => (
                <span key={value} className={
                  value === sliderValue ? 'text-teal-600 font-medium' : ''
                }>
                  {value}
                </span>
              ))}
        </div>
      </div>
    </div>
  );
} 