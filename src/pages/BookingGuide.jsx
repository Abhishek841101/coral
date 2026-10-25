
import React from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Choose Your Property",
    description:
      "Explore available properties, compare amenities, location and pricing, and choose the stay that suits you.",
    icon: "⌂",
  },
  {
    number: "02",
    title: "Select Your Stay Dates",
    description:
      "Choose your check-in and check-out dates and enter the number of guests. Your stay duration is calculated in nights.",
    icon: "▦",
  },
  {
    number: "03",
    title: "Review Your Price",
    description:
      "Check the accommodation cost, applicable extra guest charges and any additional fees before confirming.",
    icon: "₹",
  },
  {
    number: "04",
    title: "Share Guest Details",
    description:
      "Provide the required guest name, contact number and other booking details requested by the property team.",
    icon: "♙",
  },
  {
    number: "05",
    title: "Confirm Your Booking",
    description:
      "Review your dates and final amount. Follow the booking team's instructions for confirmation and payment.",
    icon: "✓",
  },
];

const faqs = [
  {
    question: "How is the booking duration calculated?",
    answer:
      "Your stay is calculated by the number of nights between check-in and check-out. For example, checking in on 25 October and checking out on 28 October means 3 nights.",
  },
  {
    question: "What does Per Night mean?",
    answer:
      "Per Night is the accommodation price for one night of your stay. The total room price generally depends on the number of nights and the applicable nightly rate.",
  },
  {
    question: "How do I know the total booking price?",
    answer:
      "Review the price breakdown shown during booking. It may include the nightly accommodation rate, extra guest charges and other applicable fees.",
  },
  {
    question: "Can I book for additional guests?",
    answer:
      "Guest limits and additional guest charges depend on the property. Enter the correct guest count and review the property's rules before confirming.",
  },
  {
    question: "Can I change my check-in or check-out date?",
    answer:
      "Date changes depend on availability and the property's booking policy. Contact the Coral team to request a change to an existing booking.",
  },
  {
    question: "What if I need help with my booking?",
    answer:
      "Contact the Coral team using the contact details provided on the website or in your booking communication.",
  },
];

export default function BookingGuide() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-sm font-medium text-teal-200">
              <span className="h-2 w-2 rounded-full bg-teal-300" />
              YOUR STAY, MADE SIMPLE
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your guide to a
              <span className="block text-teal-300">
                seamless stay.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Everything you need to know about booking your Coral stay,
              understanding nightly prices and getting ready for check-in.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center rounded-xl bg-teal-400 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-teal-300"
              >
                Explore Properties <span className="ml-2">→</span>
              </Link>

              <a
                href="#booking-steps"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                How It Works
              </a>
            </div>
          </div>

          <div className="mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["01", "Choose a property"],
              ["02", "Select your dates"],
              ["03", "Confirm your stay"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <p className="text-sm font-semibold text-teal-300">
                  STEP {number}
                </p>
                <p className="mt-2 font-medium text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking steps */}
      <section
        id="booking-steps"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            The booking process
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Book your stay in 5 easy steps
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Follow these simple steps to choose your property and prepare
            for your stay.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-2xl font-semibold text-teal-800">
                  {step.icon}
                </div>
                <span className="text-3xl font-bold text-slate-200 transition group-hover:text-teal-200">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Pricing explanation */}
      <section className="bg-slate-50 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Understand your price
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Clear pricing, counted by nights.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Coral displays accommodation prices on a per-night basis.
              Your booking duration is based on your check-in and
              check-out dates, not automatically on fixed 24-hour periods.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold text-slate-500">
              EXAMPLE BOOKING
            </p>

            <div className="mt-6 flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-sm text-slate-500">Check-in</p>
                <p className="mt-1 font-semibold text-slate-900">
                  25 October
                </p>
              </div>
              <span className="text-xl text-teal-700">→</span>
              <div className="text-right">
                <p className="text-sm text-slate-500">Check-out</p>
                <p className="mt-1 font-semibold text-slate-900">
                  28 October
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 py-5">
              <span className="text-slate-600">Duration</span>
              <span className="rounded-full bg-teal-50 px-3 py-1.5 text-sm font-bold text-teal-800">
                3 nights
              </span>
            </div>

            <div className="flex items-center justify-between py-5">
              <div>
                <p className="font-semibold text-slate-900">
                  Accommodation
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  ₹2,000 × 3 nights
                </p>
              </div>
              <p className="text-2xl font-bold text-slate-900">₹6,000</p>
            </div>

            <p className="rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-500">
              Illustration only. Actual prices, taxes, extra guest charges
              and other fees depend on the selected property and booking.
            </p>
          </div>
        </div>
      </section>

      {/* Before booking */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Before you book
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              A few things to remember
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              A little preparation helps make your check-in smoother.
            </p>
          </div>

          <div className="space-y-5">
            {[
              [
                "Check guest capacity",
                "Make sure the property accommodates everyone in your group.",
              ],
              [
                "Review property rules",
                "Check amenities, pet policies and any additional charges.",
              ],
              [
                "Verify your dates",
                "Double-check the check-in and check-out dates before confirming.",
              ],
              [
                "Keep your details handy",
                "Provide accurate contact information for booking communication.",
              ],
            ].map(([title, description]) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-800">
                  ✓
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Need clarity?
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 open:border-teal-200 sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                  {faq.question}
                  <span className="text-xl text-teal-700 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
            Your next stay starts here
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Ready to find your place with Coral?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
            Explore properties, compare your options and plan your next stay.
          </p>
          <Link
            to="/properties"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-teal-400 px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-teal-300"
          >
            Browse Properties →
          </Link>
        </div>
      </section>
    </main>
  );
}
