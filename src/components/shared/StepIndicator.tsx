interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                  index + 1 <= currentStep
                    ? 'bg-[#00A859] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-xs text-center ${
                  index + 1 <= currentStep ? 'text-[#00A859]' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 mb-8 rounded ${
                  index + 1 < currentStep ? 'bg-[#00A859]' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
