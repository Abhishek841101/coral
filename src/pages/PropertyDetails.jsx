import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { properties } from "../data/properties";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find(
    (item) => item.id === Number(id)
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [showVisitForm, setShowVisitForm] = useState(false);

  const [visitForm, setVisitForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
  });

  /* ================= PROPERTY NOT FOUND ================= */

  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-5">
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
            🏠
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-[#10254A]">
            Property not found
          </h1>

          <p className="mt-3 text-sm text-[#667085]">
            The property you are looking for is unavailable.
          </p>

          <Link
            to="/properties"
            className="mt-6 inline-block rounded-full bg-[#073F32] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
          >
            Explore Properties
          </Link>

        </div>
      </main>
    );
  }

  /* ================= DATA ================= */

  const galleryImages =
    property.images && property.images.length > 0
      ? property.images
      : property.image
        ? [property.image]
        : [];

  const amenities =
    property.amenities && property.amenities.length > 0
      ? property.amenities
      : [
          "24/7 Security",
          "Parking",
          "Power Backup",
          "Water Supply",
        ];

  const highlights =
    property.highlights && property.highlights.length > 0
      ? property.highlights
      : [
          "Prime Location",
          "Modern Design",
          "Premium Amenities",
          "Excellent Connectivity",
        ];

  const floorPlans =
    property.floorPlans && property.floorPlans.length > 0
      ? property.floorPlans
      : [];

  const nearby =
    property.nearby && property.nearby.length > 0
      ? property.nearby
      : [];

  /* ================= RESERVE ================= */

  const handleReserve = () => {
    navigate("/booking", {
      state: {
        propertyId: property.id,
        propertyName: property.name,
        location: property.location,
        price: property.price,
        priceLabel: property.priceLabel,
        image: property.image,
      },
    });
  };

  /* ================= ENQUIRY ================= */

  const handleEnquiry = () => {
    navigate("/property-enquiry", {
      state: {
        propertyId: property.id,
        propertyName: property.name,
        location: property.location,
        price: property.price,
        priceLabel: property.priceLabel,
        image: property.image,
      },
    });
  };

  /* ================= VISIT FORM ================= */

  const handleVisitChange = (e) => {
    const { name, value } = e.target;

    setVisitForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleVisitSubmit = (e) => {
    e.preventDefault();

    if (
      !visitForm.name ||
      !visitForm.phone ||
      !visitForm.date
    ) {
      alert("Please fill all required details.");
      return;
    }

    alert(
      `Site visit request received for ${property.name}.`
    );

    setVisitForm({
      name: "",
      phone: "",
      email: "",
      date: "",
    });

    setShowVisitForm(false);
  };

  /* ================= UI ================= */

  return (
    <main className="min-h-screen bg-[#F8F9F7]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

          <Link
            to="/"
            className="flex items-center gap-2.5"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18C66A] text-base font-extrabold text-[#073F32]">
              C
            </div>

            <span className="text-xl font-extrabold tracking-tight text-[#073F32]">
              Coral
            </span>

          </Link>

          <Link
            to="/properties"
            className="rounded-full bg-[#E9F8F0] px-5 py-2.5 text-sm font-bold text-[#073F32] transition hover:bg-[#18C66A]"
          >
            ← Properties
          </Link>

        </div>

      </header>

      {/* =====================================================
          PAGE
      ===================================================== */}

      <section className="px-5 py-7 sm:px-8 lg:px-10 lg:py-10">

        <div className="mx-auto max-w-7xl">

          {/* Breadcrumb */}

          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#667085]">

            <Link
              to="/"
              className="hover:text-[#18A85B]"
            >
              Coral
            </Link>

            <span>/</span>

            <Link
              to="/properties"
              className="hover:text-[#18A85B]"
            >
              Properties
            </Link>

            <span>/</span>

            <span>
              {property.name}
            </span>

          </div>

          {/* =====================================================
              GALLERY
          ===================================================== */}

          {galleryImages.length > 0 && (

            <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">

              {/* Main Image */}

              <div className="relative h-[360px] overflow-hidden rounded-[30px] sm:h-[520px]">

                <img
                  src={galleryImages[selectedImage]}
                  alt={property.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Badge */}

                <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#073F32] shadow-lg">
                  {property.badge || property.status || "Featured Property"}
                </div>

                {/* Image Info */}

                <div className="absolute bottom-5 left-5 right-5 text-white">

                  <p className="text-xs font-semibold text-white/80">
                    📍 {property.location}
                  </p>

                  <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                    {property.name}
                  </h1>

                </div>

              </div>

              {/* Thumbnails */}

              <div className="grid grid-cols-2 gap-3">

                {galleryImages.slice(0, 4).map(
                  (image, index) => (

                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() =>
                        setSelectedImage(index)
                      }
                      className={`relative min-h-[170px] overflow-hidden rounded-[22px] transition sm:min-h-[250px] ${
                        selectedImage === index
                          ? "ring-4 ring-[#18C66A]"
                          : ""
                      }`}
                    >

                      <img
                        src={image}
                        alt={`${property.name} ${index + 1}`}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />

                      {index === 3 &&
                        galleryImages.length > 4 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/45">

                            <span className="rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#073F32]">
                              +{galleryImages.length - 4} photos
                            </span>

                          </div>
                        )}

                    </button>

                  )
                )}

              </div>

            </div>

          )}

          {/* =====================================================
              MAIN GRID
          ===================================================== */}

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div>

              {/* PROPERTY HEADING */}

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <span className="rounded-full bg-[#E9F8F0] px-4 py-2 text-xs font-extrabold text-[#073F32]">
                    {property.type || "Premium Property"}
                  </span>

                  {property.rating && (
                    <span className="text-sm font-extrabold text-[#18A85B]">
                      ★ {property.rating}
                    </span>
                  )}

                  {property.reviews && (
                    <span className="text-sm text-[#667085]">
                      {property.reviews} reviews
                    </span>
                  )}

                </div>

                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
                  {property.name}
                </h2>

                <p className="mt-3 text-sm text-[#667085] sm:text-base">
                  📍 {property.location}
                </p>

              </div>

              {/* =================================================
                  QUICK DETAILS
              ================================================= */}

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5">

                  <p className="text-[11px] font-extrabold tracking-wider text-[#667085]">
                    CONFIGURATION
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                    {property.configuration || "2 & 3 BHK"}
                  </p>

                </div>

                <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5">

                  <p className="text-[11px] font-extrabold tracking-wider text-[#667085]">
                    AREA
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                    {property.area || "Available on enquiry"}
                  </p>

                </div>

                <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5">

                  <p className="text-[11px] font-extrabold tracking-wider text-[#667085]">
                    POSSESSION
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#18A85B]">
                    {property.possession || property.status || "Available"}
                  </p>

                </div>

                <div className="rounded-[22px] border border-[#E5E7EB] bg-white p-5">

                  <p className="text-[11px] font-extrabold tracking-wider text-[#667085]">
                    PARKING
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#10254A]">
                    {property.parking || "Available"}
                  </p>

                </div>

              </div>

              {/* =================================================
                  ABOUT
              ================================================= */}

              <section className="mt-12">

                <p className="text-sm font-extrabold tracking-[0.15em] text-[#18C66A]">
                  ABOUT THE PROJECT
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#10254A]">
                  A place designed around you.
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#667085]">
                  {property.description ||
                    `${property.name} offers thoughtfully designed spaces, modern amenities and a convenient location for comfortable living.`}
                </p>

              </section>

              {/* =================================================
                  HIGHLIGHTS
              ================================================= */}

              <section className="mt-10">

                <h2 className="text-2xl font-extrabold text-[#10254A]">
                  Project highlights
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">

                  {highlights.map(
                    (highlight, index) => (

                      <div
                        key={`${highlight}-${index}`}
                        className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4"
                      >

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9F8F0] text-sm font-extrabold text-[#18A85B]">
                          ✓
                        </span>

                        <span className="text-sm font-semibold text-[#344054]">
                          {highlight}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </section>

              {/* =================================================
                  AMENITIES
              ================================================= */}

              <section className="mt-12">

                <p className="text-sm font-extrabold tracking-[0.15em] text-[#18C66A]">
                  AMENITIES
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#10254A]">
                  Everything you need
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                  {amenities.map(
                    (amenity, index) => (

                      <div
                        key={`${amenity}-${index}`}
                        className="rounded-2xl border border-[#E5E7EB] bg-white p-4"
                      >

                        <span className="text-[#18A85B]">
                          ✓
                        </span>

                        <span className="ml-2 text-sm font-semibold text-[#344054]">
                          {amenity}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </section>

              {/* =================================================
                  FLOOR PLANS
              ================================================= */}

              {floorPlans.length > 0 && (

                <section className="mt-12">

                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                    <div>

                      <p className="text-sm font-extrabold tracking-[0.15em] text-[#18C66A]">
                        FLOOR PLANS
                      </p>

                      <h2 className="mt-2 text-3xl font-extrabold text-[#10254A]">
                        Choose your layout
                      </h2>

                    </div>

                    <button
                      type="button"
                      className="w-fit rounded-full bg-[#073F32] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#18C66A] hover:text-[#073F32]"
                    >
                      Download brochure
                    </button>

                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">

                    {floorPlans.map(
                      (plan, index) => (

                        <div
                          key={`${plan.type}-${index}`}
                          className="rounded-[26px] border border-[#E5E7EB] bg-white p-6"
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div>

                              <h3 className="text-xl font-extrabold text-[#10254A]">
                                {plan.type}
                              </h3>

                              <p className="mt-1 text-sm text-[#667085]">
                                {plan.area}
                              </p>

                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9F8F0]">
                              🏠
                            </div>

                          </div>

                          <div className="mt-6 border-t border-[#E5E7EB] pt-5">

                            <p className="text-xs text-[#667085]">
                              Starting from
                            </p>

                            <p className="mt-1 text-lg font-extrabold text-[#073F32]">
                              {plan.price}
                            </p>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                </section>

              )}

              {/* =================================================
                  LOCATION
              ================================================= */}

              <section className="mt-12">

                <p className="text-sm font-extrabold tracking-[0.15em] text-[#18C66A]">
                  LOCATION
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#10254A]">
                  Everything is within reach.
                </h2>

                <div className="mt-6 flex min-h-[260px] items-center justify-center rounded-[30px] bg-[#E9F8F0]">

                  <div className="text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow">
                      📍
                    </div>

                    <p className="mt-4 text-base font-extrabold text-[#073F32]">
                      {property.location}
                    </p>

                    <p className="mt-1 text-xs text-[#667085]">
                      Map integration can be connected here.
                    </p>

                  </div>

                </div>

              </section>

              {/* =================================================
                  NEARBY
              ================================================= */}

              {nearby.length > 0 && (

                <section className="mt-10">

                  <h2 className="text-2xl font-extrabold text-[#10254A]">
                    What's nearby
                  </h2>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">

                    {nearby.map(
                      (place, index) => (

                        <div
                          key={`${place}-${index}`}
                          className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 text-sm font-semibold text-[#344054]"
                        >
                          📍 {place}
                        </div>

                      )
                    )}

                  </div>

                </section>

              )}

            </div>

            {/* =================================================
                RIGHT BOOKING CARD
            ================================================= */}

            <aside className="h-fit lg:sticky lg:top-24">

              <div className="rounded-[30px] border border-[#E5E7EB] bg-white p-6 shadow-xl">

                <p className="text-xs font-extrabold tracking-[0.14em] text-[#18C66A]">
                  PROPERTY PRICE
                </p>

                <div className="mt-2">

                  <span className="text-3xl font-extrabold text-[#073F32]">
                    {property.priceLabel ||
                      (property.price
                        ? `₹${Number(property.price).toLocaleString("en-IN")}`
                        : "Price on request")}
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-[#667085]">
                  Starting price. Final pricing may vary according
                  to configuration and availability.
                </p>

                {/* Status */}

                <div className="mt-6 rounded-2xl bg-[#E9F8F0] p-4">

                  <p className="text-xs font-bold text-[#667085]">
                    CURRENT STATUS
                  </p>

                  <p className="mt-1 text-sm font-extrabold text-[#18A85B]">
                    ● {property.status || "Available"}
                  </p>

                </div>

                {/* Buttons */}

                <div className="mt-5 space-y-3">

                  <button
                    type="button"
                    onClick={handleReserve}
                    className="w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                  >
                    Reserve / Book Now →
                  </button>

                  <button
                    type="button"
                    onClick={handleEnquiry}
                    className="w-full rounded-full border border-[#073F32] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#E9F8F0]"
                  >
                    Send Enquiry
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowVisitForm(true)}
                    className="w-full rounded-full border border-[#E5E7EB] py-4 text-sm font-extrabold text-[#10254A] transition hover:border-[#18C66A] hover:bg-[#E9F8F0]"
                  >
                    Schedule a Site Visit
                  </button>

                </div>

                {/* Benefits */}

                <div className="mt-7 border-t border-[#E5E7EB] pt-6">

                  <p className="text-sm font-extrabold text-[#10254A]">
                    With Coral
                  </p>

                  <div className="mt-4 space-y-3">

                    <p className="text-xs text-[#667085]">
                      ✓ Verified property information
                    </p>

                    <p className="text-xs text-[#667085]">
                      ✓ Latest pricing & availability
                    </p>

                    <p className="text-xs text-[#667085]">
                      ✓ Site visit assistance
                    </p>

                    <p className="text-xs text-[#667085]">
                      ✓ Property expert support
                    </p>

                  </div>

                </div>

              </div>

              {/* Expert Card */}

              <div className="mt-4 rounded-[26px] bg-[#073F32] p-6">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#18C66A]">
                  👋
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-white">
                  Need help choosing?
                </h3>

                <p className="mt-2 text-xs leading-5 text-white/65">
                  Talk to a Coral property expert and get help
                  comparing available options.
                </p>

                <button
                  type="button"
                  onClick={handleEnquiry}
                  className="mt-5 rounded-full bg-[#18C66A] px-5 py-3 text-xs font-extrabold text-[#073F32] transition hover:bg-white"
                >
                  Talk to an expert →
                </button>

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* =====================================================
          SITE VISIT MODAL
      ===================================================== */}

      {showVisitForm && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 py-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowVisitForm(false);
            }
          }}
        >

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[30px] bg-white p-6 shadow-2xl sm:p-8">

            {/* Modal Header */}

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-xs font-extrabold tracking-wider text-[#18C66A]">
                  SITE VISIT
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#10254A]">
                  Schedule a visit
                </h2>

                <p className="mt-2 text-sm text-[#667085]">
                  Tell us your preferred date and our team
                  will contact you.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setShowVisitForm(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F8F9F7] text-lg font-bold text-[#667085] transition hover:bg-[#E9F8F0]"
              >
                ×
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleVisitSubmit}
              className="mt-7"
            >

              {/* Name */}

              <div>

                <label className="text-xs font-extrabold text-[#667085]">
                  FULL NAME *
                </label>

                <input
                  name="name"
                  value={visitForm.name}
                  onChange={handleVisitChange}
                  placeholder="Enter your full name"
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                />

              </div>

              {/* Phone */}

              <div className="mt-4">

                <label className="text-xs font-extrabold text-[#667085]">
                  MOBILE NUMBER *
                </label>

                <input
                  name="phone"
                  value={visitForm.phone}
                  onChange={handleVisitChange}
                  placeholder="+91 XXXXX XXXXX"
                  inputMode="tel"
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                />

              </div>

              {/* Email */}

              <div className="mt-4">

                <label className="text-xs font-extrabold text-[#667085]">
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  name="email"
                  value={visitForm.email}
                  onChange={handleVisitChange}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                />

              </div>

              {/* Date */}

              <div className="mt-4">

                <label className="text-xs font-extrabold text-[#667085]">
                  PREFERRED DATE *
                </label>

                <input
                  type="date"
                  name="date"
                  value={visitForm.date}
                  min={new Date()
                    .toISOString()
                    .split("T")[0]}
                  onChange={handleVisitChange}
                  className="mt-2 w-full rounded-2xl border border-[#E5E7EB] px-4 py-3.5 text-sm font-semibold text-[#10254A] outline-none transition focus:border-[#18C66A]"
                />

              </div>

              {/* Selected Property */}

              <div className="mt-5 rounded-2xl bg-[#E9F8F0] p-4">

                <p className="text-xs font-extrabold tracking-wider text-[#667085]">
                  PROPERTY
                </p>

                <p className="mt-2 text-sm font-extrabold text-[#073F32]">
                  {property.name}
                </p>

                <p className="mt-1 text-xs text-[#667085]">
                  📍 {property.location}
                </p>

              </div>

              {/* Submit */}

              <button
                type="submit"
                className="mt-5 w-full rounded-full bg-[#18C66A] py-4 text-sm font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
              >
                Request Site Visit →
              </button>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}