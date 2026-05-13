import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Button from "../ui/Button";

type TrendingControlsProps = {
  onPrev: () => void;
  onNext: () => void;
};

export default function TrendingControls({
  onPrev,
  onNext,
}: TrendingControlsProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onPrev}
        className="text-charcoal-800 hover:bg-charcoal-100/40"
        variant="ghost"
        icon={<ArrowLeftCircle />}
        />
      <Button
        onClick={onNext}
        className="text-charcoal-800 hover:bg-charcoal-100/40"
        variant="ghost"
        icon={<ArrowRightCircle />}
      />
    </div>
  );
}
