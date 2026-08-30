import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const tours = [
  {
    id: 1,
    title: "Goa Escape",
    location: "Goa, India",
    duration: "4 Days · 3 Nights",
    price: 12999,
    rating: "4.9",
    reviews: 186,
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80",
    description:
      "A relaxed Goa getaway combining beautiful beaches, local experiences, comfortable stays and unforgettable sunsets.",
    highlights: [
      "North Goa beaches",
      "Sunset cruise",
      "Local sightseeing",
      "Beach leisure time",
    ],
  },
  {
    id: 2,
    title: "Royal Udaipur",
    location: "Udaipur, Rajasthan",
    duration: "3 Days · 2 Nights",
    price: 10999,
    rating: "4.8",
    reviews: 142,
    category: "Heritage",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=80",
    description:
      "Discover the royal charm of Udaipur with palaces, lakes, heritage streets and authentic Rajasthani experiences.",
    highlights: [
      "City Palace",
      "Lake Pichola",
      "Heritage sightseeing",
      "Cultural experience",
    ],
  },
  {
    id: 3,
    title: "Manali Mountain Escape",
    location: "Manali, Himachal Pradesh",
    duration: "5 Days · 4 Nights",
    price: 15999,
    rating: "4.9",
    reviews: 231,
    category: "Mountains",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80",
    description:
      "Escape into the mountains with scenic valleys, peaceful surroundings and exciting Himalayan experiences.",
    highlights: [
      "Solang Valley",
      "Mountain sightseeing",
      "Local village visit",
      "Nature experiences",
    ],
  },
  {
    id: 4,
    title: "Nepal Discovery",
    location: "Kathmandu, Nepal",
    duration: "6 Days · 5 Nights",
    price: 24999,
    rating: "4.8",
    reviews: 98,
    category: "International",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=80",
    description:
      "Explore Nepal's cultural heritage, mountain landscapes and iconic destinations on a carefully planned journey.",
    highlights: [
      "Kathmandu sightseeing",
      "Temple visits",
      "Mountain views",
      "Local experiences",
    ],
  },
];

const itinerary = [
  {
    day: "Day 1",
    title: "Arrival & local exploration",
    text: "Arrive at your destination, check in and enjoy a relaxed introduction to the city.",
  },
  {
    day: "Day 2",
    title: "Signature sightseeing",
    text: "Explore the most popular attractions and enjoy curated local experiences.",
  },
  {
    day: "Day 3",
    title: "Experience the destination",
    text: "Spend the day discovering hidden gems, local culture and memorable views.",
  },
  {
    day: "Day 4",
    title: "Relax & departure",
    text: "Enjoy your final morning before checkout and departure.",
  },
];

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tour = tours.find(
    (item) => item.id === Number(id)
  );

  const [travelers, setTravelers] = useState(1);

  if (!tour) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
            🧳
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
            Tour not found
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            The tour you're looking for isn't available.
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

  const totalPrice = tour.price * travelers;

  const handleBooking = () => {
    navigate("/tour-booking", {
      state: {
        tourId: tour.id,
        tourName: tour.title,
        location: tour.location,
        duration: tour.duration,
        price: tour.price,
        travelers,
        totalPrice,
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-xl">

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
            to="/#tours"
            className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32]"
          >
            ← Back to tours
          </Link>

        </div>

      </header>

      {/* Main */}
      <section className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

        <div className="mx-auto max-w-7xl">

          {/* Breadcrumb */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#667085]">

            <Link
              to="/"
              className="font-semibold hover:text-[#073F32]"
            >
              Coral
            </Link>

            <span>/</span>

            <span>Tours</span>

            <span>/</span>

            <span className="font-semibold text-[#10254A]">
              {tour.title}
            </span>

          </div>

          {/* Hero Image */}
          <div className="relative h-[380px] overflow-hidden rounded-[32px] sm:h-[500px]">

            <img
              src={tour.image}
              alt={tour.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            <div className="absolute bottom-7 left-6 right-6 text-white sm:left-10 sm:right-10">

              <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold text-[#073F32]">
                {tour.category}
              </span>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
                {tour.title}
              </h1>

              <p className="mt-3 text-sm font-semibold text-white/85 sm:text-base">
                📍 {tour.location}
              </p>

            </div>

          </div>

          {/* Content */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_390px]">

            {/* LEFT */}
            <div>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-full bg-[#E9F8F0] px-4 py-2 text-xs font-extrabold text-[#073F32]">
                  ★ {tour.rating}
                </span>

                <span className="text-sm text-[#667085]">
                  {tour.reviews} reviews
                </span>

                <span className="text-sm text-[#667085]">
                  · {tour.duration}
                </span>

              </div>

              {/* Description */}
              <div className="mt-10">

                <p className="text-sm font-extrabold tracking-[0.15em] text-[#18C66A]">
                  ABOUT THIS TOUR
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#10254A]">
                  A journey worth remembering
                </h2>

                <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#667085]">
                  {tour.description}
                </p>

              </div>

              {/* Highlights */}
              <div className="mt-10">

                <h2 className="text-2xl font-extrabold text-[#10254A]">
                  Tour highlights
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {tour.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-2xl border border-[#E5E7EB] bg-white p-4 text-sm font-semibold text-[#10254A]"
                    >
                      <span className="mr-2 text-[#18A85B]">
                        ✓
                      </span>

                      {highlight}
                    </div>
                  ))}

                </div>

              </div>

              {/* Itinerary */}
              <div className="mt-12">

                <p className="text-sm font-extrabold tracking-[0.15em] text-[#18C66A]">
                  YOUR JOURNEY
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#10254A]">
                  Itinerary
                </h2>

                <div className="mt-6 space-y-4">

                  {itinerary.map((item) => (
                    <div
                      key={item.day}
                      className="flex gap-4 rounded-[24px] border border-[#E5E7EB] bg-white p-5"
                    >

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F0] text-xs font-extrabold text-[#073F32]">
                        {item.day.replace("Day ", "D")}
                      </div>

                      <div>

                        <h3 className="text-base font-extrabold text-[#10254A]">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-[#667085]">
                          {item.text}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

              {/* Inclusions */}
              <div className="mt-12 grid gap-6 sm:grid-cols-2">

                <div className="rounded-[26px] bg-[#E9F8F0] p-6">

                  <h3 className="text-lg font-extrabold text-[#073F32]">
                    What's included
                  </h3>

                  <ul className="mt-4 space-y-3 text-sm text-[#344054]">
                    <li>✓ Hotel accommodation</li>
                    <li>✓ Selected sightseeing</li>
                    <li>✓ Local transfers</li>
                    <li>✓ Trip assistance</li>
                  </ul>

                </div>

                <div className="rounded-[26px] bg-white p-6">

                  <h3 className="text-lg font-extrabold text-[#10254A]">
                    Not included
                  </h3>

                  <ul className="mt-4 space-y-3 text-sm text-[#667085]">
                    <li>• Personal expenses</li>
                    <li>• Meals not mentioned</li>
                    <li>• Optional activities</li>
                    <li>• Travel insurance</li>
                  </ul>

                </div>

              </div>

            </div>

            {/* RIGHT BOOKING CARD */}
            <aside className="h-fit lg:sticky lg:top-24">

              <div className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-xl">

                <p className="text-sm font-semibold text-[#667085]">
                  Starting from
                </p>

                <div className="mt-1">

                  <span className="text-3xl font-extrabold text-[#073F32]">
                    ₹{tour.price.toLocaleString("en-IN")}
                  </span>

                  <span className="text-sm text-[#667085]">
                    {" "}
                    / person
                  </span>

                </div>

                {/* Duration */}
                <div className="mt-6 rounded-2xl bg-[#F8F9F7] p-4">

                  <p className="text-xs font-extrabold text-[#667085]">
                    DURATION
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#10254A]">
                    🕒 {tour.duration}
                  </p>

                </div>

                {/* Travelers */}
                <div className="mt-3 rounded-2xl border border-[#E5E7EB] p-4">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs font-extrabold text-[#667085]">
                        TRAVELLERS
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#10254A]">
                        {travelers}{" "}
                        {travelers === 1
                          ? "traveller"
                          : "travellers"}
                      </p>

                    </div>

                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          setTravelers(
                            Math.max(1, travelers - 1)
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9F8F0] font-bold text-[#073F32]"
                      >
                        −
                      </button>

                      <span className="w-5 text-center text-sm font-extrabold text-[#10254A]">
                        {travelers}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setTravelers(travelers + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9F8F0] font-bold text-[#073F32]"
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

                {/* Price */}
                <div className="mt-6 border-t border-[#E5E7EB] pt-5">

                  <div className="flex justify-between text-sm text-[#667085]">

                    <span>
                      ₹{tour.price.toLocaleString("en-IN")} ×{" "}
                      {travelers}
                    </span>

                    <span className="font-semibold text-[#344054]">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>

                  </div>

                  <div className="mt-5 flex justify-between">

                    <span className="font-extrabold text-[#10254A]">
                      Total
                    </span>

                    <span className="text-xl font-extrabold text-[#073F32]">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

                {/* Book */}
                <button
                  type="button"
                  onClick={handleBooking}
                  className="mt-6 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                >
                  Book this tour →
                </button>

                <p className="mt-4 text-center text-xs text-[#667085]">
                  Secure booking · Coral support included
                </p>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}