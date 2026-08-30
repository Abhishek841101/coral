const footerColumns = [
  {
    title: "Explore",
    links: ["Stays", "Tours", "Visa", "Properties", "Destinations"],
  },
  {
    title: "Company",
    links: ["About Coral", "Careers", "Partner with us", "Contact us"],
  },
  {
    title: "Support",
    links: [
      "Help Center",
      "Booking Guide",
      "Cancellation Policy",
      "Terms & Conditions",
    ],
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#052F27] px-5 pt-16 text-white sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= TOP ================= */}
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* BRAND */}
          <div className="max-w-sm">

            <a
              href="/"
              className="inline-flex items-center gap-2.5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#18C66A] text-lg font-extrabold text-[#073F32]">
                C
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Coral
              </span>
            </a>

            <p className="mt-5 text-sm leading-7 text-white/50">
              Stays. Tours. Visa. Properties.
              <br />
              Everything you need for a better journey.
            </p>

            {/* Social */}
            <div className="mt-7 flex gap-2.5">

              {["Instagram", "Facebook", "LinkedIn", "X"].map(
                (social) => (
                  <button
                    key={social}
                    aria-label={social}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-extrabold text-white/60 transition hover:border-[#18C66A] hover:bg-[#18C66A] hover:text-[#073F32]"
                  >
                    {social === "Instagram"
                      ? "IG"
                      : social === "Facebook"
                      ? "FB"
                      : social === "LinkedIn"
                      ? "IN"
                      : "X"}
                  </button>
                )
              )}

            </div>

          </div>

          {/* LINK COLUMNS */}
          {footerColumns.map((column) => (
            <div key={column.title}>

              <h3 className="text-sm font-extrabold text-white">
                {column.title}
              </h3>

              <ul className="mt-5 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/45 transition hover:text-[#18C66A]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          ))}

        </div>

        {/* ================= NEWSLETTER ================= */}
        <div className="grid gap-8 border-y border-white/10 py-10 lg:grid-cols-[1fr_1fr] lg:items-center">

          <div>
            <p className="text-xl font-extrabold">
              Get travel inspiration in your inbox.
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-white/45">
              Exclusive deals, destination ideas and travel updates —
              delivered occasionally.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex rounded-full border border-white/10 bg-white p-1.5"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent px-5 text-sm text-[#10254A] outline-none placeholder:text-[#98A2B3]"
            />

            <button
              type="submit"
              className="rounded-full bg-[#18C66A] px-6 py-3 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
            >
              Subscribe
            </button>
          </form>

        </div>

        {/* ================= CONTACT STRIP ================= */}
        <div className="grid gap-5 border-b border-white/10 py-8 sm:grid-cols-3">

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/30">
              Call us
            </p>

            <p className="mt-2 text-sm font-bold text-white/80">
              +91 1800 000 000
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/30">
              Email
            </p>

            <p className="mt-2 text-sm font-bold text-white/80">
              hello@coral.com
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/30">
              Availability
            </p>

            <p className="mt-2 text-sm font-bold text-white/80">
              24/7 travel support
            </p>
          </div>

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col justify-between gap-4 py-6 text-xs text-white/30 sm:flex-row sm:items-center">

          <p>
            © {new Date().getFullYear()} Coral. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Cookies
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}