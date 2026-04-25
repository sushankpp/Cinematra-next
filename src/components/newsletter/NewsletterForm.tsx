"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    setEmail(email);
  };
  return (
    <div className="flex">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        variant="primary"
        text="Subscribe"
        icon={<ArrowRight size={20} />}
        iconPosition="right"
        onClick={handleSubmit}
      />
    </div>
  );
}
