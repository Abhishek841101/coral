
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.jpg";

const API_URL = (import.meta.env.VITE_API_URL || "")
  .trim()
  .replace(/\/+$/, "");

const ADMIN_TOKEN_KEY = "coral_admin_token";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const pretty = (value) =>
  String(value || "Not specified")
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function AdminPropertyReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadProperty = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem(ADMIN_TOKEN_KEY);

        if (!token) {
          throw new Error("Admin session missing. Please log in again.");
        }

        // Uses the existing admin properties endpoint.
        const response = await fetch(
          `${API_URL}/admin/properties`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load property."
          );
        }

        const properties = Array.isArray(data.properties)
          ? data.properties
          : [];

        const found = properties.find(
          (item) => String(item._id) === String(id)
        );

        if (!found) {
          throw new Error(
            "Property not found in the admin properties list."
          );
        }

        if (!cancelled) {
          setProperty(found);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load property.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProperty();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7F6]">
        <p className="font-bold text-[#073F32]">
          Loading property details...
        </p>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="min-h-screen bg-[#F5F7F6] p-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-black text-[#073F32]">
            Unable to open review
          </h1>
          <p className="mt-3 text-sm text-red-600">
            {error || "Property not found."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/admin/properties")}
            className="mt-6 rounded-full bg-[#073F32] px-5 py-3 font-bold text-white"
          >
            Back to Properties
          </button>
        </div>
      </main>
    );
  }

  const owner = property.owner;
  const images = Array.isArray(property.images)
    ? property.images
    : [];

  const extra = property.extraGuestPolicy || {};
  const pets = property.petPolicy || {};
  const arrangements = Array.isArray(property.sleepingArrangements)
    ? property.sleepingArrangements
    : [];

  const statusLabel = property.approvalStatus || "pending";

  const editProperty = () => {
    navigate(`/admin/properties/${property._id}/edit`);
  };

  return (
    <main className="min-h-screen bg-[#F5F7F6] text-gray-800">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <button
            type="button"
            onClick={() => navigate("/admin/properties")}
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="Coral Logo"
              className="h-12 w-28 object-contain"
            />
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/properties")}
            className="rounded-full border border-gray-200 px-4 py-2 text-sm font-bold text-[#073F32] hover:bg-gray-50"
          >
            ← Back to Properties
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#18A85B]">
              Property Management
            </p>
            <h1 className="mt-2 text-3xl font-black text-[#073F32] sm:text-4xl">
              Review Property
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the complete listing before making changes.
            </p>
          </div>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-black capitalize text-amber-800">
            {pretty(statusLabel)}
          </span>
        </div>

        {/* PROPERTY IMAGES */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <SectionTitle>Property Images</SectionTitle>

          {images.length ? (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <div
                  key={image._id || image.publicId || image.url || index}
                  className="overflow-hidden rounded-2xl bg-gray-100"
                >
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={`${property.title} ${index + 1}`}
                      className="h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center text-gray-400">
                      Image unavailable
                    </div>
                  )}

                  {image.isPrimary && (
                    <p className="bg-[#E9F8F0] px-3 py-2 text-xs font-bold text-[#073F32]">
                      Primary Image
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              No images uploaded.
            </p>
          )}
        </section>

        {/* BASIC INFORMATION */}
        <ReviewSection title="Basic Information">
          <Detail label="Property Title" value={property.title} />
          <Detail label="Property Type" value={pretty(property.propertyType)} />
          <Detail label="BHK" value={property.bhk || "Not specified"} />
          <Detail label="Furnishing" value={pretty(property.furnishing)} />
          <Detail label="Description" value={property.description} full />
        </ReviewSection>

        {/* LOCATION */}
        <ReviewSection title="Location">
          <Detail label="City" value={property.city} />
          <Detail label="Locality" value={property.locality} />
          <Detail label="Full Address" value={property.address} full />
          <Detail label="Landmark" value={property.landmark} />
          <Detail label="Pincode" value={property.pincode} />
          <Detail label="Latitude" value={property.location?.latitude} />
          <Detail label="Longitude" value={property.location?.longitude} />
        </ReviewSection>

        {/* PRICE */}
        <ReviewSection title="Rent & Charges">
          <Detail
            label="Rent"
            value={`${money(property.rent)} / ${pretty(property.rentPeriod)}`}
          />
          <Detail
            label="Security Deposit"
            value={money(property.securityDeposit)}
          />
          <Detail
            label="Maintenance"
            value={`${money(property.maintenance)} / ${pretty(property.maintenancePeriod)}`}
          />
          <Detail
            label="Area"
            value={
              property.area
                ? `${property.area} ${property.areaUnit || "sqft"}`
                : "Not specified"
            }
          />
        </ReviewSection>

        {/* PROPERTY DETAILS */}
        <ReviewSection title="Property Details">
          <Detail label="Bedrooms" value={property.bedrooms} />
          <Detail label="Bathrooms" value={property.bathrooms} />
          <Detail label="Balconies" value={property.balconies} />
          <Detail label="Floor" value={property.floor} />
          <Detail label="Total Floors" value={property.totalFloors} />
          <Detail label="Availability" value={pretty(property.availability)} />
          <Detail
            label="Available From"
            value={
              property.availableFrom
                ? new Date(property.availableFrom).toLocaleDateString("en-IN")
                : "Not specified"
            }
          />
        </ReviewSection>

        {/* GUEST CAPACITY */}
        <ReviewSection title="Guest Capacity & Extra Guests">
          <Detail label="Minimum Guests" value={property.minGuests} />
          <Detail label="Included Guests" value={property.maxGuests ?? property.guests} />
          <Detail
            label="Extra Guests Allowed"
            value={extra.enabled ? "Yes" : "No"}
          />
          <Detail label="Maximum Extra Guests" value={extra.maxExtraGuests} />
          <Detail
            label="Extra Charge Per Person"
            value={money(extra.pricePerPerson)}
          />
          <Detail
            label="Extra Charge Period"
            value={pretty(extra.chargePeriod)}
          />
        </ReviewSection>

        {/* SLEEPING ARRANGEMENTS */}
        <ReviewSection title="Sleeping Arrangements">
          {arrangements.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {arrangements.map((item, index) => (
                <div
                  key={`${item.type}-${index}`}
                  className="rounded-2xl bg-[#F8F9F7] p-4"
                >
                  <p className="font-black text-[#073F32]">
                    {pretty(item.label || item.type)}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {item.isPaid
                      ? `${money(item.price)} · ${pretty(item.chargePeriod)}`
                      : "Free"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No extra sleeping arrangements specified.
            </p>
          )}
        </ReviewSection>

        {/* PET POLICY */}
        <ReviewSection title="Pet Policy">
          <Detail label="Pets Allowed" value={pets.allowed ? "Yes" : "No"} />
          <Detail label="Maximum Pets" value={pets.maxPets} />
          <div className="sm:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
              Pet Types & Charges
            </p>

            {pets.types?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {pets.types.map((pet, index) => (
                  <span
                    key={`${pet.type}-${index}`}
                    className="rounded-full bg-[#E9F8F0] px-3 py-2 text-sm font-bold text-[#073F32]"
                  >
                    {pretty(pet.label || pet.type)}
                    {Number(pet.charge) > 0
                      ? ` · ${money(pet.charge)} / ${pretty(pet.chargePeriod)}`
                      : " · Free"}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                No pet types specified.
              </p>
            )}
          </div>
        </ReviewSection>

        {/* AMENITIES & RULES */}
        <ReviewSection title="Amenities & Rules">
          <ListDetail label="Amenities" items={property.amenities} />
          <ListDetail label="Property Rules" items={property.rules} />
        </ReviewSection>

        {/* OWNER */}
        <ReviewSection title="Property Owner">
          <Detail label="Name" value={owner?.name} />
          <Detail label="Email" value={owner?.email} />
          <Detail label="Phone" value={owner?.phone} />
          <Detail label="Property ID" value={property._id} />
          <Detail
            label="Created On"
            value={
              property.createdAt
                ? new Date(property.createdAt).toLocaleString("en-IN")
                : "Not available"
            }
          />
        </ReviewSection>

        {/* APPROVAL DETAILS */}
        <ReviewSection title="Approval Details">
          <Detail label="Approval Status" value={pretty(property.approvalStatus)} />
          <Detail label="Listing Status" value={pretty(property.status)} />
          <Detail
            label="Approved On"
            value={
              property.approvedAt
                ? new Date(property.approvedAt).toLocaleString("en-IN")
                : "Not approved yet"
            }
          />
          <Detail label="Rejection Reason" value={property.rejectionReason} full />
        </ReviewSection>

        {/* BOTTOM EDIT BUTTON */}
        <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-black text-[#073F32]">
            Need to make changes?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Open the property editor to update its details.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/properties")}
              className="rounded-full border border-gray-200 px-6 py-3 text-sm font-black text-[#073F32] hover:bg-gray-50"
            >
              Back to Properties
            </button>

            <button
              type="button"
              onClick={editProperty}
              className="rounded-full bg-[#18C66A] px-7 py-3 text-sm font-black text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
            >
              ✎ Edit Property
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-xl font-black text-[#073F32]">
      {children}
    </h2>
  );
}

function ReviewSection({ title, children }) {
  return (
    <section className="mt-5 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

function Detail({ label, value, full = false }) {
  const displayValue =
    value === null || value === undefined || value === ""
      ? "Not specified"
      : String(value);

  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-1 whitespace-pre-wrap break-words text-sm font-semibold text-gray-800">
        {displayValue}
      </p>
    </div>
  );
}

function ListDetail({ label, items }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      {items?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-[#E9F8F0] px-3 py-2 text-sm font-bold text-[#073F32]"
            >
              {pretty(item)}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-500">None specified.</p>
      )}
    </div>
  );
}
