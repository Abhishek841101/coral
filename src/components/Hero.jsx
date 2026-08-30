import { useState } from "react";
import heroImage from "../assets/hero.jpg";

export default function Hero() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!destination || !checkIn || !checkOut) {
      alert("Please select destination and travel dates.");
      return;
    }

    setSearched(true);

    console.log({
      destination,
      checkIn,
      checkOut,
      guests,
      rooms,
    });
  };

  return (
    <section className="relative min-h-[720px] overflow-hidden sm:min-h-[760px]">

      {/* Background */}
      <img
        src={heroImage}
        alt="Luxury travel destination"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-5 pb-44 pt-32 sm:min-h-[760px] sm:px-8 sm:pb-40 lg:px-10">

        <div className="max-w-3xl text-white">

          <span className="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold tracking-[0.18em] backdrop-blur-md">
            STAYS · TOURS · VISA · PROPERTIES
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Extraordinary journeys,
            <span className="block text-[#18C66A]">
              made effortless.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            Handpicked stays, curated tours, visa support and premium
            properties — all in one place.
          </p>

          <div className="mt-9 flex flex-wrap gap-5 sm:gap-7">
            <div>
              <p className="text-2xl font-extrabold">40K+</p>
              <p className="text-sm text-white/70">Happy travellers</p>
            </div>

            <div>
              <p className="text-2xl font-extrabold">18K+</p>
              <p className="text-sm text-white/70">Bookings</p>
            </div>

            <div>
              <p className="text-2xl font-extrabold">4.9/5</p>
              <p className="text-sm text-white/70">Average rating</p>
            </div>

            <div>
              <p className="text-2xl font-extrabold">4</p>
              <p className="text-sm text-white/70">Countries</p>
            </div>
          </div>

        </div>
      </div>

      {/* Search */}
      <div className="absolute bottom-5 left-1/2 z-20 w-[calc(100%-24px)] max-w-6xl -translate-x-1/2 sm:bottom-8 sm:w-[calc(100%-32px)]">

        <div className="grid rounded-[28px] bg-white p-2 shadow-2xl md:grid-cols-4 md:p-3">

          {/* Destination */}
          <div className="rounded-2xl px-4 py-3 hover:bg-[#F8F9F7] sm:px-5 sm:py-4">
            <label className="text-xs font-bold text-[#667085]">
              WHERE TO?
            </label>

            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 w-full cursor-pointer bg-transparent text-sm font-bold text-[#10254A] outline-none"
            >
              <option value="">Search destination...</option>
              <option value="Goa">Goa</option>
              <option value="Udaipur">Udaipur</option>
              <option value="Manali">Manali</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Thimphu">Thimphu</option>
              <option value="Colombo">Colombo</option>
            </select>
          </div>

          {/* Check In */}
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

          {/* Check Out */}
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

          {/* Guests */}
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3 sm:px-5">

            <div className="min-w-0 flex-1">
              <label className="text-xs font-bold text-[#667085]">
                TRAVELLERS
              </label>

              <div className="mt-1 flex items-center gap-2">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E9F8F0] font-bold text-[#073F32]"
                >
                  −
                </button>

                <span className="whitespace-nowrap text-sm font-bold text-[#10254A]">
                  {guests} guests · {rooms} room
                </span>

                <button
                  onClick={() => setGuests(guests + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E9F8F0] font-bold text-[#073F32]"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="shrink-0 rounded-full bg-[#18C66A] px-5 py-3.5 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
            >
              Search
            </button>

          </div>
        </div>

        {/* Search Result Message */}
        {searched && (
          <div className="mt-3 rounded-2xl bg-white px-5 py-3 text-center text-sm font-bold text-[#073F32] shadow-lg">
            Showing stays in {destination} · {guests} guests · {rooms} room
          </div>
        )}

      </div>

    </section>
  );
}