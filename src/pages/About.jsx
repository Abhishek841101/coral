
import React from "react";

const partnerships = [
  {
    number: "01",
    title: "Property Owners & Landlords",
    description:
      "Own a residential apartment, building or property in a promising location? Partner with Coral to explore serviced-apartment operations and professional property management.",
  },
  {
    number: "02",
    title: "Real Estate Developers",
    description:
      "Collaborate with us on residential and hospitality projects suitable for serviced accommodation, subject to feasibility and mutually agreed terms.",
  },
  {
    number: "03",
    title: "Investors & Business Partners",
    description:
      "Explore Coral's proposed expansion opportunities, including MIHAN, Nagpur. Funding requirements and commercial terms can be discussed individually.",
  },
  {
    number: "04",
    title: "Corporate Accommodation Partners",
    description:
      "Build long-term relationships for employee accommodation, visiting executives, consultants and project teams through individually agreed corporate rates.",
  },
  {
    number: "05",
    title: "Hospitality & Business Associates",
    description:
      "Collaborate with travel agencies, relocation providers and businesses that can help us serve more guests and expand our network.",
  },
];

const values = [
  {
    icon: "♡",
    title: "Guest Satisfaction",
    description: "Treat every guest with care, respect and professionalism.",
  },
  {
    icon: "✦",
    title: "Cleanliness & Upkeep",
    description: "Focus on clean, well-maintained and guest-ready spaces.",
  },
  {
    icon: "✓",
    title: "Reliability",
    description: "Clear communication and responsive guest support.",
  },
  {
    icon: "↗",
    title: "Responsible Growth",
    description: "Expand thoughtfully while protecting service standards.",
  },
];

const services = [
  "Furnished 2BHK apartments for families and groups",
  "1RK accommodation for individuals and independent stays",
  "Room options for different guest requirements",
  "Short-stay and extended-stay enquiries, subject to availability",
  "Corporate bookings and negotiated rates, subject to agreement",
  "Housekeeping, maintenance coordination and guest support",
];

const operatingStandards = [
  "Housekeeping and cleanliness checks before guest arrival",
  "Routine property maintenance and attention to reported issues",
  "Clear booking, check-in and check-out communication",
  "Prompt handling of guest feedback and service requests",
  "Property readiness checks and service-provider coordination",
];

export default function About() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-slate-950 to-slate-900" />
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-teal-500/15 blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-teal-300">
            CORAL SERVICE APARTMENTS
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Comfortable Stays.
            <span className="block text-teal-300">
              Thoughtful Hospitality.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Discover the story behind Coral, our hospitality approach, our
            corporate accommodation services and our vision for growth in
            MIHAN, Nagpur.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#company"
              className="rounded-full bg-teal-500 px-7 py-3.5 font-semibold text-white transition hover:bg-teal-400"
            >
              Discover Coral
            </a>
            <a
              href="#partnership"
              className="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Partner With Us
            </a>
          </div>

          <p className="mt-10 text-sm text-slate-400">
            Hospitality experience dating back to 2011 · Nagpur, Maharashtra
          </p>
        </div>
      </section>

      {/* Company overview */}
      <section id="company" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              About Our Company
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              A welcoming stay, built around the guest.
            </h2>
            <p className="mt-6 leading-8 text-slate-600">
              Coral Service Apartments was established in 2018 by hospitality
              entrepreneur Mr Abhishek Kushawar. Building on practical
              experience in hotel operations and guest services, Coral focuses
              on comfortable, well-maintained accommodation for business
              travellers, corporate guests, families and leisure visitors.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              The company profile describes a network of 12 mid-market
              apartments in Nagpur, with experience across Nagpur, Bhopal and
              Indore. Coral combines the privacy and convenience of
              apartment-style accommodation with attentive hospitality,
              housekeeping and a focus on guest satisfaction.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Our aim is to build lasting relationships with guests, companies
              and business partners through consistent service and transparent
              communication.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-7 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
              Our Vision
            </p>
            <p className="mt-3 text-xl font-semibold leading-8 text-slate-900">
              To grow Coral into a trusted hospitality brand known for comfort,
              reliability and guest-focused service.
            </p>
            <div className="my-7 h-px bg-slate-200" />
            <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
              Our Mission
            </p>
            <p className="mt-3 leading-7 text-slate-600">
              To provide clean, comfortable and well-equipped accommodation
              while developing sustainable operations and long-term corporate
              relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              What Guides Us
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Our vision, mission & values
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-2xl text-teal-700">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation and services */}
      <section id="services" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Accommodation
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Space, privacy and practical comfort.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Coral's serviced-apartment approach is designed for guests who
              value flexibility, particularly during business trips and
              extended stays. The proposed MIHAN project includes multiple
              accommodation formats, subject to final project planning.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-950">
              Services for guests and businesses
            </h3>
            <ul className="mt-6 space-y-4">
              {services.map((service) => (
                <li key={service} className="flex gap-3 leading-7 text-slate-600">
                  <span className="mt-0.5 font-bold text-teal-700">✓</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              Leadership
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Experience shaped by hospitality.
            </h2>
            <div className="mt-7 inline-block rounded-2xl border border-white/15 bg-white/5 p-6">
              <p className="text-2xl font-bold">Abhishek Kushawar</p>
              <p className="mt-1 text-teal-300">Director</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Hotel operations · Guest services · Property management
              </p>
            </div>
          </div>

          <div className="space-y-5 leading-8 text-slate-300">
            <p>
              According to the company information provided, Mr Abhishek
              Kushawar began his hotel journey in 2011 with Hotel Check-In, a
              13-room property in Nagpur. The following year, he took on Hotel
              Peanut, an 11-room property.
            </p>
            <p>
              He subsequently developed Hotel Coral in Manish Nagar, Nagpur,
              described in the original profile as an 18-key property with a
              restaurant and rooftop area.
            </p>
            <p>
              This hands-on experience provides a foundation in guest service,
              accommodation management, property maintenance and day-to-day
              hospitality operations.
            </p>
          </div>
        </div>
      </section>

      {/* Operations */}
      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            Our Approach
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Service standards that matter.
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-slate-600">
            Guest confidence depends on consistent standards, clear
            communication and prompt attention to property and service needs.
            Coral's operating approach is intended to include:
          </p>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {operatingStandards.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-xl border border-slate-200 p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-800">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth */}
      <section className="bg-teal-50 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-800">
            Business Model & Growth
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold text-slate-950 sm:text-4xl">
            Growing thoughtfully. Building lasting relationships.
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-slate-700">
            Coral's business model centres on furnished accommodation for
            individual guests and corporate clients. Potential revenue streams
            include apartment and room bookings, extended stays and negotiated
            corporate arrangements, depending on availability and agreed
            rates.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Occupancy", "Monitor property-level occupancy by month."],
              ["Booking Value", "Track booking values using a defined method."],
              ["Guest Feedback", "Review service feedback and repeat bookings."],
              ["Cost Control", "Monitor housekeeping, utilities and repairs."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MIHAN expansion */}
      <section id="mihan" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 text-white">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
                Proposed Expansion
              </p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                The MIHAN, Nagpur opportunity.
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                Coral is exploring expansion in MIHAN, Nagpur, with a proposed
                fully furnished accommodation project intended for business
                travellers, corporate guests, visiting employees, consultants
                and project teams.
              </p>
              <p className="mt-4 leading-8 text-slate-300">
                The proposed accommodation mix includes 2BHK apartments, 1RK
                units and rooms, subject to final planning, feasibility and
                project approvals.
              </p>

              <h3 className="mt-8 text-lg font-bold">Project priorities</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>✓ Multiple accommodation formats</li>
                <li>✓ Furnished spaces for practical, comfortable stays</li>
                <li>✓ Potential corporate partnerships and rate agreements</li>
                <li>✓ Focus on cleanliness, maintenance and guest support</li>
              </ul>
            </div>

            <div className="flex flex-col justify-center bg-teal-900 p-7 sm:p-10 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-200">
                Proposed Funding Requirement
              </p>
              <p className="mt-4 text-5xl font-bold sm:text-6xl">₹4 Crore</p>
              <p className="mt-5 leading-7 text-teal-50/90">
                Proposed funding sought for the MIHAN expansion project.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex w-fit rounded-full bg-white px-6 py-3 font-semibold text-teal-900 transition hover:bg-teal-50"
              >
                Discuss the Proposal
              </a>
              <p className="mt-5 text-xs leading-6 text-teal-100/80">
                Funding, investment structure, project costs and commercial
                terms require further discussion and due diligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership opportunities */}
      <section
        id="partnership"
        className="scroll-mt-24 bg-slate-50 px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Partner With Coral Service Apartments
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-5xl">
              Grow With Us. Build Hospitality Together.
            </h2>
            <p className="mt-6 leading-8 text-slate-600">
              We believe strong partnerships are the foundation of sustainable
              growth. We welcome property owners, developers, investors and
              corporate organisations who share our vision of delivering
              quality hospitality and building long-term business
              opportunities.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {partnerships.map((item) => (
              <article
                key={item.number}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm font-bold tracking-widest text-teal-700">
                  {item.number}
                </p>
                <h3 className="mt-4 text-xl font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-white p-7 sm:p-10">
            <h3 className="text-2xl font-bold text-slate-950">
              Why partner with Coral?
            </h3>
            <div className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {[
                "Hospitality and hotel-operating experience",
                "Focus on guest satisfaction and property upkeep",
                "Options for business, leisure and extended-stay guests",
                "Potential corporate bookings and long-stay requirements",
                "A growth-oriented serviced-accommodation approach",
                "Partnership models tailored to individual objectives",
              ].map((item) => (
                <div key={item} className="flex gap-3 leading-7 text-slate-700">
                  <span className="font-bold text-teal-700">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            Let's Build Something Together
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold text-slate-950 sm:text-4xl">
            Have a property, corporate requirement or partnership idea?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            We welcome enquiries about property management, corporate
            accommodation, business collaborations and the proposed MIHAN
            project. Contact the Coral management team to discuss your
            requirements.
          </p>
          <p className="mt-6 font-semibold text-slate-800">
            Coral Service Apartments · MIHAN, Nagpur, Maharashtra
          </p>

          {/* Add the verified business phone and email here. */}
          
<div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
  <a
    href="tel:8007133786"
    className="rounded-full bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
  >
    📞 8007133786
  </a>

  <a
    href="mailto:coral.apartment79@gmail.com"
    className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
  >
    ✉️ coral.apartment79@gmail.com
  </a>
</div>

        </div>

        <p className="mx-auto mt-8 max-w-5xl text-xs leading-6 text-slate-500">
          Information on this page describes company-provided background and
          proposed plans. Property inventory, amenities, performance figures
          and expansion milestones should be verified before external use.
          Partnerships and investment proposals are subject to evaluation, due
          diligence, availability, approvals where applicable, and mutually
          agreed terms. Occupancy, returns on investment and business
          performance are not guaranteed. The proposed ₹4 crore funding
          requirement is not an offer or guarantee of investment returns.
        </p>
      </section>
    </main>
  );
}
