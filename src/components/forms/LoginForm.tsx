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
    console.log(data);

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
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        serverError && (
          <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{serverError}</p>
          </div>
        )
      }
      <div className="relative">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full placeholder:text-charcoal-500 text-white bg-blue-150 active:bg-blue-200 focus:ring-blue-50 border-none p-3 rounded-md focus:ring-2 transition-all duration-200"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
        )}
      </div>
      <div className="relative mt-4 mb-4">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          {...register("password")}
          className="w-full placeholder:text-charcoal-500 text-white bg-blue-150 active:bg-blue-200 focus:ring-blue-50 border-none p-3 rounded-md focus:ring-2 transition-all duration-200"
        />
        {errors.password && (
          <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>
        )}
        <Button
          type="button"
          variant="none"
          className="absolute right-3 top-3 p-0 h-auto"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeClosed size={20} className="text-charcoal-500" />
          ) : (
            <Eye size={20} className="text-charcoal-500" />
          )}
        </Button>
      </div>
      <Link
        href="/forgot-password"
        className="text-brand-100 hover:text-gold-100 underline"
      >
        Forgot your password?
      </Link>
      <Button
        type="submit"
        text={isSubmitting ? "Logging in..." : "Log In"}
        className="w-full justify-center rounded-md bg-blue-100 p-3 hover:bg-blue-50 mt-8"
      />
    </form>
  );
}
