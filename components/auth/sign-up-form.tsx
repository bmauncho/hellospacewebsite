"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth-context";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email, password, name);
      toast({
        title: "Account created!",
        description: "You have successfully signed up.",
      });
      router.push("/Shop");
    } catch (error) {
      console.error("Sign up error:", error);
      toast({
        title: "Sign up failed",
        description: "There was a problem creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg border border-[#e2ded9]">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-serif font-medium tracking-tight text-[#3c3a36]">
          Create an Account
        </h1>
        <p className="text-sm text-[#6b6963]">
          Sign up to access exclusive features and checkout faster
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-[#3c3a36]">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#3c3a36]">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[#3c3a36]"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6963]"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-[#3c3a36]"
          >
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border-[#e2ded9] focus:border-brand-accent focus:ring-brand-accent"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-brand-accent text-white hover:bg-brand-accent/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
      <div className="text-center text-sm">
        <p className="text-[#6b6963]">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="text-brand-accent hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
