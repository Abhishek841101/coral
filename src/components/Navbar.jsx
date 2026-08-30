import { useState } from "react";

const navItems = [
  { label: "Stays", href: "#stays" },
  { label: "Tours", href: "#tours" },
  { label: "Visa", href: "#visa" },
  { label: "Properties", href: "#properties" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="absolute left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">
      <nav className="mx-auto max-w-7xl rounded-[24px] bg-white/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:px-6 lg:rounded-full">

        {/* ================= MAIN NAV ================= */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] text-base font-extrabold text-[#073F32]">
              C
            </div>

            <span className="text-xl font-extrabold tracking-tight text-[#073F32]">
              Coral
            </span>
          </a>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative py-2 text-sm font-bold transition ${
                  index === 0
                    ? "text-[#18C66A]"
                    : "text-[#10254A] hover:text-[#18C66A]"
                }`}
              >
                {item.label}

                {/* Active underline */}
                {index === 0 && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#18C66A]" />
                )}
              </a>
            ))}
          </div>

          {/* ================= DESKTOP RIGHT ================= */}
          <div className="hidden items-center gap-2 lg:flex">

            {/* Currency */}
            <button
              type="button"
              className="rounded-full px-4 py-2.5 text-sm font-bold text-[#10254A] transition hover:bg-[#E9F8F0]"
            >
              INR ₹
            </button>

            {/* Sign In */}
            <button
              type="button"
              className="rounded-full px-4 py-2.5 text-sm font-bold text-[#073F32] transition hover:bg-[#E9F8F0]"
            >
              Sign in
            </button>

            {/* CTA */}
            <button
              type="button"
              className="rounded-full bg-[#073F32] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
            >
              Get Started
            </button>

          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E9F8F0] text-[#073F32] transition hover:bg-[#18C66A] lg:hidden"
          >
            {menuOpen ? (
              <span className="text-2xl leading-none">×</span>
            ) : (
              <span className="text-lg leading-none">☰</span>
            )}
          </button>

        </div>

        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="mt-4 border-t border-[#E5E7EB] pt-4 lg:hidden">

            {/* Links */}
            <div className="flex flex-col gap-1">

              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={`rounded-2xl px-4 py-3.5 text-sm font-bold transition ${
                    index === 0
                      ? "bg-[#E9F8F0] text-[#18A85B]"
                      : "text-[#10254A] hover:bg-[#F8F9F7] hover:text-[#073F32]"
                  }`}
                >
                  {item.label}
                </a>
              ))}

            </div>

            {/* Mobile Actions */}
            <div className="mt-3 grid grid-cols-2 gap-2">

              <button
                type="button"
                className="rounded-full border border-[#E5E7EB] py-3 text-sm font-bold text-[#073F32] transition hover:bg-[#E9F8F0]"
              >
                Sign in
              </button>

              <button
                type="button"
                className="rounded-full bg-[#073F32] py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
              >
                Get Started
              </button>

            </div>

            {/* Currency */}
            <button
              type="button"
              className="mt-3 w-full rounded-full bg-[#F8F9F7] py-3 text-sm font-bold text-[#10254A]"
            >
              INR ₹
            </button>

          </div>
        )}

      </nav>
    </header>
  );
}