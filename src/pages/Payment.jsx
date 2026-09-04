import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
getBookingById,
payBooking,
selectBooking,
selectBookingLoading,
selectSingleBookingError,
selectPayBookingLoading,
selectPayBookingError,
} from "../features/bookings/bookingSlice";

export default function Payment() {
const { state } = useLocation();
const navigate = useNavigate();
const dispatch = useDispatch();

const reduxBooking = useSelector(selectBooking);
const bookingLoading = useSelector(selectBookingLoading);
const bookingError = useSelector(selectSingleBookingError);
const payLoading = useSelector(selectPayBookingLoading);
const payError = useSelector(selectPayBookingError);

const stateBooking = state?.booking || null;

const bookingId =
state?.bookingId ||
stateBooking?._id ||
stateBooking?.id ||
"";

const booking = stateBooking || reduxBooking || null;

const [method, setMethod] = useState("card");

const [card, setCard] = useState({
number: "",
expiry: "",
cvv: "",
name: "",
});

const [upiId, setUpiId] = useState("");
const [bank, setBank] = useState("");

const [paymentError, setPaymentError] = useState("");

/* =====================================================
FETCH BOOKING


 Only fetch when booking was not already passed
 from BookingConfirmation.


===================================================== */

useEffect(() => {
if (!bookingId || stateBooking) return;


dispatch(getBookingById(bookingId));


}, [dispatch, bookingId, stateBooking]);

/* =====================================================
NO BOOKING ID
===================================================== */

if (!bookingId) {
return ( <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5"> <div className="text-center">


      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
        !
      </div>

      <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
        Payment session expired
      </h1>

      <p className="mt-3 text-sm text-[#667085]">
        Your booking information could not be found.
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

/* =====================================================
LOADING BOOKING
===================================================== */

if (bookingLoading && !booking) {
return ( <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">


    <div className="text-center">

      <div className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
        🔒
      </div>

      <h1 className="mt-6 text-2xl font-extrabold text-[#10254A]">
        Loading secure checkout...
      </h1>

      <p className="mt-3 text-sm text-[#667085]">
        Please wait while we load your booking.
      </p>

    </div>

  </main>
);


}

/* =====================================================
BOOKING ERROR
===================================================== */

if (bookingError && !booking) {
return ( <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">


    <div className="max-w-md text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
        !
      </div>

      <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
        Unable to load booking
      </h1>

      <p className="mt-3 text-sm leading-6 text-[#667085]">
        {bookingError}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">

        <button
          type="button"
          onClick={() => {
            setPaymentError("");
            dispatch(getBookingById(bookingId));
          }}
          disabled={bookingLoading}
          className="rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {bookingLoading
            ? "Loading..."
            : "Try again"}
        </button>

        <Link
          to="/"
          className="rounded-full border border-[#073F32] px-6 py-3 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
        >
          Back to Coral
        </Link>

      </div>

    </div>

  </main>
);


}

/* =====================================================
NO BOOKING DATA
===================================================== */

if (!booking) {
return ( <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">


    <div className="text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
        !
      </div>

      <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
        Booking not found
      </h1>

      <p className="mt-3 text-sm leading-6 text-[#667085]">
        We couldn't find the booking required for payment.
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

/* =====================================================
BOOKING DATA
===================================================== */

const property =
booking.property &&
typeof booking.property === "object"
? booking.property
: {};

const propertyName =
property.title ||
property.name ||
"Coral Property";

const propertyImage =
property.image ||
property.images?.find(
(image) => image?.isPrimary
)?.url ||
(typeof property.images?.[0] === "string"
? property.images[0]
: property.images?.[0]?.url) ||
"";

const propertyLocation = [
property.locality,
property.city,
property.state,
]
.filter(Boolean)
.join(", ");

const rating =
property.rating ||
property.averageRating ||
"5.0";

const formatDate = (value) => {
if (!value) return "-";


const date = new Date(value);

if (Number.isNaN(date.getTime())) {
  return "-";
}

return date.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});


};

const checkIn = formatDate(booking.checkIn);
const checkOut = formatDate(booking.checkOut);

const guests =
Number(booking.guests) || 1;

const rooms =
Number(booking.rooms) || 1;

const nights =
Number(booking.nights) || 1;

const subtotal =
Number(booking.subtotal) || 0;

const taxes =
Number(booking.taxes) || 0;

const totalAmount =
Number(booking.totalAmount) ||
subtotal + taxes;

const currentPaymentStatus =
booking.paymentStatus || "pending";

/* =====================================================
CARD INPUT
===================================================== */

const handleCardNumber = (value) => {
const numbersOnly = value
.replace(/\D/g, "")
.slice(0, 16);


const formatted = numbersOnly
  .replace(/(.{4})/g, "$1 ")
  .trim();

setCard((previous) => ({
  ...previous,
  number: formatted,
}));

setPaymentError("");


};

const handleExpiry = (value) => {
const numbersOnly = value
.replace(/\D/g, "")
.slice(0, 4);


let formatted = numbersOnly;

if (numbersOnly.length > 2) {
  formatted =
    numbersOnly.slice(0, 2) +
    "/" +
    numbersOnly.slice(2);
}

setCard((previous) => ({
  ...previous,
  expiry: formatted,
}));

setPaymentError("");


};

const handleCvv = (value) => {
const numbersOnly = value
.replace(/\D/g, "")
.slice(0, 4);


setCard((previous) => ({
  ...previous,
  cvv: numbersOnly,
}));

setPaymentError("");

};

/* =====================================================
VALIDATION
===================================================== */

const validatePayment = () => {
if (method === "card") {
const cardNumber =
card.number.replace(/\s/g, "");


  if (
    !card.name.trim() ||
    !cardNumber ||
    !card.expiry ||
    !card.cvv
  ) {
    return "Please complete all card details.";
  }

  if (cardNumber.length < 12) {
    return "Please enter a valid card number.";
  }

  if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
    return "Please enter expiry in MM/YY format.";
  }

  if (card.cvv.length < 3) {
    return "Please enter a valid CVV.";
  }
}

if (method === "upi") {
  if (!upiId.trim()) {
    return "Please enter your UPI ID.";
  }

  if (!upiId.includes("@")) {
    return "Please enter a valid UPI ID.";
  }
}

if (method === "netbanking") {
  if (!bank) {
    return "Please select your bank.";
  }
}

return "";


};

/* =====================================================
PAYMENT
===================================================== */

const handlePayment = async (event) => {
event.preventDefault();


if (payLoading) return;

setPaymentError("");

const validationError =
  validatePayment();

if (validationError) {
  setPaymentError(validationError);
  return;
}

if (!bookingId) {
  setPaymentError(
    "Booking reference is missing."
  );
  return;
}

const resultAction = await dispatch(
  payBooking({
    bookingId,
    paymentMethod: "online",
  })
);

if (
  payBooking.fulfilled.match(
    resultAction
  )
) {
  const updatedBooking =
    resultAction.payload?.booking ||
    resultAction.payload?.data?.booking ||
    {
      ...booking,
      paymentStatus: "paid",
      status: "confirmed",
      paymentMethod: "online",
    };

  navigate("/booking-success", {
    state: {
      bookingId,
      booking: updatedBooking,
      paymentMethod: method,
      paymentStatus: "success",
    },
    replace: true,
  });

  return;
}

const errorMessage =
  resultAction.payload ||
  resultAction.error?.message ||
  payError ||
  "Payment failed. Please try again.";

setPaymentError(errorMessage);

};

/* =====================================================
PAYMENT ERROR
===================================================== */

const finalPaymentError =
paymentError ||
payError ||
"";

/* =====================================================
ALREADY PAID
===================================================== */

if (currentPaymentStatus === "paid") {
return ( <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">


    <div className="max-w-md text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E9F8F0]">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#18C66A] text-2xl font-extrabold text-[#073F32]">
          ✓
        </div>

      </div>

      <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
        Payment already completed
      </h1>

      <p className="mt-3 text-sm leading-6 text-[#667085]">
        This booking has already been paid. You don't
        need to make another payment.
      </p>

      <button
        type="button"
        onClick={() =>
          navigate("/booking-success", {
            state: {
              bookingId,
              booking,
              paymentMethod:
                booking.paymentMethod,
              paymentStatus: "success",
            },
            replace: true,
          })
        }
        className="mt-6 rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
      >
        View booking →
      </button>

    </div>

  </main>
);


}

/* =====================================================
MAIN UI
===================================================== */

return ( <main className="min-h-screen bg-[#F8F9F7]">

`
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

  {/* ================= CONTENT ================= */}

  <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

    <div className="mx-auto max-w-6xl">

      {/* ================= HEADING ================= */}

      <div className="mb-10">

        <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
          SECURE CHECKOUT
        </p>

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
          Complete payment
        </h1>

        <p className="mt-3 text-sm text-[#667085]">
          You're one step away from confirming your
          Coral booking.
        </p>

      </div>

      {/* ================= ERROR ================= */}

      {finalPaymentError && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">

          <p className="text-sm font-bold text-red-700">
            {finalPaymentError}
          </p>

        </div>
      )}

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

          {/* ================= METHODS ================= */}

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

              const active =
                method === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMethod(item.id);
                    setPaymentError("");
                  }}
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
                  value={card.name}
                  onChange={(event) => {
                    setCard((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }));
                    setPaymentError("");
                  }}
                  placeholder="Name on card"
                  autoComplete="cc-name"
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
                  onChange={(event) =>
                    handleCardNumber(
                      event.target.value
                    )
                  }
                  placeholder="1234 5678 9012 3456"
                  autoComplete="cc-number"
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
                    inputMode="numeric"
                    value={card.expiry}
                    onChange={(event) =>
                      handleExpiry(
                        event.target.value
                      )
                    }
                    placeholder="MM/YY"
                    autoComplete="cc-exp"
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                  />

                </div>

                <div>

                  <label className="text-xs font-extrabold text-[#667085]">
                    CVV
                  </label>

                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    value={card.cvv}
                    onChange={(event) =>
                      handleCvv(
                        event.target.value
                      )
                    }
                    placeholder="•••"
                    autoComplete="cc-csc"
                    className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
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
                value={upiId}
                onChange={(event) => {
                  setUpiId(event.target.value);
                  setPaymentError("");
                }}
                placeholder="example@upi"
                autoComplete="off"
                className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
              />

              <div className="mt-4 rounded-2xl bg-[#E9F8F0] p-4">

                <p className="text-sm font-extrabold text-[#073F32]">
                  Quick & secure
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  You'll receive a payment request in
                  your UPI app.
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
                value={bank}
                onChange={(event) => {
                  setBank(event.target.value);
                  setPaymentError("");
                }}
                className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none focus:border-[#18C66A]"
              >

                <option value="">
                  Select your bank
                </option>

                <option value="HDFC Bank">
                  HDFC Bank
                </option>

                <option value="ICICI Bank">
                  ICICI Bank
                </option>

                <option value="State Bank of India">
                  State Bank of India
                </option>

                <option value="Axis Bank">
                  Axis Bank
                </option>

                <option value="Kotak Mahindra Bank">
                  Kotak Mahindra Bank
                </option>

              </select>

            </div>
          )}

          {/* ================= PAY BUTTON ================= */}

          <button
            type="submit"
            disabled={payLoading}
            className={`mt-8 w-full rounded-full py-4 text-sm font-extrabold transition ${
              payLoading
                ? "cursor-not-allowed bg-[#D1D5DB] text-[#667085]"
                : "bg-[#18C66A] text-[#073F32] hover:bg-[#073F32] hover:text-white"
            }`}
          >
            {payLoading
              ? "Processing payment..."
              : `Pay ₹${totalAmount.toLocaleString("en-IN")} →`}
          </button>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#667085]">
            <span>🔒</span>
            Secure & encrypted payment
          </div>

        </form>

        {/* ================= SUMMARY ================= */}

        <aside className="h-fit lg:sticky lg:top-6">

          <div className="overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white shadow-lg">

            {/* ================= IMAGE ================= */}

            <div className="h-[220px] bg-[#E9F8F0]">

              {propertyImage ? (
                <img
                  src={propertyImage}
                  alt={propertyName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-5xl">
                  🏨
                </div>
              )}

            </div>

            <div className="p-6">

              <span className="rounded-full bg-[#E9F8F0] px-3 py-1.5 text-xs font-extrabold text-[#073F32]">
                ★ {rating}
              </span>

              <h2 className="mt-3 text-xl font-extrabold text-[#10254A]">
                {propertyName}
              </h2>

              {propertyLocation && (
                <p className="mt-1 text-sm text-[#667085]">
                  📍 {propertyLocation}
                </p>
              )}

              {/* ================= DETAILS ================= */}

              <div className="mt-6 space-y-4 border-t border-[#E5E7EB] pt-5">

                <div className="flex justify-between gap-4 text-sm">

                  <span className="text-[#667085]">
                    Check-in
                  </span>

                  <span className="text-right font-bold text-[#10254A]">
                    {checkIn}
                  </span>

                </div>

                <div className="flex justify-between gap-4 text-sm">

                  <span className="text-[#667085]">
                    Check-out
                  </span>

                  <span className="text-right font-bold text-[#10254A]">
                    {checkOut}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-[#667085]">
                    Guests
                  </span>

                  <span className="font-bold text-[#10254A]">
                    {guests}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-[#667085]">
                    Rooms
                  </span>

                  <span className="font-bold text-[#10254A]">
                    {rooms}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-[#667085]">
                    Nights
                  </span>

                  <span className="font-bold text-[#10254A]">
                    {nights}
                  </span>

                </div>

              </div>

              {/* ================= PRICE ================= */}

              <div className="mt-6 space-y-3 border-t border-[#E5E7EB] pt-5">

                <div className="flex justify-between text-sm">

                  <span className="text-[#667085]">
                    Stay
                  </span>

                  <span className="font-semibold text-[#344054]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-[#667085]">
                    Taxes & fees
                  </span>

                  <span className="font-semibold text-[#344054]">
                    ₹{taxes.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

              {/* ================= TOTAL ================= */}

              <div className="mt-5 border-t border-[#E5E7EB] pt-5">

                <div className="flex items-center justify-between">

                  <span className="font-extrabold text-[#10254A]">
                    Total
                  </span>

                  <span className="text-2xl font-extrabold text-[#073F32]">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ================= SECURITY ================= */}

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
