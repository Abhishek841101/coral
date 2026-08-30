import { Link, useLocation, useNavigate } from "react-router-dom";

export default function TourConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
            🧳
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
            Booking details not found
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            Please select the tour and start again.
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

  const bookingId =
    state.bookingId ||
    `COR-T${Date.now().toString().slice(-6)}`;

  const handlePayment = () => {
    navigate("/tour-payment", {
      state: {
        ...state,
        bookingId,
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

          <span className="text-sm font-bold text-[#667085]">
            Tour confirmation
          </span>

        </div>
      </header>

      {/* Content */}
      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-16">

        <div className="mx-auto max-w-5xl">

          {/* Heading */}
          <div className="text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E9F8F0] text-3xl">
              🧳
            </div>

            <p className="mt-6 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              REVIEW YOUR TRIP
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Almost ready to explore!
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#667085]">
              Review your traveller and tour details before proceeding
              to secure payment.
            </p>

          </div>

          {/* Card */}
          <div className="mt-10 overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white shadow-xl">

            {/* Booking ID */}
            <div className="flex flex-col justify-between gap-3 border-b border-[#E5E7EB] bg-[#E9F8F0] px-6 py-5 sm:flex-row sm:items-center sm:px-8">

              <div>
                <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                  TOUR BOOKING ID
                </p>

                <p className="mt-1 text-lg font-extrabold text-[#073F32]">
                  {bookingId}
                </p>
              </div>

              <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#18A85B]">
                Pending payment
              </span>

            </div>

            {/* Body */}
            <div className="grid lg:grid-cols-[1fr_340px]">

              {/* LEFT */}
              <div className="p-6 sm:p-8">

                {/* Tour */}
                <div>
                  <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                    YOUR TOUR
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                    {state.tourName}
                  </h2>

                  <p className="mt-2 text-sm text-[#667085]">
                    📍 {state.location}
                  </p>
                </div>

                {/* Trip details */}
                <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                  <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                    TRIP DETAILS
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">
                      <p className="text-xs font-bold text-[#667085]">
                        TRAVEL DATE
                      </p>

                      <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                        {state.travelDate}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">
                      <p className="text-xs font-bold text-[#667085]">
                        DURATION
                      </p>

                      <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                        {state.duration}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">
                      <p className="text-xs font-bold text-[#667085]">
                        TRAVELLERS
                      </p>

                      <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                        {state.travelers}{" "}
                        {state.travelers === 1
                          ? "traveller"
                          : "travellers"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8F9F7] p-4">
                      <p className="text-xs font-bold text-[#667085]">
                        PRICE / PERSON
                      </p>

                      <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                        ₹{Number(state.price).toLocaleString("en-IN")}
                      </p>
                    </div>

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

              {/* RIGHT */}
              <aside className="border-t border-[#E5E7EB] bg-[#FAFAF9] p-6 sm:p-8 lg:border-l lg:border-t-0">

                <h3 className="text-xl font-extrabold text-[#10254A]">
                  Price summary
                </h3>

                <div className="mt-6 space-y-4">

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-[#667085]">
                      Tour price
                    </span>

                    <span className="font-bold text-[#344054]">
                      ₹
                      {Number(state.price).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-[#667085]">
                      Travellers
                    </span>

                    <span className="font-bold text-[#344054]">
                      × {state.travelers}
                    </span>
                  </div>

                </div>

                <div className="mt-6 border-t border-[#E5E7EB] pt-5">

                  <div className="flex items-center justify-between">

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

                <button
                  type="button"
                  onClick={handlePayment}
                  className="mt-7 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                >
                  Proceed to payment →
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-[#667085]">
                  Secure checkout · No hidden charges
                </p>

              </aside>

            </div>

          </div>

          {/* Back */}
          <div className="mt-6 text-center">

            <Link
              to={`/tour/${state.tourId}`}
              className="text-sm font-bold text-[#073F32] hover:text-[#18A85B]"
            >
              ← Edit tour selection
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}