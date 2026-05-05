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

export function RegisterForm() {
  const router = useRouter();
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

    const { data: res, error } = await authService.register({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    if (error) {
      setServerError(error);
      return;
    }

    if (res) {
      router.push("/");
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">{serverError}</p>
        </div>
      )}
      <div className="relative grid md:grid-cols-2 gap-4">
        <div className="relative">
          <label htmlFor="firstName" className="sr-only">
            First Name
          </label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            {...register("firstName")}
            className="w-full placeholder:text-charcoal-500 text-white bg-blue-150 active:bg-blue-200 focus:ring-blue-50 border-none p-3 rounded-md focus:ring-2 transition-all duration-200"
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm mt-2">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="lastName" className="sr-only">
            Last Name
          </label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            {...register("lastName")}
            className="w-full placeholder:text-charcoal-500 text-white bg-blue-150 active:bg-blue-200 focus:ring-blue-50 border-none p-3 rounded-md focus:ring-2 transition-all duration-200"
          />
          {errors.lastName && (
            <p className="text-red-400 text-sm mt-2">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      <div className="relative mt-4 mb-4">
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
        <label htmlFor="phone" className="sr-only">
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          {...register("phone")}
          className="w-full placeholder:text-charcoal-500 text-white bg-blue-150 active:bg-blue-200 focus:ring-blue-50 border-none p-3 rounded-md focus:ring-2 transition-all duration-200"
        />
        {errors.phone && (
          <p className="text-red-400 text-sm mt-2">{errors.phone.message}</p>
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
        <Button
          type="button"
          variant="none"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
          className="absolute right-3 top-3 p-0 h-auto"
        >
          {showPassword ? (
            <EyeClosed size={20} className="text-charcoal-500" />
          ) : (
            <Eye size={20} className="text-charcoal-500" />
          )}
        </Button>
        {password && (
          <div className="mt-2">
            <div className="h-1 w-full bg-charcoal-500 rounded-full">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrength(password)?.color} ${getPasswordStrength(password)?.width}`}
              ></div>
            </div>
            <p className="text-sm mt-1 text-charcoal-100">
              Strength:
              <span className="font-medium">
                {getPasswordStrength(password)?.label}
              </span>
            </p>
          </div>
        )}
        {errors.password && (
          <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>
        )}
      </div>
      <div className="relative mt-4 mb-4">
        <label htmlFor="confirmPassword" className="sr-only">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm your password"
          {...register("confirmPassword")}
          className="w-full placeholder:text-charcoal-500 text-white bg-blue-150 active:bg-blue-200 focus:ring-blue-50 border-none p-3 rounded-md focus:ring-2 transition-all duration-200"
        />
        <Button
          type="button"
          variant="none"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-3 p-0 h-auto"
        >
          {showPassword ? (
            <EyeClosed size={20} className="text-charcoal-500" />
          ) : (
            <Eye size={20} className="text-charcoal-500" />
          )}
        </Button>
        {errors.confirmPassword && (
          <p className="text-red-400 text-sm mt-2">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        text={isSubmitting ? "Creating Account..." : "Create Account"}
        disabled={isSubmitting}
        className="w-full justify-center rounded-md bg-blue-100 p-3 hover:bg-blue-50 mt-8"
      />
    </form>
  );
}
