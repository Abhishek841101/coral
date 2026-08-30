const destinations = [
  {
    name: "India",
    places: "Goa · Manali · Jaipur · 40+ cities",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Nepal",
    places: "Kathmandu · Pokhara · Chitwan",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bhutan",
    places: "Thimphu · Paro · Punakha",
    image:
      "https://images.unsplash.com/photo-1553856622-d1b352e9a211?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sri Lanka",
    places: "Colombo · Galle · Kandy",
    image:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=900&q=80",
  },
];

export default function DestinationSection() {
  return (
    <section className="bg-[#F8F9F7] px-5 py-16 sm:px-8 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* Member Offer */}
        <div className="mb-16 flex flex-col justify-between gap-4 rounded-3xl bg-[#E9F8F0] px-6 py-5 sm:flex-row sm:items-center sm:px-8">
          <div>
            <span className="mr-2">👑</span>
            <span className="font-extrabold text-[#073F32]">
              Members save 10%+
            </span>
            <span className="ml-2 text-sm text-[#667085]">
              on thousands of stays
            </span>
          </div>

          <button className="w-fit font-extrabold text-[#18A85B] transition hover:text-[#073F32]">
            Sign in free →
          </button>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <p className="mb-3 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
            EXPLORE BY DESTINATION
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-[#10254A] sm:text-5xl">
              Four countries.
              <span className="block text-[#073F32]">
                One standard.
              </span>
            </h2>

            <button className="w-fit rounded-full border border-[#073F32] px-5 py-3 text-sm font-bold text-[#073F32] transition hover:bg-[#073F32] hover:text-white">
              Explore all →
            </button>
          </div>
        </div>

        {/* Destination Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <article
              key={destination.name}
              className="group relative h-[380px] overflow-hidden rounded-[28px] bg-[#073F32]"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-extrabold">
                  {destination.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/80">
                  {destination.places}
                </p>

                <button className="mt-4 translate-y-2 text-sm font-extrabold text-[#18C66A] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore →
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}