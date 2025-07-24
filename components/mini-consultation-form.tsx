"use client";

import type React from "react";
import { useState } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { sendMiniConsultationEmail } from "@/app/actions/consultation-email";

export function MiniConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      const result = await sendMiniConsultationEmail(form);

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Request sent!",
          description: "Thank you for your interest. We'll contact you soon to schedule your consultation.",
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
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
      service: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="rounded-lg bg-white p-6 text-[#3c3a36] relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent" />
      {isSubmitted ? (
        <div className="text-center space-y-4">
          <h3 className="font-serif text-xl font-medium">
            Request Sent Successfully!
          </h3>
          <p className="text-[#6b6963]">
            Thank you for your interest in Hello Space. Our team will contact you
            shortly to schedule your free design consultation.
          </p>
          <Button
            onClick={resetForm}
            variant="accent"
            className="w-full"
          >
            Send Another Request
          </Button>
        </div>
      ) : (
        <>
          <h3 className="font-serif text-xl font-medium">
            Book Your Free Design Consultation Today!
          </h3>
          <p className="mt-2 text-[#6b6963]">
            Ready to start your home transformation? Fill out the form below and
            take the first step toward creating a space that truly reflects you.
          </p>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-brand-accent"
                  placeholder="Your name"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-brand-accent"
                  placeholder="Your email"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-brand-accent"
                placeholder="Your phone number"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="service" className="mb-1 block text-sm font-medium">
                Service Interested In <span className="text-red-500">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-brand-accent"
                required
                disabled={isLoading}
              >
                <option value="">Select a service</option>
                <option value="consultation">Interior Design Consultation</option>
                <option value="furniture">Furniture Shopping</option>
                <option value="project">Full Project Management</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="h-24 w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-brand-accent"
                placeholder="Tell us about your project"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-brand-accent" />
              <span className="text-sm">
                Our team will contact you to schedule your consultation
              </span>
            </div>
            <Button 
              type="submit" 
              variant="accent" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Schedule Consultation"
              )}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}