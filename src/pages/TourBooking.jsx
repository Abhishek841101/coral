import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function TourBooking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelDate: "",
    requests: "",
  });

  if (!state) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
            🧳
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
            Tour booking unavailable
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            Please select a tour and start your booking again.
          </p>

          <Link
            to="/#tours"
            className="mt-6 inline-block rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white"
          >
            Back to tours
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

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.travelDate
    ) {
      alert("Please complete all required details.");
      return;
    }

    navigate("/tour-confirmation", {
      state: {
        ...state,
        ...form,
      },
    });
  };

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
            to={`/tour/${state.tourId}`}
            className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32]"
          >
            ← Back to tour
          </Link>

        </div>

      </header>

      {/* Content */}
      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        <div className="mx-auto max-w-6xl">

          {/* Heading */}
          <div className="mb-10">

            <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              TOUR BOOKING
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Plan your journey
            </h1>

            <p className="mt-3 text-sm text-[#667085]">
              Enter your details to continue with your tour booking.
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* ================= FORM ================= */}
            <form
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
            >

              <h2 className="text-2xl font-extrabold text-[#10254A]">
                Traveller details
              </h2>

              <p className="mt-2 text-sm text-[#667085]">
                Primary traveller information
              </p>

              {/* Name */}
              <div className="mt-7 grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="text-xs font-extrabold text-[#667085]">
                    FIRST NAME *
                  </label>

                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-[#667085]">
                    LAST NAME *
                  </label>

                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                  />
                </div>

              </div>

              {/* Email */}
              <div className="mt-5">

                <label className="text-xs font-extrabold text-[#667085]">
                  EMAIL ADDRESS *
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                />

              </div>

              {/* Phone */}
              <div className="mt-5">

                <label className="text-xs font-extrabold text-[#667085]">
                  MOBILE NUMBER *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                />

              </div>

              {/* Travel Date */}
              <div className="mt-5">

                <label className="text-xs font-extrabold text-[#667085]">
                  TRAVEL DATE *
                </label>

                <input
                  type="date"
                  name="travelDate"
                  value={form.travelDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                />

              </div>

              {/* Special Requests */}
              <div className="mt-5">

                <label className="text-xs font-extrabold text-[#667085]">
                  SPECIAL REQUESTS
                </label>

                <textarea
                  name="requests"
                  value={form.requests}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Anything we should know?"
                  className="mt-2 w-full resize-none rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                />

              </div>

              {/* Terms */}
              <div className="mt-6 rounded-2xl bg-[#F8F9F7] p-4">

                <p className="text-xs leading-5 text-[#667085]">
                  By continuing, you agree to Coral's booking terms,
                  cancellation policy and privacy policy.
                </p>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
              >
                Continue to confirmation →
              </button>

            </form>

            {/* ================= SUMMARY ================= */}
            <aside className="h-fit lg:sticky lg:top-6">

              <div className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-lg">

                <p className="text-xs font-extrabold tracking-[0.14em] text-[#18C66A]">
                  YOUR TOUR
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                  {state.tourName}
                </h2>

                <p className="mt-2 text-sm text-[#667085]">
                  📍 {state.location}
                </p>

                {/* Duration */}
                <div className="mt-6 rounded-2xl bg-[#F8F9F7] p-4">

                  <p className="text-xs font-extrabold text-[#667085]">
                    DURATION
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#10254A]">
                    🕒 {state.duration}
                  </p>

                </div>

                {/* Travel Date */}
                <div className="mt-3 rounded-2xl bg-[#F8F9F7] p-4">

                  <p className="text-xs font-extrabold text-[#667085]">
                    TRAVEL DATE
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#10254A]">
                    {form.travelDate || "Select travel date"}
                  </p>

                </div>

                {/* Travellers */}
                <div className="mt-3 rounded-2xl bg-[#F8F9F7] p-4">

                  <p className="text-xs font-extrabold text-[#667085]">
                    TRAVELLERS
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#10254A]">
                    {state.travelers}{" "}
                    {state.travelers === 1
                      ? "traveller"
                      : "travellers"}
                  </p>

                </div>

                {/* Price */}
                <div className="mt-6 border-t border-[#E5E7EB] pt-5">

                  <div className="flex justify-between text-sm text-[#667085]">

                    <span>
                      ₹{Number(state.price).toLocaleString("en-IN")} ×{" "}
                      {state.travelers}
                    </span>

                    <span className="font-semibold text-[#344054]">
                      ₹
                      {Number(
                        state.totalPrice
                      ).toLocaleString("en-IN")}
                    </span>

                  </div>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="font-extrabold text-[#10254A]">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold text-[#073F32]">
                      ₹
                      {Number(
                        state.totalPrice
                      ).toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

              </div>

              {/* Trust */}
              <div className="mt-4 rounded-[24px] bg-[#E9F8F0] p-5">

                <p className="text-sm font-extrabold text-[#073F32]">
                  ✓ Coral travel support
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  Our team is available to help you throughout your
                  journey.
                </p>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}