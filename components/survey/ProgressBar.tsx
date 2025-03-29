interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-xs md:text-sm text-slate-500 mb-3">
        <div className="flex items-center space-x-2">
          <div className="h-1 w-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
          <span className="font-medium">
            {currentStep} / {totalSteps}
          </span>
        </div>
        <span className="font-medium">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
