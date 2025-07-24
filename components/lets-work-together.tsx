import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import FadeIn from "./fade-in";
import { Button } from "./ui/button";
import { AccentHeading } from "./accent-heading";
import { MiniConsultationForm } from "./mini-consultation-form";

export function LetsWorkTogether() {
  return (
    <FadeIn>
      <section className="bg-[#3c3a36] py-16 text-white md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent opacity-10 rounded-bl-full" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <AccentHeading
                as="h2"
                className="text-3xl font-medium tracking-tight sm:text-4xl text-white"
              >
                Let&apos;s Create Something Beautiful Together
              </AccentHeading>
              <p className="text-white/80">
                Whether you have questions about our services, need advice on
                design trends, or are ready to book a consultation, we&apos;re
                here to help. Reach out to us today and let our team of experts
                guide you on your journey to a stunning home. At Hello Space,
                every space is a canvas waiting for your unique touch.
              </p>
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-brand-accent" />
                  <span>123 Design Street, Creative City, 10001</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-brand-accent" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-brand-accent" />
                  <span>hello@hellospace.design</span>
                </div>
              </div>
            </div>
            <MiniConsultationForm />
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
