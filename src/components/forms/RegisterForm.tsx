"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/schemas/registerSchema";
import { getPasswordStrength } from "@/lib/passwordStrength";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { useLoading } from "@/context/LoadingContext";
import { useAuth } from "@/hooks/useAuth";

export function RegisterForm() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const { refreshUser } = useAuth();

  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    showLoading();

    const { data: res, error } = await authService.register({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    if (error) {
      hideLoading();
      setServerError(error);
      return;
    }

    if (res) {
      await refreshUser();
      router.push("/");
      hideLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {serverError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
          <p className="text-red-text text-sm">{serverError}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <Input
            placeholder="First Name"
            {...register("firstName")}
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

          {errors.firstName && (
            <p className="text-red-text text-sm mt-2">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <Input
            placeholder="Last Name"
            {...register("lastName")}
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

          {errors.lastName && (
            <p className="text-red-text text-sm mt-2">
              {errors.lastName.message}
            </p>
          )}
        </div>

      </div>

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
          <p className="text-red-text text-sm mt-2">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Input
          type="tel"
          placeholder="Phone Number"
          {...register("phone")}
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

        {errors.phone && (
          <p className="text-red-text text-sm mt-2">
            {errors.phone.message}
          </p>
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
          className="absolute right-4 top-3"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeClosed className="text-tertiary-Shade" size={20} />
          ) : (
            <Eye className="text-tertiary-Shade" size={20} />
          )}
        </Button>

        {password && (
          <div className="mt-3">

            <div className="h-1 rounded-full bg-neutral-default">

              <div
                className={`h-1 rounded-full transition-all ${getPasswordStrength(password)?.width} ${getPasswordStrength(password)?.color}`}
              />

            </div>

            <p className="text-primary-text text-sm mt-2">
              Strength: {getPasswordStrength(password)?.label}
            </p>

          </div>
        )}

        {errors.password && (
          <p className="text-red-text text-sm mt-2">
            {errors.password.message}
          </p>
        )}

      </div>

      <div className="relative">

        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          {...register("confirmPassword")}
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

        {errors.confirmPassword && (
          <p className="text-red-text text-sm mt-2">
            {errors.confirmPassword.message}
          </p>
        )}

      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        text={isSubmitting ? "Creating Account..." : "Create Account"}
        className="
        w-full
        justify-center
        rounded-xl
        bg-red-500
        p-3
        hover:opacity-90
        mt-4
        "
      />

    </form>
  );
}