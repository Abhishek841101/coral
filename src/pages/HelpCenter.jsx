
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const PHONE = "8007133786";
const PHONE_LINK = "+918007133786";
const EMAIL = "coral.apartment79@gmail.com";

const helpCategories = [
  {
    icon: "▣",
    title: "Booking & Reservations",
    description: "Help with booking properties and managing your stay.",
    questions: [
      {
        question: "How do I book a property?",
        answer:
          "Explore available properties, choose your check-in and check-out dates, select the number of guests, and review the booking details. Follow the instructions provided by Coral to complete your booking.",
      },
      {
        question: "How is the booking duration calculated?",
        answer:
          "Your stay is calculated by the number of nights between check-in and check-out. For example, checking in on 25 October and checking out on 28 October means 3 nights.",
      },
      {
        question: "Can I change my booking dates?",
        answer:
          "Date changes depend on property availability and the applicable booking policy. Contact Coral with your booking details to request a change.",
      },
      {
        question: "What information is required to make a booking?",
        answer:
          "You may be asked to provide your name, contact number, stay dates and guest details. Make sure the information you provide is accurate.",
      },
    ],
  },
  {
    icon: "◷",
    title: "Check-in & Check-out",
    description: "Understand arrival, departure and stay arrangements.",
    questions: [
      {
        question: "How do I know my check-in time?",
        answer:
          "Check the information provided for your selected property or booking confirmation. If the timing is unclear, contact Coral before your arrival.",
      },
      {
        question: "What if I expect to arrive late?",
        answer:
          "Late arrival arrangements depend on the property. Contact Coral in advance to discuss your expected arrival time.",
      },
      {
        question: "Can I extend my stay?",
        answer:
          "You can contact Coral to request an extension. Additional nights are subject to availability, the applicable nightly rate and confirmation by the property team.",
      },
    ],
  },
  {
    icon: "₹",
    title: "Payments & Pricing",
    description: "Get help with nightly rates and additional charges.",
    questions: [
      {
        question: "What does Per Night mean?",
        answer:
          "Per Night is the accommodation price for one night of your stay. The booking duration is based on the check-in and check-out dates, not automatically on fixed 24-hour periods.",
      },
      {
        question: "How is my total accommodation price calculated?",
        answer:
          "For a simple booking, multiply the nightly rate by the number of nights. For example, ₹2,000 per night for 3 nights equals ₹6,000 before applicable extra guest charges, taxes or other fees.",
      },
      {
        question: "Are extra guest charges applicable?",
        answer:
          "Some properties may charge extra for guests beyond the included occupancy. Review the property's pricing information and booking breakdown before confirming.",
      },
      {
        question: "How can I clarify a payment?",
        answer:
          "Contact Coral by phone or email and share your booking reference and payment details needed to identify the transaction. Never share your OTP, PIN or password.",
      },
    ],
  },
  {
    icon: "↻",
    title: "Cancellation & Refunds",
    description: "Find help with cancellation requests and refunds.",
    questions: [
      {
        question: "How can I cancel my booking?",
        answer:
          "Contact Coral with your booking details to request cancellation. The applicable cancellation conditions depend on the policy associated with your booking.",
      },
      {
        question: "Will I receive a refund?",
        answer:
          "Refund eligibility and the amount depend on the applicable cancellation policy and payment terms. Contact Coral to clarify the conditions for your booking.",
      },
      {
        question: "Where can I read the cancellation policy?",
        answer:
          "Visit the Cancellation Policy page on the Coral website for the applicable policy information.",
      },
    ],
  },
  {
    icon: "⌂",
    title: "Property & Guest Rules",
    description: "Get information about property amenities and guest limits.",
    questions: [
      {
        question: "How do I check the maximum guest capacity?",
        answer:
          "Review the property's details before booking. Select the correct number of guests and contact Coral if you need help confirming occupancy limits.",
      },
      {
        question: "Are pets allowed?",
        answer:
          "Pet permissions vary by property. Check the property's details and confirm its pet policy before booking.",
      },
      {
        question: "How can I check the available amenities?",
        answer:
          "Review the amenities listed on the selected property's page. Contact Coral if you need clarification about a specific facility.",
      },
    ],
  },
];

const allQuestions = helpCategories.flatMap((category) =>
  category.questions.map((item) => ({
    ...item,
    category: category.title,
  }))
);

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [openQuestion, setOpenQuestion] = useState(null);

  const filteredQuestions = useMemo(() => {
    const term = search.trim().toLowerCase();

    return allQuestions.filter((item) => {
      const matchesCategory =
        activeCategory === "All Topics" ||
        item.category === activeCategory;

      const matchesSearch =
        !term ||
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All Topics");
    setOpenQuestion(null);
  };

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-sm font-medium text-teal-200">
              <span className="h-2 w-2 rounded-full bg-teal-300" />
              CORAL CUSTOMER SUPPORT
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              How can we
              <span className="block text-teal-300">help you?</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Find answers about bookings, per-night pricing, check-in,
              cancellations and your stay with Coral Service Apartments.
            </p>

            <div className="mx-auto mt-9 flex max-w-2xl items-center gap-3 rounded-2xl bg-white p-2 shadow-2xl">
              <span className="pl-3 text-2xl text-slate-400">⌕</span>

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setOpenQuestion(null);
                }}
                placeholder="Search booking, pricing, cancellation..."
                aria-label="Search help questions"
                className="min-w-0 flex-1 border-0 bg-transparent px-2 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Clear
                </button>
              )}
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Search answers or select a help topic below.
            </p>
          </div>
        </div>
      </section>

      {/* Help categories */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-9">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            Help Topics
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            What do you need help with?
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Select a category to find relevant answers to your questions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {helpCategories.map((category) => (
            <button
              key={category.title}
              type="button"
              onClick={() => {
                setActiveCategory(category.title);
                setOpenQuestion(null);

                document
                  .getElementById("help-questions")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }}
              className={`group rounded-2xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                activeCategory === category.title
                  ? "border-teal-400 bg-teal-50"
                  : "border-slate-200 bg-white hover:border-teal-300"
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-2xl font-semibold text-teal-800 group-hover:bg-teal-100">
                {category.icon}
              </span>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                {category.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {category.description}
              </p>

              <span className="mt-5 inline-flex items-center text-sm font-semibold text-teal-800">
                View answers <span className="ml-2">→</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section
        id="help-questions"
        className="scroll-mt-8 bg-slate-50 px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
                Frequently Asked Questions
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Find your answer
              </h2>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800 sm:self-auto"
            >
              Show all topics
            </button>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {[
              "All Topics",
              ...helpCategories.map((item) => item.title),
            ].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setOpenQuestion(null);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="mt-5 text-sm text-slate-500">
            {filteredQuestions.length}{" "}
            {filteredQuestions.length === 1 ? "answer" : "answers"} found
          </p>

          <div className="mt-5 space-y-3">
            {filteredQuestions.map((item) => {
              const questionId = `${item.category}-${item.question}`;
              const isOpen = openQuestion === questionId;

              return (
                <article
                  key={questionId}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-slate-300"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenQuestion(isOpen ? null : questionId)
                    }
                    className="flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
                  >
                    <span>
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-teal-700">
                        {item.category}
                      </span>

                      <span className="font-semibold leading-6 text-slate-900">
                        {item.question}
                      </span>
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl transition ${
                        isOpen
                          ? "rotate-45 bg-teal-100 text-teal-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6">
                      <div className="border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                        {item.answer}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {filteredQuestions.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                <span className="text-4xl">⌕</span>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  No answers found
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Try another search term or contact Coral directly for help.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
                >
                  Reset search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Coral */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="overflow-hidden rounded-3xl bg-slate-950 p-7 text-white sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              Coral Customer Support
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              We're here to help.
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Need help with your booking, nightly pricing, property details
              or cancellation? Contact Coral Service Apartments directly.
            </p>

            <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
              {/* Phone */}
              <a
                href={`tel:${PHONE_LINK}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <span className="text-2xl">📞</span>

                <h3 className="mt-3 font-bold">Call Us</h3>

                <p className="mt-2 text-sm text-slate-300">{PHONE}</p>

                <span className="mt-4 inline-block text-sm font-semibold text-teal-300">
                  Call Coral →
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <span className="text-2xl">✉️</span>

                <h3 className="mt-3 font-bold">Email Us</h3>

                <p className="mt-2 break-all text-sm text-slate-300">
                  {EMAIL}
                </p>

                <span className="mt-4 inline-block text-sm font-semibold text-teal-300">
                  Send an Email →
                </span>
              </a>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${PHONE_LINK.replace("+", "")}?text=${encodeURIComponent(
                "Hello Coral Service Apartments, I need help with a booking enquiry."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-teal-300 sm:w-auto"
            >
              <span>WhatsApp Coral</span>
              <span>↗</span>
            </a>

            <p className="mt-6 text-sm text-slate-400">
              Coral Service Apartments · MIHAN, Nagpur, Maharashtra
            </p>

            {/* Related pages */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-7 text-sm">
              <Link
                to="/booking-guide"
                className="text-teal-300 transition hover:text-white"
              >
                Booking Guide
              </Link>

              <Link
                to="/cancellation-policy"
                className="text-teal-300 transition hover:text-white"
              >
                Cancellation Policy
              </Link>

              <Link
                to="/terms"
                className="text-teal-300 transition hover:text-white"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
