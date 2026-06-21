import Button from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";

type Item = { key: string | number; label: string };

type OnboardingStepsProps = {
  title: string;
  subtitle: string;
  items: Item[];
  selected: (string | number)[];
  onToggle: (key: string | number) => void;
  layout?: "grid" | "wrap";
  showCount?: boolean;
};

export function OnboardingSteps({
  title,
  subtitle,
  items,
  selected,
  onToggle,
  layout = "grid",
  showCount = false,
}: OnboardingStepsProps) {
  return (
    <div>
      <Heading text={title} className="font-headline text-primary-text text-[24px]" />
      <p className="text-primary-text text-[16px] mt-2">{subtitle}</p>
      <div
        className={
          layout === "grid"
            ? "grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 mt-5"
            : "flex gap-4 mt-5 flex-wrap"
        }
      >
        {items.map((item) => (
          <Button
            key={item.key}
            variant={selected.includes(item.key) ? "primary" : "tertiary"}
            onClick={() => onToggle(item.key)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      {showCount && selected.length > 0 && (
        <p className="text-sm text-primary-text mt-3">{selected.length} selected</p>
      )}
    </div>
  );
}