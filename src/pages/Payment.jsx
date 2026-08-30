import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { properties } from "../data/properties";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [method, setMethod] = useState("card");

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const property = properties.find(
    (item) => item.id === Number(state?.propertyId)
  );

  if (!state || !property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#10254A]">
            Payment session expired
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            Please start your booking again.
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

  const handlePayment = (e) => {
  e.preventDefault();

  if (method === "card") {
    if (
      !card.number ||
      !card.expiry ||
      !card.cvv ||
      !card.name
    ) {
      alert("Please complete your card details.");
      return;
    }
  }

  navigate("/booking-success", {
    state: {
      ...state,
      paymentMethod: method,
      paymentStatus: "success",
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

          <div className="flex items-center gap-2 text-xs font-bold text-[#667085]">
            <span className="hidden sm:inline">
              Secure checkout
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9F8F0] text-[#073F32]">
              🔒
            </span>
          </div>

        </div>
      </header>

      {/* Content */}
      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">

          {/* Heading */}
          <div className="mb-10">

            <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              SECURE CHECKOUT
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Complete payment
            </h1>

            <p className="mt-3 text-sm text-[#667085]">
              You're one step away from your Coral journey.
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* ================= PAYMENT FORM ================= */}
            <form
              onSubmit={handlePayment}
              className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8"
            >

              <h2 className="text-2xl font-extrabold text-[#10254A]">
                Payment method
              </h2>

              <p className="mt-2 text-sm text-[#667085]">
                Choose how you'd like to pay.
              </p>

              {/* Methods */}
              <div className="mt-7 grid gap-3 sm:grid-cols-3">

                {[
                  {
                    id: "card",
                    label: "Card",
                    icon: "💳",
                  },
                  {
                    id: "upi",
                    label: "UPI",
                    icon: "📱",
                  },
                  {
                    id: "netbanking",
                    label: "Net Banking",
                    icon: "🏦",
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

              {/* CARD */}
              {method === "card" && (
                <div className="mt-8">

                  <div>
                    <label className="text-xs font-extrabold text-[#667085]">
                      CARDHOLDER NAME
                    </label>

                    <input
                      value={card.name}
                      onChange={(e) =>
                        setCard({
                          ...card,
                          name: e.target.value,
                        })
                      }
                      placeholder="Name on card"
                      className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                    />
                  </div>

                  <div className="mt-5">
                    <label className="text-xs font-extrabold text-[#667085]">
                      CARD NUMBER
                    </label>

                    <input
                      inputMode="numeric"
                      maxLength={19}
                      value={card.number}
                      onChange={(e) =>
                        setCard({
                          ...card,
                          number: e.target.value,
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold tracking-wider text-[#10254A] outline-none transition focus:border-[#18C66A]"
                    />
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">

                    <div>
                      <label className="text-xs font-extrabold text-[#667085]">
                        EXPIRY
                      </label>

                      <input
                        maxLength={5}
                        value={card.expiry}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            expiry: e.target.value,
                          })
                        }
                        placeholder="MM/YY"
                        className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-extrabold text-[#667085]">
                        CVV
                      </label>

                      <input
                        type="password"
                        maxLength={4}
                        value={card.cvv}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            cvv: e.target.value,
                          })
                        }
                        placeholder="•••"
                        className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                      />
                    </div>

                  </div>

                </div>
              )}

              {/* UPI */}
              {method === "upi" && (
                <div className="mt-8">

                  <label className="text-xs font-extrabold text-[#667085]">
                    UPI ID
                  </label>

                  <input
                    placeholder="example@upi"
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                  />

                  <div className="mt-4 rounded-2xl bg-[#E9F8F0] p-4">
                    <p className="text-sm font-extrabold text-[#073F32]">
                      Quick & secure
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#667085]">
                      You'll receive a payment request in your UPI app.
                    </p>
                  </div>

                </div>
              )}

              {/* Net Banking */}
              {method === "netbanking" && (
                <div className="mt-8">

                  <label className="text-xs font-extrabold text-[#667085]">
                    SELECT BANK
                  </label>

                  <select className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]">
                    <option>Select your bank</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>

                </div>
              )}

              {/* Pay Button */}
              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
              >
                Pay ₹{state.totalPrice.toLocaleString("en-IN")} →
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#667085]">
                <span>🔒</span>
                Secure & encrypted payment
              </div>

            </form>

            {/* ================= SUMMARY ================= */}
            <aside className="h-fit lg:sticky lg:top-6">

              <div className="overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white shadow-lg">

                {/* Image */}
                <div className="h-[220px]">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">

                  <span className="rounded-full bg-[#E9F8F0] px-3 py-1.5 text-xs font-extrabold text-[#073F32]">
                    ★ {property.rating}
                  </span>

                  <h2 className="mt-3 text-xl font-extrabold text-[#10254A]">
                    {property.name}
                  </h2>

                  <p className="mt-1 text-sm text-[#667085]">
                    📍 {property.location}
                  </p>

                  {/* Details */}
                  <div className="mt-6 space-y-4 border-t border-[#E5E7EB] pt-5">

                    <div className="flex justify-between text-sm">
                      <span className="text-[#667085]">
                        Check-in
                      </span>

                      <span className="font-bold text-[#10254A]">
                        {state.checkIn}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-[#667085]">
                        Check-out
                      </span>

                      <span className="font-bold text-[#10254A]">
                        {state.checkOut}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-[#667085]">
                        Guests
                      </span>

                      <span className="font-bold text-[#10254A]">
                        {state.guests}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-[#667085]">
                        Rooms
                      </span>

                      <span className="font-bold text-[#10254A]">
                        {state.rooms}
                      </span>
                    </div>

                  </div>

                  {/* Total */}
                  <div className="mt-6 border-t border-[#E5E7EB] pt-5">

                    <div className="flex items-center justify-between">

                      <span className="font-extrabold text-[#10254A]">
                        Total
                      </span>

                      <span className="text-2xl font-extrabold text-[#073F32]">
                        ₹{state.totalPrice.toLocaleString("en-IN")}
                      </span>

                    </div>

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