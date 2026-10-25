
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  getPropertyById,
  selectSelectedProperty,
  selectPropertyLoading,
  selectSelectedPropertyError,
  clearSelectedProperty,
} from "../features/properties/propertySlice";

const formatMoney = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatLabel = (value) => {
  if (!value) return "";
  return String(value)
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getChargePeriodLabel = (period) => {
  const labels = {
    perNight: "per night",
    perStay: "per stay",
    perMonth: "per month",
    day: "per day",
    month: "per month",
    year: "per year",
    included: "included",
  };

  return labels[period] || "";
};

const getImageUrl = (image) => {
  if (typeof image === "string") return image;
  return image?.url || "";
};

export default function PropertyDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const property = useSelector(selectSelectedProperty);
  const loading = useSelector(selectPropertyLoading);
  const error = useSelector(selectSelectedPropertyError);

  useEffect(() => {
    if (!id) return;

    dispatch(getPropertyById(id));

    return () => {
      dispatch(clearSelectedProperty());
    };
  }, [dispatch, id]);

  const images = useMemo(() => {
    if (!Array.isArray(property?.images)) return [];

    return property.images
      .map((image) => ({
        url: getImageUrl(image),
        isPrimary:
          typeof image === "object" && Boolean(image?.isPrimary),
      }))
      .filter((image) => image.url);
  }, [property?.images]);

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
              <div className="h-64 animate-pulse rounded-[28px] bg-gray-200" />
            </div>
          </div>
        </section>
      </main>
    );
  }

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
              {error || "This property is no longer available."}
            </p>

            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="mt-7 rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
            >
              Back to Properties
            </button>
          </div>
        </section>
      </main>
    );
  }

  const primaryImage =
    images.find((image) => image.isPrimary)?.url ||
    images[0]?.url ||
    "";

  const additionalImages = images
    .filter((image) => image.url !== primaryImage)
    .slice(0, 4);

  const rentPeriod = getChargePeriodLabel(
    property.rentPeriod || "month"
  );

  const propertyType = formatLabel(property.propertyType) || "Property";

  // Support both the new fields and existing legacy records.
  const minGuests = Math.max(
    1,
    Number(property.minGuests ?? 1)
  );

  const maxGuests = Math.max(
    1,
    Number(property.maxGuests ?? property.guests ?? 1)
  );

  const extraGuestPolicy = property.extraGuestPolicy || {};
  const sleepingArrangements = Array.isArray(
    property.sleepingArrangements
  )
    ? property.sleepingArrangements
    : [];

  const petPolicy = property.petPolicy || {};
  const petTypes = Array.isArray(petPolicy.types)
    ? petPolicy.types
    : [];

  const amenities = Array.isArray(property.amenities)
    ? property.amenities
    : [];

  const rules = Array.isArray(property.rules)
    ? property.rules
    : [];

  const isAvailable =
    !property.availability ||
    property.availability === "available";

  const handleReserve = () => {
    navigate(`/booking?property=${property._id}`);
  };

  const handleEnquiry = () => {
    navigate(`/enquiry?property=${property._id}`);
  };

  return (
    <main className="min-h-screen bg-[#F8F9F7]">
      <Navbar />

      {/* IMAGE GALLERY */}
      <section className="px-4 pb-8 pt-28 sm:px-6 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-[32px] bg-white shadow-sm lg:grid-cols-[1.6fr_1fr]">
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

              {isAvailable && (
                <div className="absolute right-5 top-5 rounded-full bg-[#18C66A] px-4 py-2 text-xs font-extrabold text-[#073F32] shadow-sm">
                  Available
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#F3F7F5] p-2">
              {additionalImages.map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  className="overflow-hidden rounded-[22px] bg-[#E9F8F0]"
                >
                  <img
                    src={image.url}
                    alt={`${property.title} ${index + 2}`}
                    className="h-full min-h-[170px] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}

              {!additionalImages.length && (
                <div className="col-span-2 flex min-h-[300px] items-center justify-center text-sm font-semibold text-gray-400">
                  No additional photos
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY CONTENT */}
      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT CONTENT */}
          <div>
            {/* TITLE AND PRICE */}
            <div className="rounded-[28px] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-[#073F32] sm:text-4xl">
                    {property.title}
                  </h1>

                  <p className="mt-3 text-sm font-semibold text-gray-500">
                    📍 {property.locality}
                    {property.city ? `, ${property.city}` : ""}
                  </p>
                </div>

                <div className="shrink-0 rounded-2xl bg-[#E9F8F0] px-4 py-3">
                  <p className="text-xs font-bold text-gray-500">
                    Starting from
                  </p>
                  <p className="text-2xl font-black text-[#073F32]">
                    {formatMoney(property.rent)}
                  </p>
                  <p className="text-xs font-medium text-gray-400">
                    {rentPeriod}
                  </p>
                </div>
              </div>

              {/* QUICK DETAILS */}
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {property.bhk != null && property.bhk !== "" && (
                  <DetailBox label="BHK" value={property.bhk} />
                )}

                {property.area != null && property.area !== "" && (
                  <DetailBox
                    label="Area"
                    value={`${property.area} ${property.areaUnit || "sqft"}`}
                  />
                )}

                {Number(property.bedrooms) > 0 && (
                  <DetailBox
                    label="Bedrooms"
                    value={property.bedrooms}
                  />
                )}

                {Number(property.bathrooms) > 0 && (
                  <DetailBox
                    label="Bathrooms"
                    value={property.bathrooms}
                  />
                )}

                <DetailBox
                  label="Guest Capacity"
                  value={`${minGuests}–${maxGuests} guests`}
                />

                {property.furnishing && (
                  <DetailBox
                    label="Furnishing"
                    value={formatLabel(property.furnishing)}
                  />
                )}

                {property.floor != null && property.floor !== "" && (
                  <DetailBox label="Floor" value={property.floor} />
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            {property.description && (
              <ContentCard title="About this property">
                <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                  {property.description}
                </p>
              </ContentCard>
            )}

            {/* GUEST CAPACITY AND EXTRA GUEST POLICY */}
            <ContentCard title="Guest Capacity & Extra Guests">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoTile
                  label="Minimum guests"
                  value={`${minGuests} ${minGuests === 1 ? "guest" : "guests"}`}
                />
                <InfoTile
                  label="Included guests"
                  value={`${maxGuests} ${maxGuests === 1 ? "guest" : "guests"}`}
                />
              </div>

              <div className="mt-5 rounded-2xl bg-[#F3F7F5] p-5">
                <h3 className="font-extrabold text-[#073F32]">
                  Extra guest charges
                </h3>

                {extraGuestPolicy.enabled ? (
                  <div className="mt-3 space-y-3 text-sm text-gray-600">
                    <InfoRow
                      label="Extra guest limit"
                      value={`${Number(extraGuestPolicy.maxExtraGuests || 0)} additional guests`}
                    />
                    <InfoRow
                      label="Price per person"
                      value={formatMoney(extraGuestPolicy.pricePerPerson)}
                    />
                    <InfoRow
                      label="Charge period"
                      value={getChargePeriodLabel(
                        extraGuestPolicy.chargePeriod
                      )}
                    />

                    <p className="pt-2 text-xs leading-5 text-gray-500">
                      Extra charges depend on the number of guests and
                      the final booking calculation.
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">
                    No separate extra guest charges are configured.
                  </p>
                )}
              </div>
            </ContentCard>

            {/* SLEEPING ARRANGEMENTS */}
            <ContentCard title="Sleeping Arrangements">
              {sleepingArrangements.length > 0 ? (
                <div className="space-y-4">
                  {sleepingArrangements.map((item, index) => (
                    <div
                      key={`${item.type}-${index}`}
                      className="rounded-2xl border border-gray-100 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-extrabold text-[#073F32]">
                            {item.label || formatLabel(item.type)}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {formatLabel(item.type)}
                          </p>
                        </div>

                        <span className="rounded-full bg-[#E9F8F0] px-3 py-1 text-xs font-bold text-[#073F32]">
                          Qty: {Number(item.quantity || 1)}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                        <span className="text-sm text-gray-500">
                          {item.isPaid ? "Additional charge" : "Included"}
                        </span>

                        <span className="font-extrabold text-[#073F32]">
                          {item.isPaid
                            ? `${formatMoney(item.price)} ${getChargePeriodLabel(item.chargePeriod)}`
                            : "Free"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-6 text-gray-500">
                  No extra sleeping arrangements have been listed for
                  this property.
                </p>
              )}
            </ContentCard>

            {/* PET POLICY */}
           
<ContentCard title="Pet Policy">
  <div className="rounded-2xl border border-[#E1EBE6] bg-[#F7FAF8] p-5">
    {/* Pet Status */}
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E3F0E9] text-2xl">
        🐾
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-[#073F32]">
          Pets
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {petPolicy.allowed
            ? "Pets are welcome"
            : "Pets are not permitted"}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
          petPolicy.allowed
            ? "bg-green-100 text-green-800"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {petPolicy.allowed ? "Allowed" : "Not allowed"}
      </span>
    </div>

    {petPolicy.allowed && (
      <>
        {/* Maximum Pets */}
        <div className="mt-5 rounded-xl bg-white p-4">
          <p className="text-sm text-gray-500">
            Maximum pets allowed
          </p>

          <p className="mt-1 text-xl font-extrabold text-[#073F32]">
            {Number(petPolicy.maxPets || 0)} pets
          </p>
        </div>

        {/* Pet Charges */}
       
{petPolicy.allowed && (
  <div className="mt-4 rounded-xl bg-white p-4">
    <p className="text-sm font-medium text-gray-500">
      Pet Charges
    </p>

    <div className="mt-2 flex items-center justify-between gap-3">
      <span className="text-2xl font-extrabold text-[#073F32]">
        {formatMoney(
          Number(
            petTypes[0]?.charge ??
            petPolicy.price ??
            petPolicy.charge ??
            0
          )
        )}
      </span>

      <span className="rounded-full bg-[#E3F0E9] px-3 py-1.5 text-xs font-bold text-[#073F32]">
        {getChargePeriodLabel(
          petTypes[0]?.chargePeriod ||
          petPolicy.chargePeriod ||
          "perNight"
        )}
      </span>
    </div>

    <p className="mt-3 text-xs text-gray-500">
      Maximum {Number(petPolicy.maxPets || 0)} pets allowed
    </p>
  </div>
)}


      </>
    )}
  </div>
</ContentCard>

            {/* AMENITIES */}
            {amenities.length > 0 && (
              <ContentCard title="Amenities">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {amenities.map((amenity, index) => (
                    <div
                      key={`${amenity}-${index}`}
                      className="rounded-2xl bg-[#F3F7F5] px-4 py-3 text-sm font-semibold capitalize text-[#073F32]"
                    >
                      ✓ {typeof amenity === "string" ? amenity : amenity.name}
                    </div>
                  ))}
                </div>
              </ContentCard>
            )}

            {/* PROPERTY RULES */}
            {rules.length > 0 && (
              <ContentCard title="Property Rules">
                <div className="space-y-3">
                  {rules.map((rule, index) => (
                    <div
                      key={`${rule}-${index}`}
                      className="flex gap-3 text-sm leading-6 text-gray-600"
                    >
                      <span className="font-bold text-[#18A85B]">•</span>
                      <span>
                        {typeof rule === "string" ? rule : rule.name}
                      </span>
                    </div>
                  ))}
                </div>
              </ContentCard>
            )}

            {/* LOCATION */}
            <ContentCard title="Location">
              {property.address && (
                <p className="text-sm leading-6 text-gray-600">
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
            </ContentCard>
          </div>

          {/* RIGHT BOOKING PANEL */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-[28px] bg-[#073F32] p-6 text-white shadow-xl sm:p-7">
              <p className="text-sm font-semibold text-white/60">
                {propertyType}
              </p>

              <h2 className="mt-2 text-2xl font-black">
                {formatMoney(property.rent)}
                <span className="text-sm font-semibold text-white/60">
                  {" "}/ {rentPeriod}
                </span>
              </h2>

              {Number(property.securityDeposit) > 0 && (
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                  <span className="text-white/60">Security deposit</span>
                  <span className="font-bold">
                    {formatMoney(property.securityDeposit)}
                  </span>
                </div>
              )}

              {Number(property.maintenance) > 0 && (
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-white/60">Maintenance</span>
                  <span className="font-bold">
                    {formatMoney(property.maintenance)}
                  </span>
                </div>
              )}

              <div className="mt-5 rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-bold text-white/50">
                  GUEST CAPACITY
                </p>
                <p className="mt-1 text-sm font-extrabold">
                  {minGuests}–{maxGuests} guests included
                </p>

                {extraGuestPolicy.enabled && (
                  <p className="mt-2 text-xs leading-5 text-white/70">
                    Extra guest charge:{" "}
                    {formatMoney(extraGuestPolicy.pricePerPerson)}{" "}
                    {getChargePeriodLabel(extraGuestPolicy.chargePeriod)}
                  </p>
                )}
              </div>

              <div className="mt-5 rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-bold text-white/50">
                  CURRENT STATUS
                </p>
                <p
                  className={`mt-1 text-sm font-extrabold ${
                    isAvailable ? "text-[#18C66A]" : "text-red-300"
                  }`}
                >
                  ● {formatLabel(property.availability || "available")}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReserve}
                disabled={!isAvailable}
                className="mt-6 w-full rounded-full bg-[#18C66A] px-6 py-4 text-sm font-black text-[#073F32] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAvailable ? "Book Now" : "Currently Unavailable"}
              </button>

              <button
                type="button"
                onClick={handleEnquiry}
                className="mt-3 w-full rounded-full border border-white/20 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                Enquire Now
              </button>

              <p className="mt-5 text-center text-xs leading-5 text-white/50">
                Final booking charges are calculated by Coral using the
                property's configured policies.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function ContentCard({ title, children }) {
  return (
    <section className="mt-6 rounded-[28px] bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-black text-[#073F32]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#F3F7F5] p-4">
      <p className="text-xs font-semibold text-gray-400">{label}</p>
      <p className="mt-1 text-sm font-extrabold capitalize text-[#073F32]">
        {value}
      </p>
    </div>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#F3F7F5] p-4">
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <p className="mt-2 text-lg font-black text-[#073F32]">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="text-gray-500">{label}</span>
      <span className="font-bold text-[#073F32]">{value}</span>
    </div>
  );
}
