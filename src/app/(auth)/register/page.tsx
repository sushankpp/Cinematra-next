"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/schemas/registerSchema";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight, Eye } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import Input from "@/components/ui/Input";
import Link from "@/components/ui/Link";
import AuthOR from "@/components/ui/AuthOR";

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data);
  };

  const handleGoBack = () => {
    router.push("/");
  };
  return (
    <div className="flex p-3 max-w-[1000px] w-full min-h-[600px] bg-charcoal-600 rounded-md justify-center items-center mx-auto my-auto shadow-lg ">
      <div className="w-[500px] self-stretch relative overflow-hidden">
        <Image
          src="/register-image.jpg"
          alt="Register Image"
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
        <Button
          onClick={handleGoBack}
          text="Back to website"
          icon={<ArrowRight size={20} />}
          iconPosition="right"
          variant="ghost"
          className="absolute top-4 right-4 text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
        />
      </div>
      <div className="w-[600px] h-full p-10 px-20">
        <div className="mb-6">
          <Heading
            level={1}
            text="Create an Account"
            className="text-gold-50 text-[40px] font-medium"
          />
          <p className="text-charcoal-100">
            Already have an account?
            <Link
              href="/login"
              className="text-brand-100 ml-2 hover:text-gold-100 underline"
            >
              Log in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <p className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </p>
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
              <p className="text-red-400 text-sm mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="relative mt-4 mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full placeholder:text-charcoal-500 text-white bg-blue-150 active:bg-blue-200 focus:ring-blue-50 border-none p-3 rounded-md focus:ring-2 transition-all duration-200"
            />
            <Button
              type="button"
              variant="none"
              className="absolute right-3 top-3 p-0 h-auto"
            >
              <Eye size={20} className="text-charcoal-500" />
            </Button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="relative mt-4 mb-4">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full placeholder:text-charcoal-500 text-white bg-blue-150 active:bg-blue-200 focus:ring-blue-50 border-none p-3 rounded-md focus:ring-2 transition-all duration-200"
            />
            <Button
              type="button"
              variant="none"
              className="absolute right-3 top-3 p-0 h-auto"
            >
              <Eye size={20} className="text-charcoal-500" />
            </Button>
            {
              errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.confirmPassword.message}
                </p>
              )
            }
          </div>
          <Button
            type="submit"
            text="Create Account"
            className="w-full justify-center rounded-md bg-blue-100 p-3 hover:bg-blue-50 mt-8"
          />
        </form>
        <AuthOR />
        <Button
          text="Continue with Google"
          variant="ghost"
          className="w-full mt-4 rounded-md p-3 justify-center text-white hover:bg-blue-200"
          icon={<FcGoogle size={20} />}
          iconPosition="right"
        />
      </div>
    </div>
  );
}
