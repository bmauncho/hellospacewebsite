"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendConsultationEmail } from "@/app/actions/consultation-email";

export function ConsultationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consultationType: "",
    projectType: "",
    preferredDate: "",
    preferredTime: "",
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

  const handleSelectChange = (name: string, value: string) => {
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

      const result = await sendConsultationEmail(form);

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Consultation scheduled!",
          description:
            "Thank you for booking a consultation. We'll contact you shortly to confirm.",
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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      consultationType: "",
      projectType: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div
      className={cn(
        "rounded-lg bg-white p-6 shadow-sm",
        isLoading && "opacity-80"
      )}
    >
      {isSubmitted ? (
        <div className="text-center space-y-4">
          <h3 className="font-serif text-xl font-medium text-[#3c3a36]">
            Consultation Scheduled!
          </h3>
          <p className="text-[#6b6963]">
            Thank you for scheduling a consultation with Hello Space. We&apos;ll
            contact you shortly to confirm your appointment.
          </p>
          <p className="text-[#6b6963]">
            If you have any questions in the meantime, please don&apos;t
            hesitate to contact us.
          </p>
          <Button
            onClick={resetForm}
            className="bg-[#a8a49e] text-white hover:bg-[#8c8880]"
          >
            Schedule Another Consultation
          </Button>
        </div>
      ) : (
        <>
          <h2 className="font-serif text-2xl font-medium text-[#3c3a36]">
            Schedule Your Consultation
          </h2>
          <p className="mt-2 text-[#6b6963]">
            Fill out the form below and we&apos;ll contact you to confirm your
            appointment.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-sm font-medium text-[#3c3a36]"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-[#a8a49e]"
                  placeholder="Your first name"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-sm font-medium text-[#3c3a36]"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-[#a8a49e]"
                  placeholder="Your last name"
                  required
                  disabled={isLoading}
                />
              </div>
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
                placeholder="Your phone number"
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="consultationType"
                className="mb-1 block text-sm font-medium text-[#3c3a36]"
              >
                Consultation Type <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.consultationType}
                onValueChange={(value) =>
                  handleSelectChange("consultationType", value)
                }
                disabled={isLoading}
              >
                <SelectTrigger className="w-full border-[#e2ded9] bg-white focus:ring-[#a8a49e]">
                  <SelectValue placeholder="Select consultation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-home">In-Home Consultation</SelectItem>
                  <SelectItem value="virtual">Virtual Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="projectType"
                className="mb-1 block text-sm font-medium text-[#3c3a36]"
              >
                Project Type
              </label>
              <Select
                value={formData.projectType}
                onValueChange={(value) =>
                  handleSelectChange("projectType", value)
                }
                disabled={isLoading}
              >
                <SelectTrigger className="w-full border-[#e2ded9] bg-white focus:ring-[#a8a49e]">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-home">Full Home Design</SelectItem>
                  <SelectItem value="single-room">
                    Single Room Design
                  </SelectItem>
                  <SelectItem value="furniture">Furniture Selection</SelectItem>
                  <SelectItem value="color-consultation">
                    Color Consultation
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="preferredDate"
                className="mb-1 block text-sm font-medium text-[#3c3a36]"
              >
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-[#a8a49e]"
                  required
                  disabled={isLoading}
                  min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-[#a8a49e] pointer-events-none" />
              </div>
            </div>
            <div>
              <label
                htmlFor="preferredTime"
                className="mb-1 block text-sm font-medium text-[#3c3a36]"
              >
                Preferred Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-[#a8a49e]"
                  required
                  disabled={isLoading}
                />
                <Clock className="absolute right-3 top-2.5 h-4 w-4 text-[#a8a49e] pointer-events-none" />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-medium text-[#3c3a36]"
              >
                Tell us about your project
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="h-24 w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-[#a8a49e]"
                placeholder="Share details about your space and what you're looking to achieve"
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
                  Scheduling...
                </>
              ) : (
                "Schedule Consultation"
              )}
            </Button>
            <p className="text-center text-xs text-[#6b6963]">
              By submitting this form, you agree to our privacy policy and terms
              of service.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
