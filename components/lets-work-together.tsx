import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import FadeIn from "./fade-in";
import { Button } from "./ui/button";
import { AccentHeading } from "./accent-heading";

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
            <div className="rounded-lg bg-white p-6 text-[#3c3a36] relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent" />
              <h3 className="font-serif text-xl font-medium">
                Book Your Free Design Consultation Today!
              </h3>
              <p className="mt-2 text-[#6b6963]">
                Ready to start your home transformation? Fill out the form below
                and take the first step toward creating a space that truly
                reflects you.
              </p>
              <form className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-brand-accent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-brand-accent"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-brand-accent"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="mb-1 block text-sm font-medium"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    className="w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-brand-accent"
                  >
                    <option value="">Select a service</option>
                    <option value="consultation">
                      Interior Design Consultation
                    </option>
                    <option value="furniture">Furniture Shopping</option>
                    <option value="project">Full Project Management</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="h-24 w-full rounded-md border border-[#e2ded9] bg-white px-3 py-2 text-sm placeholder:text-[#a8a49e] focus:outline-none focus:ring-1 focus:ring-brand-accent"
                    placeholder="Tell us about your project"
                  ></textarea>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-brand-accent" />
                  <span className="text-sm">
                    Our team will contact you to schedule your consultation
                  </span>
                </div>
                <Button variant="accent" className="w-full">
                  Schedule Consultation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
