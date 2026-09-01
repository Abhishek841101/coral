import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getPropertyById,
  selectSelectedProperty,
  selectPropertyLoading,
  selectSelectedPropertyError,
  clearSelectedProperty,
} from "../features/properties/propertySlice";

export default function PropertyDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const property = useSelector(
    selectSelectedProperty
  );

  const loading = useSelector(
    selectPropertyLoading
  );

  const error = useSelector(
    selectSelectedPropertyError
  );

  /* =====================================================
     FETCH PROPERTY
  ===================================================== */

  useEffect(() => {
    if (!id) return;

    dispatch(getPropertyById(id));

    return () => {
      dispatch(clearSelectedProperty());
    };
  }, [dispatch, id]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F9F7]">
        <Navbar />

        <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">

            <div className="h-[420px] animate-pulse rounded-[32px] bg-gray-200" />

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">

              <div className="space-y-4">
                <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200" />

                <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />

                <div className="h-24 w-full animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-52 animate-pulse rounded-[28px] bg-gray-200" />

            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =====================================================
     ERROR / NOT FOUND
  ===================================================== */

  if (error || !property) {
    return (
      <main className="min-h-screen bg-[#F8F9F7]">
        <Navbar />

        <section className="flex min-h-screen items-center justify-center px-4 pt-20">

          <div className="w-full max-w-lg rounded-[32px] bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
              🏠
            </div>

            <h1 className="mt-6 text-2xl font-black text-[#073F32]">
              Property not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {error ||
                "This property is no longer available."}
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/properties")
              }
              className="mt-7 rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
            >
              Back to Properties
            </button>

          </div>

        </section>
      </main>
    );
  }

  /* =====================================================
     DATA
  ===================================================== */

  const primaryImage =
    property.images?.find(
      (image) => image.isPrimary
    )?.url ||
    property.images?.[0]?.url ||
    null;

  const additionalImages =
    property.images?.filter(
      (image) =>
        image.url !== primaryImage
    ) || [];

  const rentPeriod =
    property.rentPeriod === "day"
      ? "day"
      : property.rentPeriod === "year"
      ? "year"
      : "month";

  const propertyType =
    property.propertyType
      ?.replaceAll("-", " ")
      ?.replace(
        /\b\w/g,
        (char) =>
          char.toUpperCase()
      ) ||
    "Property";

  /* =====================================================
     RESERVE
  ===================================================== */

  const handleReserve = () => {
    navigate(
      `/booking?property=${property._id}`
    );
  };

  /* =====================================================
     ENQUIRY
  ===================================================== */

  const handleEnquiry = () => {
    navigate(
      `/enquiry?property=${property._id}`
    );
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

      <Navbar />

      {/* =================================================
          HERO / IMAGE GALLERY
      ================================================= */}

      <section className="px-4 pb-8 pt-28 sm:px-6 lg:px-10 lg:pt-32">

        <div className="mx-auto max-w-7xl">

          <div className="grid overflow-hidden rounded-[32px] bg-white shadow-sm lg:grid-cols-[1.6fr_1fr]">

            {/* MAIN IMAGE */}

            <div className="relative h-[360px] bg-[#E9F8F0] sm:h-[460px] lg:h-[540px]">

              {primaryImage ? (
                <img
                  src={primaryImage}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-7xl">
                  🏠
                </div>
              )}

              <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold capitalize text-[#073F32] shadow-sm backdrop-blur">
                {propertyType}
              </div>

              {property.availability ===
                "available" && (
                <div className="absolute right-5 top-5 rounded-full bg-[#18C66A] px-4 py-2 text-xs font-extrabold text-[#073F32] shadow-sm">
                  Available
                </div>
              )}

            </div>

            {/* ADDITIONAL IMAGES */}

            <div className="grid grid-cols-2 gap-2 bg-[#F3F7F5] p-2">

              {additionalImages
                .slice(0, 4)
                .map(
                  (image, index) => (
                    <div
                      key={`${image.publicId || image.url}-${index}`}
                      className="overflow-hidden rounded-[22px] bg-[#E9F8F0]"
                    >
                      <img
                        src={image.url}
                        alt={`${property.title} ${
                          index + 2
                        }`}
                        className="h-full min-h-[170px] w-full object-cover"
                      />
                    </div>
                  )
                )}

              {!additionalImages.length && (
                <div className="col-span-2 flex min-h-[300px] items-center justify-center text-sm font-semibold text-gray-400">
                  No additional photos
                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          PROPERTY CONTENT
      ================================================= */}

      <section className="px-4 pb-20 sm:px-6 lg:px-10">

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]">

          {/* ================= LEFT ================= */}

          <div>

            {/* TITLE */}

            <div className="rounded-[28px] bg-white p-6 shadow-sm sm:p-8">

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

                <div>

                  <h1 className="text-3xl font-black tracking-tight text-[#073F32] sm:text-4xl">
                    {property.title}
                  </h1>

                  <p className="mt-3 text-sm font-semibold text-gray-500">
                    📍 {property.locality},{" "}
                    {property.city}
                  </p>

                </div>

                <div className="shrink-0 rounded-2xl bg-[#E9F8F0] px-4 py-3">

                  <p className="text-xs font-bold text-gray-500">
                    Starting from
                  </p>

                  <p className="text-2xl font-black text-[#073F32]">
                    ₹
                    {Number(
                      property.rent || 0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p className="text-xs font-medium text-gray-400">
                    per {rentPeriod}
                  </p>

                </div>

              </div>

              {/* QUICK DETAILS */}

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

                {property.bhk && (
                  <DetailBox
                    label="BHK"
                    value={property.bhk}
                  />
                )}

                {property.area && (
                  <DetailBox
                    label="Area"
                    value={`${property.area} ${
                      property.areaUnit || ""
                    }`}
                  />
                )}

                {property.bedrooms > 0 && (
                  <DetailBox
                    label="Bedrooms"
                    value={property.bedrooms}
                  />
                )}

                {property.bathrooms > 0 && (
                  <DetailBox
                    label="Bathrooms"
                    value={property.bathrooms}
                  />
                )}

                {property.guests && (
                  <DetailBox
                    label="Guests"
                    value={property.guests}
                  />
                )}

                {property.furnishing && (
                  <DetailBox
                    label="Furnishing"
                    value={property.furnishing.replace(
                      "-",
                      " "
                    )}
                  />
                )}

              </div>

            </div>

            {/* DESCRIPTION */}

            {property.description && (
              <div className="mt-6 rounded-[28px] bg-white p-6 shadow-sm sm:p-8">

                <h2 className="text-xl font-black text-[#073F32]">
                  About this property
                </h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">
                  {property.description}
                </p>

              </div>
            )}

            {/* AMENITIES */}

            {property.amenities?.length > 0 && (
              <div className="mt-6 rounded-[28px] bg-white p-6 shadow-sm sm:p-8">

                <h2 className="text-xl font-black text-[#073F32]">
                  Amenities
                </h2>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

                  {property.amenities.map(
                    (amenity, index) => (
                      <div
                        key={`${amenity}-${index}`}
                        className="rounded-2xl bg-[#F3F7F5] px-4 py-3 text-sm font-semibold capitalize text-[#073F32]"
                      >
                        ✓ {amenity}
                      </div>
                    )
                  )}

                </div>

              </div>
            )}

            {/* RULES */}

            {property.rules?.length > 0 && (
              <div className="mt-6 rounded-[28px] bg-white p-6 shadow-sm sm:p-8">

                <h2 className="text-xl font-black text-[#073F32]">
                  Property rules
                </h2>

                <div className="mt-5 space-y-3">

                  {property.rules.map(
                    (rule, index) => (
                      <div
                        key={`${rule}-${index}`}
                        className="flex gap-3 text-sm leading-6 text-gray-600"
                      >
                        <span className="font-bold text-[#18A85B]">
                          •
                        </span>

                        <span>
                          {rule}
                        </span>
                      </div>
                    )
                  )}

                </div>

              </div>
            )}

            {/* LOCATION */}

            <div className="mt-6 rounded-[28px] bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-black text-[#073F32]">
                Location
              </h2>

              {property.address && (
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {property.address}
                </p>
              )}

              {property.locality && (
                <p className="mt-2 text-sm text-gray-500">
                  {property.locality}
                </p>
              )}

              {property.landmark && (
                <p className="mt-2 text-sm text-gray-500">
                  Near {property.landmark}
                </p>
              )}

              {property.pincode && (
                <p className="mt-1 text-sm text-gray-500">
                  {property.pincode}
                </p>
              )}

              {property.city && (
                <p className="mt-1 text-sm text-gray-500">
                  {property.city}
                </p>
              )}

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <aside className="lg:sticky lg:top-28 lg:h-fit">

            <div className="rounded-[28px] bg-[#073F32] p-6 text-white shadow-xl sm:p-7">

              <p className="text-sm font-semibold text-white/60">
                {propertyType}
              </p>

              <h2 className="mt-2 text-2xl font-black">

                ₹
                {Number(
                  property.rent || 0
                ).toLocaleString(
                  "en-IN"
                )}

                <span className="text-sm font-semibold text-white/60">
                  {" "}
                  / {rentPeriod}
                </span>

              </h2>

              {/* SECURITY DEPOSIT */}

              {property.securityDeposit >
                0 && (
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">

                  <span className="text-white/60">
                    Security deposit
                  </span>

                  <span className="font-bold">
                    ₹
                    {Number(
                      property.securityDeposit
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>
              )}

              {/* MAINTENANCE */}

              {property.maintenance >
                0 && (
                <div className="mt-3 flex items-center justify-between text-sm">

                  <span className="text-white/60">
                    Maintenance
                  </span>

                  <span className="font-bold">
                    ₹
                    {Number(
                      property.maintenance
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>
              )}

              {/* AVAILABILITY */}

              <div className="mt-6 rounded-2xl bg-white/10 p-4">

                <p className="text-xs font-bold text-white/50">
                  CURRENT STATUS
                </p>

                <p className="mt-1 text-sm font-extrabold text-[#18C66A]">
                  ●{" "}
                  {property.availability ||
                    "available"}
                </p>

              </div>

              {/* RESERVE */}

              <button
                type="button"
                onClick={handleReserve}
                disabled={
                  property.availability &&
                  property.availability !==
                    "available"
                }
                className="mt-6 w-full rounded-full bg-[#18C66A] px-6 py-4 text-sm font-black text-[#073F32] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {property.availability ===
                  "available" ||
                !property.availability
                  ? "Reserve Property"
                  : "Currently Unavailable"}
              </button>

              {/* ENQUIRY */}

              <button
                type="button"
                onClick={handleEnquiry}
                className="mt-3 w-full rounded-full border border-white/20 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                Enquire Now
              </button>

              <p className="mt-5 text-center text-xs leading-5 text-white/50">
                Your booking request will be
                securely processed through Coral.
              </p>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

/* =====================================================
   DETAIL BOX
===================================================== */

function DetailBox({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-[#F3F7F5] p-4">

      <p className="text-xs font-semibold text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-extrabold capitalize text-[#073F32]">
        {value}
      </p>

    </div>
  );
}