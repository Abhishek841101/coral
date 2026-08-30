import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function PropertyEnquiry() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    requirement: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!state) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
            🏠
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
            Property enquiry not found
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            Please select a property and send an enquiry.
          </p>

          <Link
            to="/properties"
            className="mt-6 inline-block rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white"
          >
            Explore properties
          </Link>
        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.email) {
      alert("Please fill all required details.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F8F9F7]">

        <header className="border-b border-[#E5E7EB] bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

            <Link
              to="/"
              className="flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] font-extrabold text-[#073F32]">
                C
              </div>

              <span className="text-xl font-extrabold text-[#073F32]">
                Coral
              </span>
            </Link>

          </div>
        </header>

        <section className="flex min-h-[calc(100vh-73px)] items-center justify-center px-5 py-12">

          <div className="w-full max-w-xl rounded-[32px] border border-[#E5E7EB] bg-white p-8 text-center shadow-xl sm:p-12">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E9F8F0]">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#18C66A] text-3xl font-extrabold text-[#073F32]">
                ✓
              </div>

            </div>

            <p className="mt-7 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              ENQUIRY SUBMITTED
            </p>

            <h1 className="mt-2 text-4xl font-extrabold text-[#10254A]">
              Thanks, {form.name}! 🎉
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#667085]">
              Your enquiry for{" "}
              <span className="font-bold text-[#10254A]">
                {state.propertyName}
              </span>{" "}
              has been received.
            </p>

            <div className="mt-7 rounded-[24px] bg-[#E9F8F0] p-5 text-left">

              <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                WHAT HAPPENS NEXT
              </p>

              <div className="mt-4 space-y-3">

                <p className="text-sm font-semibold text-[#073F32]">
                  ✓ Our property expert will contact you
                </p>

                <p className="text-sm font-semibold text-[#073F32]">
                  ✓ Latest pricing will be shared
                </p>

                <p className="text-sm font-semibold text-[#073F32]">
                  ✓ Available units can be discussed
                </p>

                <p className="text-sm font-semibold text-[#073F32]">
                  ✓ Site visit can be scheduled
                </p>

              </div>

            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <Link
                to={`/property/${state.propertyId}`}
                className="flex-1 rounded-full bg-[#073F32] px-6 py-4 text-center text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
              >
                Back to property
              </Link>

              <Link
                to="/properties"
                className="flex-1 rounded-full border border-[#073F32] px-6 py-4 text-center text-sm font-extrabold text-[#073F32]"
              >
                Explore more
              </Link>

            </div>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

      {/* Header */}
      <header className="border-b border-[#E5E7EB] bg-white">

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
            to={`/property/${state.propertyId}`}
            className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32]"
          >
            ← Property
          </Link>

        </div>

      </header>

      {/* Content */}
      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10">

            <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              PROPERTY ENQUIRY
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Let's find the right property for you.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#667085]">
              Share your requirements and a Coral property expert
              will get in touch with you.
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
            >

              <h2 className="text-2xl font-extrabold text-[#10254A]">
                Your details
              </h2>

              <p className="mt-2 text-sm text-[#667085]">
                Fields marked with * are required.
              </p>

              {/* Name */}
              <div className="mt-7">

                <label className="text-xs font-extrabold text-[#667085]">
                  FULL NAME *
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                />

              </div>

              {/* Phone + Email */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="text-xs font-extrabold text-[#667085]">
                    MOBILE NUMBER *
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    inputMode="tel"
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                  />

                </div>

                <div>

                  <label className="text-xs font-extrabold text-[#667085]">
                    EMAIL *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                  />

                </div>

              </div>

              {/* Budget */}
              <div className="mt-5">

                <label className="text-xs font-extrabold text-[#667085]">
                  BUDGET
                </label>

                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                >

                  <option value="">
                    Select your budget
                  </option>

                  <option value="Under ₹50 Lakhs">
                    Under ₹50 Lakhs
                  </option>

                  <option value="₹50 Lakhs – ₹1 Crore">
                    ₹50 Lakhs – ₹1 Crore
                  </option>

                  <option value="₹1 Crore – ₹2 Crore">
                    ₹1 Crore – ₹2 Crore
                  </option>

                  <option value="Above ₹2 Crore">
                    Above ₹2 Crore
                  </option>

                </select>

              </div>

              {/* Requirement */}
              <div className="mt-5">

                <label className="text-xs font-extrabold text-[#667085]">
                  REQUIREMENT
                </label>

                <select
                  name="requirement"
                  value={form.requirement}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                >

                  <option value="">
                    What are you looking for?
                  </option>

                  <option value="Self use">
                    Home for self use
                  </option>

                  <option value="Investment">
                    Investment
                  </option>

                  <option value="Rental">
                    Rental income
                  </option>

                  <option value="Second home">
                    Second home
                  </option>

                </select>

              </div>

              {/* Message */}
              <div className="mt-5">

                <label className="text-xs font-extrabold text-[#667085]">
                  MESSAGE
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us anything else you'd like us to know..."
                  className="mt-2 w-full resize-none rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                />

              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
              >
                Submit Enquiry →
              </button>

              <p className="mt-4 text-center text-xs text-[#667085]">
                Your details will only be used to respond to your enquiry.
              </p>

            </form>

            {/* Property Summary */}
            <aside className="h-fit lg:sticky lg:top-6">

              <div className="overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white shadow-lg">

                <div className="relative h-[230px]">

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">

                    <p className="text-xs font-semibold text-white/75">
                      📍 {state.location}
                    </p>

                    <h2 className="mt-1 text-2xl font-extrabold text-white">
                      {state.propertyName}
                    </h2>

                  </div>

                </div>

                <div className="p-6">

                  <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                    PROPERTY SELECTED
                  </p>

                  <div className="mt-5 space-y-3">

                    <div className="flex justify-between gap-4">

                      <span className="text-sm text-[#667085]">
                        Location
                      </span>

                      <span className="text-right text-sm font-bold text-[#10254A]">
                        {state.location}
                      </span>

                    </div>

                    <div className="flex justify-between gap-4">

                      <span className="text-sm text-[#667085]">
                        Starting price
                      </span>

                      <span className="text-right text-sm font-extrabold text-[#073F32]">
                        {state.priceLabel ||
                          `₹${Number(state.price).toLocaleString("en-IN")}`}
                      </span>

                    </div>

                  </div>

                  <div className="mt-6 rounded-2xl bg-[#E9F8F0] p-4">

                    <p className="text-sm font-extrabold text-[#073F32]">
                      Why enquire with Coral?
                    </p>

                    <div className="mt-3 space-y-2">

                      <p className="text-xs text-[#667085]">
                        ✓ Latest property availability
                      </p>

                      <p className="text-xs text-[#667085]">
                        ✓ Current pricing
                      </p>

                      <p className="text-xs text-[#667085]">
                        ✓ Site visit assistance
                      </p>

                      <p className="text-xs text-[#667085]">
                        ✓ Expert guidance
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}