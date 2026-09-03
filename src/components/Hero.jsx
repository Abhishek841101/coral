import { useState } from "react";
import heroImage from "../assets/hero.jpg";

export default function Hero() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [propertyType, setPropertyType] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!checkIn || !checkOut || !propertyType) {
      alert("Please select travel dates and property type.");
      return;
    }

    setSearched(true);

    console.log({
      destination: "Nagpur",
      checkIn,
      checkOut,
      guests,
      propertyType,
    });
  };

  return (
    <section className="relative min-h-[720px] overflow-hidden sm:min-h-[760px]">

      {/* ================= BACKGROUND ================= */}

      <img
        src={heroImage}
        alt="Nagpur properties"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ================= OVERLAY ================= */}

      <div className="absolute inset-0 bg-black/40" />

      {/* ================= HERO CONTENT ================= */}

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-5 pb-44 pt-32 sm:min-h-[760px] sm:px-8 sm:pb-40 lg:px-10">

        <div className="max-w-3xl text-white">

          <span className="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold tracking-[0.18em] backdrop-blur-md">
            NAGPUR · STAYS · TOURS · PROPERTIES
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Find your perfect stay,
            <span className="block text-[#18C66A]">
              right here in Nagpur.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            Discover handpicked hotels, apartments, flats and premium
            properties across Nagpur — all in one place.
          </p>

          {/* ================= STATS ================= */}

          <div className="mt-9 flex flex-wrap gap-5 sm:gap-7">

            <div>
              <p className="text-2xl font-extrabold">500+</p>
              <p className="text-sm text-white/70">
                Properties
              </p>
            </div>

            <div>
              <p className="text-2xl font-extrabold">1000+</p>
              <p className="text-sm text-white/70">
                Happy guests
              </p>
            </div>

            <div>
              <p className="text-2xl font-extrabold">4.9/5</p>
              <p className="text-sm text-white/70">
                Average rating
              </p>
            </div>

            <div>
              <p className="text-2xl font-extrabold">Nagpur</p>
              <p className="text-sm text-white/70">
                Local listings
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ================= SEARCH BAR ================= */}

      <div className="absolute bottom-5 left-1/2 z-20 w-[calc(100%-24px)] max-w-6xl -translate-x-1/2 sm:bottom-8 sm:w-[calc(100%-32px)]">

        <div className="grid rounded-[28px] bg-white p-2 shadow-2xl md:grid-cols-5 md:p-3">

          {/* ================= LOCATION ================= */}

          <div className="rounded-2xl px-4 py-3 hover:bg-[#F8F9F7] sm:px-5 sm:py-4">

            <label className="text-xs font-bold text-[#667085]">
              WHERE TO?
            </label>

            <div className="mt-1 flex items-center gap-2">

              <span className="text-base">
                📍
              </span>

              <span className="text-sm font-bold text-[#10254A]">
                Nagpur
              </span>

            </div>

          </div>

          {/* ================= CHECK IN ================= */}

          <div className="rounded-2xl px-4 py-3 hover:bg-[#F8F9F7] sm:px-5 sm:py-4">

            <label className="text-xs font-bold text-[#667085]">
              CHECK-IN
            </label>

            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm font-bold text-[#10254A] outline-none"
            />

          </div>

          {/* ================= CHECK OUT ================= */}

          <div className="rounded-2xl px-4 py-3 hover:bg-[#F8F9F7] sm:px-5 sm:py-4">

            <label className="text-xs font-bold text-[#667085]">
              CHECK-OUT
            </label>

            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm font-bold text-[#10254A] outline-none"
            />

          </div>

          {/* ================= PROPERTY TYPE ================= */}

          <div className="rounded-2xl px-4 py-3 hover:bg-[#F8F9F7] sm:px-5 sm:py-4">

            <label className="text-xs font-bold text-[#667085]">
              PROPERTY TYPE
            </label>

            <select
              value={propertyType}
              onChange={(e) =>
                setPropertyType(e.target.value)
              }
              className="mt-1 w-full cursor-pointer bg-transparent text-sm font-bold text-[#10254A] outline-none"
            >

              <option value="">
                Select property
              </option>

              <option value="1 RK">
                1 RK
              </option>

              <option value="1 BHK">
                1 BHK
              </option>

              <option value="2 BHK">
                2 BHK
              </option>

              <option value="3 BHK">
                3 BHK
              </option>

              <option value="4 BHK+">
                4 BHK+
              </option>

            </select>

          </div>

          {/* ================= TRAVELLERS + SEARCH ================= */}

          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 sm:px-5">

            <div className="min-w-0 flex-1">

              <label className="text-xs font-bold text-[#667085]">
                TRAVELLERS
              </label>

              <div className="mt-1 flex items-center gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setGuests(
                      Math.max(1, guests - 1)
                    )
                  }
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E9F8F0] font-bold text-[#073F32]"
                >
                  −
                </button>

                <span className="whitespace-nowrap text-sm font-bold text-[#10254A]">
                  {guests}{" "}
                  {guests === 1
                    ? "guest"
                    : "guests"}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setGuests(guests + 1)
                  }
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E9F8F0] font-bold text-[#073F32]"
                >
                  +
                </button>

              </div>

            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="shrink-0 rounded-full bg-[#18C66A] px-5 py-3.5 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
            >
              Search
            </button>

          </div>

        </div>

        {/* ================= SEARCH RESULT ================= */}

        {searched && (
          <div className="mt-3 rounded-2xl bg-white px-5 py-3 text-center text-sm font-bold text-[#073F32] shadow-lg">

            Showing{" "}
            <span className="text-[#18C66A]">
              {propertyType}
            </span>{" "}
            properties in{" "}
            <span className="text-[#18C66A]">
              Nagpur
            </span>{" "}
            · {guests}{" "}
            {guests === 1
              ? "guest"
              : "guests"}

          </div>
        )}

      </div>

    </section>
  );
}