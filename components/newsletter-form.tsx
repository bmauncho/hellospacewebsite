"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter-email";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);

    try {
      const result = await subscribeToNewsletter(formData);

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: "Thank you for subscribing to our newsletter.",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      {isSubmitted ? (
        <div className="rounded-lg bg-[#e9e5e0] p-4 text-center">
          <p className="text-[#3c3a36] font-medium">
            Thank you for subscribing!
          </p>
          <p className="text-sm text-[#6b6963] mt-1">
            We&apos;ll be in touch with inspiration and updates.
          </p>
          <Button
            variant="link"
            className="mt-2 text-brand-accent p-0 h-auto"
            onClick={() => {
              setIsSubmitted(false);
              setEmail("");
            }}
          >
            Subscribe another email
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
              className="border-[#e2ded9] bg-white focus:border-brand-accent focus:ring-brand-accent"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} variant="accent">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>
          <p className="text-xs text-[#6b6963] text-center">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates from our company.
          </p>
        </form>
      )}
    </div>
  );
}
