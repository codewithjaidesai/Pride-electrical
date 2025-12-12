'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  stepLabels,
}: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className="flex flex-1 items-center"
          >
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step < currentStep
                    ? 'bg-green-600 text-white'
                    : step === currentStep
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step < currentStep ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`mt-2 text-xs sm:text-sm font-medium text-center ${
                  step <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {stepLabels[step - 1]}
              </span>
            </div>
            {step < totalSteps && (
              <div
                className={`h-1 flex-1 mx-2 rounded ${
                  step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
