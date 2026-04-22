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
        variant="tertiary"
        text="Subscribe"
        icon={<ArrowRight />}
        iconPosition="right"
        onClick={handleSubmit}
      />
    </div>
  );
}
