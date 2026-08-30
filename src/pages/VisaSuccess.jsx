import { Link, useLocation } from "react-router-dom";

export default function VisaSuccess() {
  const { state } = useLocation();

  if (!state) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
            🛂
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
            Application not found
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            Please start your visa application again.
          </p>

          <Link
            to="/#visa"
            className="mt-6 inline-block rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white"
          >
            Explore visas
          </Link>
        </div>
      </main>
    );
  }

  const applicationId =
    state.applicationId ||
    `COR-V${Date.now().toString().slice(-6)}`;

  const paymentId =
    state.paymentId ||
    `PAY-${Date.now().toString().slice(-8)}`;

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
            Application submitted
          </span>

        </div>

      </header>

      {/* ================= CONTENT ================= */}
      <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-20">

        <div className="mx-auto max-w-4xl">

          {/* Success Header */}
          <div className="text-center">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E9F8F0]">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#18C66A] text-3xl font-extrabold text-[#073F32]">
                ✓
              </div>

            </div>

            <p className="mt-7 text-sm font-extrabold tracking-[0.18em] text-[#18C66A]">
              VISA APPLICATION SUBMITTED
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              You're all set! 🎉
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#667085]">
              Your payment was successful and your visa assistance
              application has been submitted to Coral.
            </p>

          </div>

          {/* Main Card */}
          <div className="mt-10 overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-xl">

            {/* Application ID */}
            <div className="flex flex-col justify-between gap-4 border-b border-[#E5E7EB] bg-[#E9F8F0] px-6 py-6 sm:flex-row sm:items-center sm:px-8">

              <div>

                <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                  APPLICATION ID
                </p>

                <p className="mt-1 text-xl font-extrabold text-[#073F32]">
                  {applicationId}
                </p>

              </div>

              <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#18A85B]">
                ✓ Submitted
              </span>

            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">

              {/* Visa */}
              <div>

                <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                  VISA SERVICE
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#10254A]">
                  {state.country}
                </h2>

                <p className="mt-2 text-sm text-[#667085]">
                  {state.visaType}
                </p>

              </div>

              {/* Details */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#F8F9F7] p-5">

                  <p className="text-xs font-extrabold text-[#667085]">
                    APPLICANT
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                    {state.firstName} {state.lastName}
                  </p>

                </div>

                <div className="rounded-2xl bg-[#F8F9F7] p-5">

                  <p className="text-xs font-extrabold text-[#667085]">
                    PASSPORT
                  </p>

                  <p className="mt-2 text-sm font-extrabold uppercase text-[#10254A]">
                    {state.passportNumber}
                  </p>

                </div>

                <div className="rounded-2xl bg-[#F8F9F7] p-5">

                  <p className="text-xs font-extrabold text-[#667085]">
                    TRAVEL DATE
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                    {state.travelDate}
                  </p>

                </div>

                <div className="rounded-2xl bg-[#F8F9F7] p-5">

                  <p className="text-xs font-extrabold text-[#667085]">
                    PROCESSING TIME
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                    {state.processing}
                  </p>

                </div>

              </div>

              {/* Payment */}
              <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                  PAYMENT
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">

                  <div className="rounded-2xl bg-[#E9F8F0] p-4">

                    <p className="text-xs font-bold text-[#667085]">
                      STATUS
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-[#18A85B]">
                      Successful
                    </p>

                  </div>

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">

                    <p className="text-xs font-bold text-[#667085]">
                      PAYMENT ID
                    </p>

                    <p className="mt-1 break-all text-sm font-extrabold text-[#10254A]">
                      {paymentId}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">

                    <p className="text-xs font-bold text-[#667085]">
                      AMOUNT PAID
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                      ₹{Number(state.price).toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>

              </div>

              {/* Next Steps */}
              <div className="mt-8 border-t border-[#E5E7EB] pt-7">

                <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                  WHAT HAPPENS NEXT
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">

                  <div className="rounded-[24px] bg-[#E9F8F0] p-5">

                    <span className="text-2xl font-extrabold text-[#073F32]">
                      01
                    </span>

                    <h3 className="mt-4 text-sm font-extrabold text-[#073F32]">
                      Document review
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#667085]">
                      Our team will review your submitted documents.
                    </p>

                  </div>

                  <div className="rounded-[24px] bg-[#F8F9F7] p-5">

                    <span className="text-2xl font-extrabold text-[#073F32]">
                      02
                    </span>

                    <h3 className="mt-4 text-sm font-extrabold text-[#10254A]">
                      Application processing
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#667085]">
                      Your application will be processed as applicable.
                    </p>

                  </div>

                  <div className="rounded-[24px] bg-[#F8F9F7] p-5">

                    <span className="text-2xl font-extrabold text-[#073F32]">
                      03
                    </span>

                    <h3 className="mt-4 text-sm font-extrabold text-[#10254A]">
                      Status updates
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#667085]">
                      Coral will keep you updated about your application.
                    </p>

                  </div>

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
              Back to Coral
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
              Need help with your visa?
            </p>

            <p className="mt-2 text-xs leading-5 text-[#667085]">
              Coral support can assist you with application-related
              questions and updates.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}