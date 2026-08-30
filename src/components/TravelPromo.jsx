const promoItems = [
  {
    number: "01",
    title: "Stay longer",
    text: "Unlock better rates when you extend your stay.",
  },
  {
    number: "02",
    title: "Travel smarter",
    text: "Curated experiences designed around your journey.",
  },
  {
    number: "03",
    title: "Get more",
    text: "Exclusive Coral perks, upgrades and travel benefits.",
  },
];

export default function TravelPromo() {
  return (
    <section
      id="tours"
      className="overflow-hidden bg-[#073F32] px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT CONTENT */}
          <div className="text-white">

            <p className="mb-4 text-sm font-extrabold tracking-[0.18em] text-[#18C66A]">
              THE CORAL WAY
            </p>

            <h2 className="max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Travel more.
              <span className="block text-[#18C66A]">
                Experience more.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/65">
              Coral brings together beautiful stays, memorable experiences
              and effortless travel services so you can focus on the journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full bg-[#18C66A] px-6 py-3.5 text-sm font-extrabold text-[#073F32] transition hover:bg-white">
                Explore experiences
              </button>

              <button className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-extrabold text-white transition hover:border-white hover:bg-white hover:text-[#073F32]">
                Learn more
              </button>
            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            {/* Decorative circle */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#18C66A]/20" />
            <div className="absolute -bottom-24 -left-20 h-52 w-52 rounded-full border border-white/10" />

            <div className="relative grid gap-4">

              {promoItems.map((item) => (
                <article
                  key={item.number}
                  className="group flex items-center gap-5 rounded-[26px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition duration-300 hover:translate-x-2 hover:border-[#18C66A]/40 hover:bg-white/[0.1] sm:p-6"
                >

                  {/* Number */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#18C66A] text-sm font-extrabold text-[#073F32]">
                    {item.number}
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-extrabold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-white/55">
                      {item.text}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="ml-auto hidden text-xl text-white/30 transition group-hover:text-[#18C66A] sm:block">
                    →
                  </div>

                </article>
              ))}

            </div>

          </div>

        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid border-t border-white/10 pt-8 sm:grid-cols-3">

          <div className="border-white/10 py-4 sm:border-r sm:pr-8">
            <p className="text-3xl font-extrabold text-white">
              100+
            </p>
            <p className="mt-1 text-sm text-white/50">
              Destinations to explore
            </p>
          </div>

          <div className="border-white/10 py-4 sm:px-8 sm:border-r">
            <p className="text-3xl font-extrabold text-white">
              4.9/5
            </p>
            <p className="mt-1 text-sm text-white/50">
              Traveller satisfaction
            </p>
          </div>

          <div className="py-4 sm:pl-8">
            <p className="text-3xl font-extrabold text-white">
              24/7
            </p>
            <p className="mt-1 text-sm text-white/50">
              Travel assistance
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}