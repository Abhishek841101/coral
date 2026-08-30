export default function About() {
  return (
    <section
      id="about"
      className="bg-[#F8F9F7] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="max-w-3xl">

          <p className="text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
            ABOUT CORAL
          </p>

          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl lg:text-6xl">
            More than a booking platform.
            <span className="block text-[#18A85B]">
              We make journeys easier.
            </span>
          </h2>

          <p className="mt-6 text-base leading-7 text-[#667085] sm:text-lg">
            Coral brings stays, tours, visa assistance and properties
            together in one simple experience. Whether you are planning
            a weekend escape, a family holiday or your next property
            investment, we help you make every step easier.
          </p>

        </div>

        {/* ================= MAIN GRID ================= */}

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">

          {/* LEFT CARD */}

          <div className="relative overflow-hidden rounded-[32px] bg-[#073F32] p-7 sm:p-10">

            <div className="relative z-10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18C66A] text-2xl">
                ✦
              </div>

              <h3 className="mt-8 max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Travel with confidence.
                <br />
                Stay with comfort.
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                We carefully bring together experiences, stays and
                property opportunities so you spend less time searching
                and more time enjoying what matters.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-extrabold text-white">
                    40K+
                  </p>

                  <p className="mt-1 text-xs text-white/60">
                    Happy travellers
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-extrabold text-white">
                    18K+
                  </p>

                  <p className="mt-1 text-xs text-white/60">
                    Bookings
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-extrabold text-white">
                    4.9/5
                  </p>

                  <p className="mt-1 text-xs text-white/60">
                    Average rating
                  </p>
                </div>

              </div>

            </div>

            {/* Decorative circle */}

            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full border-[40px] border-[#18C66A]/10" />

            <div className="absolute -right-10 top-10 h-32 w-32 rounded-full bg-[#18C66A]/10 blur-2xl" />

          </div>

          {/* RIGHT CARDS */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">

            {/* Card 1 */}

            <div className="rounded-[30px] border border-[#E5E7EB] bg-white p-7 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F8F0] text-xl">
                  🧭
                </div>

                <div>

                  <h3 className="text-lg font-extrabold text-[#10254A]">
                    Everything in one place
                  </h3>

                  <p className="mt-1 text-xs text-[#667085]">
                    Stays · Tours · Visa · Properties
                  </p>

                </div>

              </div>

              <p className="mt-5 text-sm leading-6 text-[#667085]">
                From discovering your destination to finding the right
                stay or property, Coral keeps your planning simple.
              </p>

            </div>

            {/* Card 2 */}

            <div className="rounded-[30px] border border-[#E5E7EB] bg-white p-7 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F8F0] text-xl">
                  🤝
                </div>

                <div>

                  <h3 className="text-lg font-extrabold text-[#10254A]">
                    Human support
                  </h3>

                  <p className="mt-1 text-xs text-[#667085]">
                    Here when you need us
                  </p>

                </div>

              </div>

              <p className="mt-5 text-sm leading-6 text-[#667085]">
                Need help choosing a stay, planning a trip or exploring
                a property? Our team is here to help you make confident
                decisions.
              </p>

            </div>

          </div>

        </div>

        {/* ================= VALUES ================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-[24px] bg-white p-6">
            <div className="text-2xl">✓</div>

            <h3 className="mt-4 text-base font-extrabold text-[#10254A]">
              Carefully selected
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#667085]">
              Quality options chosen with travellers and buyers in mind.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6">
            <div className="text-2xl">⚡</div>

            <h3 className="mt-4 text-base font-extrabold text-[#10254A]">
              Simple experience
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#667085]">
              Easy discovery, clear information and straightforward
              actions.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6">
            <div className="text-2xl">♥</div>

            <h3 className="mt-4 text-base font-extrabold text-[#10254A]">
              Customer first
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#667085]">
              Every experience is designed around what our customers need.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6">
            <div className="text-2xl">🌍</div>

            <h3 className="mt-4 text-base font-extrabold text-[#10254A]">
              Built to grow
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#667085]">
              One platform connecting travel experiences and property
              opportunities.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}