export const getPasswordStrength = (password: string) => {
  if (!password) return null;

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", color: "bg-red-400", width: "w-1/4" };
  if (score === 2)
    return { label: "Fair", color: "bg-yellow-400", width: "w-1/2" };
  if (score === 3)
    return { label: "Good", color: "bg-blue-400", width: "w-3/4" };
  if (score >= 4)
    return { label: "Strong", color: "bg-green-400", width: "w-full" };
};
