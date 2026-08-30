import { useState } from "react";
import { Link } from "react-router-dom";

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
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
  },
];

const categories = [
  "All",
  "Beach",
  "Mountains",
  "Heritage",
  "International",
];

export default function ToursSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleTours =
    activeCategory === "All"
      ? tours
      : tours.filter(
          (tour) => tour.category === activeCategory
        );

  return (
    <section
      id="tours"
      className="bg-[#F8F9F7] px-5 py-20 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="mb-3 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              CURATED EXPERIENCES
            </p>

            <h2 className="text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Explore unforgettable tours
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
              From relaxing beaches to mountain escapes, discover
              experiences designed to make every journey memorable.
            </p>

          </div>

          <button
            type="button"
            className="w-fit rounded-full border border-[#073F32] px-5 py-3 text-sm font-bold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
          >
            View all tours →
          </button>

        </div>

        {/* Categories */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {categories.map((category) => {

            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold transition ${
                  active
                    ? "bg-[#073F32] text-white"
                    : "bg-white text-[#667085] hover:bg-[#E9F8F0] hover:text-[#073F32]"
                }`}
              >
                {category}
              </button>
            );
          })}

        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {visibleTours.map((tour) => (

            <article
              key={tour.id}
              className="group overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Image */}
              <div className="relative h-[280px] overflow-hidden">

                <img
                  src={tour.image}
                  alt={tour.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Category */}
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-[#073F32] shadow-md backdrop-blur">
                  {tour.category}
                </span>

                {/* Wishlist */}
                <button
                  type="button"
                  aria-label={`Save ${tour.title}`}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-lg text-[#10254A] shadow-md transition hover:bg-[#18C66A]"
                >
                  ♡
                </button>

              </div>

              {/* Content */}
              <div className="p-5">

                {/* Rating */}
                <div className="flex items-center gap-2">

                  <span className="text-sm font-extrabold text-[#073F32]">
                    ★ {tour.rating}
                  </span>

                  <span className="text-xs text-[#667085]">
                    ({tour.reviews})
                  </span>

                </div>

                {/* Title */}
                <h3 className="mt-2 text-lg font-extrabold text-[#10254A]">
                  {tour.title}
                </h3>

                {/* Location */}
                <p className="mt-1 text-sm text-[#667085]">
                  📍 {tour.location}
                </p>

                {/* Duration */}
                <p className="mt-3 text-xs font-semibold text-[#667085]">
                  🕒 {tour.duration}
                </p>

                {/* Bottom */}
                <div className="mt-5 flex items-end justify-between gap-3">

                  <div>

                    <span className="text-xl font-extrabold text-[#10254A]">
                      ₹{tour.price.toLocaleString("en-IN")}
                    </span>

                    <p className="text-xs text-[#667085]">
                      per person
                    </p>

                  </div>

                  <Link
                    to={`/tour/${tour.id}`}
                    className="rounded-full bg-[#18C66A] px-4 py-2.5 text-xs font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                  >
                    Explore
                  </Link>

                </div>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}