import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { properties } from "../data/properties";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  const property = properties.find(
    (item) => item.id === Number(booking?.propertyId)
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requests: "",
  });

  if (!booking || !property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#10254A]">
            Booking details unavailable
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            Please select a property and start your booking again.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white"
          >
            Back to Coral
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
      !form.phone
    ) {
      alert("Please complete all required details.");
      return;
    }

    navigate("/booking-confirmation", {
      state: {
        ...booking,
        ...form,
        propertyName: property.name,
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

            <span className="text-xl font-extrabold text-[#073F32]">
              Coral
            </span>
          </Link>

          <Link
            to={`/property/${property.id}`}
            className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32]"
          >
            ← Back to stay
          </Link>

        </div>
      </header>

      {/* Content */}
      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-10">
            <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              CORAL BOOKING
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Complete your booking
            </h1>

            <p className="mt-3 text-sm text-[#667085]">
              Just a few details and your journey is ready to go.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
            >

              <h2 className="text-2xl font-extrabold text-[#10254A]">
                Guest details
              </h2>

              <p className="mt-2 text-sm text-[#667085]">
                Enter the details of the primary guest.
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
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
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
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
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
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
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
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                />
              </div>

              {/* Requests */}
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
                  className="mt-2 w-full resize-none rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                />
              </div>

              {/* Terms */}
              <div className="mt-6 rounded-2xl bg-[#F8F9F7] p-4">
                <p className="text-xs leading-5 text-[#667085]">
                  By continuing, you agree to Coral's booking terms,
                  cancellation policy and privacy policy.
                </p>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
              >
                Continue to confirmation →
              </button>

            </form>

            {/* SUMMARY */}
            <aside className="h-fit lg:sticky lg:top-6">

              <div className="overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white shadow-lg">

                {/* Image */}
                <div className="h-[230px]">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-6">

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#E9F8F0] px-3 py-1.5 text-xs font-extrabold text-[#073F32]">
                      ★ {property.rating}
                    </span>

                    <span className="text-xs text-[#667085]">
                      {property.reviews} reviews
                    </span>
                  </div>

                  <h2 className="mt-3 text-xl font-extrabold text-[#10254A]">
                    {property.name}
                  </h2>

                  <p className="mt-1 text-sm text-[#667085]">
                    📍 {property.location}
                  </p>

                  {/* Booking Info */}
                  <div className="mt-6 space-y-4 border-t border-[#E5E7EB] pt-5">

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-[#667085]">
                        Check-in
                      </span>

                      <span className="text-sm font-bold text-[#10254A]">
                        {booking.checkIn}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-[#667085]">
                        Check-out
                      </span>

                      <span className="text-sm font-bold text-[#10254A]">
                        {booking.checkOut}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-[#667085]">
                        Guests
                      </span>

                      <span className="text-sm font-bold text-[#10254A]">
                        {booking.guests}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-[#667085]">
                        Rooms
                      </span>

                      <span className="text-sm font-bold text-[#10254A]">
                        {booking.rooms}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-[#667085]">
                        Room type
                      </span>

                      <span className="text-right text-sm font-bold text-[#10254A]">
                        {booking.roomName}
                      </span>
                    </div>

                  </div>

                  {/* Price */}
                  <div className="mt-6 border-t border-[#E5E7EB] pt-5">

                    <div className="flex justify-between text-sm text-[#667085]">
                      <span>Stay</span>

                      <span>
                        ₹{booking.stayTotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-between text-sm text-[#667085]">
                      <span>Taxes & fees</span>

                      <span>
                        ₹{booking.taxes.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="mt-5 flex justify-between border-t border-[#E5E7EB] pt-5">
                      <span className="font-extrabold text-[#10254A]">
                        Total
                      </span>

                      <span className="text-xl font-extrabold text-[#073F32]">
                        ₹{booking.totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* Trust */}
              <div className="mt-4 rounded-[24px] bg-[#E9F8F0] p-5">
                <p className="text-sm font-extrabold text-[#073F32]">
                  ✓ Secure Coral booking
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  Your details are protected and you won't be charged
                  until confirmation.
                </p>
              </div>

            </aside>

          </div>

        </div>
      </section>
    </main>
  );
}