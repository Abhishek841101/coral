const benefits = [
  {
    icon: "✓",
    title: "Verified properties",
    description: "Every stay is carefully selected and quality checked.",
  },
  {
    icon: "₹",
    title: "Best prices",
    description: "Exclusive rates and special deals for Coral travellers.",
  },
  {
    icon: "◆",
    title: "Secure booking",
    description: "Safe payments and a smooth booking experience.",
  },
  {
    icon: "24",
    title: "24/7 support",
    description: "Travel assistance whenever and wherever you need it.",
  },
  {
    icon: "✈",
    title: "Visa assistance",
    description: "Simple visa support to make international travel easier.",
  },
];

export default function WhyCoral() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
            TRAVEL WITH CONFIDENCE
          </p>

          <h2 className="text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
            Why travellers choose
            <span className="text-[#18C66A]"> Coral.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#667085]">
            From finding the perfect stay to planning your entire journey,
            Coral keeps travel simple, secure and effortless.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group rounded-[26px] border border-[#E5E7EB] bg-[#F8F9F7] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#18C66A] hover:bg-[#E9F8F0]"
            >

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#073F32] text-sm font-extrabold text-white transition group-hover:bg-[#18C66A] group-hover:text-[#073F32]">
                {benefit.icon}
              </div>

              <h3 className="mt-6 text-lg font-extrabold text-[#10254A]">
                {benefit.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#667085]">
                {benefit.description}
              </p>

            </article>
          ))}

        </div>

        {/* Stats */}
        <div className="mt-14 grid overflow-hidden rounded-[30px] bg-[#E9F8F0] sm:grid-cols-2 lg:grid-cols-4">

          <div className="p-7 text-center lg:border-r lg:border-[#073F32]/10">
            <p className="text-3xl font-extrabold text-[#073F32]">
              100K+
            </p>
            <p className="mt-2 text-sm font-semibold text-[#667085]">
              Happy travellers
            </p>
          </div>

          <div className="p-7 text-center lg:border-r lg:border-[#073F32]/10">
            <p className="text-3xl font-extrabold text-[#073F32]">
              18K+
            </p>
            <p className="mt-2 text-sm font-semibold text-[#667085]">
              Successful bookings
            </p>
          </div>

          <div className="p-7 text-center lg:border-r lg:border-[#073F32]/10">
            <p className="text-3xl font-extrabold text-[#073F32]">
              4.9/5
            </p>
            <p className="mt-2 text-sm font-semibold text-[#667085]">
              Guest rating
            </p>
          </div>

          <div className="p-7 text-center">
            <p className="text-3xl font-extrabold text-[#073F32]">
              24/7
            </p>
            <p className="mt-2 text-sm font-semibold text-[#667085]">
              Customer support
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}