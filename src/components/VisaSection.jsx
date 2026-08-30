import { useState } from "react";
import { Link } from "react-router-dom";

const visas = [
  {
    id: 1,
    country: "United Arab Emirates",
    short: "UAE",
    type: "Tourist Visa",
    duration: "30 Days",
    processing: "3–5 Working Days",
    price: 4999,
    flag: "🇦🇪",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    country: "Thailand",
    short: "Thailand",
    type: "Tourist Visa",
    duration: "60 Days",
    processing: "5–7 Working Days",
    price: 3499,
    flag: "🇹🇭",
    image:
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    country: "Singapore",
    short: "Singapore",
    type: "Tourist Visa",
    duration: "30 Days",
    processing: "5–7 Working Days",
    price: 5999,
    flag: "🇸🇬",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    country: "Vietnam",
    short: "Vietnam",
    type: "e-Visa",
    duration: "90 Days",
    processing: "3–5 Working Days",
    price: 2999,
    flag: "🇻🇳",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
  },
];

const categories = [
  "All",
  "Asia",
  "Middle East",
  "Popular",
];

export default function VisaSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleVisas =
    activeCategory === "All"
      ? visas
      : visas.filter((visa) => {
          if (activeCategory === "Asia") {
            return ["Thailand", "Singapore", "Vietnam"].includes(
              visa.short
            );
          }

          if (activeCategory === "Middle East") {
            return visa.short === "UAE";
          }

          if (activeCategory === "Popular") {
            return true;
          }

          return true;
        });

  return (
    <section
      id="visa"
      className="bg-white px-5 py-20 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="mb-3 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              TRAVEL WITH CONFIDENCE
            </p>

            <h2 className="text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Visa made simple
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
              Get expert visa assistance, document guidance and
              application support for your next international journey.
            </p>

          </div>

          <Link
            to="/visa"
            className="w-fit rounded-full border border-[#073F32] px-5 py-3 text-sm font-bold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
          >
            Explore all visas →
          </Link>

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
                    : "bg-[#F8F9F7] text-[#667085] hover:bg-[#E9F8F0] hover:text-[#073F32]"
                }`}
              >
                {category}
              </button>
            );
          })}

        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {visibleVisas.map((visa) => (

            <article
              key={visa.id}
              className="group overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Image */}
              <div className="relative h-[230px] overflow-hidden">

                <img
                  src={visa.image}
                  alt={`${visa.country} visa`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">

                  <span className="text-2xl">
                    {visa.flag}
                  </span>

                  <span className="text-sm font-extrabold">
                    {visa.country}
                  </span>

                </div>

              </div>

              {/* Content */}
              <div className="p-5">

                <span className="rounded-full bg-[#E9F8F0] px-3 py-1.5 text-xs font-extrabold text-[#073F32]">
                  {visa.type}
                </span>

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <div className="rounded-2xl bg-[#F8F9F7] p-3">

                    <p className="text-[10px] font-extrabold text-[#667085]">
                      VALIDITY
                    </p>

                    <p className="mt-1 text-xs font-bold text-[#10254A]">
                      {visa.duration}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-[#F8F9F7] p-3">

                    <p className="text-[10px] font-extrabold text-[#667085]">
                      PROCESSING
                    </p>

                    <p className="mt-1 text-xs font-bold text-[#10254A]">
                      {visa.processing}
                    </p>

                  </div>

                </div>

                <div className="mt-5 flex items-end justify-between gap-3">

                  <div>

                    <p className="text-xs text-[#667085]">
                      Starting from
                    </p>

                    <p className="mt-1 text-xl font-extrabold text-[#073F32]">
                      ₹{visa.price.toLocaleString("en-IN")}
                    </p>

                  </div>

                  <Link
                    to={`/visa/${visa.id}`}
                    className="rounded-full bg-[#18C66A] px-4 py-2.5 text-xs font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                  >
                    View details
                  </Link>

                </div>

              </div>

            </article>

          ))}

        </div>

        {/* Bottom Trust */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">

          <div className="rounded-[24px] bg-[#E9F8F0] p-5">

            <p className="text-sm font-extrabold text-[#073F32]">
              ✓ Document guidance
            </p>

            <p className="mt-1 text-xs leading-5 text-[#667085]">
              Know exactly what documents you need.
            </p>

          </div>

          <div className="rounded-[24px] bg-[#F8F9F7] p-5">

            <p className="text-sm font-extrabold text-[#10254A]">
              ✓ Application support
            </p>

            <p className="mt-1 text-xs leading-5 text-[#667085]">
              Assistance throughout the application process.
            </p>

          </div>

          <div className="rounded-[24px] bg-[#F8F9F7] p-5">

            <p className="text-sm font-extrabold text-[#10254A]">
              ✓ Status updates
            </p>

            <p className="mt-1 text-xs leading-5 text-[#667085]">
              Stay updated on your visa application.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}