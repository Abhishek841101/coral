const favouriteStays = [
  {
    name: "Taj Exotica Resort",
    location: "Goa, India",
    price: 12500,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "The Leela Palace",
    location: "Udaipur, Rajasthan",
    price: 18900,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Anantara Peace Haven",
    location: "Sri Lanka",
    price: 14800,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function FavouriteStays() {
  return (
    <section className="bg-[#F8F9F7] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              CORAL COLLECTION
            </p>

            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-[#10254A] sm:text-5xl">
              Discover your new
              <span className="block text-[#073F32]">
                favourite stay.
              </span>
            </h2>
          </div>

          <button className="w-fit rounded-full border border-[#073F32] px-5 py-3 text-sm font-bold text-[#073F32] transition hover:bg-[#073F32] hover:text-white">
            Explore collection →
          </button>
        </div>

        {/* Gallery */}
        <div className="grid gap-5 lg:grid-cols-3">

          {favouriteStays.map((stay, index) => (
            <article
              key={stay.name}
              className={`group relative overflow-hidden rounded-[30px] ${
                index === 0
                  ? "h-[500px] lg:col-span-2"
                  : "h-[500px]"
              }`}
            >

              {/* Image */}
              <img
                src={stay.image}
                alt={stay.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Badge */}
              <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold text-[#073F32] shadow-lg backdrop-blur">
                ✦ Coral pick
              </div>

              {/* Heart */}
              <button
                aria-label={`Save ${stay.name}`}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-lg text-[#10254A] shadow-lg transition hover:bg-[#18C66A]"
              >
                ♡
              </button>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#18C66A] px-3 py-1 text-xs font-extrabold text-[#073F32]">
                    ★ {stay.rating}
                  </span>

                  <span className="text-xs font-semibold text-white/70">
                    Premium stay
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  {stay.name}
                </h3>

                <p className="mt-1 text-sm text-white/75">
                  {stay.location}
                </p>

                <div className="mt-5 flex items-center justify-between gap-4">

                  <div>
                    <span className="text-xl font-extrabold">
                      ₹{stay.price.toLocaleString("en-IN")}
                    </span>

                    <span className="text-sm text-white/70">
                      {" "}
                      / night
                    </span>
                  </div>

                  <button className="rounded-full bg-white px-5 py-3 text-sm font-extrabold text-[#073F32] transition hover:bg-[#18C66A]">
                    View stay →
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}