export function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block font-body text-xs text-primary-text/60 font-medium">
        {label}
        {required && <span className="text-primary-active ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}