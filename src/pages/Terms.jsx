
import React from "react";
import { Link } from "react-router-dom";

const PHONE = "8007133786";
const PHONE_LINK = "+918007133786";
const EMAIL = "coral.apartment79@gmail.com";

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: [
      "By accessing the Coral website or enquiring about or making a property booking through Coral, you agree to comply with these terms and the applicable property-specific rules.",
      "Please review the relevant property information and booking conditions before confirming your stay. If you do not agree with these terms, please do not proceed with a booking.",
    ],
  },
  {
    number: "02",
    title: "Bookings and Reservations",
    content: [
      "Guests should provide accurate information, including their name, contact number, check-in date, check-out date and the number of guests.",
      "A booking enquiry does not necessarily mean that a reservation has been confirmed. Your reservation is confirmed only when Coral or the property team communicates confirmation through the applicable booking process.",
      "Property availability, guest capacity, amenities and special requests are subject to confirmation.",
    ],
  },
  {
    number: "03",
    title: "Pricing and Per-Night Charges",
    content: [
      "Accommodation prices are displayed on a per-night basis unless a specific offer or written agreement states otherwise.",
      "The number of nights is generally calculated from the check-in date to the check-out date. For example, check-in on 25 October and check-out on 28 October represents 3 nights.",
      "The final amount may include accommodation charges, additional guest charges, applicable taxes and other disclosed fees. Please review the price breakdown before confirming your reservation.",
      "Any special rate, discount or corporate arrangement is subject to the applicable terms and confirmation.",
    ],
  },
  {
    number: "04",
    title: "Guest Details and Occupancy",
    content: [
      "Guests must provide accurate booking details and comply with the maximum guest capacity and occupancy requirements of the selected property.",
      "Additional guests, children, pets and extra sleeping arrangements are subject to the property's specific rules and any applicable additional charges.",
      "Guests must comply with applicable laws and reasonable property rules throughout their stay.",
    ],
  },
  {
    number: "05",
    title: "Payments",
    content: [
      "Payment amounts, due dates and accepted payment methods will be communicated through the applicable booking process.",
      "Guests should verify the amount and payment recipient before making a payment and retain their transaction confirmation.",
      "If a payment issue or discrepancy occurs, contact Coral using the official contact details listed on this page.",
    ],
  },
  {
    number: "06",
    title: "Check-in and Check-out",
    content: [
      "Check-in and check-out timings are subject to the information provided for the selected property and the applicable booking confirmation.",
      "Early check-in, late check-out and extensions are subject to availability and may involve additional charges.",
      "Guests should contact the property team in advance if they expect to arrive late or need to change their stay dates.",
    ],
  },
  {
    number: "07",
    title: "Cancellation and Refunds",
    content: [
      "Cancellation requests, refund eligibility and applicable charges are governed by the cancellation terms communicated for the relevant booking.",
      "Guests should review the applicable cancellation policy before confirming a reservation.",
      "To request cancellation or clarification about a refund, contact Coral with your booking reference and relevant details.",
    ],
  },
  {
    number: "08",
    title: "Property Care and Guest Conduct",
    content: [
      "Guests are expected to use the accommodation responsibly, respect other occupants and neighbours, and follow the property's house rules.",
      "Guests may be responsible for damage or loss caused by their actions, subject to applicable law and the relevant booking terms.",
      "Report maintenance issues or property concerns to the responsible property team as soon as reasonably possible.",
    ],
  },
  {
    number: "09",
    title: "Property Information and Availability",
    content: [
      "Property descriptions, photographs, amenities, prices and availability are provided to help guests make an informed decision.",
      "Specific facilities, requests and arrangements should be confirmed with Coral where they are important to your stay.",
      "Availability and property services may change. Coral will communicate material booking-related information through the applicable booking process.",
    ],
  },
  {
    number: "10",
    title: "Privacy and Personal Information",
    content: [
      "Personal information provided during an enquiry or booking should be handled in accordance with the applicable privacy notice and laws.",
      "Guests should provide only accurate information needed for the booking process and should not share passwords, payment PINs or one-time passwords with anyone claiming to provide support.",
    ],
  },
  {
    number: "11",
    title: "Liability and Applicable Law",
    content: [
      "Nothing in these terms is intended to exclude or limit any rights or remedies that cannot lawfully be excluded or limited.",
      "The parties' rights and obligations are subject to applicable law. Any dispute will be handled in accordance with the applicable legal requirements and valid contractual terms.",
    ],
  },
  {
    number: "12",
    title: "Changes to These Terms",
    content: [
      "Coral may update these terms when business practices, services or legal requirements change. Updated terms will be published on this page with an appropriate revision date.",
      "The terms applicable to a particular reservation may also depend on the booking confirmation and property-specific conditions communicated to the guest.",
    ],
  },
];

export default function Terms() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-400"
          >
            <Link to="/" className="transition hover:text-teal-300">
              Home
            </Link>
            <span>/</span>
            <span className="text-teal-300">Terms & Conditions</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
            CORAL SERVICE APARTMENTS
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Terms & Conditions
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Please read these terms carefully to understand the general
            conditions relating to property enquiries, reservations,
            nightly pricing and your stay with Coral.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
              Booking conditions
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
              Pricing transparency
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
              Guest responsibilities
            </span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-950">
              Important information
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              These terms provide general information about using the Coral
              website and enquiring about or booking accommodation. The
              confirmed booking details and property-specific rules may
              provide additional information relevant to your reservation.
            </p>

            <p className="mt-3 leading-8 text-slate-600">
              Please contact Coral if you need clarification about any
              condition before making a booking.
            </p>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
              On this page
            </p>

            <div className="mt-4 space-y-3">
              <a
                href="#booking-terms"
                className="block text-sm text-slate-600 hover:text-teal-700"
              >
                Booking terms
              </a>
              <a
                href="#pricing"
                className="block text-sm text-slate-600 hover:text-teal-700"
              >
                Pricing & payments
              </a>
              <a
                href="#cancellations"
                className="block text-sm text-slate-600 hover:text-teal-700"
              >
                Cancellation policy
              </a>
              <a
                href="#contact"
                className="block text-sm text-slate-600 hover:text-teal-700"
              >
                Contact Coral
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Terms list */}
      <section
        id="booking-terms"
        className="mx-auto max-w-4xl scroll-mt-8 px-5 pb-16 sm:px-8"
      >
        <div className="space-y-5">
          {sections.map((section) => (
            <article
              key={section.number}
              id={
                section.number === "03"
                  ? "pricing"
                  : section.number === "07"
                    ? "cancellations"
                    : undefined
              }
              className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-sm font-bold text-teal-800">
                  {section.number}
                </span>

                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold leading-7 text-slate-950">
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-3">
                    {section.content.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-slate-600 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.number === "07" && (
                    <Link
                      to="/cancellation-policy"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-600"
                    >
                      Read Cancellation Policy <span>→</span>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-8 bg-slate-50 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-950 p-7 text-white sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              Need clarification?
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Contact Coral Service Apartments
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              For questions about bookings, payment details, property
              requirements or these terms, contact the Coral team.
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
                "Hello Coral Service Apartments, I have a question about the Terms and Conditions."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-teal-300"
            >
              WhatsApp Coral ↗
            </a>

            <p className="mt-6 text-sm text-slate-400">
              MIHAN, Nagpur, Maharashtra
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
          <Link
            to="/help"
            className="text-slate-600 hover:text-teal-700"
          >
            Help Center
          </Link>

          <Link
            to="/booking-guide"
            className="text-slate-600 hover:text-teal-700"
          >
            Booking Guide
          </Link>

          <Link
            to="/cancellation-policy"
            className="text-slate-600 hover:text-teal-700"
          >
            Cancellation Policy
          </Link>

          <Link
            to="/"
            className="text-slate-600 hover:text-teal-700"
          >
            Back to Home
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-5xl text-center text-xs leading-6 text-slate-500">
          These terms are a general website draft and must be reviewed
          against Coral's actual booking procedures, cancellation and refund
          rules, privacy notice, and applicable legal requirements before
          publication.
        </p>
      </section>
    </main>
  );
}
