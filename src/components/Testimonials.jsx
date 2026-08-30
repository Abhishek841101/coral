const testimonials = [
  {
    name: "Aarav Mehta",
    location: "Mumbai, India",
    rating: 5,
    text: "Coral made our Goa trip incredibly smooth. The property was exactly as shown and the whole booking experience felt premium.",
    initials: "AM",
  },
  {
    name: "Riya Sharma",
    location: "Delhi, India",
    rating: 5,
    text: "I loved how simple everything was. From finding the stay to getting travel assistance, Coral made planning our holiday effortless.",
    initials: "RS",
  },
  {
    name: "Kabir Kapoor",
    location: "Bengaluru, India",
    rating: 5,
    text: "Beautiful properties, great support and very transparent pricing. Coral is definitely going to be my first choice for future trips.",
    initials: "KK",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <p className="mb-3 text-sm font-extrabold tracking-[0.18em] text-[#18C66A]">
              TRAVELLER STORIES
            </p>

            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-[#10254A] sm:text-5xl">
              Loved by travellers.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#667085]">
              Real experiences from people who chose Coral for their
              journeys.
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 rounded-[22px] bg-[#E9F8F0] px-5 py-4">
            <div>
              <p className="text-2xl font-extrabold text-[#073F32]">
                4.9/5
              </p>

              <div className="mt-1 flex gap-0.5 text-sm text-[#18C66A]">
                ★ ★ ★ ★ ★
              </div>
            </div>

            <div className="h-10 w-px bg-[#073F32]/10" />

            <p className="text-xs font-semibold leading-5 text-[#667085]">
              Based on
              <br />
              10,000+ reviews
            </p>
          </div>

        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">

          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="group rounded-[28px] border border-[#E5E7EB] bg-[#F8F9F7] p-6 transition duration-300 hover:-translate-y-1 hover:bg-[#E9F8F0] hover:shadow-lg sm:p-7"
            >

              {/* Quote */}
              <div className="flex items-start justify-between">

                <div className="text-4xl font-serif leading-none text-[#18C66A]">
                  “
                </div>

                <div className="flex gap-0.5 text-sm text-[#18C66A]">
                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, index) => (
                    <span key={index}>★</span>
                  ))}
                </div>

              </div>

              {/* Text */}
              <p className="mt-5 text-[15px] leading-7 text-[#344054]">
                {testimonial.text}
              </p>

              {/* User */}
              <div className="mt-7 flex items-center gap-3 border-t border-[#073F32]/10 pt-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#073F32] text-xs font-extrabold text-white">
                  {testimonial.initials}
                </div>

                <div>
                  <p className="text-sm font-extrabold text-[#10254A]">
                    {testimonial.name}
                  </p>

                  <p className="mt-0.5 text-xs text-[#667085]">
                    {testimonial.location}
                  </p>
                </div>

                <div className="ml-auto text-[#18C66A]">
                  ✓
                </div>

              </div>

            </article>
          ))}

        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[24px] bg-[#073F32] px-6 py-5 text-center sm:flex-row sm:text-left">

          <div>
            <p className="text-sm font-extrabold text-white">
              Your journey. Our responsibility.
            </p>

            <p className="mt-1 text-xs text-white/50">
              Trusted by thousands of travellers across India and beyond.
            </p>
          </div>

          <button className="whitespace-nowrap rounded-full bg-[#18C66A] px-5 py-3 text-xs font-extrabold text-[#073F32] transition hover:bg-white">
            Start your journey →
          </button>

        </div>

      </div>
    </section>
  );
}