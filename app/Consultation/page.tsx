import Image from "next/image";
import { Check, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/components/fade-in";
import { ConsultationForm } from "@/components/consultation-form";

export const metadata = {
  title: "Book a Consultation - Hello Space Interior Design",
  description:
    "Book your free design consultation with Hello Space. Take the first step toward creating a space that truly reflects your personality and lifestyle.",
};

export default function ConsultationPage() {
  return (
    <div className="bg-[#f8f5f2]">
      <header className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/hero/hello-space-hero.png?height=800&width=1600"
          alt="Hello Space consultation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30">
          <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white md:px-6">
            <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Book Your Free Design Consultation Today!
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
                  Ready to start your home transformation? Book a consultation
                  with Hello Space and take the first step toward creating a
                  space that truly reflects you. Our expert designers are here
                  to guide you through every step of the process—from initial
                  ideas to the final design. Schedule your free consultation now
                  and experience the difference a professional touch can make.
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
                    What to Expect
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#a8a49e] text-white">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#3c3a36]">
                          Personalized Approach
                        </h3>
                        <p className="text-[#6b6963]">
                          We take the time to understand your unique style,
                          needs, and budget to create a design plan that&apos;s
                          tailored just for you.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#a8a49e] text-white">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#3c3a36]">
                          Expert Guidance
                        </h3>
                        <p className="text-[#6b6963]">
                          Our experienced designers will provide professional
                          advice and creative solutions to transform your space.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#a8a49e] text-white">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#3c3a36]">
                          Transparent Process
                        </h3>
                        <p className="text-[#6b6963]">
                          We&apos;ll walk you through our design process,
                          timeline, and pricing structure so you know exactly
                          what to expect.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="font-serif text-3xl font-medium tracking-tight text-[#3c3a36]">
                    Consultation Options
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="border-[#e2ded9] bg-white">
                      <CardContent className="p-6">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9e5e0]">
                          <MapPin className="h-5 w-5 text-[#a8a49e]" />
                        </div>
                        <h3 className="font-serif text-xl font-medium text-[#3c3a36]">
                          In-Home Consultation
                        </h3>
                        <p className="mt-2 text-[#6b6963]">
                          We&apos;ll visit your space to get a firsthand
                          understanding of the layout, lighting, and potential.
                        </p>
                        <div className="mt-4 flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-[#a8a49e]" />
                          <span className="text-sm text-[#6b6963]">
                            60-90 minutes
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-[#e2ded9] bg-white">
                      <CardContent className="p-6">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9e5e0]">
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
                            className="text-[#a8a49e]"
                          >
                            <rect
                              width="14"
                              height="14"
                              x="5"
                              y="5"
                              rx="2"
                              ry="2"
                            />
                            <path d="M12 12h.01" />
                          </svg>
                        </div>
                        <h3 className="font-serif text-xl font-medium text-[#3c3a36]">
                          Virtual Consultation
                        </h3>
                        <p className="mt-2 text-[#6b6963]">
                          Connect with our designers from anywhere via video
                          call for a convenient consultation experience.
                        </p>
                        <div className="mt-4 flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-[#a8a49e]" />
                          <span className="text-sm text-[#6b6963]">
                            45-60 minutes
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <ConsultationForm />
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="bg-[#e9e5e0] py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-serif text-3xl font-medium tracking-tight text-[#3c3a36] sm:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-[#6b6963]">
                  Have questions about our consultation process? Find answers to
                  commonly asked questions below.
                </p>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {[
                  {
                    question: "Is the initial consultation really free?",
                    answer:
                      "Yes, your initial design consultation is completely free of charge. This allows us to understand your needs and determine how we can best help you transform your space.",
                  },
                  {
                    question: "How long does a typical design project take?",
                    answer:
                      "The timeline varies depending on the scope of the project. A single room design might take 4-6 weeks, while a full home design could take 3-6 months. We'll provide a detailed timeline during your consultation.",
                  },
                  {
                    question: "Do I need to have a specific budget in mind?",
                    answer:
                      "Having a budget range in mind is helpful, but not required. During your consultation, we can discuss options at various price points to help you determine a comfortable budget for your project.",
                  },
                  {
                    question: "Can you work with existing furniture pieces?",
                    answer:
                      "We're happy to incorporate your existing furniture into the new design. We'll help you determine which pieces work well with the new design concept and suggest updates or replacements as needed.",
                  },
                ].map((item, index) => (
                  <div key={index} className="rounded-lg bg-white p-6">
                    <h3 className="font-serif text-lg font-medium text-[#3c3a36]">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-[#6b6963]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
    </div>
  );
}
