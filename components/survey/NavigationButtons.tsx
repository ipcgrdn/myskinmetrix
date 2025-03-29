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
    <div className="flex justify-between mt-8 gap-4">
      {currentStep > 1 ? (
        <button
          onClick={onPrevious}
          className="flex-1 px-4 md:px-6 py-2 md:py-3 border border-cyan-200 text-slate-700 rounded-xl font-medium hover:bg-cyan-50/50 active:scale-[0.98] transition-all duration-200 text-sm md:text-base backdrop-blur-sm bg-white/60 shadow-sm"
        >
          이전
        </button>
      ) : (
        <div className="flex-1"></div>
      )}

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`
          flex-1 px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-200 text-sm md:text-base backdrop-blur-sm
          ${
            isNextDisabled
              ? "bg-slate-100/80 text-slate-400 cursor-not-allowed border border-slate-200"
              : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-[0.98]"
          }
        `}
      >
        {isLastStep ? "완료" : nextButtonText}
      </button>
    </div>
  );
}
