"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import Image from "@/components/ui/Image";
import Input from "@/components/ui/Input";
import Link from "@/components/ui/Link";
import { ArrowRight, Eye } from "lucide-react";
import AuthOR from "@/components/ui/AuthOR";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="flex p-3 max-w-[1000px] w-full h-[600px] bg-charcoal-600 rounded-md justify-center items-center mx-auto my-auto shadow-lg">
      <div className="w-[500px] h-full relative">
        <Image
          src="/login-image.jpg"
          alt="Login Image"
          className="h-full w-full rounded-md"
        />
        <Button
          onClick={handleGoBack}
          text="Back to website"
          icon={<ArrowRight size={20} />}
          iconPosition="right"
          variant="ghost"
          className="absolute top-4 right-4 text-charcoal-500 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
        />
      </div>
      <div className="w-[600px] h-full p-10 px-20">
        <div className="mb-6">
          <Heading
            level={1}
            text="Welcome Back"
            className="text-gold-50 text-[50px] font-medium"
          />
          <p className="text-charcoal-100">
            Don't have an account?
            <Link
              href="/register"
              className="text-brand-100 ml-2 hover:text-gold-100 underline"
            >
              Register
            </Link>
          </p>
        </div>
        <form action="">
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full placeholder:text-charcoal-500 text-white bg-blue-150 active:bg-blue-200 focus:ring-blue-50 border-none p-3 rounded-md focus:ring-2 transition-all duration-200"
            />
          </div>
          <div className="relative mt-4 mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full placeholder:text-charcoal-500 text-white bg-blue-150 active:bg-blue-200 focus:ring-blue-50 border-none p-3 rounded-md focus:ring-2 transition-all duration-200"
            />
            <Button
              type="button"
              variant="none"
              className="absolute right-3 top-3 p-0 h-auto"
            >
              <Eye size={20} className="text-charcoal-500" />
            </Button>
          </div>
            <Link href="/forgot-password" className="text-brand-100 hover:text-gold-100 underline"> Forgot your password?</Link>
          <Button
            type="submit"
            text="Log in"
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
