import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function VisaApplication() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState({
    passport: null,
    photograph: null,
    financial: null,
  });

  const [declaration, setDeclaration] = useState(false);

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
            Please select a visa and start your application again.
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

  const handleFile = (e, type) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!documents.passport) {
      alert("Please upload your passport copy.");
      return;
    }

    if (!documents.photograph) {
      alert("Please upload your recent photograph.");
      return;
    }

    if (!declaration) {
      alert("Please accept the declaration.");
      return;
    }

    navigate("/visa-confirmation", {
      state: {
        ...state,
        documents: {
          passport: documents.passport.name,
          photograph: documents.photograph.name,
          financial: documents.financial?.name || "",
        },
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
            to={`/visa/${state.visaId}`}
            className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32]"
          >
            ← Back
          </Link>

        </div>

      </header>

      {/* Content */}
      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        <div className="mx-auto max-w-6xl">

          {/* Heading */}
          <div className="mb-10">

            <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              VISA APPLICATION
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Complete your application
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
              Upload the required documents so our visa team can
              review your application.
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
            >

              {/* Applicant */}
              <div>

                <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                  APPLICANT
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                  Applicant information
                </h2>

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
                    PASSPORT NUMBER
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

              </div>

              {/* Documents */}
              <div className="mt-10 border-t border-[#E5E7EB] pt-8">

                <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                  DOCUMENTS
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                  Upload your documents
                </h2>

                <p className="mt-2 text-sm text-[#667085]">
                  Accepted formats: JPG, PNG or PDF.
                </p>

              </div>

              {/* Passport */}
              <div className="mt-6 rounded-[24px] border border-[#E5E7EB] p-5">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm font-extrabold text-[#10254A]">
                      Passport copy *
                    </p>

                    <p className="mt-1 text-xs text-[#667085]">
                      Upload the bio page of your passport.
                    </p>

                  </div>

                  <span className="rounded-full bg-[#E9F8F0] px-3 py-1 text-xs font-extrabold text-[#18A85B]">
                    Required
                  </span>

                </div>

                <label className="mt-4 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[#D0D5DD] px-5 py-7 text-center transition hover:border-[#18C66A] hover:bg-[#F8F9F7]">

                  <div>

                    <div className="text-2xl">
                      📄
                    </div>

                    <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                      {documents.passport
                        ? documents.passport.name
                        : "Choose passport file"}
                    </p>

                    <p className="mt-1 text-xs text-[#667085]">
                      Click to browse
                    </p>

                  </div>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={(e) =>
                      handleFile(e, "passport")
                    }
                  />

                </label>

              </div>

              {/* Photograph */}
              <div className="mt-4 rounded-[24px] border border-[#E5E7EB] p-5">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm font-extrabold text-[#10254A]">
                      Recent photograph *
                    </p>

                    <p className="mt-1 text-xs text-[#667085]">
                      Use a clear passport-style photograph.
                    </p>

                  </div>

                  <span className="rounded-full bg-[#E9F8F0] px-3 py-1 text-xs font-extrabold text-[#18A85B]">
                    Required
                  </span>

                </div>

                <label className="mt-4 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[#D0D5DD] px-5 py-7 text-center transition hover:border-[#18C66A] hover:bg-[#F8F9F7]">

                  <div>

                    <div className="text-2xl">
                      🖼️
                    </div>

                    <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                      {documents.photograph
                        ? documents.photograph.name
                        : "Choose photograph"}
                    </p>

                    <p className="mt-1 text-xs text-[#667085]">
                      Click to browse
                    </p>

                  </div>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={(e) =>
                      handleFile(e, "photograph")
                    }
                  />

                </label>

              </div>

              {/* Financial */}
              <div className="mt-4 rounded-[24px] border border-[#E5E7EB] p-5">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm font-extrabold text-[#10254A]">
                      Financial document
                    </p>

                    <p className="mt-1 text-xs text-[#667085]">
                      Upload bank statement or financial proof if required.
                    </p>

                  </div>

                  <span className="rounded-full bg-[#F8F9F7] px-3 py-1 text-xs font-extrabold text-[#667085]">
                    Optional
                  </span>

                </div>

                <label className="mt-4 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[#D0D5DD] px-5 py-7 text-center transition hover:border-[#18C66A] hover:bg-[#F8F9F7]">

                  <div>

                    <div className="text-2xl">
                      📑
                    </div>

                    <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                      {documents.financial
                        ? documents.financial.name
                        : "Choose financial document"}
                    </p>

                    <p className="mt-1 text-xs text-[#667085]">
                      Click to browse
                    </p>

                  </div>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={(e) =>
                      handleFile(e, "financial")
                    }
                  />

                </label>

              </div>

              {/* Declaration */}
              <div className="mt-7 rounded-2xl bg-[#F8F9F7] p-5">

                <label className="flex cursor-pointer gap-3">

                  <input
                    type="checkbox"
                    checked={declaration}
                    onChange={(e) =>
                      setDeclaration(e.target.checked)
                    }
                    className="mt-1 h-4 w-4 accent-[#18C66A]"
                  />

                  <span className="text-xs leading-5 text-[#667085]">
                    I confirm that the information and documents
                    provided by me are accurate and genuine. I
                    understand that visa approval is subject to the
                    relevant immigration authority.
                  </span>

                </label>

              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
              >
                Review application →
              </button>

            </form>

            {/* SUMMARY */}
            <aside className="h-fit lg:sticky lg:top-6">

              <div className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-lg">

                <p className="text-xs font-extrabold tracking-[0.14em] text-[#18C66A]">
                  VISA SERVICE
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                  {state.country}
                </h2>

                <p className="mt-2 text-sm text-[#667085]">
                  {state.visaType}
                </p>

                <div className="mt-6 space-y-3">

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">

                    <p className="text-xs font-extrabold text-[#667085]">
                      VALIDITY
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#10254A]">
                      {state.duration}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">

                    <p className="text-xs font-extrabold text-[#667085]">
                      PROCESSING
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#10254A]">
                      {state.processing}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-[#F8F9F7] p-4">

                    <p className="text-xs font-extrabold text-[#667085]">
                      TRAVEL DATE
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#10254A]">
                      {state.travelDate}
                    </p>

                  </div>

                </div>

                <div className="mt-6 border-t border-[#E5E7EB] pt-5">

                  <div className="flex items-center justify-between">

                    <span className="font-extrabold text-[#10254A]">
                      Service fee
                    </span>

                    <span className="text-2xl font-extrabold text-[#073F32]">
                      ₹{Number(state.price).toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

              </div>

              <div className="mt-4 rounded-[24px] bg-[#E9F8F0] p-5">

                <p className="text-sm font-extrabold text-[#073F32]">
                  ✓ Document support
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  Our team will review your submitted information
                  before processing.
                </p>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}