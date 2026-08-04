"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    startTransition(async () => {
      try {
        // Simulate a minor network latency delay pass
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        console.log("RentNest Contact Form Submission Payload:", data);
        
        toast.success("Message Dispatched!", {
          description: "Thank you for reaching out to RentNest. Our team has recorded your log request.",
        });
        
        reset();
      } catch {
        toast.error("Submission Failed", {
          description: "Could not establish connection protocols. Please try again.",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-black uppercase tracking-wider">
            Your Name
          </label>
          <Input
            type="text"
            placeholder="John Doe"
            className="border-neutral-200 focus-visible:ring-1 focus-visible:ring-[#3E4A36] focus-visible:border-[#3E4A36]"
            {...register("name", { required: "Name string field is required." })}
          />
          {errors.name && (
            <p className="text-xs text-destructive font-medium">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-black uppercase tracking-wider">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="johndoe@example.com"
            className="border-neutral-200 focus-visible:ring-1 focus-visible:ring-[#3E4A36] focus-visible:border-[#3E4A36]"
            {...register("email", { 
              required: "Email parameter is required.",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email validation formatting syntax structure." }
            })}
          />
          {errors.email && (
            <p className="text-xs text-destructive font-medium">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-black uppercase tracking-wider">
          Subject Header
        </label>
        <Input
          type="text"
          placeholder="Partnership Request / General Inquiry"
          className="border-neutral-200 focus-visible:ring-1 focus-visible:ring-[#3E4A36] focus-visible:border-[#3E4A36]"
          {...register("subject", { required: "Subject context text is required." })}
        />
        {errors.subject && (
          <p className="text-xs text-destructive font-medium">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-black uppercase tracking-wider">
          Message Body
        </label>
        <Textarea
          placeholder="Detail your request description log here..."
          rows={5}
          className="border-neutral-200 resize-none focus-visible:ring-1 focus-visible:ring-[#3E4A36] focus-visible:border-[#3E4A36]"
          {...register("message", { required: "Message text detail content strings are required." })}
        />
        {errors.message && (
          <p className="text-xs text-destructive font-medium">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#3E4A36] hover:bg-[#2D3627] text-white transition-colors duration-200 font-semibold cursor-pointer"
      >
        {isPending ? "Transmitting..." : "Send Secure Message"}
      </Button>
    </form>
  );
}
