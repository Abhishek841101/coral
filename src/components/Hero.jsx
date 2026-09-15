import { useEffect, useState } from "react";
import {
motion,
useScroll,
useTransform,
} from "framer-motion";
import heroImage from "../assets/hero.jpg";

const firstText = "Find your perfect stay,";
const secondText = "right here in Nagpur.";

export default function Hero() {
const [checkIn, setCheckIn] = useState("");
const [checkOut, setCheckOut] = useState("");
const [guests, setGuests] = useState(2);
const [propertyType, setPropertyType] = useState("");
const [searched, setSearched] = useState(false);

const [firstTitle, setFirstTitle] = useState("");
const [secondTitle, setSecondTitle] = useState("");

const { scrollY } = useScroll();

const backgroundY = useTransform(
scrollY,
[0, 800],
["0%", "18%"]
);

const heroContentY = useTransform(
scrollY,
[0, 600],
["0px", "-100px"]
);

const heroOpacity = useTransform(
scrollY,
[0, 500],
[1, 0]
);

const searchY = useTransform(
scrollY,
[0, 500],
["0px", "50px"]
);

/* =====================================================
TYPEWRITER
===================================================== */

useEffect(() => {
let firstInterval;
let secondInterval;
let secondStart;

const firstStart = setTimeout(() => {
  let index = 0;

  firstInterval = setInterval(() => {
    setFirstTitle(
      firstText.substring(0, index + 1)
    );

    index++;

    if (index >= firstText.length) {
      clearInterval(firstInterval);

      secondStart = setTimeout(() => {
        let secondIndex = 0;

        secondInterval = setInterval(() => {
          setSecondTitle(
            secondText.substring(
              0,
              secondIndex + 1
            )
          );

          secondIndex++;

          if (
            secondIndex >=
            secondText.length
          ) {
            clearInterval(secondInterval);
          }
        }, 55);
      }, 250);
    }
  }, 60);
}, 500);

return () => {
  clearTimeout(firstStart);
  clearTimeout(secondStart);
  clearInterval(firstInterval);
  clearInterval(secondInterval);
};

}, []);

/* =====================================================
SEARCH
===================================================== */

const handleSearch = () => {
if (
!checkIn ||
!checkOut ||
!propertyType
) {
alert(
"Please select travel dates and property type."
);
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
<section className="relative overflow-hidden bg-[#071B16]">

  {/* =====================================================
      HERO BACKGROUND
  ===================================================== */}

  <motion.div
    style={{ y: backgroundY }}
    className="absolute inset-0 h-[115%] w-full"
  >
    <motion.img
      src={heroImage}
      alt="Premium properties in Nagpur"
      initial={{
        scale: 1.1,
      }}
      animate={{
        scale: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeOut",
      }}
      className="h-full w-full object-cover"
    />
  </motion.div>

  {/* =====================================================
      OVERLAYS
  ===================================================== */}

  <div className="absolute inset-0 bg-black/45" />

  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />

  <div className="absolute inset-0 bg-gradient-to-t from-[#071B16]/90 via-transparent to-transparent" />

  {/* =====================================================
      FLOATING GLOW
  ===================================================== */}

  <motion.div
    animate={{
      y: [0, -25, 0],
      opacity: [0.12, 0.28, 0.12],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute left-[5%] top-[20%] h-32 w-32 rounded-full bg-[#18C66A]/20 blur-3xl"
  />

  <motion.div
    animate={{
      y: [0, 25, 0],
      opacity: [0.1, 0.22, 0.1],
    }}
    transition={{
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute right-[5%] top-[25%] h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl"
  />

  {/* =====================================================
      HERO CONTENT
  ===================================================== */}

  <motion.div
    style={{
      y: heroContentY,
      opacity: heroOpacity,
    }}
    className="relative z-10 mx-auto flex min-h-[690px] max-w-7xl items-center px-5 pb-10 pt-28 sm:min-h-[750px] sm:px-8 sm:pb-36 sm:pt-32 lg:min-h-[820px] lg:px-10 lg:pb-48"
  >

    <div className="w-full max-w-4xl">

      {/* =================================================
          BADGE
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: -25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
        className="mb-5"
      >

        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-2.5">

          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">

            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#18C66A] opacity-75" />

            <span className="relative inline-flex h-full w-full rounded-full bg-[#18C66A]" />

          </span>

          <span className="text-[9px] font-bold tracking-[0.14em] text-white/90 sm:text-xs sm:tracking-[0.18em]">
            NAGPUR · STAYS · TOURS · PROPERTIES
          </span>

        </div>

      </motion.div>

      {/* =================================================
          TITLE
      ================================================= */}

      <motion.h1
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.35,
        }}
        className="text-[39px] font-black leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl lg:text-[76px]"
      >

        <span className="block min-h-[1.05em]">
          {firstTitle}

          {firstTitle.length <
            firstText.length && (
            <span className="ml-1 inline-block h-[0.72em] w-[2px] animate-pulse bg-white align-middle sm:w-[3px]" />
          )}
        </span>

        <span className="relative block text-[#18C66A]">

          {secondTitle}

          {secondTitle.length <
            secondText.length && (
            <span className="ml-1 inline-block h-[0.72em] w-[2px] animate-pulse bg-[#18C66A] align-middle sm:w-[3px]" />
          )}

          <motion.span
            initial={{
              width: 0,
            }}
            animate={{
              width: "60%",
            }}
            transition={{
              duration: 1,
              delay: 2.7,
            }}
            className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#18C66A]/50 sm:-bottom-2 sm:h-[3px]"
          />

        </span>

      </motion.h1>

      {/* =================================================
          DESCRIPTION
      ================================================= */}

      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 3.1,
        }}
        className="mt-5 max-w-2xl text-sm leading-6 text-white/80 sm:mt-7 sm:text-lg sm:leading-8"
      >
        Discover handpicked hotels, apartments,
        flats and premium properties across
        Nagpur — all in one place.
      </motion.p>

      {/* =================================================
          STATS
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 3.4,
        }}
        className="mt-7 flex flex-wrap gap-x-5 gap-y-4 sm:mt-9 sm:gap-x-7 sm:gap-y-5"
      >

        {[
          ["500+", "Properties"],
          ["1000+", "Happy guests"],
          ["4.9/5", "Average rating"],
          ["Nagpur", "Local listings"],
        ].map(([value, label], index) => (

          <motion.div
            key={label}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay:
                3.45 +
                index * 0.12,
            }}
            whileHover={{
              y: -4,
            }}
          >

            <p className="text-lg font-extrabold text-white sm:text-2xl">
              {value}
            </p>

            <p className="mt-0.5 text-[10px] text-white/60 sm:mt-1 sm:text-sm">
              {label}
            </p>

          </motion.div>

        ))}

      </motion.div>

    </div>

  </motion.div>

  {/* =====================================================
      SEARCH PANEL
      MOBILE = COMPACT
      DESKTOP = WIDE
  ===================================================== */}

  <motion.div
    style={{
      y: searchY,
    }}
    initial={{
      opacity: 0,
      y: 70,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 1,
      delay: 3.7,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="relative z-30 mx-auto -mt-2 w-[calc(100%-20px)] max-w-6xl pb-4 sm:absolute sm:bottom-5 sm:left-1/2 sm:mt-0 sm:w-[calc(100%-32px)] sm:-translate-x-1/2 sm:pb-0 lg:bottom-8"
  >

    <div className="overflow-hidden rounded-[20px] border border-white/50 bg-white/95 p-1.5 shadow-[0_20px_55px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:rounded-[26px] sm:p-2.5 lg:p-3">

      <div className="grid lg:grid-cols-5">

        {/* =================================================
            LOCATION
        ================================================= */}

        <div className="rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-[#F5F8F6] sm:rounded-2xl sm:px-5 sm:py-4">

          <label className="text-[9px] font-extrabold tracking-wider text-[#8A948F] sm:text-[10px]">
            WHERE TO?
          </label>

          <div className="mt-1 flex items-center gap-1.5">

            <span className="text-sm sm:text-lg">
              📍
            </span>

            <span className="text-xs font-bold text-[#10254A] sm:text-sm">
              Nagpur
            </span>

          </div>

        </div>

        {/* =================================================
            CHECK IN
        ================================================= */}

        <div className="rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-[#F5F8F6] sm:rounded-2xl sm:px-5 sm:py-4">

          <label className="text-[9px] font-extrabold tracking-wider text-[#8A948F] sm:text-[10px]">
            CHECK-IN
          </label>

          <input
            type="date"
            value={checkIn}
            onChange={(e) =>
              setCheckIn(e.target.value)
            }
            className="mt-1 w-full bg-transparent text-xs font-bold text-[#10254A] outline-none sm:text-sm"
          />

        </div>

        {/* =================================================
            CHECK OUT
        ================================================= */}

        <div className="rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-[#F5F8F6] sm:rounded-2xl sm:px-5 sm:py-4">

          <label className="text-[9px] font-extrabold tracking-wider text-[#8A948F] sm:text-[10px]">
            CHECK-OUT
          </label>

          <input
            type="date"
            value={checkOut}
            onChange={(e) =>
              setCheckOut(e.target.value)
            }
            className="mt-1 w-full bg-transparent text-xs font-bold text-[#10254A] outline-none sm:text-sm"
          />

        </div>

        {/* =================================================
            PROPERTY TYPE
        ================================================= */}

        <div className="rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-[#F5F8F6] sm:rounded-2xl sm:px-5 sm:py-4">

          <label className="text-[9px] font-extrabold tracking-wider text-[#8A948F] sm:text-[10px]">
            PROPERTY TYPE
          </label>

          <select
            value={propertyType}
            onChange={(e) =>
              setPropertyType(
                e.target.value
              )
            }
            className="mt-1 w-full cursor-pointer bg-transparent text-xs font-bold text-[#10254A] outline-none sm:text-sm"
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

        {/* =================================================
            TRAVELLERS + SEARCH
        ================================================= */}

        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 sm:rounded-2xl sm:gap-3 sm:px-5 sm:py-4">

          <div className="min-w-0 flex-1">

            <label className="text-[9px] font-extrabold tracking-wider text-[#8A948F] sm:text-[10px]">
              TRAVELLERS
            </label>

            <div className="mt-1 flex items-center gap-1.5 sm:gap-2">

              <button
                type="button"
                onClick={() =>
                  setGuests(
                    Math.max(
                      1,
                      guests - 1
                    )
                  )
                }
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF7F0] text-xs font-bold text-[#073F32] transition-all hover:scale-110 hover:bg-[#18C66A] sm:h-7 sm:w-7 sm:text-sm"
              >
                −
              </button>

              <span className="text-xs font-bold text-[#10254A] sm:text-sm">
                {guests}
              </span>

              <button
                type="button"
                onClick={() =>
                  setGuests(
                    guests + 1
                  )
                }
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF7F0] text-xs font-bold text-[#073F32] transition-all hover:scale-110 hover:bg-[#18C66A] sm:h-7 sm:w-7 sm:text-sm"
              >
                +
              </button>

            </div>

          </div>

          <motion.button
            type="button"
            onClick={handleSearch}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="shrink-0 rounded-full bg-[#18C66A] px-4 py-2.5 text-xs font-extrabold text-[#073F32] shadow-md transition-all hover:bg-[#073F32] hover:text-white sm:px-5 sm:py-3.5 sm:text-sm"
          >
            Search
          </motion.button>

        </div>

      </div>

    </div>

    {/* =================================================
        SEARCH RESULT
    ================================================= */}

    {searched && (
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        className="mt-2 rounded-xl border border-white/40 bg-white/95 px-3 py-2 text-center text-xs font-bold text-[#073F32] shadow-xl backdrop-blur-xl sm:mt-3 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
      >
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
      </motion.div>
    )}

  </motion.div>

  {/* =====================================================
      SCROLL INDICATOR
  ===================================================== */}

  <motion.div
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    transition={{
      delay: 4.2,
      duration: 1,
    }}
    className="absolute bottom-28 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 lg:flex"
  >

    <span className="text-[9px] font-bold tracking-[0.3em]">
      SCROLL TO EXPLORE
    </span>

    <motion.div
      animate={{
        y: [0, 8, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
      className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1.5"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
    </motion.div>

  </motion.div>

</section>

);
}