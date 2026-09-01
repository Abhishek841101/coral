// import { Link } from "react-router-dom";

// const properties = [
//   {
//     id: 1,
//     name: "Coral Grand Residences",
//     location: "Nagpur, Maharashtra",
//     type: "Premium Apartments",
//     price: "₹58 Lakhs",
//     status: "Ready to Move",
//     image:
//       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
//   },
//   {
//     id: 2,
//     name: "Coral Lakeview Villas",
//     location: "Udaipur, Rajasthan",
//     type: "Luxury Villas",
//     price: "₹1.25 Cr",
//     status: "Limited Units",
//     image:
//       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
//   },
//   {
//     id: 3,
//     name: "Coral Urban Heights",
//     location: "Pune, Maharashtra",
//     type: "2 & 3 BHK Apartments",
//     price: "₹72 Lakhs",
//     status: "Launching Soon",
//     image:
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80",
//   },
// ];

// export default function PropertiesSection() {
//   return (
//     <section
//       id="properties"
//       className="bg-[#F8F9F7] px-5 py-20 sm:px-8 lg:px-10"
//     >
//       <div className="mx-auto max-w-7xl">

//         {/* Header */}
//         <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

//           <div>

//             <p className="mb-3 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
//               PREMIUM REAL ESTATE
//             </p>

//             <h2 className="text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
//               Find your next property
//             </h2>

//             <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
//               Discover carefully selected residential properties,
//               premium apartments and investment opportunities.
//             </p>

//           </div>

//           <Link
//             to="/properties"
//             className="w-fit rounded-full border border-[#073F32] px-5 py-3 text-sm font-bold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
//           >
//             View all properties →
//           </Link>

//         </div>

//         {/* Property Cards */}
//         <div className="mt-10 grid gap-6 lg:grid-cols-3">

//           {properties.map((property) => (

//             <article
//               key={property.id}
//               className="group overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
//             >

//               {/* Image */}
//               <div className="relative h-[300px] overflow-hidden">

//                 <img
//                   src={property.image}
//                   alt={property.name}
//                   loading="lazy"
//                   className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

//                 {/* Status */}
//                 <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#073F32] shadow-md">
//                   {property.status}
//                 </span>

//                 {/* Location */}
//                 <div className="absolute bottom-5 left-5 text-white">

//                   <p className="text-xs font-bold text-white/80">
//                     📍 {property.location}
//                   </p>

//                 </div>

//               </div>

//               {/* Details */}
//               <div className="p-6">

//                 <p className="text-xs font-extrabold tracking-wider text-[#18A85B]">
//                   {property.type}
//                 </p>

//                 <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#10254A]">
//                   {property.name}
//                 </h3>

//                 <div className="mt-6 flex items-end justify-between gap-4">

//                   <div>

//                     <p className="text-xs text-[#667085]">
//                       Starting from
//                     </p>

//                     <p className="mt-1 text-xl font-extrabold text-[#073F32]">
//                       {property.price}
//                     </p>

//                   </div>

//                   <Link
//                     to={`/property/${property.id}`}
//                     className="rounded-full bg-[#18C66A] px-5 py-3 text-xs font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
//                   >
//                     Explore
//                   </Link>

//                 </div>

//               </div>

//             </article>

//           ))}

//         </div>

//         {/* CTA */}
//         <div className="mt-10 overflow-hidden rounded-[30px] bg-[#073F32] p-7 sm:p-10">

//           <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">

//             <div>

//               <p className="text-sm font-extrabold tracking-wider text-[#18C66A]">
//                 LOOKING FOR SOMETHING SPECIFIC?
//               </p>

//               <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
//                 Tell us what you're looking for.
//               </h3>

//               <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
//                 Our property experts can help you find the right
//                 location, configuration and budget.
//               </p>

//             </div>

//             <Link
//               to="/properties"
//               className="w-fit shrink-0 rounded-full bg-[#18C66A] px-6 py-3.5 text-sm font-extrabold text-[#073F32] transition hover:bg-white"
//             >
//               Explore properties →
//             </Link>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }









import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getProperties,
  selectProperties,
  selectPropertiesLoading,
  selectPropertyError,
} from "../features/properties/propertySlice";

export default function PropertiesSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const properties = useSelector(selectProperties);
  const loading = useSelector(selectPropertiesLoading);
  const error = useSelector(selectPropertyError);

  /* =====================================================
     GET REAL PROPERTIES FROM BACKEND
  ===================================================== */

  useEffect(() => {
    dispatch(
      getProperties({
        city: "Nagpur",
        page: 1,
        limit: 12,
      })
    );
  }, [dispatch]);

  /* =====================================================
     EXPLORE PROPERTY
  ===================================================== */

  const handleExplore = (id) => {
    navigate(`/property/${id}`);
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <section
        id="properties"
        className="px-4 py-20 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <div className="h-4 w-32 animate-pulse rounded-full bg-gray-200" />

            <div className="mt-4 h-10 w-72 animate-pulse rounded-xl bg-gray-200" />

            <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[28px] bg-white shadow-sm"
                >
                  <div className="h-64 animate-pulse bg-gray-200" />

                  <div className="space-y-3 p-5">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

                    <div className="h-8 w-1/3 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <section
        id="properties"
        className="px-4 py-20 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[28px] border border-red-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl">
              !
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#073F32]">
              Unable to load properties
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {error}
            </p>

            <button
              onClick={() =>
                dispatch(
                  getProperties({
                    city: "Nagpur",
                    page: 1,
                    limit: 12,
                  })
                )
              }
              className="mt-6 rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
     EMPTY
  ===================================================== */

  if (!properties.length) {
    return (
      <section
        id="properties"
        className="px-4 py-20 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#18A85B]">
              Coral Properties
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#073F32] sm:text-4xl">
              Find your place in Nagpur
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Discover verified rooms, flats and homes
              available on Coral.
            </p>
          </div>

          <div className="rounded-[28px] border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
              🏠
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#073F32]">
              No properties available yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              New properties will appear here once they
              are approved and made active by Coral.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
     PROPERTY LIST
  ===================================================== */

  return (
    <section
      id="properties"
      className="px-4 py-20 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#18A85B]">
              Coral Properties
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#073F32] sm:text-4xl">
              Find your place in Nagpur
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Explore verified rooms, flats, apartments
              and homes available on Coral.
            </p>
          </div>

          <div className="rounded-full bg-[#E9F8F0] px-4 py-2 text-sm font-bold text-[#073F32]">
            {properties.length}{" "}
            {properties.length === 1
              ? "Property"
              : "Properties"}
          </div>
        </div>

        {/* ================= CARDS ================= */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => {
            const image =
              property.images?.find(
                (item) => item.isPrimary
              )?.url ||
              property.images?.[0]?.url;

            return (
              <article
                key={property._id}
                className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* ================= IMAGE ================= */}

                <div className="relative h-64 overflow-hidden bg-[#E9F8F0]">
                  {image ? (
                    <img
                      src={image}
                      alt={property.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl">
                      🏠
                    </div>
                  )}

                  {/* Property type */}

                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold capitalize text-[#073F32] shadow-sm backdrop-blur">
                    {property.propertyType}
                  </div>

                  {/* Availability */}

                  <div className="absolute right-4 top-4 rounded-full bg-[#18C66A] px-3 py-1.5 text-xs font-extrabold capitalize text-[#073F32] shadow-sm">
                    Available
                  </div>
                </div>

                {/* ================= CONTENT ================= */}

                <div className="p-5">

                  <h3 className="line-clamp-1 text-xl font-extrabold text-[#073F32]">
                    {property.title}
                  </h3>

                  {/* Location */}

                  <p className="mt-2 line-clamp-1 text-sm font-medium text-gray-500">
                    {property.locality}
                    {property.city
                      ? `, ${property.city}`
                      : ""}
                  </p>

                  {/* Details */}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {property.bhk && (
                      <span className="rounded-full bg-[#F3F7F5] px-3 py-1.5 text-xs font-bold text-[#073F32]">
                        {property.bhk} BHK
                      </span>
                    )}

                    {property.bedrooms > 0 && (
                      <span className="rounded-full bg-[#F3F7F5] px-3 py-1.5 text-xs font-bold text-[#073F32]">
                        {property.bedrooms}{" "}
                        {property.bedrooms === 1
                          ? "Bedroom"
                          : "Bedrooms"}
                      </span>
                    )}

                    {property.bathrooms > 0 && (
                      <span className="rounded-full bg-[#F3F7F5] px-3 py-1.5 text-xs font-bold text-[#073F32]">
                        {property.bathrooms}{" "}
                        {property.bathrooms === 1
                          ? "Bath"
                          : "Baths"}
                      </span>
                    )}
                  </div>

                  {/* ================= BOTTOM ================= */}

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-2xl font-black text-[#073F32]">
                        ₹
                        {Number(
                          property.rent
                        ).toLocaleString("en-IN")}
                      </p>

                      <p className="text-xs font-medium text-gray-400">
                        per{" "}
                        {property.rentPeriod ===
                        "day"
                          ? "day"
                          : property.rentPeriod ===
                            "year"
                          ? "year"
                          : "month"}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleExplore(
                          property._id
                        )
                      }
                      className="rounded-full bg-[#073F32] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}