

import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPropertyById } from "../features/properties/propertySlice";
import { createBooking } from "../features/bookings/bookingSlice";


const getPropertyImageUrl = (image) => {
  if (!image) return "";

  if (typeof image === "string") return image;

  if (typeof image === "object") {
    return (
      image.url ||
      image.secure_url ||
      image.imageUrl ||
      image.src ||
      image.path ||
      ""
    );
  }

  return "";
};
const PET_TYPES = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "bird", label: "Bird" },
  { value: "rabbit", label: "Rabbit" },
  { value: "other", label: "Other" },
];

const ARRANGEMENT_TYPES = [
  { value: "extra-bed", label: "Extra Bed" },
  { value: "mattress", label: "Mattress" },
  { value: "folding-bed", label: "Folding Bed" },
  { value: "floor-bedding", label: "Floor Bedding" },
  { value: "sofa-bed", label: "Sofa Bed" },
  { value: "other", label: "Other" },
];

const numberValue = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(numberValue(amount));

const getChargePeriod = (value) => {
  const period = String(value || "perNight")
    .replace(/[-_\s]/g, "")
    .toLowerCase();

  if (period === "perstay" || period === "stay") return "perStay";
  if (period === "permonth" || period === "month") return "perMonth";

  return "perNight";
};

const getPeriodLabel = (period) => {
  switch (getChargePeriod(period)) {
    case "perStay":
      return "per stay";
    case "perMonth":
      return "per month";
    default:
      return "per night";
  }
};

const getChargeUnits = (period, nights) => {
  switch (getChargePeriod(period)) {
    case "perStay":
      return 1;
    case "perMonth":
      return Math.max(1, Math.ceil(nights / 30));
    default:
      return nights;
  }
};

const calculateCharge = (price, quantity, period, nights) =>
  numberValue(price) *
  numberValue(quantity) *
  getChargeUnits(period, nights);

const getArrangementType = (item) =>
  typeof item === "string" ? item : item?.type;

const getArrangementLabel = (item) => {
  if (typeof item === "string") {
    return (
      ARRANGEMENT_TYPES.find((option) => option.value === item)?.label ||
      item
    );
  }

  if (item?.label) return item.label;

  return (
    ARRANGEMENT_TYPES.find(
      (option) => option.value === item?.type
    )?.label ||
    item?.type ||
    "Sleeping Arrangement"
  );
};

const getArrangementPrice = (item) =>
  numberValue(item?.pricePerUnit ?? item?.price ?? item?.amount);

const isArrangementFree = (item) =>
  item?.isFree === true ||
  item?.free === true ||
  item?.chargeable === false;

const getPetOptions = (petPolicy) => {
  const configured =
    petPolicy?.petTypes ??
    petPolicy?.allowedTypes ??
    petPolicy?.types ??
    petPolicy?.charges;

  if (!Array.isArray(configured) || configured.length === 0) {
    return PET_TYPES;
  }

  return configured.map((item) => {
    const value =
      typeof item === "string"
        ? item
        : item?.type || item?.petType || "other";

    return {
      value,
      label:
        typeof item === "string"
          ? PET_TYPES.find((pet) => pet.value === item)?.label || item
          : item?.label ||
            PET_TYPES.find((pet) => pet.value === value)?.label ||
            value,
      config: typeof item === "object" ? item : null,
    };
  });
};

const getPetConfig = (petPolicy, type) => {
  const options = [
    petPolicy?.petTypes,
    petPolicy?.allowedTypes,
    petPolicy?.types,
    petPolicy?.charges,
  ];

  for (const list of options) {
    if (!Array.isArray(list)) continue;

    const match = list.find(
      (item) =>
        (typeof item === "string" ? item : item?.type || item?.petType) ===
        type
    );

    if (match && typeof match === "object") return match;
  }

  return {};
};

const getPetPrice = (petPolicy, petType) => {
  const typeConfig = Array.isArray(petPolicy?.types)
    ? petPolicy.types.find(
        (item) => item.type === petType
      )
    : null;

  const rawPrice =
  Number(petPolicy?.charge) > 0
    ? petPolicy.charge
    : Number(petPolicy?.price) > 0
      ? petPolicy.price
      : typeConfig?.charge ?? 0;

  const price = Number(rawPrice);

  return Number.isFinite(price) && price >= 0
    ? price
    : 0;
};

const getPetChargePeriod = (petPolicy, petType) => {
  const typeConfig = Array.isArray(petPolicy?.types)
    ? petPolicy.types.find(
        (item) => item.type === petType
      )
    : null;

  return (
    petPolicy?.chargePeriod ||
    typeConfig?.chargePeriod ||
    "perStay"
  );
};
const getTodayString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getNightsBetween = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);

  const difference = end.getTime() - start.getTime();

  if (!Number.isFinite(difference) || difference <= 0) return 0;

  return Math.round(difference / (1000 * 60 * 60 * 24));
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const propertyId =
    searchParams.get("property") ||
    searchParams.get("propertyId") ||
    location.state?.propertyId ||
    location.state?.property?._id;

  const {
    property,
    loading: propertyLoading,
    error: propertyError,
  } = useSelector((state) => state.properties || {});

  const { createLoading = false, createError = null } = useSelector(
    (state) => state.bookings || {}
  );

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth || {}
  );

  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [customerDetails, setCustomerDetails] = useState({
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    specialRequest: "",
  });

 
// Selected quantities are stored by arrangement type.
const [sleepingSelections, setSleepingSelections] = useState({});
const [petSelections, setPetSelections] = useState({});
const [selectedPetType, setSelectedPetType] = useState("");
const [selectedPetQuantity, setSelectedPetQuantity] = useState("1");
const [otherPetName, setOtherPetName] = useState("");
const [formError, setFormError] = useState("");
const [petCustomNames, setPetCustomNames] = useState({});

  const today = useMemo(() => getTodayString(), []);

  useEffect(() => {
    if (propertyId) {
      dispatch(getPropertyById(propertyId));
    }
  }, [dispatch, propertyId]);

  useEffect(() => {
    if (!user) return;

    setCustomerDetails((previous) => ({
      ...previous,
      guestName:
        previous.guestName ||
        user.name ||
        user.fullName ||
        `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      guestPhone:
        previous.guestPhone ||
        user.phone ||
        user.mobile ||
        user.phoneNumber ||
        "",
      guestEmail: previous.guestEmail || user.email || "",
    }));
  }, [user]);

  const minGuests = useMemo(() => {
    const value = numberValue(property?.minGuests, 1);
    return Math.max(1, Math.floor(value));
  }, [property]);

  const maxGuests = useMemo(() => {
    const value = numberValue(
      property?.maxGuests ?? property?.guests,
      1
    );

    return Math.max(minGuests, Math.floor(value));
  }, [property, minGuests]);

  const extraGuestPolicy = property?.extraGuestPolicy || {};

  const extraGuestEnabled = extraGuestPolicy.enabled === true;

  const maxExtraGuests = extraGuestEnabled
    ? Math.max(
        0,
        Math.floor(numberValue(extraGuestPolicy.maxExtraGuests))
      )
    : 0;

  // Backend allows guests above maxGuests only when extra guests are enabled.
  const maximumSelectableGuests = maxGuests + maxExtraGuests;

  const selectedGuests = numberValue(bookingDetails.guests, minGuests);

  const extraGuestCount = Math.max(0, selectedGuests - maxGuests);

  const nights = useMemo(
    () =>
      getNightsBetween(
        bookingDetails.checkIn,
        bookingDetails.checkOut
      ),
    [bookingDetails.checkIn, bookingDetails.checkOut]
  );

  const pricePerNight = numberValue(property?.rent);

  // Keep this base calculation aligned with the current backend:
  // baseAmount = property.rent * number of nights.
  const baseAmount = pricePerNight * nights;

  const extraGuestPrice = numberValue(
    extraGuestPolicy.pricePerPerson
  );

  const extraGuestPeriod = getChargePeriod(
    extraGuestPolicy.chargePeriod
  );

  const extraGuestAmount =
    extraGuestCount > 0 && extraGuestEnabled
      ? calculateCharge(
          extraGuestPrice,
          extraGuestCount,
          extraGuestPeriod,
          nights
        )
      : 0;

  const sleepingOptions = useMemo(() => {
    const configured = property?.sleepingArrangements;

    if (!Array.isArray(configured)) return [];

    return configured.filter((item) => {
      if (typeof item === "string") return true;

      return (
        item?.type &&
        item?.enabled !== false &&
        item?.available !== false
      );
    });
  }, [property]);

  const petPolicy = property?.petPolicy || {};
  const petsAllowed = petPolicy.allowed === true;

  const petOptions = useMemo(
    () => getPetOptions(petPolicy),
    [petPolicy]
  );

  const maxPets = Math.max(
    0,
    Math.floor(numberValue(petPolicy.maxPets))
  );

  const selectedSleepingArrangements = useMemo(() => {
    return sleepingOptions
      .map((item) => {
        const type = getArrangementType(item);
        const quantity = numberValue(sleepingSelections[type]);

        if (!type || quantity <= 0) return null;

        return {
          type,
          quantity: Math.floor(quantity),
        };
      })
      .filter(Boolean);
  }, [sleepingOptions, sleepingSelections]);

 
const selectedPets = useMemo(() => {
  return petOptions
    .map((item) => {
      const count = Math.floor(
        numberValue(petSelections[item.value])
      );

      if (count <= 0) return null;

      return {
        type: item.value,
        count,
        ...(item.value === "other"
          ? {
              customName: String(
                petCustomNames.other || ""
              ).trim(),
            }
          : {}),
      };
    })
    .filter(Boolean);
}, [petOptions, petSelections, petCustomNames]);

  const selectedPetCount = selectedPets.reduce(
    (total, pet) => total + pet.count,
    0
  );

  const sleepingArrangementCharges = useMemo(() => {
    return selectedSleepingArrangements.reduce((total, selection) => {
      const config = sleepingOptions.find(
        (item) => getArrangementType(item) === selection.type
      );

      if (!config || isArrangementFree(config)) return total;

      const price = getArrangementPrice(config);
      const period = getChargePeriod(config?.chargePeriod);

      return (
        total +
        calculateCharge(price, selection.quantity, period, nights)
      );
    }, 0);
  }, [selectedSleepingArrangements, sleepingOptions, nights]);

  const petCharges = useMemo(() => {
    return selectedPets.reduce((total, pet) => {
      const price = getPetPrice(petPolicy, pet.type);
      const period = getPetChargePeriod(petPolicy, pet.type);

      return total + calculateCharge(price, pet.count, period, nights);
    }, 0);
  }, [selectedPets, petPolicy, nights]);

  const estimatedTotal =
    baseAmount +
    extraGuestAmount +
    sleepingArrangementCharges +
    petCharges;

  const handleBookingChange = (event) => {
    const { name, value } = event.target;

    setFormError("");

    setBookingDetails((previous) => {
      if (name !== "guests") {
        const next = { ...previous, [name]: value };

        // Changing check-in to a later date can invalidate check-out.
        if (
          name === "checkIn" &&
          next.checkOut &&
          next.checkOut <= value
        ) {
          next.checkOut = "";
        }

        return next;
      }

      const parsed = Number(value);

      return {
        ...previous,
        guests: Number.isFinite(parsed)
          ? Math.min(
              maximumSelectableGuests,
              Math.max(1, Math.floor(parsed))
            )
          : minGuests,
      };
    });
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setFormError("");

    setCustomerDetails((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSleepingQuantityChange = (type, quantity, config) => {
    const maximum = Math.max(
      0,
      Math.floor(
        numberValue(
          typeof config === "object"
            ? config?.quantity ?? config?.maxQuantity
            : 1,
          1
        )
      )
    );

    const parsed = Math.max(
      0,
      Math.min(maximum || 1, Math.floor(numberValue(quantity)))
    );

    setFormError("");

    setSleepingSelections((previous) => ({
      ...previous,
      [type]: parsed,
    }));
  };

  const handlePetCountChange = (type, count) => {
    const parsed = Math.max(
      0,
      Math.min(maxPets, Math.floor(numberValue(count)))
    );

    setFormError("");

    setPetSelections((previous) => {
      const next = { ...previous, [type]: parsed };

      const total = Object.values(next).reduce(
        (sum, value) => sum + numberValue(value),
        0
      );

      // Do not allow the combined pet count to exceed the property limit.
      if (total > maxPets) {
        return previous;
      }

      return next;
    });
  };

  const validateForm = () => {
    if (!propertyId) {
      return "Property information is missing.";
    }

    if (!isAuthenticated) {
      return "Please login before submitting a booking request.";
    }

    if (!property) {
      return "Property information could not be loaded.";
    }

    if (
      property.approvalStatus &&
      property.approvalStatus !== "approved"
    ) {
      return "This property is not currently available for booking.";
    }

    if (property.status && property.status !== "active") {
      return "This property is not currently available for booking.";
    }

    if (!bookingDetails.checkIn) {
      return "Please select your check-in date.";
    }

    if (!bookingDetails.checkOut) {
      return "Please select your check-out date.";
    }

    if (bookingDetails.checkIn < today) {
      return "Check-in date cannot be in the past.";
    }

    if (bookingDetails.checkOut <= bookingDetails.checkIn) {
      return "Check-out date must be after check-in date.";
    }

    if (selectedGuests < minGuests) {
      return `At least ${minGuests} guests are required for this property.`;
    }

    if (selectedGuests > maxGuests && !extraGuestEnabled) {
      return `This property allows a maximum of ${maxGuests} guests.`;
    }

    if (extraGuestCount > maxExtraGuests) {
      return `Only ${maxExtraGuests} additional guest(s) are allowed.`;
    }

    if (selectedGuests > maximumSelectableGuests) {
      return `Maximum allowed guests: ${maximumSelectableGuests}.`;
    }

    if (!customerDetails.guestName.trim()) {
      return "Please enter customer name.";
    }

    if (!customerDetails.guestPhone.trim()) {
      return "Please enter customer phone number.";
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(customerDetails.guestPhone.trim())) {
      return "Please enter a valid phone number.";
    }

    if (!customerDetails.guestEmail.trim()) {
      return "Please enter customer email.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        customerDetails.guestEmail.trim()
      )
    ) {
      return "Please enter a valid email address.";
    }

    if (customerDetails.specialRequest.length > 1000) {
      return "Special request cannot exceed 1000 characters.";
    }

    if (!nights) {
      return "Please select valid booking dates.";
    }

    if (pricePerNight <= 0) {
      return "This property does not have a valid rent amount.";
    }

    if (!petsAllowed && selectedPets.length > 0) {
      return "Pets are not allowed at this property.";
    }

    if (selectedPetCount > maxPets) {
      return `Maximum ${maxPets} pet(s) are allowed at this property.`;
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const validationError = validateForm();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    // Send only the fields accepted by the booking API.
    // Prices are calculated and validated by the backend.
    const payload = {
      propertyId,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      guests: selectedGuests,
      guestName: customerDetails.guestName.trim(),
      guestPhone: customerDetails.guestPhone.trim(),
      guestEmail: customerDetails.guestEmail.trim(),
      specialRequest: customerDetails.specialRequest.trim(),
      sleepingArrangements: selectedSleepingArrangements,
      pets: selectedPets,
    };

    try {
      const result = await dispatch(createBooking(payload)).unwrap();

      const createdBooking =
        result?.booking ||
        result?.data?.booking ||
        result?.data ||
        result;

      const bookingId =
        createdBooking?._id ||
        createdBooking?.id ||
        result?.bookingId;

      navigate("/booking-confirmation", {
        state: {
          bookingId,
          booking: createdBooking,
          property,
          status: createdBooking?.status || "pending",
        },
      });
    } catch (error) {
      setFormError(
        typeof error === "string"
          ? error
          : error?.message ||
              error?.error ||
              "Unable to submit booking request. Please try again."
      );
    }
  };

  if (!propertyId) {
    return (
      <PageMessage
        title="Property not found"
        message="We could not find the property for this booking."
        link="/properties"
        linkText="Browse Properties"
      />
    );
  }

  if (propertyLoading && !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading property...</p>
      </div>
    );
  }

  if (propertyError && !property) {
    return (
      <PageMessage
        title="Unable to load property"
        message={
          typeof propertyError === "string"
            ? propertyError
            : propertyError?.message ||
              "Something went wrong while loading the property."
        }
        link="/properties"
        linkText="Back to Properties"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to={`/property/${propertyId}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            ← Back to Property
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Request to Book
          </h1>

          <p className="mt-2 text-gray-600">
            Submit your booking request. The property will be confirmed by
            the admin after verification.
          </p>
        </div>

        {!isAuthenticated && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              Please login before submitting a booking request.
            </p>

            <Link
              to="/login"
              state={{ from: `/booking?property=${propertyId}` }}
              className="inline-block mt-2 text-sm font-semibold text-indigo-600"
            >
              Login
            </Link>
          </div>
        )}

        {(formError || createError) && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">
              {formError ||
                (typeof createError === "string"
                  ? createError
                  : createError?.message ||
                    createError?.error ||
                    "Unable to submit booking request.")}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            {/* Property details */}
          {/* Property details */}
<section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <h2 className="text-xl font-semibold text-gray-900">
    Property
  </h2>

  <div className="mt-5 flex flex-col gap-5 sm:flex-row">
    {/* Property Image */}
    <div className="h-36 w-full flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-48">
      {getPropertyImageUrl(property?.images?.[0]) ? (
        <img
          src={getPropertyImageUrl(property.images[0])}
          alt={property?.title || "Property"}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-gray-500">
          No image available
        </div>
      )}
    </div>

    {/* Property Details */}
    <div className="min-w-0 flex-1">
      <h3 className="text-lg font-bold text-gray-900">
        {property?.title || "Property"}
      </h3>

      <p className="mt-2 text-sm text-gray-600">
        {[
          property?.address,
          property?.city,
          property?.state,
          property?.pincode,
        ]
          .filter(Boolean)
          .join(", ") || "Address not available"}
      </p>

      <p className="mt-3 text-lg font-semibold text-indigo-600">
        {formatCurrency(pricePerNight)}
        <span className="text-sm font-normal text-gray-500">
          {" "} / night
        </span>
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
        <span className="rounded-lg bg-gray-100 px-3 py-2">
          Min guests: {minGuests}
        </span>

        <span className="rounded-lg bg-gray-100 px-3 py-2">
          Max guests: {maxGuests}
        </span>
      </div>

      {property?.description && (
        <p className="mt-3 text-sm leading-6 text-gray-600">
          {property.description}
        </p>
      )}
    </div>
  </div>
</section>
            {/* Dates and guests */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Booking Details
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="checkIn"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Check-in
                  </label>

                  <input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    min={today}
                    required
                    value={bookingDetails.checkIn}
                    onChange={handleBookingChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkOut"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Check-out
                  </label>

                  <input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    min={bookingDetails.checkIn || today}
                    required
                    value={bookingDetails.checkOut}
                    onChange={handleBookingChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <div>
  <label
    htmlFor="guests"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Guests
  </label>

  <select
    id="guests"
    name="guests"
    required
    value={bookingDetails.guests}
    onChange={handleBookingChange}
    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
  >
    {Array.from(
      { length: maximumSelectableGuests - minGuests + 1 },
      (_, i) => minGuests + i
    ).map((guest) => (
      <option key={guest} value={guest}>
        {guest} {guest === 1 ? "Guest" : "Guests"}
      </option>
    ))}
  </select>
</div>

                  <p className="mt-2 text-xs text-gray-500">
                    Select {minGuests} to {maximumSelectableGuests} guests.
                  </p>
                </div>
              </div>

              {extraGuestCount > 0 && (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="font-medium text-amber-900">
                    Extra guest charges
                  </p>
                  <p className="mt-1 text-sm text-amber-800">
                    {extraGuestCount} extra guest(s) ×{" "}
                    {formatCurrency(extraGuestPrice)} {getPeriodLabel(extraGuestPeriod)}
                  </p>
                  <p className="mt-2 font-semibold text-amber-900">
                    {formatCurrency(extraGuestAmount)}
                  </p>
                </div>
              )}

              {nights > 0 && (
                <div className="mt-5 rounded-xl bg-indigo-50 p-4">
                  <p className="text-sm text-indigo-800">
                    {formatDate(bookingDetails.checkIn)} to{" "}
                    {formatDate(bookingDetails.checkOut)} · {nights} night(s)
                  </p>
                </div>
              )}
            </section>

            {/* Sleeping arrangements */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Sleeping Arrangements
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Select additional sleeping arrangements if required.
              </p>

              {sleepingOptions.length === 0 ? (
                <p className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
                  No additional sleeping arrangements are configured for this
                  property.
                </p>
              ) : (
                <div className="mt-5 space-y-4">
                  {sleepingOptions.map((item, index) => {
                    const type = getArrangementType(item);
                    const label = getArrangementLabel(item);
                    const free = isArrangementFree(item);
                    const price = getArrangementPrice(item);
                    const period = getChargePeriod(item?.chargePeriod);
                    const availableQuantity = Math.max(
                      1,
                      Math.floor(
                        numberValue(
                          typeof item === "object"
                            ? item?.quantity ?? item?.maxQuantity
                            : 1,
                          1
                        )
                      )
                    );

                    const quantity = numberValue(
                      sleepingSelections[type]
                    );

                    const charge = free
                      ? 0
                      : calculateCharge(price, quantity, period, nights);

                    return (
                      <div
                        key={`${type}-${index}`}
                        className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {label}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {free
                              ? "Free"
                              : `${formatCurrency(price)} ${getPeriodLabel(period)}`}
                          </p>

                          {quantity > 0 && !free && (
                            <p className="mt-1 text-sm font-medium text-indigo-700">
                              Estimated charge: {formatCurrency(charge)}
                            </p>
                          )}
                        </div>

                        <div className="w-full sm:w-36">
                          <label
                            htmlFor={`sleeping-${index}`}
                            className="mb-1 block text-xs font-medium text-gray-600"
                          >
                            Quantity
                          </label>

                          <select
                            id={`sleeping-${index}`}
                            value={quantity}
                            onChange={(event) =>
                              handleSleepingQuantityChange(
                                type,
                                event.target.value,
                                item
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                          >
                            {Array.from(
                              { length: availableQuantity + 1 },
                              (_, quantityOption) => (
                                <option
                                  key={quantityOption}
                                  value={quantityOption}
                                >
                                  {quantityOption === 0
                                    ? "Not required"
                                    : quantityOption}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Pets */}
         



<section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
  <div className="flex items-center gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
      🐾
    </div>
    <div>
      <h2 className="text-lg font-bold text-gray-900">Bringing pets?</h2>
      <p className="text-sm text-gray-500">
        Add the pets you plan to bring
      </p>
    </div>
  </div>

  {!petsAllowed ? (
    <p className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
      Pets are not allowed at this property.
    </p>
  ) : maxPets <= 0 ? (
    <p className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
      No pets can be added to this booking.
    </p>
  ) : (
    <>
      <div className="mt-5 flex items-center justify-between rounded-xl bg-indigo-50 p-4">
        <div>
          <p className="text-sm font-semibold text-indigo-950">
            Pet allowance
          </p>
          <p className="mt-1 text-xs text-indigo-700">
            Maximum pets across all types
          </p>
        </div>
        <span className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-indigo-700">
          {selectedPetCount} / {maxPets}
        </span>
      </div>

      <div className="mt-5 space-y-4 rounded-xl border border-gray-200 p-4">
        <div>
          <label
            htmlFor="pet-type"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Pet type
          </label>

          <select
            id="pet-type"
            value={selectedPetType}
            onChange={(event) => {
              setSelectedPetType(event.target.value);
              setSelectedPetQuantity("1");
              setOtherPetName("");
              setFormError("");
            }}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Choose a pet type</option>
            {petOptions.map((pet) => (
              <option key={pet.value} value={pet.value}>
                {pet.label}
              </option>
            ))}
          </select>
        </div>

        {selectedPetType === "other" && (
          <div>
            <label
              htmlFor="other-pet-name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Specify your pet type
            </label>

            <input
              id="other-pet-name"
              type="text"
              value={otherPetName}
              onChange={(event) => {
                setOtherPetName(event.target.value);
                setFormError("");
              }}
              placeholder="e.g. Parrot, Hamster, Turtle"
              maxLength={100}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        )}

        {selectedPetType && (() => {
          const alreadySelected = numberValue(
            petSelections[selectedPetType]
          );

          const otherPets = selectedPetCount - alreadySelected;
          const available = Math.max(0, maxPets - otherPets);

          const price = getPetPrice(petPolicy, selectedPetType);
          const period = getPetChargePeriod(petPolicy, selectedPetType);

          const isCustomNameMissing =
            selectedPetType === "other" && !otherPetName.trim();

          const isQuantityUnchanged =
            numberValue(selectedPetQuantity) === alreadySelected;

          return (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="pet-count"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Number of pets
                  </label>

                  <select
                    id="pet-count"
                    value={selectedPetQuantity}
                    onChange={(event) =>
                      setSelectedPetQuantity(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    {Array.from(
                      { length: available + 1 },
                      (_, index) => (
                        <option key={index} value={index}>
                          {index === 0
                            ? "Remove this type"
                            : `${index} ${index === 1 ? "pet" : "pets"}`}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs font-medium text-gray-500">
                    Price per pet
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    {formatCurrency(price)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {getPeriodLabel(period)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={
                  isQuantityUnchanged || isCustomNameMissing
                }
                onClick={() => {
                  const quantity = Math.floor(
                    numberValue(selectedPetQuantity)
                  );

                  if (selectedPetType === "other") {
                    const customName = otherPetName.trim();

                    if (!customName) {
                      setFormError(
                        "Please enter your custom pet name."
                      );
                      return;
                    }

                    if (customName.length > 100) {
                      setFormError(
                        "Pet name must be 100 characters or less."
                      );
                      return;
                    }

                    if (quantity > 0) {
                      setPetCustomNames((previous) => ({
                        ...previous,
                        other: customName,
                      }));
                    }
                  }

                  handlePetCountChange(
                    selectedPetType,
                    quantity
                  );

                  if (quantity === 0 && selectedPetType === "other") {
                    setPetCustomNames((previous) => {
                      const next = { ...previous };
                      delete next.other;
                      return next;
                    });
                  }

                  setSelectedPetType("");
                  setSelectedPetQuantity("1");
                  setOtherPetName("");
                  setFormError("");
                }}
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isQuantityUnchanged
                  ? "Already up to date"
                  : alreadySelected > 0
                    ? "Update pet selection"
                    : numberValue(selectedPetQuantity) === 0
                      ? "Remove pet type"
                      : "+ Add pet"}
              </button>
            </>
          );
        })()}
      </div>

      {selectedPets.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-3 text-sm font-bold text-gray-900">
            Your selected pets
          </h3>

          <div className="space-y-3">
            {selectedPets.map((pet) => {
              const option = petOptions.find(
                (item) => item.value === pet.type
              );

              const price = getPetPrice(petPolicy, pet.type);
              const period = getPetChargePeriod(
                petPolicy,
                pet.type
              );

              const charge = calculateCharge(
                price,
                pet.count,
                period,
                nights
              );

              return (
                <div
                  key={pet.type}
                  className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 p-4"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">
                      {pet.type === "other" && pet.customName
                        ? pet.customName
                        : option?.label || pet.type}{" "}
                      × {pet.count}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {formatCurrency(price)} {getPeriodLabel(period)}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-indigo-700">
                      {getChargePeriod(period) !== "perNight" ||
                      nights > 0
                        ? `Estimated charge: ${formatCurrency(charge)}`
                        : "Select booking dates to calculate charge"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handlePetCountChange(pet.type, 0);

                      if (pet.type === "other") {
                        setPetCustomNames((previous) => {
                          const next = { ...previous };
                          delete next.other;
                          return next;
                        });
                      }

                      setFormError("");
                    }}
                    className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs leading-5 text-gray-500">
        You can add multiple pet types. The combined quantity cannot
        exceed the property's pet limit.
      </p>
    </>
  )}
</section>


            {/* Customer details */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Customer Details
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="guestName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="guestName"
                    name="guestName"
                    type="text"
                    required
                    maxLength={120}
                    value={customerDetails.guestName}
                    onChange={handleCustomerChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guestPhone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="guestPhone"
                    name="guestPhone"
                    type="tel"
                    required
                    maxLength={20}
                    value={customerDetails.guestPhone}
                    onChange={handleCustomerChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="guestEmail"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="guestEmail"
                    name="guestEmail"
                    type="email"
                    required
                    maxLength={254}
                    value={customerDetails.guestEmail}
                    onChange={handleCustomerChange}
                    placeholder="Enter email address"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="specialRequest"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Special Request (Optional)
                  </label>

                  <textarea
                    id="specialRequest"
                    name="specialRequest"
                    rows={4}
                    maxLength={1000}
                    value={customerDetails.specialRequest}
                    onChange={handleCustomerChange}
                    placeholder="Any additional information for the property owner..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  />

                  <p className="mt-1 text-right text-xs text-gray-500">
                    {customerDetails.specialRequest.length}/1000
                  </p>
                </div>
              </div>
            </section>

            {/* Booking policy */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Before You Submit
              </h2>

              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <p>Your booking will first be submitted as a request.</p>
                <p>
                  The admin will review your request and confirm the property
                  after verification.
                </p>
                <p>
                  Payment is not collected online at this stage.
                </p>
                <p>
                  The final booking amount is calculated and validated by the
                  backend.
                </p>
              </div>
            </section>
          </div>

          {/* Booking summary */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Booking Summary
              </h2>

              <div className="mt-5 space-y-4">
                <SummaryRow
                  label="Property"
                  value={property?.title || "-"}
                />

                <SummaryRow
                  label="Check-in"
                  value={formatDate(bookingDetails.checkIn)}
                />

                <SummaryRow
                  label="Check-out"
                  value={formatDate(bookingDetails.checkOut)}
                />

                <SummaryRow
                  label="Guests"
                  value={`${selectedGuests} guest(s)`}
                />

                <SummaryRow
                  label="Nights"
                  value={nights}
                />

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <SummaryRow
                    label={`Rent × ${nights || 0} night(s)`}
                    value={formatCurrency(baseAmount)}
                  />

                  {extraGuestCount > 0 && (
                    <SummaryRow
                      label={`Extra guests (${extraGuestCount})`}
                      value={formatCurrency(extraGuestAmount)}
                    />
                  )}

                  {sleepingArrangementCharges > 0 && (
                    <SummaryRow
                      label="Sleeping arrangements"
                      value={formatCurrency(sleepingArrangementCharges)}
                    />
                  )}

                  {petCharges > 0 && (
                    <SummaryRow
                      label="Pet charges"
                      value={formatCurrency(petCharges)}
                    />
                  )}

                  <SummaryRow
                    label="Taxes & Fees"
                    value={formatCurrency(0)}
                  />
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-gray-900">
                      Estimated Total
                    </span>

                    <span className="text-2xl font-bold text-indigo-600">
                      {formatCurrency(estimatedTotal)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    This is an estimate. The backend calculates the final
                    booking amount.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={
                    createLoading ||
                    propertyLoading ||
                    !property ||
                    !isAuthenticated
                  }
                  className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {createLoading
                    ? "Submitting Request..."
                    : "Submit Booking Request"}
                </button>

                {!isAuthenticated && (
                  <p className="text-center text-xs text-amber-700">
                    Login is required to submit a booking.
                  </p>
                )}

                <p className="text-center text-xs leading-5 text-gray-500">
                  Your booking is not confirmed immediately. The admin must
                  review your request.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="text-right font-medium text-gray-900">
        {value}
      </span>
    </div>
  );
}

function PageMessage({ title, message, link, linkText }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

        <p className="mt-3 text-gray-600">{message}</p>

        <Link
          to={link}
          className="mt-6 inline-flex rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default Booking;
