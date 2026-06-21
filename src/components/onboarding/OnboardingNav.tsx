import Button from "@/components/ui/Button";

type OnboardingNavProps = {
  steps: number;
  totalSteps: number;
  canGoNext: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
  onFinish: () => void;
};

export function OnboardingNav({
  steps,
  totalSteps,
  canGoNext,
  isSubmitting,
  onPrevious,
  onNext,
  onSkip,
  onFinish,
}: OnboardingNavProps) {
  const isLastStep = steps === totalSteps;

  return (
    <div className="flex justify-between mt-8">
      <div>
        {steps > 1 && <Button variant="secondary" onClick={onPrevious}>Previous</Button>}
      </div>
      <div className="flex gap-3">
        {!isLastStep && <Button variant="secondary" onClick={onSkip}>Skip</Button>}
        {!isLastStep ? (
          <Button variant="primary" onClick={onNext} disabled={!canGoNext}>
            Next
          </Button>
        ) : (
          <Button variant="primary" onClick={onFinish} disabled={isSubmitting}>
            {isSubmitting ? "Finishing..." : "Finish"}
          </Button>
        )}
      </div>
    </div>
  );
}