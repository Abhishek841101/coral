const deals = [
  {
    id: 1,
    name: "The Fern Kadamba Hotel",
    location: "Panaji, Goa",
    oldPrice: 6850,
    price: 4850,
    discount: "29% OFF",
    rating: "4.8",
    reviews: "324",
    nights: "per night",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    name: "The Royal Courtyard",
    location: "Udaipur, Rajasthan",
    oldPrice: 8200,
    price: 5750,
    discount: "30% OFF",
    rating: "4.9",
    reviews: "402",
    nights: "per night",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    name: "Ocean Breeze Villa",
    location: "Galle, Sri Lanka",
    oldPrice: 7900,
    price: 5600,
    discount: "29% OFF",
    rating: "4.8",
    reviews: "241",
    nights: "per night",
    image:
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function WeekendDeals() {
  return (
    <section
      id="deals"
      className="bg-[#073F32] px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#18C66A]/30 bg-[#18C66A]/10 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#18C66A]" />

              <span className="text-xs font-extrabold tracking-[0.12em] text-[#18C66A]">
                LIMITED TIME OFFERS
              </span>
            </div>

            <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Last-minute
              <span className="block text-[#18C66A]">
                weekend deals.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              Beautiful stays, special prices and limited availability.
              Your next escape might be closer than you think.
            </p>
          </div>

          <button className="w-fit rounded-full border border-white/20 px-6 py-3.5 text-sm font-extrabold text-white transition hover:border-[#18C66A] hover:bg-[#18C66A] hover:text-[#073F32]">
            View all deals →
          </button>

        </div>

        {/* ================= CARDS ================= */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">

          {deals.map((deal) => (
            <article
              key={deal.id}
              className="group overflow-hidden rounded-[30px] bg-white"
            >

              {/* IMAGE */}
              <div className="relative h-[280px] overflow-hidden">

                <img
                  src={deal.image}
                  alt={deal.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Discount */}
                <div className="absolute left-5 top-5 rounded-full bg-[#18C66A] px-4 py-2 text-xs font-extrabold text-[#073F32] shadow-lg">
                  {deal.discount}
                </div>

                {/* Heart */}
                <button
                  aria-label={`Save ${deal.name}`}
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-lg text-[#10254A] shadow-lg transition hover:bg-[#18C66A]"
                >
                  ♡
                </button>

                {/* Bottom image info */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2">

                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-[#073F32]">
                    ★ {deal.rating}
                  </span>

                  <span className="text-xs font-semibold text-white">
                    {deal.reviews} reviews
                  </span>

                </div>

              </div>

              {/* DETAILS */}
              <div className="p-6">

                <p className="text-xs font-bold uppercase tracking-wide text-[#18A85B]">
                  Weekend escape
                </p>

                <h3 className="mt-2 text-xl font-extrabold text-[#10254A]">
                  {deal.name}
                </h3>

                <p className="mt-1 text-sm text-[#667085]">
                  📍 {deal.location}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-end justify-between gap-4">

                  <div>
                    <p className="text-xs font-semibold text-[#98A2B3]">
                      From
                    </p>

                    <div className="mt-1">
                      <span className="mr-2 text-sm text-[#98A2B3] line-through">
                        ₹{deal.oldPrice.toLocaleString("en-IN")}
                      </span>

                      <span className="text-2xl font-extrabold text-[#073F32]">
                        ₹{deal.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-[#667085]">
                      {deal.nights} · taxes included
                    </p>
                  </div>

                  <button className="rounded-full bg-[#073F32] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]">
                    Book now
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* ================= BOTTOM TRUST ================= */}
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["A", "R", "K", "S"].map((letter) => (
                <div
                  key={letter}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#073F32] bg-[#E9F8F0] text-[10px] font-extrabold text-[#073F32]"
                >
                  {letter}
                </div>
              ))}
            </div>

            <p className="text-xs font-semibold text-white/50">
              Join thousands of travellers booking with Coral
            </p>
          </div>

          <p className="text-xs font-semibold text-white/40">
            Deals refresh regularly · Subject to availability
          </p>

        </div>

      </div>
    </section>
  );
}