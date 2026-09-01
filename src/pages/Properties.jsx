import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getProperties,
  selectProperties,
  selectPropertiesLoading,
  selectPropertiesError,
} from "../features/properties/propertySlice";

export default function Properties() {
  const dispatch = useDispatch();

  const properties = useSelector(
    selectProperties
  );

  const loading = useSelector(
    selectPropertiesLoading
  );

  const error = useSelector(
    selectPropertiesError
  );

  /* =====================================================
     FETCH REAL PROPERTIES
  ===================================================== */

  useEffect(() => {
    dispatch(
      getProperties({
        city: "Nagpur",
        limit: 12,
      })
    );
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

      {/* HEADER */}

      <header className="border-b border-[#E5E7EB] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link
            to="/"
            className="flex items-center gap-2.5"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
              C
            </div>

            <span className="text-xl font-black text-[#073F32]">
              Coral
            </span>

          </Link>

          <Link
            to="/"
            className="text-sm font-bold text-[#073F32]"
          >
            Home
          </Link>

        </div>

      </header>

      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#18A85B]">
            Coral Properties
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#073F32] sm:text-4xl">
            Find your next place in Nagpur
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Rooms, PGs, flats, apartments and homes.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 px-5 py-4">
            <p className="text-sm font-semibold text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* LOADING */}

        {loading && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {Array.from({
              length: 6,
            }).map((_, index) => (
              <PropertySkeleton
                key={index}
              />
            ))}

          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          properties.length === 0 && (
            <div className="mt-10 rounded-[28px] bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
                🏠
              </div>

              <h2 className="mt-5 text-xl font-black text-[#073F32]">
                No properties available
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                There are currently no approved properties
                available in Nagpur.
              </p>

            </div>
          )}

        {/* PROPERTY GRID */}

        {!loading &&
          properties.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {properties.map(
                (property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                )
              )}

            </div>
          )}

      </section>

    </main>
  );
}

/* =====================================================
   PROPERTY CARD
===================================================== */

function PropertyCard({
  property,
}) {
  const image =
    property.images?.find(
      (item) =>
        item.isPrimary
    )?.url ||
    property.images?.[0]?.url;

  const type =
    property.propertyType
      ?.replace("-", " ")
      ?.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );

  return (
    <Link
      to={`/property/${property._id}`}
      className="group overflow-hidden rounded-[28px] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >

      {/* IMAGE */}

      <div className="relative h-56 overflow-hidden bg-[#E9F8F0]">

        {image ? (
          <img
            src={image}
            alt={property.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">
            🏠
          </div>
        )}

        {/* TYPE */}

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-[#073F32] backdrop-blur">
          {type}
        </span>

      </div>

      {/* DETAILS */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <h2 className="truncate text-lg font-black text-[#073F32]">
              {property.title}
            </h2>

            <p className="mt-1 truncate text-sm text-gray-500">
              {property.locality},{" "}
              {property.city}
            </p>

          </div>

        </div>

        {/* PROPERTY INFO */}

        <div className="mt-4 flex flex-wrap gap-2">

          {property.bhk && (
            <InfoBadge>
              {property.bhk} BHK
            </InfoBadge>
          )}

          {property.area && (
            <InfoBadge>
              {property.area}{" "}
              {property.areaUnit}
            </InfoBadge>
          )}

          {property.furnishing && (
            <InfoBadge>
              {property.furnishing
                .replace("-", " ")}
            </InfoBadge>
          )}

        </div>

        {/* BOTTOM */}

        <div className="mt-5 flex items-end justify-between border-t border-[#E5E7EB] pt-4">

          <div>

            <p className="text-xs text-gray-400">
              Rent
            </p>

            <p className="mt-1 text-xl font-black text-[#073F32]">
              ₹
              {Number(
                property.rent
              ).toLocaleString("en-IN")}
              <span className="ml-1 text-xs font-semibold text-gray-400">
                /{property.rentPeriod}
              </span>
            </p>

          </div>

          <span className="text-sm font-extrabold text-[#18A85B]">
            View →
          </span>

        </div>

      </div>

    </Link>
  );
}

/* =====================================================
   BADGE
===================================================== */

function InfoBadge({
  children,
}) {
  return (
    <span className="rounded-full bg-[#F8F9F7] px-3 py-1.5 text-[11px] font-bold capitalize text-gray-600">
      {children}
    </span>
  );
}

/* =====================================================
   SKELETON
===================================================== */

function PropertySkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">

      <div className="h-56 animate-pulse bg-gray-200" />

      <div className="p-5">

        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

        <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-200" />

        <div className="mt-5 flex gap-2">

          <div className="h-7 w-16 animate-pulse rounded-full bg-gray-200" />

          <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200" />

        </div>

        <div className="mt-5 h-12 animate-pulse rounded bg-gray-200" />

      </div>

    </div>
  );
}