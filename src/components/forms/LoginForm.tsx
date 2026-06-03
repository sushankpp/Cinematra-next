"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/loginSchema";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    const { data: res, error } = await authService.login({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setServerError(error);
      return;
    }

    if (res) {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
          <p className="text-red-text text-sm">{serverError}</p>
        </div>
      )}

      <div>
        <Input
          type="email"
          placeholder="Email Address"
          {...register("email")}
          className="
          w-full
          bg-neutral-Shade
          text-primary-text
          placeholder:text-tertiary-Shade
          border border-white/10
          rounded-xl
          p-3
          focus:ring-2
          focus:ring-red-500/40
          "
        />

        {errors.email && (
          <p className="text-red-text text-sm mt-2">{errors.email.message}</p>
        )}
      </div>

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password")}
          className="
          w-full
          bg-neutral-Shade
          text-primary-text
          placeholder:text-tertiary-Shade
          border border-white/10
          rounded-xl
          p-3
          focus:ring-2
          focus:ring-red-500/40
          "
        />

        <Button
          type="button"
          variant="none"
          className="absolute right-0 top-2"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeClosed className="text-tertiary-Shade" size={20} />
          ) : (
            <Eye className="text-tertiary-Shade" size={20} />
          )}
        </Button>

        {errors.password && (
          <p className="text-red-text text-sm mt-2">
            {errors.password.message}
          </p>
        )}
      </div>

      <Link
        href="/forgot-password"
        className="
        text-secondary-default
        underline
        hover:text-primary-text
        transition
        "
      >
        Forgot your password?
      </Link>

      <Button
        type="submit"
        text={isSubmitting ? "Logging in..." : "Log In"}
        className="
        w-full
        justify-center
        rounded-xl
        bg-red-500
        p-3 mt-2
        hover:opacity-90
        "
      />
    </form>
  );
}
