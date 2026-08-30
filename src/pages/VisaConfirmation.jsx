import { Link, useLocation, useNavigate } from "react-router-dom";

export default function VisaConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

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

  const handleContinue = () => {
    navigate("/visa-payment", {
      state: {
        ...state,
        applicationId,
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
            Review application
          </span>

        </div>
      </header>

      {/* Content */}
      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        <div className="mx-auto max-w-6xl">

          {/* Heading */}
          <div className="mb-10">

            <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              REVIEW & SUBMIT
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Review your visa application
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
              Check your information and documents before continuing
              to secure payment.
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* LEFT */}
            <div className="space-y-6">

              {/* Application ID */}
              <div className="flex flex-col justify-between gap-3 rounded-[28px] border border-[#E5E7EB] bg-[#E9F8F0] p-6 sm:flex-row sm:items-center">

                <div>
                  <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                    APPLICATION ID
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-[#073F32]">
                    {applicationId}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#18A85B]">
                  Ready for payment
                </span>

              </div>

              {/* Applicant */}
              <div className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 sm:p-8">

                <div className="flex items-center justify-between gap-4">

                  <div>
                    <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                      APPLICANT
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                      Applicant details
                    </h2>
                  </div>

                  <Link
                    to={`/visa/${state.visaId}`}
                    className="text-xs font-extrabold text-[#18A85B]"
                  >
                    Edit
                  </Link>

                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">
                    <p className="text-xs font-bold text-[#667085]">
                      FULL NAME
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                      {state.firstName} {state.lastName}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">
                    <p className="text-xs font-bold text-[#667085]">
                      PASSPORT
                    </p>

                    <p className="mt-1 text-sm font-extrabold uppercase text-[#10254A]">
                      {state.passportNumber}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">
                    <p className="text-xs font-bold text-[#667085]">
                      EMAIL
                    </p>

                    <p className="mt-1 break-all text-sm font-extrabold text-[#10254A]">
                      {state.email}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">
                    <p className="text-xs font-bold text-[#667085]">
                      MOBILE
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                      {state.phone}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F8F9F7] p-4 sm:col-span-2">
                    <p className="text-xs font-bold text-[#667085]">
                      EXPECTED TRAVEL DATE
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                      {state.travelDate}
                    </p>
                  </div>

                </div>

              </div>

              {/* Visa */}
              <div className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 sm:p-8">

                <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                  VISA SERVICE
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                  {state.country}
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">
                    <p className="text-xs font-bold text-[#667085]">
                      VISA TYPE
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                      {state.visaType}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">
                    <p className="text-xs font-bold text-[#667085]">
                      VALIDITY
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                      {state.duration}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">
                    <p className="text-xs font-bold text-[#667085]">
                      PROCESSING
                    </p>

                    <p className="mt-1 text-sm font-extrabold text-[#10254A]">
                      {state.processing}
                    </p>
                  </div>

                </div>

              </div>

              {/* Documents */}
              <div className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 sm:p-8">

                <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                  DOCUMENTS
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                  Submitted documents
                </h2>

                <div className="mt-6 space-y-3">

                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#E9F8F0] p-4">

                    <div className="flex min-w-0 items-center gap-3">

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                        📄
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-[#073F32]">
                          Passport copy
                        </p>

                        <p className="truncate text-xs text-[#667085]">
                          {state.documents?.passport || "Uploaded"}
                        </p>
                      </div>

                    </div>

                    <span className="text-xs font-extrabold text-[#18A85B]">
                      ✓
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#E9F8F0] p-4">

                    <div className="flex min-w-0 items-center gap-3">

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                        🖼️
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-[#073F32]">
                          Photograph
                        </p>

                        <p className="truncate text-xs text-[#667085]">
                          {state.documents?.photograph || "Uploaded"}
                        </p>
                      </div>

                    </div>

                    <span className="text-xs font-extrabold text-[#18A85B]">
                      ✓
                    </span>

                  </div>

                  {state.documents?.financial && (
                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#F8F9F7] p-4">

                      <div className="flex min-w-0 items-center gap-3">

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                          📑
                        </span>

                        <div className="min-w-0">
                          <p className="text-sm font-extrabold text-[#10254A]">
                            Financial document
                          </p>

                          <p className="truncate text-xs text-[#667085]">
                            {state.documents.financial}
                          </p>
                        </div>

                      </div>

                      <span className="text-xs font-extrabold text-[#18A85B]">
                        ✓
                      </span>

                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <aside className="h-fit lg:sticky lg:top-6">

              <div className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-xl">

                <p className="text-xs font-extrabold tracking-[0.14em] text-[#18C66A]">
                  PAYMENT SUMMARY
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                  {state.country}
                </h2>

                <p className="mt-1 text-sm text-[#667085]">
                  {state.visaType}
                </p>

                <div className="mt-6 space-y-4">

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-[#667085]">
                      Visa service
                    </span>

                    <span className="font-bold text-[#344054]">
                      ₹{Number(state.price).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-[#667085]">
                      Application support
                    </span>

                    <span className="font-bold text-[#18A85B]">
                      Included
                    </span>
                  </div>

                </div>

                <div className="mt-6 border-t border-[#E5E7EB] pt-5">

                  <div className="flex items-center justify-between">

                    <span className="font-extrabold text-[#10254A]">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold text-[#073F32]">
                      ₹{Number(state.price).toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="mt-7 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                >
                  Proceed to payment →
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-[#667085]">
                  Visa approval is subject to the applicable immigration
                  authority.
                </p>

              </div>

              <div className="mt-4 rounded-[24px] bg-[#E9F8F0] p-5">

                <p className="text-sm font-extrabold text-[#073F32]">
                  ✓ Coral visa assistance
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  Your application will be reviewed before processing.
                </p>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}