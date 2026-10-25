
import React from "react";
import { Link } from "react-router-dom";

const PHONE = "8007133786";
const PHONE_LINK = "+918007133786";
const EMAIL = "coral.apartment79@gmail.com";

const cancellationSteps = [
  {
    number: "01",
    title: "Contact Coral",
    description:
      "Contact the Coral team by phone, email or WhatsApp and request cancellation of your booking.",
  },
  {
    number: "02",
    title: "Share Booking Details",
    description:
      "Provide your booking reference, guest name and check-in date so the team can identify your reservation.",
  },
  {
    number: "03",
    title: "Review Applicable Terms",
    description:
      "The team can help clarify the cancellation conditions and any refund eligibility applicable to your booking.",
  },
  {
    number: "04",
    title: "Receive Confirmation",
    description:
      "Keep the cancellation confirmation and any related communication for your records.",
  },
];

const faqs = [
  {
    question: "How do I cancel my booking?",
    answer:
      "Contact Coral Service Apartments using the phone number or email listed on this page. Share your booking details and clearly request cancellation. Wait for confirmation that your request has been processed.",
  },
  {
    question: "Will I receive a full refund?",
    answer:
      "A full refund cannot be guaranteed for every booking. Refund eligibility and the amount depend on the cancellation terms communicated for your reservation and the applicable payment conditions. Contact Coral to confirm your specific case.",
  },
  {
    question: "Are cancellation charges applicable?",
    answer:
      "Any applicable cancellation charges depend on the terms associated with your booking. Review your booking confirmation or contact Coral before proceeding.",
  },
  {
    question: "How long does a refund take?",
    answer:
      "The refund timeline depends on the applicable refund process and payment provider. Contact Coral for information about your booking and any refund that has been approved.",
  },
  {
    question: "Can I change my check-in or check-out dates instead?",
    answer:
      "You can contact Coral to request a date change. Changes are subject to property availability, the applicable booking terms and confirmation by the property team.",
  },
  {
    question: "What if I paid but did not receive booking confirmation?",
    answer:
      "Contact Coral with your payment reference, transaction date and relevant booking details. Never share your card PIN, password or one-time password.",
  },
];

export default function CancellationPolicy() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-sm text-slate-400"
          >
            <Link to="/" className="transition hover:text-teal-300">
              Home
            </Link>
            <span>/</span>
            <span className="text-teal-300">Cancellation Policy</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
            CORAL SERVICE APARTMENTS
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Cancellation & Refund Policy
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Need to cancel or change your stay? Learn how to contact Coral,
            submit a request and clarify the cancellation terms applicable
            to your reservation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`tel:${PHONE_LINK}`}
              className="inline-flex items-center justify-center rounded-xl bg-teal-400 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Call Coral
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Email Support
            </a>
          </div>
        </div>
      </section>

      {/* Important notice */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <span className="text-2xl" aria-hidden="true">
            ℹ️
          </span>

          <div>
            <h2 className="font-bold text-slate-900">
              Check your booking conditions
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-700">
              Cancellation charges, refund eligibility and processing
              timelines depend on the terms applicable to your booking.
              Please review your booking confirmation or contact Coral
              before making assumptions about a refund.
            </p>
          </div>
        </div>
      </section>

      {/* Cancellation process */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            How to request a cancellation
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Follow these steps to submit your request and clarify the
            conditions applicable to your reservation.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cancellationSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-lg font-bold text-teal-800">
                {step.number}
              </span>

              <h3 className="mt-5 text-lg font-bold text-slate-950">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Refund information */}
      <section className="bg-slate-50 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Refund information
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Understand your refund
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Refund eligibility depends on the terms applicable to your
              reservation. If your cancellation is eligible for a refund,
              contact Coral to clarify the approved amount and expected
              processing procedure.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Keep your booking confirmation and payment reference
              available when contacting the support team.
            </p>

            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                "Cancellation and Refund Enquiry"
              )}`}
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-teal-700 px-6 py-3.5 font-semibold text-white transition hover:bg-teal-800"
            >
              Ask About a Refund →
            </a>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-950">
              Before contacting Coral
            </h3>

            <ul className="mt-6 space-y-4">
              {[
                "Keep your booking reference ready.",
                "Confirm your check-in and check-out dates.",
                "Keep your payment transaction reference available.",
                "Ask about any applicable cancellation charges.",
                "Request written confirmation of the cancellation outcome.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-800">
                    ✓
                  </span>

                  <span className="text-sm leading-6 text-slate-600">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            Frequently asked questions
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Cancellation FAQs
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Common questions about cancellations, refunds and booking
            changes.
          </p>
        </div>

        <div className="mt-9 space-y-3">
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

              <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact support */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-950 p-7 text-white sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              Need assistance?
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Contact Coral Service Apartments
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Contact our team for clarification about your cancellation
              request, applicable booking terms or refund status.
            </p>

            <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
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

            <a
              href={`https://wa.me/${PHONE_LINK.replace("+", "")}?text=${encodeURIComponent(
                "Hello Coral Service Apartments, I need help with my booking cancellation or refund."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-teal-300"
            >
              WhatsApp Coral ↗
            </a>

            <p className="mt-6 text-sm text-slate-400">
              Coral Service Apartments · MIHAN, Nagpur, Maharashtra
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
          <Link to="/help" className="text-slate-600 hover:text-teal-700">
            Help Center
          </Link>

          <Link
            to="/booking-guide"
            className="text-slate-600 hover:text-teal-700"
          >
            Booking Guide
          </Link>

          <Link to="/terms" className="text-slate-600 hover:text-teal-700">
            Terms & Conditions
          </Link>

          <Link to="/" className="text-slate-600 hover:text-teal-700">
            Back to Home
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-5xl text-center text-xs leading-6 text-slate-500">
          This page provides general cancellation and refund information.
          The actual policy, eligibility criteria, charges and processing
          timelines must be confirmed against Coral's approved booking
          conditions before publication.
        </p>
      </section>
    </main>
  );
}
