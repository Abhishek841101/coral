import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const properties = [
  {
    id: 1,
    name: "Coral Grand Residences",
    location: "Nagpur, Maharashtra",
    city: "Nagpur",
    type: "Premium Apartments",
    configuration: "2 & 3 BHK",
    price: 5800000,
    priceLabel: "₹58 Lakhs",
    status: "Ready to Move",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    name: "Coral Lakeview Villas",
    location: "Udaipur, Rajasthan",
    city: "Udaipur",
    type: "Luxury Villas",
    configuration: "3 & 4 BHK",
    price: 12500000,
    priceLabel: "₹1.25 Cr",
    status: "Limited Units",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    name: "Coral Urban Heights",
    location: "Pune, Maharashtra",
    city: "Pune",
    type: "Premium Apartments",
    configuration: "2 & 3 BHK",
    price: 7200000,
    priceLabel: "₹72 Lakhs",
    status: "Launching Soon",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    name: "Coral Green Valley",
    location: "Nashik, Maharashtra",
    city: "Nashik",
    type: "Residential Plots",
    configuration: "1200–2400 Sq.Ft.",
    price: 3200000,
    priceLabel: "₹32 Lakhs",
    status: "Open for Booking",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 5,
    name: "Coral Palm Residency",
    location: "Goa",
    city: "Goa",
    type: "Premium Apartments",
    configuration: "1 & 2 BHK",
    price: 6800000,
    priceLabel: "₹68 Lakhs",
    status: "Limited Units",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 6,
    name: "Coral Heritage Homes",
    location: "Vrindavan, Uttar Pradesh",
    city: "Vrindavan",
    type: "Residential Homes",
    configuration: "2 & 3 BHK",
    price: 4500000,
    priceLabel: "₹45 Lakhs",
    status: "Ready to Move",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
  },
];

const cities = [
  "All locations",
  "Nagpur",
  "Pune",
  "Nashik",
  "Goa",
  "Udaipur",
  "Vrindavan",
];

const types = [
  "All types",
  "Premium Apartments",
  "Luxury Villas",
  "Residential Plots",
  "Residential Homes",
];

export default function Properties() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All locations");
  const [type, setType] = useState("All types");
  const [budget, setBudget] = useState("Any budget");
  const [mobileFilters, setMobileFilters] = useState(false);

  const visibleProperties = useMemo(() => {
    return properties.filter((property) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        property.name.toLowerCase().includes(searchText) ||
        property.location.toLowerCase().includes(searchText) ||
        property.type.toLowerCase().includes(searchText);

      const matchesCity =
        city === "All locations" ||
        property.city === city;

      const matchesType =
        type === "All types" ||
        property.type === type;

      let matchesBudget = true;

      if (budget === "Under ₹50 Lakhs") {
        matchesBudget = property.price < 5000000;
      }

      if (budget === "₹50L – ₹1Cr") {
        matchesBudget =
          property.price >= 5000000 &&
          property.price <= 10000000;
      }

      if (budget === "Above ₹1Cr") {
        matchesBudget = property.price > 10000000;
      }

      return (
        matchesSearch &&
        matchesCity &&
        matchesType &&
        matchesBudget
      );
    });
  }, [search, city, type, budget]);

  const clearFilters = () => {
    setSearch("");
    setCity("All locations");
    setType("All types");
    setBudget("Any budget");
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
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] text-base font-extrabold text-[#073F32]">
              C
            </div>

            <span className="text-xl font-extrabold tracking-tight text-[#073F32]">
              Coral
            </span>
          </Link>

          <Link
            to="/"
            className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32]"
          >
            ← Home
          </Link>

        </div>

      </header>

      {/* ================= HERO ================= */}
      <section className="bg-[#073F32] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
            CORAL PROPERTIES
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Find a property you'll love coming home to.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
            Explore premium apartments, villas, plots and residential
            opportunities across carefully selected locations.
          </p>

          {/* Search */}
          <div className="mt-8 rounded-[26px] bg-white p-2 shadow-2xl sm:p-3">

            <div className="flex flex-col gap-2 md:flex-row">

              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-[#F8F9F7] px-5 py-4">

                <span className="text-lg">
                  🔍
                </span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by project, city or property type..."
                  className="w-full bg-transparent text-sm font-semibold text-[#10254A] outline-none"
                />

              </div>

              <button
                type="button"
                onClick={() => setMobileFilters(!mobileFilters)}
                className="rounded-2xl bg-[#E9F8F0] px-6 py-4 text-sm font-extrabold text-[#073F32] md:hidden"
              >
                Filters
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ================= LISTING ================= */}
      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

            {/* FILTERS */}
            <aside
              className={`h-fit rounded-[28px] border border-[#E5E7EB] bg-white p-5 lg:sticky lg:top-6 ${
                mobileFilters ? "block" : "hidden lg:block"
              }`}
            >

              <div className="flex items-center justify-between">

                <h2 className="text-lg font-extrabold text-[#10254A]">
                  Filters
                </h2>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-extrabold text-[#18A85B]"
                >
                  Clear
                </button>

              </div>

              {/* Location */}
              <div className="mt-7">

                <label className="text-xs font-extrabold tracking-wider text-[#667085]">
                  LOCATION
                </label>

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-bold text-[#10254A] outline-none focus:border-[#18C66A]"
                >
                  {cities.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* Type */}
              <div className="mt-6">

                <label className="text-xs font-extrabold tracking-wider text-[#667085]">
                  PROPERTY TYPE
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-bold text-[#10254A] outline-none focus:border-[#18C66A]"
                >
                  {types.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* Budget */}
              <div className="mt-6">

                <label className="text-xs font-extrabold tracking-wider text-[#667085]">
                  BUDGET
                </label>

                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-bold text-[#10254A] outline-none focus:border-[#18C66A]"
                >
                  <option>Any budget</option>
                  <option>Under ₹50 Lakhs</option>
                  <option>₹50L – ₹1Cr</option>
                  <option>Above ₹1Cr</option>
                </select>

              </div>

              {/* Help */}
              <div className="mt-7 rounded-[22px] bg-[#E9F8F0] p-4">

                <p className="text-sm font-extrabold text-[#073F32]">
                  Need help?
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  Tell our property experts what you're looking for.
                </p>

                <button
                  type="button"
                  className="mt-3 text-xs font-extrabold text-[#18A85B]"
                >
                  Talk to an expert →
                </button>

              </div>

            </aside>

            {/* RESULTS */}
            <div>

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div>

                  <h2 className="text-2xl font-extrabold text-[#10254A]">
                    Properties
                  </h2>

                  <p className="mt-1 text-sm text-[#667085]">
                    {visibleProperties.length}{" "}
                    {visibleProperties.length === 1
                      ? "property"
                      : "properties"}{" "}
                    available
                  </p>

                </div>

                <select
                  className="w-fit rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-bold text-[#10254A] outline-none"
                  defaultValue="recommended"
                >
                  <option value="recommended">
                    Recommended
                  </option>
                  <option value="low">
                    Price: Low to High
                  </option>
                  <option value="high">
                    Price: High to Low
                  </option>
                </select>

              </div>

              {/* Cards */}
              {visibleProperties.length === 0 ? (

                <div className="mt-8 rounded-[30px] bg-white px-6 py-20 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
                    🏠
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold text-[#10254A]">
                    No properties found
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#667085]">
                    Try changing your location, property type or
                    budget filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white"
                  >
                    Clear filters
                  </button>

                </div>

              ) : (

                <div className="mt-7 grid gap-6 sm:grid-cols-2">

                  {visibleProperties.map((property) => (

                    <article
                      key={property.id}
                      className="group overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >

                      {/* Image */}
                      <div className="relative h-[280px] overflow-hidden">

                        <img
                          src={property.image}
                          alt={property.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#073F32] shadow">
                          {property.status}
                        </span>

                        <button
                          type="button"
                          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-lg shadow transition hover:bg-[#18C66A]"
                          aria-label={`Save ${property.name}`}
                        >
                          ♡
                        </button>

                        <div className="absolute bottom-5 left-5 text-white">

                          <p className="text-xs font-semibold text-white/80">
                            📍 {property.location}
                          </p>

                        </div>

                      </div>

                      {/* Details */}
                      <div className="p-6">

                        <p className="text-xs font-extrabold tracking-wider text-[#18A85B]">
                          {property.type}
                        </p>

                        <h3 className="mt-2 text-xl font-extrabold text-[#10254A]">
                          {property.name}
                        </h3>

                        <div className="mt-4 flex items-center gap-2">

                          <span className="rounded-full bg-[#F8F9F7] px-3 py-1.5 text-xs font-bold text-[#667085]">
                            {property.configuration}
                          </span>

                          <span className="rounded-full bg-[#F8F9F7] px-3 py-1.5 text-xs font-bold text-[#667085]">
                            📍 {property.city}
                          </span>

                        </div>

                        <div className="mt-6 flex items-end justify-between gap-4">

                          <div>

                            <p className="text-xs text-[#667085]">
                              Starting from
                            </p>

                            <p className="mt-1 text-xl font-extrabold text-[#073F32]">
                              {property.priceLabel}
                            </p>

                          </div>

                          <Link
                            to={`/property/${property.id}`}
                            className="rounded-full bg-[#18C66A] px-5 py-3 text-xs font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                          >
                            View property →
                          </Link>

                        </div>

                      </div>

                    </article>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}