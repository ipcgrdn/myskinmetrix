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
  nextButtonText = "다음",
}: NavigationButtonsProps) {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 ? (
        <button
          onClick={onPrevious}
          className="px-6 py-2 border border-cyan-500 text-slate-700 rounded-md font-medium hover:bg-cyan-50 transition-all text-sm md:text-base"
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
          px-6 py-2 rounded-md font-medium transition-all text-sm md:text-base
          ${
            isNextDisabled
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-cyan-500 text-white shadow-md hover:bg-cyan-600"
          }
        `}
      >
        {isLastStep ? "완료" : nextButtonText}
      </button>
    </div>
  );
}
