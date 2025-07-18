"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      // In a real implementation, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      {isSubmitted ? (
        <div className="text-center space-y-4">
          <h3 className="font-serif text-xl font-medium text-[#3c3a36]">
            Thank You!
          </h3>
          <p className="text-[#6b6963]">
            Your message has been sent successfully. We&apos;ll get back to you
            as soon as possible.
          </p>
          <Button
            onClick={resetForm}
            className="bg-[#a8a49e] text-white hover:bg-[#8c8880]"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <>
          <h2 className="font-serif text-2xl font-medium text-[#3c3a36]">
            Get in Touch
          </h2>
          <p className="mt-2 text-[#6b6963]">
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-[#3c3a36]"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-[#a8a49e]"
                placeholder="Your name"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-[#3c3a36]"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-[#a8a49e]"
                placeholder="Your email address"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-1 block text-sm font-medium text-[#3c3a36]"
              >
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-[#a8a49e]"
                placeholder="Your phone number (optional)"
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-medium text-[#3c3a36]"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="h-32 w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-[#a8a49e]"
                placeholder="How can we help you?"
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#a8a49e] text-white hover:bg-[#8c8880]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
