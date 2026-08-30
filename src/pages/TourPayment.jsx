import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function TourPayment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [method, setMethod] = useState("card");

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  if (!state) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
            💳
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
            Payment session expired
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            Please start your tour booking again.
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

  const handleCardChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };

 const handlePayment = (e) => {
  e.preventDefault();

  if (method === "card") {
    if (
      !card.name ||
      !card.number ||
      !card.expiry ||
      !card.cvv
    ) {
      alert("Please complete your card details.");
      return;
    }
  }

  if (method === "upi") {
    const upi = e.currentTarget.upi?.value;

    if (!upi) {
      alert("Please enter your UPI ID.");
      return;
    }
  }

  navigate("/tour-success", {
    state: {
      ...state,
      paymentMethod: method,
      paymentStatus: "success",
    },
  });
};

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

          <div className="flex items-center gap-2 text-xs font-bold text-[#667085]">

            <span className="hidden sm:inline">
              Secure checkout
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9F8F0]">
              🔒
            </span>

          </div>

        </div>

      </header>

      {/* ================= CONTENT ================= */}
      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        <div className="mx-auto max-w-6xl">

          {/* Heading */}
          <div className="mb-10">

            <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              TOUR CHECKOUT
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Complete your payment
            </h1>

            <p className="mt-3 text-sm text-[#667085]">
              Secure your place on this Coral experience.
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* ================= PAYMENT ================= */}
            <form
              onSubmit={handlePayment}
              className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
            >

              <h2 className="text-2xl font-extrabold text-[#10254A]">
                Payment method
              </h2>

              <p className="mt-2 text-sm text-[#667085]">
                Select your preferred payment method.
              </p>

              {/* Methods */}
              <div className="mt-7 grid gap-3 sm:grid-cols-3">

                {[
                  {
                    id: "card",
                    icon: "💳",
                    label: "Card",
                  },
                  {
                    id: "upi",
                    icon: "📱",
                    label: "UPI",
                  },
                  {
                    id: "netbanking",
                    icon: "🏦",
                    label: "Net Banking",
                  },
                ].map((item) => {

                  const active = method === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMethod(item.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-[#18C66A] bg-[#E9F8F0]"
                          : "border-[#E5E7EB] hover:border-[#18C66A]"
                      }`}
                    >

                      <div className="text-xl">
                        {item.icon}
                      </div>

                      <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                        {item.label}
                      </p>

                    </button>
                  );
                })}

              </div>

              {/* ================= CARD ================= */}
              {method === "card" && (
                <div className="mt-8">

                  <div>

                    <label className="text-xs font-extrabold text-[#667085]">
                      CARDHOLDER NAME
                    </label>

                    <input
                      name="name"
                      value={card.name}
                      onChange={handleCardChange}
                      placeholder="Name on card"
                      className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                    />

                  </div>

                  <div className="mt-5">

                    <label className="text-xs font-extrabold text-[#667085]">
                      CARD NUMBER
                    </label>

                    <input
                      name="number"
                      value={card.number}
                      onChange={handleCardChange}
                      maxLength={19}
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold tracking-wider text-[#10254A] outline-none focus:border-[#18C66A]"
                    />

                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">

                    <div>

                      <label className="text-xs font-extrabold text-[#667085]">
                        EXPIRY
                      </label>

                      <input
                        name="expiry"
                        value={card.expiry}
                        onChange={handleCardChange}
                        maxLength={5}
                        placeholder="MM/YY"
                        className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                      />

                    </div>

                    <div>

                      <label className="text-xs font-extrabold text-[#667085]">
                        CVV
                      </label>

                      <input
                        name="cvv"
                        value={card.cvv}
                        onChange={handleCardChange}
                        maxLength={4}
                        type="password"
                        placeholder="•••"
                        className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                      />

                    </div>

                  </div>

                </div>
              )}

              {/* ================= UPI ================= */}
              {method === "upi" && (
                <div className="mt-8">

                  <label className="text-xs font-extrabold text-[#667085]">
                    UPI ID
                  </label>

                  <input
                    name="upi"
                    placeholder="example@upi"
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                  />

                  <div className="mt-4 rounded-2xl bg-[#E9F8F0] p-5">

                    <p className="text-sm font-extrabold text-[#073F32]">
                      Fast & secure
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#667085]">
                      A payment request will be sent to your UPI app.
                    </p>

                  </div>

                </div>
              )}

              {/* ================= NET BANKING ================= */}
              {method === "netbanking" && (
                <div className="mt-8">

                  <label className="text-xs font-extrabold text-[#667085]">
                    SELECT BANK
                  </label>

                  <select
                    name="bank"
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
                  >
                    <option value="">
                      Select your bank
                    </option>

                    <option value="hdfc">
                      HDFC Bank
                    </option>

                    <option value="icici">
                      ICICI Bank
                    </option>

                    <option value="sbi">
                      State Bank of India
                    </option>

                    <option value="axis">
                      Axis Bank
                    </option>

                    <option value="kotak">
                      Kotak Mahindra Bank
                    </option>

                  </select>

                </div>
              )}

              {/* Pay */}
              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
              >
                Pay ₹
                {Number(state.totalPrice).toLocaleString("en-IN")}
                {" "}→
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#667085]">
                <span>🔒</span>
                Secure & encrypted checkout
              </div>

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

                {/* Date */}
                <div className="mt-6 rounded-2xl bg-[#F8F9F7] p-4">

                  <p className="text-xs font-extrabold text-[#667085]">
                    TRAVEL DATE
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#10254A]">
                    {state.travelDate}
                  </p>

                </div>

                {/* Duration */}
                <div className="mt-3 rounded-2xl bg-[#F8F9F7] p-4">

                  <p className="text-xs font-extrabold text-[#667085]">
                    DURATION
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#10254A]">
                    {state.duration}
                  </p>

                </div>

                {/* Travellers */}
                <div className="mt-3 rounded-2xl bg-[#F8F9F7] p-4">

                  <p className="text-xs font-extrabold text-[#667085]">
                    TRAVELLERS
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#10254A]">
                    {state.travelers}
                    {" "}
                    {state.travelers === 1
                      ? "traveller"
                      : "travellers"}
                  </p>

                </div>

                {/* Total */}
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

              </div>

              <div className="mt-4 rounded-[24px] bg-[#E9F8F0] p-5">

                <p className="text-sm font-extrabold text-[#073F32]">
                  Coral secure checkout
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  Your payment information is protected.
                </p>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}