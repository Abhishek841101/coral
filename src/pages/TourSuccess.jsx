import { Link, useLocation } from "react-router-dom";

export default function TourSuccess() {
  const { state } = useLocation();

  if (!state) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
            Booking not found
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            Please start your tour booking again.
          </p>

          <Link
            to="/#tours"
            className="mt-6 inline-block rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white"
          >
            Explore tours
          </Link>
        </div>
      </main>
    );
  }

  const bookingId =
    state.bookingId ||
    `COR-T${Date.now().toString().slice(-6)}`;

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

          <span className="text-sm font-bold text-[#667085]">
            Tour confirmed
          </span>

        </div>

      </header>

      {/* Content */}
      <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-20">

        <div className="mx-auto max-w-4xl">

          {/* Success */}
          <div className="text-center">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E9F8F0]">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#18C66A] text-3xl font-extrabold text-[#073F32]">
                ✓
              </div>

            </div>

            <p className="mt-7 text-sm font-extrabold tracking-[0.18em] text-[#18C66A]">
              TOUR BOOKING CONFIRMED
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Your adventure is booked! 🎉
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#667085]">
              Your payment was successful and your Coral tour has
              been confirmed.
            </p>

          </div>

          {/* Confirmation Card */}
          <div className="mt-10 overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-xl">

            {/* Top */}
            <div className="flex flex-col justify-between gap-4 border-b border-[#E5E7EB] bg-[#E9F8F0] px-6 py-6 sm:flex-row sm:items-center sm:px-8">

              <div>

                <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                  BOOKING ID
                </p>

                <p className="mt-1 text-xl font-extrabold text-[#073F32]">
                  {bookingId}
                </p>

              </div>

              <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#18A85B]">
                ✓ Confirmed
              </span>

            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">

              {/* Tour */}
              <div>

                <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                  YOUR TOUR
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#10254A]">
                  {state.tourName}
                </h2>

                <p className="mt-2 text-sm text-[#667085]">
                  📍 {state.location}
                </p>

              </div>

              {/* Trip details */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#F8F9F7] p-5">

                  <p className="text-xs font-extrabold text-[#667085]">
                    TRAVEL DATE
                  </p>

                  <p className="mt-2 text-base font-extrabold text-[#10254A]">
                    {state.travelDate}
                  </p>

                </div>

                <div className="rounded-2xl bg-[#F8F9F7] p-5">

                  <p className="text-xs font-extrabold text-[#667085]">
                    DURATION
                  </p>

                  <p className="mt-2 text-base font-extrabold text-[#10254A]">
                    {state.duration}
                  </p>

                </div>

                <div className="rounded-2xl bg-[#F8F9F7] p-5">

                  <p className="text-xs font-extrabold text-[#667085]">
                    TRAVELLERS
                  </p>

                  <p className="mt-2 text-base font-extrabold text-[#10254A]">
                    {state.travelers}{" "}
                    {state.travelers === 1
                      ? "traveller"
                      : "travellers"}
                  </p>

                </div>

                <div className="rounded-2xl bg-[#F8F9F7] p-5">

                  <p className="text-xs font-extrabold text-[#667085]">
                    PAYMENT
                  </p>

                  <p className="mt-2 text-base font-extrabold text-[#18A85B]">
                    Successful
                  </p>

                </div>

              </div>

              {/* Traveller */}
              <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                  PRIMARY TRAVELLER
                </p>

                <div className="mt-4">

                  <p className="text-base font-extrabold text-[#10254A]">
                    {state.firstName} {state.lastName}
                  </p>

                  <p className="mt-1 text-sm text-[#667085]">
                    {state.email}
                  </p>

                  <p className="mt-1 text-sm text-[#667085]">
                    {state.phone}
                  </p>

                </div>

              </div>

              {/* Amount */}
              <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                <div className="flex items-center justify-between">

                  <span className="font-extrabold text-[#10254A]">
                    Amount paid
                  </span>

                  <span className="text-2xl font-extrabold text-[#073F32]">
                    ₹
                    {Number(
                      state.totalPrice || 0
                    ).toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              to="/"
              className="rounded-full bg-[#073F32] px-7 py-4 text-center text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
            >
              Explore Coral
            </Link>

            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full border border-[#073F32] bg-white px-7 py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#E9F8F0]"
            >
              Print confirmation
            </button>

          </div>

          {/* Support */}
          <div className="mt-7 rounded-[26px] bg-white p-6 text-center">

            <p className="text-sm font-extrabold text-[#073F32]">
              Need help?
            </p>

            <p className="mt-2 text-xs leading-5 text-[#667085]">
              Coral support is available 24/7 for your journey.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}