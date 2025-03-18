interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled?: boolean;
  nextButtonText?: string;
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled = false,
  nextButtonText = '다음'
}: NavigationButtonsProps) {
  const isLastStep = currentStep === totalSteps;
  
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 ? (
        <button
          onClick={onPrevious}
          className="px-6 py-3 border border-teal-200 text-slate-700 rounded-md font-medium hover:bg-teal-50 transition-all"
        >
          이전
        </button>
      ) : (
        <div></div> // 첫 번째 단계에서는 이전 버튼 숨김
      )}
      
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`
          px-6 py-3 rounded-md font-medium transition-all
          ${isNextDisabled 
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
            : 'bg-teal-500 text-white shadow-md hover:bg-teal-600'
          }
        `}
      >
        {isLastStep ? '결과 보기' : nextButtonText}
      </button>
    </div>
  );
} 