import { Link, useLocation, useNavigate } from "react-router-dom";

export default function BookingConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
            No booking found
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            Please start a new booking from Coral.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
          >
            Back to Coral
          </Link>

        </div>
      </main>
    );
  }

  const bookingId =
    state.bookingId ||
    `COR-${Date.now().toString().slice(-6)}`;

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

      {/* ================= HEADER ================= */}
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
            Booking confirmation
          </span>

        </div>

      </header>

      {/* ================= CONTENT ================= */}
      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-16">

        <div className="mx-auto max-w-5xl">

          {/* ================= SUCCESS HEADER ================= */}
          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E9F8F0]">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#18C66A] text-2xl font-extrabold text-[#073F32]">
                ✓
              </div>

            </div>

            <p className="mt-6 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              ALMOST THERE
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Your booking is ready!
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#667085]">
              Review your booking details below. Your reservation will be
              confirmed after payment.
            </p>

          </div>

          {/* ================= BOOKING CARD ================= */}
          <div className="mt-10 overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white shadow-xl">

            {/* Booking ID */}
            <div className="border-b border-[#E5E7EB] bg-[#E9F8F0] px-6 py-5 sm:px-8">

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div>

                  <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                    BOOKING ID
                  </p>

                  <p className="mt-1 text-lg font-extrabold text-[#073F32]">
                    {bookingId}
                  </p>

                </div>

                <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#18A85B]">
                  Pending payment
                </span>

              </div>

            </div>

            {/* ================= BODY ================= */}
            <div className="grid lg:grid-cols-[1fr_340px]">

              {/* ================= LEFT ================= */}
              <div className="p-6 sm:p-8">

                {/* Guest */}
                <div>

                  <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                    GUEST
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                    {state.firstName} {state.lastName}
                  </h2>

                  <p className="mt-1 text-sm text-[#667085]">
                    {state.email}
                  </p>

                  <p className="mt-1 text-sm text-[#667085]">
                    {state.phone}
                  </p>

                </div>

                {/* Stay */}
                <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                  <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                    YOUR STAY
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                    {state.propertyName}
                  </h2>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">
                      <p className="text-xs font-bold text-[#667085]">
                        CHECK-IN
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                        {state.checkIn}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">
                      <p className="text-xs font-bold text-[#667085]">
                        CHECK-OUT
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                        {state.checkOut}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">
                      <p className="text-xs font-bold text-[#667085]">
                        GUESTS
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                        {state.guests}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">
                      <p className="text-xs font-bold text-[#667085]">
                        ROOMS
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                        {state.rooms}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Room */}
                <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                  <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                    ROOM TYPE
                  </p>

                  <div className="mt-3 flex items-center gap-4 rounded-2xl bg-[#F8F9F7] p-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F0] text-xl">
                      🛏
                    </div>

                    <div>

                      <p className="text-sm font-extrabold text-[#10254A]">
                        {state.roomName}
                      </p>

                      <p className="mt-1 text-xs text-[#667085]">
                        {state.nights}{" "}
                        {state.nights === 1 ? "night" : "nights"}{" "}
                        ·{" "}
                        {state.rooms}{" "}
                        {state.rooms === 1 ? "room" : "rooms"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Special Request */}
                {state.requests && (
                  <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                    <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                      SPECIAL REQUEST
                    </p>

                    <p className="mt-3 rounded-2xl bg-[#F8F9F7] p-4 text-sm leading-6 text-[#667085]">
                      {state.requests}
                    </p>

                  </div>
                )}

              </div>

              {/* ================= RIGHT ================= */}
              <aside className="border-t border-[#E5E7EB] bg-[#FAFAF9] p-6 sm:p-8 lg:border-l lg:border-t-0">

                <h3 className="text-xl font-extrabold text-[#10254A]">
                  Price summary
                </h3>

                <div className="mt-6 space-y-4">

                  <div className="flex justify-between gap-4 text-sm text-[#667085]">

                    <span>
                      Stay
                    </span>

                    <span className="font-semibold text-[#344054]">
                      ₹{Number(state.stayTotal || 0).toLocaleString("en-IN")}
                    </span>

                  </div>

                  <div className="flex justify-between gap-4 text-sm text-[#667085]">

                    <span>
                      Taxes & fees
                    </span>

                    <span className="font-semibold text-[#344054]">
                      ₹{Number(state.taxes || 0).toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

                {/* Total */}
                <div className="mt-6 border-t border-[#E5E7EB] pt-5">

                  <div className="flex items-end justify-between gap-4">

                    <span className="font-extrabold text-[#10254A]">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold text-[#073F32]">
                      ₹
                      {Number(state.totalPrice || 0).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                </div>

                {/* ================= PAYMENT BUTTON ================= */}
                <button
                  type="button"
                  onClick={() =>
                    navigate("/payment", {
                      state: state,
                    })
                  }
                  className="mt-7 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                >
                  Proceed to payment →
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-[#667085]">
                  Secure payment · No hidden charges
                </p>

              </aside>

            </div>

          </div>

          {/* ================= HELP ================= */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[24px] bg-white p-5 sm:flex-row">

            <div>

              <p className="text-sm font-extrabold text-[#073F32]">
                Need help?
              </p>

              <p className="mt-1 text-xs text-[#667085]">
                Coral support is available 24/7 for your journey.
              </p>

            </div>

            <Link
              to="/"
              className="rounded-full border border-[#073F32] px-5 py-3 text-sm font-bold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
            >
              Back to Coral
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}