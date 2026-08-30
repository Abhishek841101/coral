import { useState } from "react";
import { Link } from "react-router-dom";
import { properties } from "../data/properties";

const filters = [
  "All",
  "Goa",
  "Udupi",
  "Vrindavan",
  "Nagpur",
  "Nashik",
  "Udaipur",
  "Manali",
  "Kathmandu",
  "Thimphu",
  "Colombo",
];

export default function RecommendedStays({
  selectedDestination = "",
}) {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleStays = properties.filter((stay) => {
    const matchesFilter =
      activeFilter === "All" ||
      stay.location
        .toLowerCase()
        .includes(activeFilter.toLowerCase());

    const matchesSearch =
      !selectedDestination ||
      stay.destination
        .toLowerCase()
        .includes(selectedDestination.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const clearFilters = () => {
    setActiveFilter("All");
  };

  return (
    <section
  id="recommended-stays"
  className="scroll-mt-6 bg-white px-5 py-20 sm:px-8 lg:px-10"
>
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              HANDPICKED FOR YOU
            </p>

            <h2 className="text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Recommended for you
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#667085]">
              Discover stays selected for comfort, location and
              unforgettable experiences.
            </p>

            {/* Search Result */}
            {selectedDestination && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E9F8F0] px-4 py-2.5 text-sm font-bold text-[#073F32]">
                <span className="h-2 w-2 rounded-full bg-[#18C66A]" />

                Showing stays in {selectedDestination}

                <button
                  onClick={clearFilters}
                  className="ml-1 text-lg leading-none text-[#18A85B] hover:text-[#073F32]"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <button
            onClick={clearFilters}
            className="w-fit rounded-full border border-[#073F32] px-5 py-3 text-sm font-bold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
          >
            View all stays →
          </button>
        </div>

        {/* Filters */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold transition ${
                  isActive
                    ? "bg-[#073F32] text-white shadow-sm"
                    : "bg-[#F8F9F7] text-[#667085] hover:bg-[#E9F8F0] hover:text-[#073F32]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Result Count */}
        <div className="mt-7 flex items-center justify-between">
          <p className="text-sm font-semibold text-[#667085]">
            {visibleStays.length}{" "}
            {visibleStays.length === 1 ? "stay" : "stays"} found
          </p>

          {activeFilter !== "All" && (
            <button
              onClick={clearFilters}
              className="text-sm font-bold text-[#18A85B] hover:text-[#073F32]"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* No Results */}
        {visibleStays.length === 0 ? (
          <div className="mt-8 rounded-[30px] bg-[#F8F9F7] px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
              🔍
            </div>

            <h3 className="mt-6 text-2xl font-extrabold text-[#10254A]">
              No stays found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#667085]">
              We couldn't find a stay matching your current search.
              Try another destination or explore all our stays.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
            >
              Explore all stays
            </button>
          </div>
        ) : (
          /* Property Grid */
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleStays.map((stay) => (
              <article
                key={stay.id}
                className="group overflow-hidden rounded-[26px] border border-[#E5E7EB] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-[270px] overflow-hidden">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* Badge */}
                  <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold text-[#073F32] shadow-md">
                    {stay.badge || "Best rated"}
                  </div>

                  {/* Wishlist */}
                  <button
                    aria-label={`Add ${stay.name} to wishlist`}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-lg text-[#10254A] shadow-md backdrop-blur transition hover:bg-[#18C66A]"
                  >
                    ♡
                  </button>
                </div>

                {/* Details */}
                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-extrabold text-[#073F32]">
                      ★ {stay.rating}
                    </span>

                    <span className="text-xs text-[#667085]">
                      ({stay.reviews})
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="mt-2 line-clamp-1 text-lg font-extrabold text-[#10254A]">
                    {stay.name}
                  </h3>

                  {/* Location */}
                  <p className="mt-1 line-clamp-1 text-sm text-[#667085]">
                    {stay.location}
                  </p>

                  {/* Price + Button */}
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <span className="text-xl font-extrabold text-[#10254A]">
                        ₹{Number(stay.price).toLocaleString("en-IN")}
                      </span>

                      <span className="text-xs text-[#667085]">
                        {" "}
                        / night
                      </span>
                    </div>

                    <Link
                      to={`/property/${stay.id}`}
                      className="rounded-full bg-[#18C66A] px-4 py-2.5 text-xs font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                    >
                      Book now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}