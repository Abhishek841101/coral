import { useEffect, useState } from "react";

const recentBookings = [
{
id: 1,
name: "Rahul K.",
location: "Nagpur",
property: "2 BHK Premium Flat",
time: "8 min ago",
image:
"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=300&q=80",
},
{
id: 2,
name: "Priya S.",
location: "Pune",
property: "1 BHK Fully Furnished",
time: "21 min ago",
image:
"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=300&q=80",
},
{
id: 3,
name: "Amit T.",
location: "Bangalore",
property: "3 BHK Luxury Apartment",
time: "34 min ago",
image:
"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80",
},
{
id: 4,
name: "Sneha M.",
location: "Mumbai",
property: "1 BHK Modern Studio",
time: "47 min ago",
image:
"https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=300&q=80",
},
];

const feedbacks = [
{
id: 1,
name: "Rahul K.",
location: "Nagpur",
rating: 5,
text: "Property exactly as shown. The booking experience was very smooth and simple.",
avatar: "https://i.pravatar.cc/100?img=12",
},
{
id: 2,
name: "Priya S.",
location: "Pune",
rating: 5,
text: "Clean property, clear details and very helpful support. Really good experience.",
avatar: "https://i.pravatar.cc/100?img=47",
},
{
id: 3,
name: "Amit T.",
location: "Bangalore",
rating: 5,
text: "The process was easy and transparent. I liked how clearly everything was explained.",
avatar: "https://i.pravatar.cc/100?img=33",
},
];

export default function RecentBookings() {
const [activeFeedback, setActiveFeedback] =
useState(0);

useEffect(() => {
const interval = setInterval(() => {
setActiveFeedback((current) => {
return (current + 1) % feedbacks.length;
});
}, 4500);

return () => clearInterval(interval);

}, []);

const currentFeedback =
feedbacks[activeFeedback];

return (
<section className="bg-[#F8F9F7]">

  {/* ================= RECENT BOOKINGS ================= */}

  <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

    <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

          <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">
            Live Activity
          </span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Recently Booked by Guests
        </h2>

        <p className="mt-2 text-sm text-gray-500 md:text-base">
          See where our guests are staying right now.
        </p>
      </div>

      <div className="hidden rounded-full border border-green-100 bg-white px-4 py-2 text-xs font-semibold text-green-700 shadow-sm sm:block">
        ● Live updates
      </div>

    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {recentBookings.map((booking) => (
        <div
          key={booking.id}
          className="group overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
        >

          <div className="flex gap-3">

            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
              <img
                src={booking.image}
                alt={booking.property}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex items-start justify-between gap-2">

                <p className="truncate text-sm font-bold text-gray-900">
                  {booking.name}
                </p>

                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-[11px] font-bold text-green-600">
                  ✓
                </span>

              </div>

              <p className="mt-1 truncate text-xs font-medium text-gray-700">
                {booking.property}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {booking.location}
              </p>

              <p className="mt-2 text-[11px] font-semibold text-green-600">
                Booked {booking.time}
              </p>

            </div>

          </div>

        </div>
      ))}

    </div>

  </div>

  {/* ================= CUSTOMER FEEDBACK ================= */}

  <div className="border-y border-gray-100 bg-white">

    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

      <div className="mb-10 text-center">

        <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
          Guest Reviews
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          What Our Guests Say
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
          Real experiences from guests who booked their stay with Coral.
        </p>

      </div>

      <div className="mx-auto max-w-3xl">

        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-[#F8F9F7] p-7 shadow-sm transition-all duration-500 md:p-10">

          <div className="absolute right-6 top-5 text-7xl font-serif leading-none text-green-100">
            “
          </div>

          <div className="relative">

            <div className="mb-5 flex gap-1">
              {Array.from({
                length: currentFeedback.rating,
              }).map((_, index) => (
                <span
                  key={index}
                  className="text-lg text-yellow-400"
                >
                  ★
                </span>
              ))}
            </div>

            <p className="min-h-[90px] text-lg font-medium leading-8 text-gray-800 md:text-xl">
              “{currentFeedback.text}”
            </p>

            <div className="mt-7 flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <img
                  src={currentFeedback.avatar}
                  alt={currentFeedback.name}
                  className="h-12 w-12 rounded-full object-cover ring-4 ring-white"
                />

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {currentFeedback.name}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Verified Guest ·{" "}
                    {currentFeedback.location}
                  </p>
                </div>

              </div>

              <div className="hidden rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 sm:block">
                ✓ Verified Guest
              </div>

            </div>

          </div>

        </div>

        <div className="mt-6 flex justify-center gap-2">

          {feedbacks.map((feedback, index) => (
            <button
              key={feedback.id}
              onClick={() =>
                setActiveFeedback(index)
              }
              className={
                "h-2 rounded-full transition-all duration-300 " +
                (index === activeFeedback
                  ? "w-8 bg-green-600"
                  : "w-2 bg-gray-300")
              }
              aria-label={
                "Show review " +
                (index + 1)
              }
            />
          ))}

        </div>

      </div>

    </div>

  </div>

</section>

);
}
