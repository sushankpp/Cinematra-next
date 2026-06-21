"use client";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingSteps } from "@/components/onboarding/OnboardingSteps";
import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { OnboardingNav } from "@/components/onboarding/OnboardingNav";

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Nepali", value: "ne" },
  { label: "Hindi", value: "hi" },
];

const RATINGS = [
  { label: "G", value: "G" },
  { label: "PG", value: "PG" },
  { label: "PG-13", value: "PG-13" },
  { label: "R", value: "R" },
  { label: "NC-17", value: "NC-17" },
];

const TOTAL_STEPS = 3;

export default function Onboarding() {
  const {
    steps,
    setSteps,
    genres,
    tags,
    selectedGenres,
    selectedTags,
    selectedLanguages,
    selectedRatings,
    toggleGenre,
    toggleTag,
    toggleLanguage,
    toggleRating,
    handleSubmit,
    isSubmitting,
  } = useOnboarding();

  return (
    <div className="mt-3">
      <Container>
        <Heading
          text="Welcome to Cinematra"
          className="font-headline text-red-text text-[32px]"
        />
        <p className="text-primary-text text-[18px]">
          Answer these few questions to get started!
        </p>

        <StepIndicator steps={steps} total={TOTAL_STEPS} />

        <div className="mt-6">
          {steps === 1 && (
            <OnboardingSteps
              title="What genres do you enjoy?"
              subtitle="Select all that apply"
              items={genres.map((g) => ({ key: g.id, label: g.name }))}
              selected={selectedGenres}
              onToggle={(key) => toggleGenre(key as number)}
              showCount
            />
          )}

          {steps === 2 && (
            <OnboardingSteps
              title="Any specific interests?"
              subtitle="Select all that apply"
              items={tags.map((t) => ({ key: t.id, label: t.name }))}
              selected={selectedTags}
              onToggle={(key) => toggleTag(key as number)}
              showCount
            />
          )}

          {steps === 3 && (
            <div className="flex flex-col gap-8">
              <OnboardingSteps
                title="Preferred language?"
                subtitle="Select all that apply"
                items={LANGUAGES.map((l) => ({ key: l.value, label: l.label }))}
                selected={selectedLanguages}
                onToggle={(key) => toggleLanguage(key as string)}
                layout="wrap"
              />
              <OnboardingSteps
                title="Content rating?"
                subtitle="Select what you're comfortable with"
                items={RATINGS.map((r) => ({ key: r.value, label: r.label }))}
                selected={selectedRatings}
                onToggle={(key) => toggleRating(key as string)}
                layout="wrap"
              />
            </div>
          )}

          <OnboardingNav
            steps={steps}
            totalSteps={TOTAL_STEPS}
            canGoNext={!(steps === 1 && selectedGenres.length === 0)}
            isSubmitting={isSubmitting}
            onPrevious={() => setSteps(steps - 1)}
            onNext={() => setSteps(steps + 1)}
            onSkip={() => setSteps(steps + 1)}
            onFinish={handleSubmit}
          />
        </div>
      </Container>
    </div>
  );
}
