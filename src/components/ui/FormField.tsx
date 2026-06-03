export function FormField({
  label,
  name,
  value,
  onChange,
  disabled = false,
  placeholder,
}: {
  label: string;
  name?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block mb-2 text-sm text-tertiary-Shade">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full rounded-xl px-4 py-3 outline-none border
          ${
            disabled
              ? "bg-black/20 border-white/5 opacity-60 cursor-not-allowed"
              : "bg-black/30 border-white/10 focus:border-red-500"
          }`}
      />
    </div>
  );
}
