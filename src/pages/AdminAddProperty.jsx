

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProperty } from "../features/properties/propertySlice";
import logo from "../assets/logo.jpg";
const CHARGE_PERIODS = [
  ["perNight", "Per Night"],
  ["perStay", "Per Stay"],
  ["perMonth", "Per Month"],
];

const SLEEPING_TYPES = [
  ["extra-bed", "Extra Bed"],
  ["mattress", "Mattress"],
  ["folding-bed", "Folding Bed"],
  ["floor-bedding", "Floor Bedding"],
  ["sofa-bed", "Sofa Bed"],
  ["other", "Other"],
];

const PET_TYPES = [
  ["dog", "Dog"],
  ["cat", "Cat"],
  ["bird", "Bird"],
  ["rabbit", "Rabbit"],
  ["other", "Other"],
];

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
  securityDeposit: "0",
  maintenance: "0",
  maintenancePeriod: "included",
  area: "",
  areaUnit: "sqft",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  floor: "",
  totalFloors: "",
  furnishing: "unfurnished",
  minGuests: "1",
  maxGuests: "2",
  extraGuestEnabled: false,
  maxExtraGuests: "1",
  pricePerPerson: "0",
  extraGuestChargePeriod: "perNight",
  sleepingArrangements: [],
  petsAllowed: false,
maxPets: "", // Owner khud quantity enter karega
petTypes: [],
petPrice: "0",
petChargePeriod: "perStay",
  availability: "available",
  availableFrom: "",
  amenities: "",
  rules: "",
};

const newSleepingArrangement = () => ({
  type: "mattress",
  label: "",
  quantity: "1",
  isPaid: false,
  price: "0",
  chargePeriod: "perNight",
});

const newPetType = () => ({
  type: "dog",
  label: "",
});

function parseMoney(value) {
  if (value === "" || value === null || value === undefined) {
    return 0;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : NaN;
}

function parseInteger(value, fallback = 0) {
  if (value === "" || value === null || value === undefined) {
    return fallback;
  }

  const number = Number(value);

  return Number.isInteger(number) && number >= 0
    ? number
    : NaN;
}

function splitCommaSeparated(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeDate(value) {
  return value || "";
}

function Label({ children }) {
  return (
    <label className="text-xs font-extrabold uppercase tracking-wide text-gray-500">
      {children}
    </label>
  );
}

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
  step,
  disabled = false,
}) {
  return (
    <div className="min-w-0">
      <Label>{label}</Label>
      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="field-input disabled:cursor-not-allowed disabled:bg-gray-100"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
}) {
  return (
    <div className="min-w-0">
      <Label>{label}</Label>
      <select
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        disabled={disabled}
        className="field-input disabled:cursor-not-allowed disabled:bg-gray-100"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ checked, onChange, label, disabled = false }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm font-semibold text-[#073F32]">
      <input
        type="checkbox"
        checked={Boolean(checked)}
        onChange={(event) => onChange(event.target.checked)}
        disabled={disabled}
        className="mt-1 h-4 w-4 accent-green-600"
      />
      <span>{label}</span>
    </label>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-black text-[#073F32]">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function AdminAddProperty() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const previewUrlsRef = useRef([]);

  const [form, setForm] = useState(() => ({
    ...initialForm,
    sleepingArrangements: [],
    petTypes: [],
  }));

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      previewUrlsRef.current = [];
    };
  }, []);

  const updateField = (name, value) => {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateField(name, value);
  };

  const handleImageChange = (event) => {
    const selected = Array.from(event.target.files || []);
    event.target.value = "";

    if (!selected.length) return;

    const invalid = selected.find((file) => {
      const validType = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(file.type);

      return !validType || file.size > 10 * 1024 * 1024;
    });

    if (invalid) {
      setError(
        "Har image JPG, PNG ya WEBP format mein aur 10MB se chhoti honi chahiye."
      );
      return;
    }

    if (images.length + selected.length > 10) {
      setError("Maximum 10 property images upload kar sakte ho.");
      return;
    }

    const newUrls = selected.map((file) => URL.createObjectURL(file));

    previewUrlsRef.current.push(...newUrls);
    setImages((previous) => [...previous, ...selected]);
    setPreviews((previous) => [...previous, ...newUrls]);

    setError("");
    setSuccess("");
  };

  const removeImage = (index) => {
    const removedUrl = previews[index];

    if (removedUrl) {
      URL.revokeObjectURL(removedUrl);

      previewUrlsRef.current = previewUrlsRef.current.filter(
        (url) => url !== removedUrl
      );
    }

    setImages((previous) =>
      previous.filter((_, i) => i !== index)
    );

    setPreviews((previous) =>
      previous.filter((_, i) => i !== index)
    );
  };

  const updateSleepingArrangement = (index, field, value) => {
    setForm((previous) => ({
      ...previous,
      sleepingArrangements: previous.sleepingArrangements.map(
        (item, i) =>
          i === index ? { ...item, [field]: value } : item
      ),
    }));

    setError("");
  };

  const addSleepingArrangement = () => {
    setForm((previous) => ({
      ...previous,
      sleepingArrangements: [
        ...previous.sleepingArrangements,
        newSleepingArrangement(),
      ],
    }));
  };

  const removeSleepingArrangement = (index) => {
    setForm((previous) => ({
      ...previous,
      sleepingArrangements: previous.sleepingArrangements.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const updatePetType = (index, field, value) => {
    setForm((previous) => ({
      ...previous,
      petTypes: previous.petTypes.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));

    setError("");
  };

  const addPetType = () => {
    setForm((previous) => ({
      ...previous,
      petTypes: [...previous.petTypes, newPetType()],
    }));
  };

  const removePetType = (index) => {
    setForm((previous) => ({
      ...previous,
      petTypes: previous.petTypes.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Property title required hai.";
    if (!form.description.trim()) return "Description required hai.";
    if (!form.city.trim()) return "City required hai.";
    if (!form.locality.trim()) return "Locality required hai.";
    if (!form.address.trim()) return "Address required hai.";

    const rent = parseMoney(form.rent);

    if (!Number.isFinite(rent) || rent <= 0) {
      return "Rent zero se zyada hona chahiye.";
    }

    if (images.length === 0) {
      return "Kam se kam ek property image upload karo.";
    }

    const minGuests = parseInteger(form.minGuests);
    const maxGuests = parseInteger(form.maxGuests);

    if (
      !Number.isInteger(minGuests) ||
      !Number.isInteger(maxGuests) ||
      minGuests < 1 ||
      maxGuests < 1
    ) {
      return "Minimum aur maximum guests kam se kam 1 hone chahiye.";
    }

    if (minGuests > maxGuests) {
      return "Minimum guests, maximum guests se zyada nahi ho sakte.";
    }

    if (form.extraGuestEnabled) {
      const maxExtraGuests = parseInteger(form.maxExtraGuests);
      const pricePerPerson = parseMoney(form.pricePerPerson);

      if (
        !Number.isInteger(maxExtraGuests) ||
        maxExtraGuests < 1
      ) {
        return "Maximum extra guests kam se kam 1 hone chahiye.";
      }

      if (
        !Number.isFinite(pricePerPerson) ||
        pricePerPerson < 0
      ) {
        return "Extra guest price valid nahi hai.";
      }
    }

    for (const item of form.sleepingArrangements) {
      const quantity = parseInteger(item.quantity);
      const price = parseMoney(item.price);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return "Sleeping arrangement quantity kam se kam 1 honi chahiye.";
      }

      if (!Number.isFinite(price) || price < 0) {
        return "Sleeping arrangement price valid nahi hai.";
      }
    }

    if (form.petsAllowed) {
  const maxPets = parseInteger(form.maxPets);
  const petPrice = parseMoney(form.petPrice);

  if (!Number.isInteger(maxPets) || maxPets < 1) {
    return "Maximum pets kam se kam 1 hona chahiye.";
  }

  if (form.petTypes.length === 0) {
    return "Kam se kam ek pet type select karo.";
  }

  const selectedTypes = form.petTypes.map((pet) => pet.type);

  if (new Set(selectedTypes).size !== selectedTypes.length) {
    return "Ek pet type ko sirf ek baar select karo.";
  }

  if (!Number.isFinite(petPrice) || petPrice < 0) {
    return "Pet price valid hona chahiye.";
  }

  if (
    !CHARGE_PERIODS.some(
      ([period]) => period === form.petChargePeriod
    )
  ) {
    return "Pet charge period select karo.";
  }
}
    const numericFields = [
      ["Security deposit", form.securityDeposit],
      ["Maintenance", form.maintenance],
      ["Area", form.area],
      ["BHK", form.bhk],
      ["Bedrooms", form.bedrooms],
      ["Bathrooms", form.bathrooms],
      ["Balconies", form.balconies],
      ["Floor", form.floor],
      ["Total floors", form.totalFloors],
    ];

    for (const [label, value] of numericFields) {
      if (value === "") continue;

      const number = Number(value);

      if (!Number.isFinite(number) || number < 0) {
        return `${label} ki value valid honi chahiye.`;
      }
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.group("🏠 CORAL PROPERTY CREATE");
    console.log("Submit triggered");
    console.log("Form state:", form);
    console.log(
      "Selected images:",
      images.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      }))
    );

    if (loading) {
      console.warn("Request already in progress; duplicate submit ignored.");
      console.groupEnd();
      return;
    }

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      console.error("Frontend validation failed:", validationError);
      setError(validationError);
      console.groupEnd();
      return;
    }

    const token = localStorage.getItem("coral_admin_token");

    console.log("Admin token exists:", Boolean(token));
    console.log("Admin token length:", token?.length || 0);

    if (!token) {
      console.error("Missing coral_admin_token in localStorage.");
      setError("Admin session nahi mila. Dobara login karo.");
      console.groupEnd();
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      const textFields = [
        "title",
        "description",
        "propertyType",
        "city",
        "locality",
        "address",
        "landmark",
        "pincode",
        "rentPeriod",
        "maintenancePeriod",
        "areaUnit",
        "furnishing",
        "availability",
      ];

      textFields.forEach((field) => {
        formData.append(field, String(form[field] ?? "").trim());
      });

      const numberFields = [
        "bhk",
        "rent",
        "securityDeposit",
        "maintenance",
        "area",
        "bedrooms",
        "bathrooms",
        "balconies",
        "floor",
        "totalFloors",
      ];

      numberFields.forEach((field) => {
        const value = form[field];

        if (value !== "" && value !== null && value !== undefined) {
          formData.append(field, String(Number(value)));
        } else if (
          [
            "securityDeposit",
            "maintenance",
            "bedrooms",
            "bathrooms",
            "balconies",
          ].includes(field)
        ) {
          formData.append(field, "0");
        }
      });

      const minGuests = parseInteger(form.minGuests, 1);
      const maxGuests = parseInteger(form.maxGuests, 2);

      formData.append("minGuests", String(minGuests));
      formData.append("maxGuests", String(maxGuests));

      // Backward compatibility for existing backend consumers.
      formData.append("guests", String(maxGuests));

      const extraGuestPolicy = {
        enabled: Boolean(form.extraGuestEnabled),
        maxExtraGuests: form.extraGuestEnabled
          ? parseInteger(form.maxExtraGuests, 1)
          : 0,
        pricePerPerson: form.extraGuestEnabled
          ? parseMoney(form.pricePerPerson)
          : 0,
        chargePeriod: form.extraGuestChargePeriod,
      };

      const sleepingArrangements = form.sleepingArrangements.map(
        (item) => ({
          type: item.type,
          label: item.label.trim() || item.type,
          quantity: parseInteger(item.quantity, 1),
          isPaid: Boolean(item.isPaid),
          price: item.isPaid ? parseMoney(item.price) : 0,
          chargePeriod: item.chargePeriod,
        })
      );

     const petPolicy = {
  allowed: Boolean(form.petsAllowed),
  maxPets: form.petsAllowed ? parseInteger(form.maxPets, 1) : 0,
  price: form.petsAllowed ? parseMoney(form.petPrice) : 0,
  chargePeriod: form.petChargePeriod,

  types: form.petsAllowed
    ? form.petTypes.map((item) => ({
        type: item.type,
        label: item.label.trim() || item.type,
        // Same price and period for every allowed pet type.
        charge: parseMoney(form.petPrice),
        chargePeriod: form.petChargePeriod,
      }))
    : [],
};

      formData.append(
        "extraGuestPolicy",
        JSON.stringify(extraGuestPolicy)
      );

      formData.append(
        "sleepingArrangements",
        JSON.stringify(sleepingArrangements)
      );

      formData.append("petPolicy", JSON.stringify(petPolicy));

      formData.append(
        "availableFrom",
        normalizeDate(form.availableFrom)
      );

      formData.append(
        "amenities",
        JSON.stringify(splitCommaSeparated(form.amenities))
      );

      formData.append(
        "rules",
        JSON.stringify(splitCommaSeparated(form.rules))
      );

      // Must match Express upload.array("images", 10).
      images.forEach((file) => {
        formData.append("images", file);
      });

      console.group("📦 FORMDATA PAYLOAD");

      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, {
            name: value.name,
            type: value.type,
            size: value.size,
          });
        } else {
          console.log(key, value);
        }
      }

      console.groupEnd();

      console.log("Structured extraGuestPolicy:", extraGuestPolicy);
      console.log("Structured sleepingArrangements:", sleepingArrangements);
      console.log("Structured petPolicy:", petPolicy);
      console.log("Dispatching createProperty Redux thunk now...");

      // Redux thunk handles the API request.
      const result = await dispatch(createProperty(formData)).unwrap();

      console.group("✅ PROPERTY CREATE SUCCESS");
      console.log("Full thunk response:", result);
      console.log("Returned property:", result?.property);
      console.log("Returned property ID:", result?.property?._id);
      console.log("Returned minGuests:", result?.property?.minGuests);
      console.log("Returned maxGuests:", result?.property?.maxGuests);
      console.log(
        "Returned extraGuestPolicy:",
        result?.property?.extraGuestPolicy
      );
      console.log(
        "Returned sleepingArrangements:",
        result?.property?.sleepingArrangements
      );
      console.log("Returned petPolicy:", result?.property?.petPolicy);
      console.groupEnd();

      setSuccess(
        result?.message ||
          "Property create request successful. Backend response verify karo."
      );

      previews.forEach((url) => {
        URL.revokeObjectURL(url);
        previewUrlsRef.current = previewUrlsRef.current.filter(
          (item) => item !== url
        );
      });

      setForm({
        ...initialForm,
        sleepingArrangements: [],
        petTypes: [],
      });

      setImages([]);
      setPreviews([]);

      window.setTimeout(() => {
        navigate("/admin/properties");
      }, 1200);
    } catch (err) {
      console.group("❌ PROPERTY CREATE FAILED");
      console.error("Full rejected error:", err);
      console.error("Error message:", err?.message);
      console.error("Rejected payload:", err?.payload);
      console.error("Error name:", err?.name);
      console.groupEnd();

      const message =
        typeof err === "string"
          ? err
          : err?.message ||
            err?.payload ||
            "Property create nahi ho payi. Browser aur backend terminal logs check karo.";

      setError(String(message));
    } finally {
      setLoading(false);
      console.log("Property create loading state reset.");
      console.groupEnd();
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7F6]">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="flex items-center gap-3"
          >
            {/* <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
              C
            </span>

            <span className="text-left">
              <span className="block text-lg font-black text-[#073F32]">
                Coral
              </span>
              <span className="text-xs text-gray-500">Admin Panel</span>
            </span> */}
            <img
  src={logo}
  alt="Coral Logo"
  className="h-15 w-38 rounded-full object-contain"
/>
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="rounded-full border border-gray-200 px-5 py-2 text-sm font-bold text-[#073F32]"
          >
            ← Dashboard
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-5 py-8">
        <div className="mb-8">
          <p className="text-xs font-extrabold uppercase tracking-widest text-green-600">
            Property Management
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#073F32]">
            Add Property
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Property details, guest capacity, extra charges, sleeping
            options aur pet policy configure karo.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700"
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section
            title="1. Basic Information"
            description="Property ka main description aur type."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Property Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="2 BHK Premium Flat"
                required
                disabled={loading}
              />

              <Select
                label="Property Type"
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                disabled={loading}
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
              <Label>Description</Label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                required
                disabled={loading}
                placeholder="Property ke baare mein details..."
                className="field-input"
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
              <Input
                label="BHK"
                name="bhk"
                type="number"
                min="0"
                value={form.bhk}
                onChange={handleChange}
                disabled={loading}
              />

              <Input
                label="Bedrooms"
                name="bedrooms"
                type="number"
                min="0"
                value={form.bedrooms}
                onChange={handleChange}
                disabled={loading}
              />

              <Input
                label="Bathrooms"
                name="bathrooms"
                type="number"
                min="0"
                value={form.bathrooms}
                onChange={handleChange}
                disabled={loading}
              />

              <Input
                label="Balconies"
                name="balconies"
                type="number"
                min="0"
                value={form.balconies}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </Section>

          <Section
            title="2. Property Images"
            description="Maximum 10 images; each image must be under 10MB."
          >
            <label
              htmlFor="property-images"
              className="block cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center"
            >
              <span className="text-3xl">📷</span>

              <span className="mt-3 block font-bold text-[#073F32]">
                Choose Property Images
              </span>

              <span className="mt-1 block text-xs text-gray-500">
                JPG, PNG, WEBP
              </span>

              <input
                id="property-images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleImageChange}
                disabled={loading || images.length >= 10}
                className="hidden"
              />
            </label>

            {previews.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {previews.map((src, index) => (
                  <div
                    key={src}
                    className="relative overflow-hidden rounded-xl border bg-white"
                  >
                    <img
                      src={src}
                      alt={`Property ${index + 1}`}
                      className="h-36 w-full object-cover"
                    />

                    {index === 0 && (
                      <span className="absolute left-2 top-2 rounded-full bg-green-400 px-2 py-1 text-[10px] font-black">
                        PRIMARY
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      disabled={loading}
                      aria-label={`Remove image ${index + 1}`}
                      className="absolute right-2 top-2 rounded-full bg-red-600 px-3 py-1 font-bold text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-3 text-xs text-gray-500">
              Selected: {images.length}/10 images
            </p>
          </Section>

          <Section
            title="3. Location"
            description="Complete property address."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                disabled={loading}
              />

              <Input
                label="Locality"
                name="locality"
                value={form.locality}
                onChange={handleChange}
                required
                placeholder="Dharampeth"
                disabled={loading}
              />

              <Input
                label="Complete Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                disabled={loading}
              />

              <Input
                label="Landmark"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                disabled={loading}
              />

              <Input
                label="Pincode"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </Section>

          <Section
            title="4. Rent & Money"
            description="Base rent aur regular maintenance. Extra charges alag configure honge."
          >
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              <Input
                label="Base Rent"
                name="rent"
                type="number"
                min="1"
                step="0.01"
                value={form.rent}
                onChange={handleChange}
                required
                disabled={loading}
              />

              <Select
                label="Rent Period"
                name="rentPeriod"
                value={form.rentPeriod}
                onChange={handleChange}
                disabled={loading}
                options={[
                  ["day", "Per Day"],
                  ["month", "Per Month"],
                  ["year", "Per Year"],
                ]}
              />

              {/* <Input
                label="Security Deposit"
                name="securityDeposit"
                type="number"
                min="0"
                step="0.01"
                value={form.securityDeposit}
                onChange={handleChange}
                disabled={loading}
              /> */}

              {/* <Input
                label="Maintenance"
                name="maintenance"
                type="number"
                min="0"
                step="0.01"
                value={form.maintenance}
                onChange={handleChange}
                disabled={loading}
              /> */}
{/* 
              <Select
                label="Maintenance Period"
                name="maintenancePeriod"
                value={form.maintenancePeriod}
                onChange={handleChange}
                disabled={loading}
                options={[
                  ["included", "Included"],
                  ["monthly", "Monthly"],
                  ["yearly", "Yearly"],
                ]}
              /> */}

              <Select
                label="Furnishing"
                name="furnishing"
                value={form.furnishing}
                onChange={handleChange}
                disabled={loading}
                options={[
                  ["fully-furnished", "Fully Furnished"],
                  ["semi-furnished", "Semi Furnished"],
                  ["unfurnished", "Unfurnished"],
                ]}
              />
            </div>
          </Section>

          <Section
            title="5. Guest Capacity"
            description="Owner khud minimum aur maximum included guests set karega. BHK se automatically calculate nahi hoga."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* <Input
                label="Minimum Guests"
                name="minGuests"
                type="number"
                min="1"
                step="1"
                value={form.minGuests}
                onChange={handleChange}
                required
                disabled={loading}
              /> */}

              <Input
                label="Maximum Included Guests"
                name="maxGuests"
                type="number"
                min="1"
                step="1"
                value={form.maxGuests}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="mt-5 rounded-2xl border border-gray-200 p-5">
              <Checkbox
                checked={form.extraGuestEnabled}
                disabled={loading}
                onChange={(value) =>
                  updateField("extraGuestEnabled", value)
                }
                label="Allow extra guests with additional charges"
              />

              {form.extraGuestEnabled && (
                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  <Input
                    label="Maximum Extra Guests"
                    name="maxExtraGuests"
                    type="number"
                    min="1"
                    step="1"
                    value={form.maxExtraGuests}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />

                  <Input
                    label="Price Per Extra Person"
                    name="pricePerPerson"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.pricePerPerson}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />

                  <Select
                    label="Charge Period"
                    name="extraGuestChargePeriod"
                    value={form.extraGuestChargePeriod}
                    onChange={handleChange}
                    disabled={loading}
                    options={CHARGE_PERIODS}
                  />
                </div>
              )}
            </div>
          </Section>

          <Section
            title="6. Extra Sleeping Arrangements"
            description="Beds, mattresses aur other sleeping options ki quantity aur price alag set karo."
          >
            {form.sleepingArrangements.length === 0 && (
              <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                Abhi koi extra sleeping arrangement add nahi kiya hai.
              </p>
            )}

            <div className="space-y-4">
              {form.sleepingArrangements.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-bold text-[#073F32]">
                      Arrangement {index + 1}
                    </h3>

                    <button
                      type="button"
                      onClick={() => removeSleepingArrangement(index)}
                      disabled={loading}
                      className="text-sm font-bold text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                    <Select
                      label="Arrangement Type"
                      value={item.type}
                      disabled={loading}
                      onChange={(event) =>
                        updateSleepingArrangement(
                          index,
                          "type",
                          event.target.value
                        )
                      }
                      options={SLEEPING_TYPES}
                    />

                    <Input
                      label="Custom Label (Optional)"
                      value={item.label}
                      onChange={(event) =>
                        updateSleepingArrangement(
                          index,
                          "label",
                          event.target.value
                        )
                      }
                      placeholder="Extra mattress"
                      disabled={loading}
                    />

                    <Input
                      label="Quantity"
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(event) =>
                        updateSleepingArrangement(
                          index,
                          "quantity",
                          event.target.value
                        )
                      }
                      disabled={loading}
                    />
                  </div>

                  <div className="mt-5">
                    <Checkbox
                      checked={item.isPaid}
                      disabled={loading}
                      onChange={(value) =>
                        updateSleepingArrangement(
                          index,
                          "isPaid",
                          value
                        )
                      }
                      label="This arrangement has an extra charge"
                    />
                  </div>

                  {item.isPaid && (
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(event) =>
                          updateSleepingArrangement(
                            index,
                            "price",
                            event.target.value
                          )
                        }
                        disabled={loading}
                      />

                      <Select
                        label="Charge Period"
                        value={item.chargePeriod}
                        onChange={(event) =>
                          updateSleepingArrangement(
                            index,
                            "chargePeriod",
                            event.target.value
                          )
                        }
                        disabled={loading}
                        options={CHARGE_PERIODS}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSleepingArrangement}
              disabled={loading}
              className="mt-5 rounded-full border border-green-600 px-5 py-3 text-sm font-bold text-green-700 disabled:opacity-50"
            >
              + Add Sleeping Arrangement
            </button>
          </Section>


<Section title="7. Pet Policy">
  <Checkbox
    checked={form.petsAllowed}
    disabled={loading}
    onChange={(value) => {
      setForm((previous) => ({
        ...previous,
        petsAllowed: value,
        maxPets: value
          ? previous.maxPets === "0" || !previous.maxPets
            ? "1"
            : previous.maxPets
          : "0",
      }));

      setError("");
    }}
    label="Pets are allowed at this property"
  />

  {form.petsAllowed && (
    <div className="mt-5 space-y-5">
      <div className="grid gap-5 sm:grid-cols-3">
        <Input
          label="Maximum Pets"
          name="maxPets"
          type="number"
          min="1"
          step="1"
          value={form.maxPets}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <Input
          label="Price Per Pet (₹)"
          name="petPrice"
          type="number"
          min="0"
          step="0.01"
          value={form.petPrice}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <Select
          label="Charge Period"
          name="petChargePeriod"
          value={form.petChargePeriod}
          onChange={handleChange}
          disabled={loading}
          options={CHARGE_PERIODS}
        />
      </div>

      <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-[#073F32]">
        <strong>Common pet price:</strong>{" "}
        ₹{Number(form.petPrice || 0).toLocaleString("en-IN")}{" "}
        {form.petChargePeriod === "perNight"
          ? "per pet per night"
          : form.petChargePeriod === "perMonth"
            ? "per pet per month"
            : "per pet per stay"}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <span className="text-xl">🐾</span>
        <div>
          <p className="text-sm font-semibold text-[#073F32]">
            Pet types selected during booking
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Guests will select their pet type and quantity on the
            booking page. No pet types need to be configured here.
          </p>
        </div>
      </div>
    </div>
  )}
</Section>

          <Section
            title="8. Property Details & Availability"
            description="Area, floors aur availability."
          >
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              <Input
                label="Area"
                name="area"
                type="number"
                min="0"
                value={form.area}
                onChange={handleChange}
                disabled={loading}
              />

              <Select
                label="Area Unit"
                name="areaUnit"
                value={form.areaUnit}
                onChange={handleChange}
                disabled={loading}
                options={[
                  ["sqft", "Square Feet"],
                  ["sqm", "Square Meter"],
                ]}
              />

              <Input
                label="Floor"
                name="floor"
                type="number"
                min="0"
                value={form.floor}
                onChange={handleChange}
                disabled={loading}
              />

              <Input
                label="Total Floors"
                name="totalFloors"
                type="number"
                min="0"
                value={form.totalFloors}
                onChange={handleChange}
                disabled={loading}
              />

              <Select
                label="Availability"
                name="availability"
                value={form.availability}
                onChange={handleChange}
                disabled={loading}
                options={[
                  ["available", "Available"],
                  ["occupied", "Occupied"],
                  ["unavailable", "Unavailable"],
                ]}
              />

              <Input
                label="Available From"
                name="availableFrom"
                type="date"
                value={form.availableFrom}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </Section>

    
<Section
  title="9. Amenities & Rules"
  description="Property ki facilities select karo aur important rules mention karo."
>
  {/*
    Quick-select amenities ko existing comma-separated
    form.amenities string mein save kiya jayega.
  */}
  {(() => {
    const amenityOptions = [
      { label: "WiFi", icon: "📶" },
      { label: "Parking", icon: "🚗" },
      { label: "Lift", icon: "🛗" },
      { label: "Security", icon: "🛡️" },
      { label: "AC", icon: "❄️" },
      { label: "Kitchen", icon: "🍳" },
      { label: "Power Backup", icon: "🔋" },
      { label: "Washing Machine", icon: "🧺" },
      { label: "TV", icon: "📺" },
      { label: "Gym", icon: "🏋️" },
      { label: "Swimming Pool", icon: "🏊" },
      { label: "Balcony", icon: "🌿" },
    ];

    const selectedAmenities = String(form.amenities || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const toggleAmenity = (amenity) => {
      const exists = selectedAmenities.some(
        (item) => item.toLowerCase() === amenity.toLowerCase()
      );

      const next = exists
        ? selectedAmenities.filter(
            (item) => item.toLowerCase() !== amenity.toLowerCase()
          )
        : [...selectedAmenities, amenity];

      setForm((previous) => ({
        ...previous,
        amenities: next.join(", "),
      }));
      setError("");
    };

    return (
      <div className="space-y-6">
        {/* AMENITIES */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-[#073F32]">
                Property Amenities
              </h3>
              
            </div>

            <span className="shrink-0 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-[#0B6B50]">
              {selectedAmenities.length} selected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {amenityOptions.map((amenity) => {
              const selected = selectedAmenities.some(
                (item) =>
                  item.toLowerCase() === amenity.label.toLowerCase()
              );

              return (
                <button
                  key={amenity.label}
                  type="button"
                  disabled={loading}
                  onClick={() => toggleAmenity(amenity.label)}
                  className={`relative flex min-h-[76px] items-center gap-2 rounded-xl border p-3 text-left transition ${
                    selected
                      ? "border-[#0B6B50] bg-green-50 text-[#073F32]"
                      : "border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-gray-50"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <span className="text-xl">{amenity.icon}</span>

                  <span className="min-w-0 flex-1 text-xs font-semibold">
                    {amenity.label}
                  </span>

                  {selected && (
                    <span className="absolute right-2 top-2 text-xs font-bold text-[#0B6B50]">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Add Other Amenities
            </label>

            <textarea
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              rows={2}
              disabled={loading}
              placeholder="e.g. Garden, CCTV, Geyser, Refrigerator"
              className="field-input"
            />

           
          </div>
        </div>

       
{/* PROPERTY RULES */}
<div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
  <div className="mb-5 flex items-start gap-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xl">
      📋
    </div>

    <div>
      <h3 className="font-bold text-[#073F32]">
        Property Rules
      </h3>
      
    </div>
  </div>

  {(() => {
    const basicRules = [
      "No smoking inside the property",
      "Valid ID required at check-in",
      "No loud music or parties",
      "Keep the property clean",
      "Follow check-in and check-out timings",
      "No illegal activities",
      "Visitors allowed only with permission",
      "Damage to property must be paid for",
      "Respect neighbours and quiet hours",
      "Switch off lights and AC when leaving",
    ];

    // Existing comma-separated/newline rules ko read karo.
    const currentRules = String(form.rules || "")
      .split(/[\n,]+/)
      .map((rule) => rule.trim())
      .filter(Boolean);

    const selectedBasicRules = basicRules.filter((rule) =>
      currentRules.some(
        (item) => item.toLowerCase() === rule.toLowerCase()
      )
    );

    const customRules = currentRules.filter(
      (item) =>
        !basicRules.some(
          (rule) => rule.toLowerCase() === item.toLowerCase()
        )
    );

    const updateRules = (nextSelected, nextCustom = customRules) => {
      setForm((previous) => ({
        ...previous,
        rules: [...nextSelected, ...nextCustom]
          .filter(Boolean)
          .join(", "),
      }));
      setError("");
    };

    const allSelected = basicRules.every((rule) =>
      selectedBasicRules.includes(rule)
    );

    return (
      <div className="space-y-5">
        {/* BASIC RULES */}
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
            <div>
              <h4 className="text-sm font-bold text-[#073F32]">
                Basic Rules
              </h4>
              <p className="mt-1 text-xs text-gray-500">
                {selectedBasicRules.length} of {basicRules.length} selected
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#0B6B50]">
              <input
                type="checkbox"
                checked={allSelected}
                disabled={loading}
                onChange={(event) => {
                  updateRules(
                    event.target.checked ? basicRules : [],
                    customRules
                  );
                }}
                className="h-4 w-4 accent-green-700"
              />
              Select All
            </label>
          </div>

          <div className="grid gap-0 sm:grid-cols-2">
            {basicRules.map((rule, index) => {
              const checked = selectedBasicRules.includes(rule);

              return (
                <label
                  key={rule}
                  className={`flex cursor-pointer items-start gap-3 border-b border-gray-100 p-3.5 transition hover:bg-green-50 sm:even:border-l sm:even:border-gray-100 ${
                    index === basicRules.length - 1
                      ? "border-b-0"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={loading}
                    onChange={(event) => {
                      const next = event.target.checked
                        ? [...selectedBasicRules, rule]
                        : selectedBasicRules.filter(
                            (item) => item !== rule
                          );

                      updateRules(next);
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-green-700"
                  />

                  <span className="text-sm leading-5 text-gray-700">
                    {rule}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* CUSTOM RULES */}
        <div className="rounded-xl border border-dashed border-gray-300 p-4">
          <div className="mb-3 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg">
              ✏️
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#073F32]">
                Other Custom Rules
              </h4>
              
            </div>
          </div>

          <textarea
            value={customRules.join("\n")}
            onChange={(event) => {
              const nextCustom = event.target.value
                .split("\n")
                .map((rule) => rule.trim())
                .filter(Boolean);

              updateRules(selectedBasicRules, nextCustom);
            }}
            rows={4}
            disabled={loading}
            placeholder={
              "e.g."
            }
            className="field-input min-h-[110px] resize-y"
          />

         
        </div>

        {/* SELECTED RULES SUMMARY */}
        <div className="flex items-center justify-between gap-3 rounded-xl bg-green-50 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-[#073F32]">
              Total Rules Selected
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Basic rules + custom rules
            </p>
          </div>

          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-[#0B6B50]">
            {selectedBasicRules.length + customRules.length}
          </span>
        </div>
      </div>
    );
  })()}
</div>

      </div>
    );
  })()}
</Section>


          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              disabled={loading}
              className="rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-bold text-[#073F32] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#18C66A] px-8 py-3.5 text-sm font-black text-[#073F32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Property..." : "Create Property"}
            </button>
          </div>
        </form>
      </section>

      <style>{`
        .field-input {
          display: block;
          width: 100%;
          margin-top: 8px;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 13px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #073f32;
          outline: none;
          background: white;
        }

        .field-input:focus {
          border-color: #18c66a;
          box-shadow: 0 0 0 2px rgba(24, 198, 106, 0.1);
        }

        .field-input:disabled {
          cursor: not-allowed;
          background: #f3f4f6;
        }
      `}</style>
    </main>
  );
}