
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const initialForm = {
  title: "",
  description: "",
  propertyType: "flat",
  bhk: "",
  city: "Nagpur",
  locality: "",
  address: "",
  landmark: "",
  pincode: "",
  rent: "",
  rentPeriod: "month",
  securityDeposit: "",
  maintenance: "",
  maintenancePeriod: "included",
  area: "",
  areaUnit: "sqft",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  floor: "",
  totalFloors: "",
  furnishing: "unfurnished",
  guests: "1",
  availability: "available",
  availableFrom: "",
  amenities: "",
  rules: "",
};

export default function AdminAddProperty() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =====================================================
     CLEAN IMAGE PREVIEWS
  ===================================================== */

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =====================================================
     IMAGE CHANGE
  ===================================================== */

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) {
      return;
    }

    const validFiles = selectedFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        return false;
      }

      if (file.size > 10 * 1024 * 1024) {
        return false;
      }

      return true;
    });

    if (!validFiles.length) {
      setError(
        "Please select valid image files under 10MB each."
      );
      return;
    }

    const totalFiles = [...images, ...validFiles];

    if (totalFiles.length > 10) {
      setError("You can upload maximum 10 images.");
      return;
    }

    const newPreviews = validFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setImages(totalFiles);
    setPreviews((prev) => [...prev, ...newPreviews]);

    setError("");
    setSuccess("");
  };

  /* =====================================================
     REMOVE IMAGE
  ===================================================== */

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setPreviews((prev) => {
      const removedUrl = prev[index];

      if (removedUrl) {
        URL.revokeObjectURL(removedUrl);
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Property title is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Property description is required.");
      return;
    }

    if (!form.locality.trim()) {
      setError("Locality is required.");
      return;
    }

    if (!form.address.trim()) {
      setError("Address is required.");
      return;
    }

    if (!form.rent) {
      setError("Rent is required.");
      return;
    }

    if (!images.length) {
      setError("Please upload at least one property image.");
      return;
    }

    try {
      setLoading(true);

      /* =================================================
         FORMDATA
      ================================================= */

      const formData = new FormData();

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "description",
        form.description.trim()
      );

      formData.append(
        "propertyType",
        form.propertyType
      );

      formData.append(
        "bhk",
        form.bhk
          ? Number(form.bhk)
          : ""
      );

      formData.append(
        "city",
        form.city.trim()
      );

      formData.append(
        "locality",
        form.locality.trim()
      );

      formData.append(
        "address",
        form.address.trim()
      );

      formData.append(
        "landmark",
        form.landmark.trim()
      );

      formData.append(
        "pincode",
        form.pincode.trim()
      );

      formData.append(
        "rent",
        Number(form.rent)
      );

      formData.append(
        "rentPeriod",
        form.rentPeriod
      );

      formData.append(
        "securityDeposit",
        form.securityDeposit
          ? Number(form.securityDeposit)
          : 0
      );

      formData.append(
        "maintenance",
        form.maintenance
          ? Number(form.maintenance)
          : 0
      );

      formData.append(
        "maintenancePeriod",
        form.maintenancePeriod
      );

      formData.append(
        "area",
        form.area
          ? Number(form.area)
          : ""
      );

      formData.append(
        "areaUnit",
        form.areaUnit
      );

      formData.append(
        "bedrooms",
        form.bedrooms
          ? Number(form.bedrooms)
          : 0
      );

      formData.append(
        "bathrooms",
        form.bathrooms
          ? Number(form.bathrooms)
          : 0
      );

      formData.append(
        "balconies",
        form.balconies
          ? Number(form.balconies)
          : 0
      );

      formData.append(
        "floor",
        form.floor
          ? Number(form.floor)
          : ""
      );

      formData.append(
        "totalFloors",
        form.totalFloors
          ? Number(form.totalFloors)
          : ""
      );

      formData.append(
        "furnishing",
        form.furnishing
      );

      formData.append(
        "guests",
        form.guests
          ? Number(form.guests)
          : 1
      );

      formData.append(
        "availability",
        form.availability
      );

      formData.append(
        "availableFrom",
        form.availableFrom || ""
      );

      formData.append(
        "amenities",
        JSON.stringify(
          form.amenities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );

      formData.append(
        "rules",
        JSON.stringify(
          form.rules
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );

      /* =================================================
         IMAGES

         IMPORTANT:
         Backend multer field name must be "images".
      ================================================= */

      images.forEach((file) => {
        formData.append("images", file);
      });

      /* =================================================
         REQUEST
      ================================================= */

      const response = await fetch(
        `${API_URL}/properties`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to create property."
        );
      }

      setSuccess(
        "Property created successfully. It is now waiting for admin review."
      );

      setForm(initialForm);

      previews.forEach((url) =>
        URL.revokeObjectURL(url)
      );

      setImages([]);
      setPreviews([]);

      setTimeout(() => {
        navigate("/admin/properties");
      }, 1200);
    } catch (err) {
      console.error(
        "Create property error:",
        err
      );

      setError(
        err.message ||
          "Unable to create property."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7F6]">

      {/* HEADER */}

      <header className="border-b border-[#E5E7EB] bg-white">

        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
              C
            </div>

            <div className="text-left">

              <p className="text-lg font-black leading-none text-[#073F32]">
                Coral
              </p>

              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-gray-400">
                Admin Panel
              </p>

            </div>

          </button>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-[#073F32] hover:bg-[#F5F7F6]"
          >
            ← Dashboard
          </button>

        </div>

      </header>


      {/* CONTENT */}

      <section className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8">

        <div className="mb-8">

          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#18A85B]">
            Property Management
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#073F32] sm:text-4xl">
            Add Property
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create a new property listing from the admin panel.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
            <p className="text-sm font-semibold text-red-600">
              {error}
            </p>
          </div>
        )}


        {/* SUCCESS */}

        {success && (
          <div className="mb-6 rounded-2xl border border-green-100 bg-green-50 px-5 py-4">
            <p className="text-sm font-semibold text-green-700">
              {success}
            </p>
          </div>
        )}


        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* BASIC INFORMATION */}

          <FormSection
            title="Basic Information"
            description="Enter the main details of the property."
          >

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Property Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="2 BHK Premium Flat"
                required
              />

              <Select
                label="Property Type"
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                options={[
                  ["room", "Room"],
                  ["pg", "PG"],
                  ["flat", "Flat"],
                  ["apartment", "Apartment"],
                  ["house", "House"],
                  ["villa", "Villa"],
                  ["studio", "Studio"],
                ]}
              />

            </div>


            <div className="mt-5">

              <label className="text-xs font-extrabold text-gray-500">
                DESCRIPTION
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the property..."
                rows={5}
                required
                className="mt-2 w-full resize-none rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-[#073F32] outline-none focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10"
              />

            </div>


            <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-4">

              <Input
                label="BHK"
                name="bhk"
                type="number"
                min="1"
                max="5"
                value={form.bhk}
                onChange={handleChange}
                placeholder="2"
              />

              <Input
                label="Bedrooms"
                name="bedrooms"
                type="number"
                min="0"
                value={form.bedrooms}
                onChange={handleChange}
                placeholder="2"
              />

              <Input
                label="Bathrooms"
                name="bathrooms"
                type="number"
                min="0"
                value={form.bathrooms}
                onChange={handleChange}
                placeholder="2"
              />

              <Input
                label="Balconies"
                name="balconies"
                type="number"
                min="0"
                value={form.balconies}
                onChange={handleChange}
                placeholder="1"
              />

            </div>

          </FormSection>


          {/* =================================================
              IMAGES
          ================================================= */}

          <FormSection
            title="Property Images"
            description="Upload up to 10 property images. The first image will be used as the primary image."
          >

            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-[#FAFBFA] p-6">

              <label
                htmlFor="property-images"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl px-5 py-10 text-center transition hover:bg-white"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#18C66A]/15 text-2xl">
                  📷
                </div>

                <p className="mt-4 text-sm font-black text-[#073F32]">
                  Upload Property Images
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  JPG, JPEG, PNG or WEBP • Maximum 10MB each
                </p>

                <span className="mt-4 rounded-full bg-[#073F32] px-5 py-2.5 text-xs font-black text-white">
                  Choose Images
                </span>

                <input
                  id="property-images"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  multiple
                  onChange={handleImageChange}
                  disabled={loading}
                  className="hidden"
                />

              </label>


              {/* PREVIEWS */}

              {previews.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

                  {previews.map((src, index) => (
                    <div
                      key={`${src}-${index}`}
                      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white"
                    >

                      <img
                        src={src}
                        alt={`Property ${index + 1}`}
                        className="h-40 w-full object-cover"
                      />

                      {index === 0 && (
                        <span className="absolute left-2 top-2 rounded-full bg-[#18C66A] px-3 py-1 text-[10px] font-black text-[#073F32]">
                          PRIMARY
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
                        disabled={loading}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-black text-white shadow-lg hover:bg-red-600 disabled:opacity-50"
                      >
                        ×
                      </button>

                    </div>
                  ))}

                </div>
              )}

            </div>

          </FormSection>


          {/* LOCATION */}

          <FormSection
            title="Location"
            description="Add the property's complete location."
          >

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />

              <Input
                label="Locality"
                name="locality"
                value={form.locality}
                onChange={handleChange}
                placeholder="Dharampeth"
                required
              />

            </div>

            <div className="mt-5">

              <Input
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Complete property address"
                required
              />

            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <Input
                label="Landmark"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                placeholder="Near Metro Station"
              />

              <Input
                label="Pincode"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="440010"
              />

            </div>

          </FormSection>


          {/* RENT */}

          <FormSection
            title="Rent & Money"
            description="Set the property's pricing details."
          >

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">

              <Input
                label="Rent"
                name="rent"
                type="number"
                min="0"
                value={form.rent}
                onChange={handleChange}
                placeholder="15000"
                required
              />

              <Select
                label="Rent Period"
                name="rentPeriod"
                value={form.rentPeriod}
                onChange={handleChange}
                options={[
                  ["day", "Per Day"],
                  ["month", "Per Month"],
                  ["year", "Per Year"],
                ]}
              />

              <Input
                label="Security Deposit"
                name="securityDeposit"
                type="number"
                min="0"
                value={form.securityDeposit}
                onChange={handleChange}
                placeholder="30000"
              />

              <Input
                label="Maintenance"
                name="maintenance"
                type="number"
                min="0"
                value={form.maintenance}
                onChange={handleChange}
                placeholder="0"
              />

            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">

              <Select
                label="Maintenance Period"
                name="maintenancePeriod"
                value={form.maintenancePeriod}
                onChange={handleChange}
                options={[
                  ["included", "Included"],
                  ["monthly", "Monthly"],
                  ["yearly", "Yearly"],
                ]}
              />

              <Select
                label="Furnishing"
                name="furnishing"
                value={form.furnishing}
                onChange={handleChange}
                options={[
                  [
                    "fully-furnished",
                    "Fully Furnished",
                  ],
                  [
                    "semi-furnished",
                    "Semi Furnished",
                  ],
                  [
                    "unfurnished",
                    "Unfurnished",
                  ],
                ]}
              />

            </div>

          </FormSection>


          {/* PROPERTY DETAILS */}

          <FormSection
            title="Property Details"
            description="Add size, floor and capacity information."
          >

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">

              <Input
                label="Area"
                name="area"
                type="number"
                min="0"
                value={form.area}
                onChange={handleChange}
                placeholder="1200"
              />

              <Select
                label="Area Unit"
                name="areaUnit"
                value={form.areaUnit}
                onChange={handleChange}
                options={[
                  ["sqft", "Square Feet"],
                  ["sqm", "Square Meter"],
                ]}
              />

              <Input
                label="Floor"
                name="floor"
                type="number"
                value={form.floor}
                onChange={handleChange}
                placeholder="3"
              />

              <Input
                label="Total Floors"
                name="totalFloors"
                type="number"
                value={form.totalFloors}
                onChange={handleChange}
                placeholder="8"
              />

            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">

              <Input
                label="Maximum Guests"
                name="guests"
                type="number"
                min="1"
                value={form.guests}
                onChange={handleChange}
                placeholder="2"
              />

              <Select
                label="Availability"
                name="availability"
                value={form.availability}
                onChange={handleChange}
                options={[
                  ["available", "Available"],
                  ["occupied", "Occupied"],
                  ["unavailable", "Unavailable"],
                ]}
              />

            </div>

            <div className="mt-5">

              <Input
                label="Available From"
                name="availableFrom"
                type="date"
                value={form.availableFrom}
                onChange={handleChange}
              />

            </div>

          </FormSection>


          {/* AMENITIES */}

          <FormSection
            title="Amenities & Rules"
            description="Separate multiple items with commas."
          >

            <div>

              <label className="text-xs font-extrabold text-gray-500">
                AMENITIES
              </label>

              <input
                name="amenities"
                value={form.amenities}
                onChange={handleChange}
                placeholder="WiFi, Parking, Lift, Security, AC"
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-[#073F32] outline-none focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10"
              />

            </div>

            <div className="mt-5">

              <label className="text-xs font-extrabold text-gray-500">
                PROPERTY RULES
              </label>

              <input
                name="rules"
                value={form.rules}
                onChange={handleChange}
                placeholder="No smoking, No pets, ID required"
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-[#073F32] outline-none focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10"
              />

            </div>

          </FormSection>


          {/* ACTIONS */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate("/admin")}
              disabled={loading}
              className="rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-black text-[#073F32] hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#18C66A] px-8 py-3.5 text-sm font-black text-[#073F32] hover:bg-[#073F32] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Uploading & Creating..."
                : "Create Property"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}


/* =====================================================
   FORM SECTION
===================================================== */

function FormSection({
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">

      <h2 className="text-lg font-black text-[#073F32]">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

      <div className="mt-6">
        {children}
      </div>

    </section>
  );
}


/* =====================================================
   INPUT
===================================================== */

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="text-xs font-extrabold text-gray-500"
      >
        {label.toUpperCase()}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10"
      />

    </div>
  );
}


/* =====================================================
   SELECT
===================================================== */

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="text-xs font-extrabold text-gray-500"
      >
        {label.toUpperCase()}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10"
      >

        {options.map(
          ([optionValue, optionLabel]) => (
            <option
              key={optionValue}
              value={optionValue}
            >
              {optionLabel}
            </option>
          )
        )}

      </select>

    </div>
  );
}