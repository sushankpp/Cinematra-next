export function StepIndicator({ steps, total = 3 }: { steps: number; total?: number }) {
  return (
    <div className="flex gap-2 mt-4">
      {Array.from({ length: total }, (_, i) => i + 1).map((s) => (
        <div
          key={s}
          className={`h-1 w-12 rounded-full ${
            s <= steps ? "bg-red-text" : "bg-primary-text/20"
          }`}
        />
      ))}
    </div>
  );
}