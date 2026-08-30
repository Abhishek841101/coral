import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const visas = [
  {
    id: 1,
    country: "United Arab Emirates",
    short: "UAE",
    type: "Tourist Visa",
    duration: "30 Days",
    processing: "3–5 Working Days",
    price: 4999,
    flag: "🇦🇪",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=80",
    description:
      "Get expert assistance for your UAE tourist visa application with document guidance and application support.",
    documents: [
      "Passport with minimum 6 months validity",
      "Recent passport-size photograph",
      "Confirmed return flight details",
      "Hotel or accommodation details",
      "Bank statement / financial proof",
    ],
  },
  {
    id: 2,
    country: "Thailand",
    short: "Thailand",
    type: "Tourist Visa",
    duration: "60 Days",
    processing: "5–7 Working Days",
    price: 3499,
    flag: "🇹🇭",
    image:
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1400&q=80",
    description:
      "Plan your Thailand holiday with professional visa assistance and step-by-step application support.",
    documents: [
      "Valid passport",
      "Recent photograph",
      "Return flight details",
      "Accommodation confirmation",
      "Financial documents",
    ],
  },
  {
    id: 3,
    country: "Singapore",
    short: "Singapore",
    type: "Tourist Visa",
    duration: "30 Days",
    processing: "5–7 Working Days",
    price: 5999,
    flag: "🇸🇬",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80",
    description:
      "Make your Singapore visa application easier with Coral's document and application assistance.",
    documents: [
      "Passport with required validity",
      "Recent photograph",
      "Travel itinerary",
      "Accommodation details",
      "Financial proof",
    ],
  },
  {
    id: 4,
    country: "Vietnam",
    short: "Vietnam",
    type: "e-Visa",
    duration: "90 Days",
    processing: "3–5 Working Days",
    price: 2999,
    flag: "🇻🇳",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80",
    description:
      "Apply for your Vietnam e-Visa with Coral's simple documentation and application support.",
    documents: [
      "Valid passport",
      "Passport photograph",
      "Travel information",
      "Accommodation details",
      "Return travel details",
    ],
  },
];

export default function VisaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const visa = visas.find(
    (item) => item.id === Number(id)
  );

  const [applicant, setApplicant] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelDate: "",
    passportNumber: "",
  });

  if (!visa) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
            🛂
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
            Visa not found
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            The visa service you're looking for isn't available.
          </p>

          <Link
            to="/#visa"
            className="mt-6 inline-block rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white"
          >
            Back to visas
          </Link>

        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    setApplicant({
      ...applicant,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !applicant.firstName ||
      !applicant.lastName ||
      !applicant.email ||
      !applicant.phone ||
      !applicant.travelDate ||
      !applicant.passportNumber
    ) {
      alert("Please complete all required details.");
      return;
    }

    navigate("/visa-application", {
      state: {
        visaId: visa.id,
        country: visa.country,
        visaType: visa.type,
        duration: visa.duration,
        processing: visa.processing,
        price: visa.price,
        ...applicant,
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

          <Link
            to="/"
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] font-extrabold text-[#073F32]">
              C
            </div>

            <span className="text-xl font-extrabold tracking-tight text-[#073F32]">
              Coral
            </span>
          </Link>

          <Link
            to="/#visa"
            className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32]"
          >
            ← Back to visas
          </Link>

        </div>

      </header>

      {/* Hero */}
      <section className="px-5 pt-8 sm:px-8 lg:px-10 lg:pt-10">

        <div className="mx-auto max-w-7xl">

          <div className="relative h-[360px] overflow-hidden rounded-[32px] sm:h-[470px]">

            <img
              src={visa.image}
              alt={`${visa.country} visa`}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            <div className="absolute bottom-8 left-6 right-6 text-white sm:left-10 sm:right-10">

              <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold text-[#073F32]">
                {visa.type}
              </span>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
                {visa.flag} {visa.country}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
                {visa.description}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Main */}
      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[1fr_390px]">

            {/* LEFT */}
            <div>

              {/* Quick Info */}
              <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-5">

                  <p className="text-xs font-extrabold text-[#667085]">
                    VISA TYPE
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                    {visa.type}
                  </p>

                </div>

                <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-5">

                  <p className="text-xs font-extrabold text-[#667085]">
                    VALIDITY
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                    {visa.duration}
                  </p>

                </div>

                <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-5">

                  <p className="text-xs font-extrabold text-[#667085]">
                    PROCESSING
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                    {visa.processing}
                  </p>

                </div>

              </div>

              {/* Documents */}
              <div className="mt-10">

                <p className="text-sm font-extrabold tracking-[0.15em] text-[#18C66A]">
                  DOCUMENT CHECKLIST
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#10254A]">
                  Documents you'll need
                </h2>

                <div className="mt-6 grid gap-3">

                  {visa.documents.map((document) => (
                    <div
                      key={document}
                      className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4"
                    >

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9F8F0] text-sm font-extrabold text-[#18A85B]">
                        ✓
                      </span>

                      <span className="text-sm font-semibold text-[#344054]">
                        {document}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

              {/* Process */}
              <div className="mt-12">

                <p className="text-sm font-extrabold tracking-[0.15em] text-[#18C66A]">
                  SIMPLE PROCESS
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#10254A]">
                  How it works
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">

                  <div className="rounded-[24px] bg-[#E9F8F0] p-5">

                    <span className="text-2xl font-extrabold text-[#073F32]">
                      01
                    </span>

                    <h3 className="mt-4 text-base font-extrabold text-[#073F32]">
                      Submit details
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#667085]">
                      Share your basic travel and passport information.
                    </p>

                  </div>

                  <div className="rounded-[24px] bg-white p-5">

                    <span className="text-2xl font-extrabold text-[#073F32]">
                      02
                    </span>

                    <h3 className="mt-4 text-base font-extrabold text-[#10254A]">
                      Documents
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#667085]">
                      Our team helps you prepare the required documents.
                    </p>

                  </div>

                  <div className="rounded-[24px] bg-white p-5">

                    <span className="text-2xl font-extrabold text-[#073F32]">
                      03
                    </span>

                    <h3 className="mt-4 text-base font-extrabold text-[#10254A]">
                      Application
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#667085]">
                      We assist you throughout the application process.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT FORM */}
            <aside className="h-fit lg:sticky lg:top-24">

              <form
                onSubmit={handleSubmit}
                className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-xl"
              >

                <p className="text-xs font-extrabold tracking-[0.14em] text-[#18C66A]">
                  START APPLICATION
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                  Apply for {visa.short}
                </h2>

                <p className="mt-2 text-sm text-[#667085]">
                  Fill in your basic details to continue.
                </p>

                {/* Name */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                  <input
                    name="firstName"
                    value={applicant.firstName}
                    onChange={handleChange}
                    placeholder="First name *"
                    className="rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                  />

                  <input
                    name="lastName"
                    value={applicant.lastName}
                    onChange={handleChange}
                    placeholder="Last name *"
                    className="rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                  />

                </div>

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={applicant.email}
                  onChange={handleChange}
                  placeholder="Email address *"
                  className="mt-3 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                />

                {/* Phone */}
                <input
                  type="tel"
                  name="phone"
                  value={applicant.phone}
                  onChange={handleChange}
                  placeholder="Mobile number *"
                  className="mt-3 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                />

                {/* Passport */}
                <input
                  name="passportNumber"
                  value={applicant.passportNumber}
                  onChange={handleChange}
                  placeholder="Passport number *"
                  className="mt-3 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold uppercase text-[#10254A] outline-none focus:border-[#18C66A]"
                />

                {/* Travel Date */}
                <div className="mt-3">

                  <label className="text-xs font-extrabold text-[#667085]">
                    EXPECTED TRAVEL DATE *
                  </label>

                  <input
                    type="date"
                    name="travelDate"
                    value={applicant.travelDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                  />

                </div>

                {/* Price */}
                <div className="mt-6 flex items-center justify-between border-t border-[#E5E7EB] pt-5">

                  <span className="text-sm font-bold text-[#667085]">
                    Service starting from
                  </span>

                  <span className="text-xl font-extrabold text-[#073F32]">
                    ₹{visa.price.toLocaleString("en-IN")}
                  </span>

                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                >
                  Continue application →
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-[#667085]">
                  Visa approval is subject to the applicable immigration
                  authority.
                </p>

              </form>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}