import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import FadeIn from "@/components/fade-in";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contact Us - Hello Space Interior Design",
  description:
    "Get in touch with Hello Space for questions about our services, design trends, or to book a consultation. We're here to help with your interior design needs.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#f8f5f2]">
      <header className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/hero/hello-space-hero.png?height=800&width=1600"
          alt="Hello Space contact"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30">
          <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white md:px-6">
            <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Let&apos;s Create Something Beautiful Together
            </h1>
          </div>
        </div>
      </header>

      <main>
        <FadeIn>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                <p className="text-lg text-[#6b6963]">
                  Whether you have questions about our services, need advice on
                  design trends, or are ready to book a consultation, we&apos;re
                  here to help. Reach out to us today and let our team of
                  experts guide you on your journey to a stunning home. At Hello
                  Space, every space is a canvas waiting for your unique touch.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="py-8 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid gap-12 md:grid-cols-2">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl font-medium tracking-tight text-[#3c3a36]">
                    Get in Touch
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-[#a8a49e]" />
                      <div>
                        {/* <h3 className="font-medium text-[#3c3a36]">
                          Visit Our Studio
                        </h3> */}
                        <p className="text-[#6b6963]">Nairobi, Kenya .</p>
                        <p className="text-[#6b6963]">
                          Monday - Friday: 9am - 6pm
                        </p>
                        <p className="text-[#6b6963]">
                          Saturday & Sunday : By Appointment Only.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-[#a8a49e]" />
                      <div>
                        <h3 className="font-medium text-[#3c3a36]">Call Us</h3>
                        <p className="text-[#6b6963]">+(254) 745 270 260</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-[#a8a49e]" />
                      <div>
                        <h3 className="font-medium text-[#3c3a36]">Email Us</h3>
                        <p className="text-[#6b6963]">spacehello43@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h3 className="font-serif text-xl font-medium text-[#3c3a36]">
                      Follow Us
                    </h3>
                    <div className="mt-4 flex space-x-4">
                      <a
                        href="https://www.instagram.com/_hellospace?igsh=MXZnMjBrZXAwZWJ6bg%3D%3D&utm_source=qr "
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#e2ded9] text-[#6b6963] transition-colors hover:text-[#3c3a36]"
                        aria-label="Follow us on Instagram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <rect
                            width="20"
                            height="20"
                            x="2"
                            y="2"
                            rx="5"
                            ry="5"
                          />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                      </a>
                      {/* <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#e2ded9] text-[#6b6963] transition-colors hover:text-[#3c3a36]"
                        aria-label="Follow us on Facebook"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </a> */}
                      {/* <a
                        href="https://pinterest.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#e2ded9] text-[#6b6963] transition-colors hover:text-[#3c3a36]"
                        aria-label="Follow us on Pinterest"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <line x1="12" x2="12" y1="17" y2="22" />
                          <path d="M8 2H16C18.2091 2 20 3.79086 20 6V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6C4 3.79086 5.79086 2 8 2Z" />
                          <circle cx="12" cy="10" r="5" />
                        </svg>
                      </a> */}
                    </div>
                  </div>
                </div>

                <ContactForm />
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
    </div>
  );
}
