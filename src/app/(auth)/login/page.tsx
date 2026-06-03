"use client";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight, Eye, EyeClosed } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import Link from "@/components/ui/Link";
import AuthOR from "@/components/ui/AuthOR";
import { LoginForm } from "../../../components/forms/LoginForm";

export default function Login() {
  const router = useRouter();  

  const handleGoBack = () => {
    router.back();
  };

  const handleGoogleLogin = () =>{
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  }
  
  return (
    <div className="flex p-3 max-w-[1000px] w-full h-[600px] bg-tertiary-Shade rounded-md justify-center items-center mx-auto my-auto shadow-lg">
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
          className="absolute top-4 right-4 text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
        />
      </div>
      <div className="w-[600px] h-full p-10 px-20">
        <div className="mb-6">
          <Heading
            level={1}
            text="Welcome Back"
            className="text-red-text text-[50px] font-medium font-headline"
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
        <LoginForm />
        <AuthOR />
        <Button
          text="Continue with Google"
          variant="ghost"
          className="w-full mt-4 rounded-md p-3 justify-center text-white hover:bg-blue-200"
          icon={<FcGoogle size={20} />}
          iconPosition="right"
          onClick={handleGoogleLogin}
        />
      </div>
    </div>
  );
}
