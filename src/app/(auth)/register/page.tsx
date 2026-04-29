"use client";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import Link from "@/components/ui/Link";
import AuthOR from "@/components/ui/AuthOR";
import { RegisterForm } from "../../../components/forms/RegisterForm";

export default function Register() {
  const router = useRouter();

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
        <RegisterForm />
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
