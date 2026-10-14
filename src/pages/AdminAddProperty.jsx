// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL;

// const initialForm = {
//   title: "",
//   description: "",
//   propertyType: "flat",
//   bhk: "",
//   city: "Nagpur",
//   locality: "",
//   address: "",
//   landmark: "",
//   pincode: "",
//   rent: "",
//   rentPeriod: "month",
//   securityDeposit: "",
//   maintenance: "",
//   maintenancePeriod: "included",
//   area: "",
//   areaUnit: "sqft",
//   bedrooms: "",
//   bathrooms: "",
//   balconies: "",
//   floor: "",
//   totalFloors: "",
//   furnishing: "unfurnished",
//   guests: "1",
//   availability: "available",
//   availableFrom: "",
//   amenities: "",
//   rules: "",
// };

// export default function AdminAddProperty() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState(initialForm);
//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   /* =====================================================
//      CLEAN IMAGE PREVIEWS
//   ===================================================== */

//   useEffect(() => {
//     return () => {
//       previews.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [previews]);

//   /* =====================================================
//      INPUT CHANGE
//   ===================================================== */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setError("");
//     setSuccess("");
//   };

//   /* =====================================================
//      IMAGE CHANGE
//   ===================================================== */

//   const handleImageChange = (e) => {
//     const selectedFiles = Array.from(e.target.files || []);

//     if (!selectedFiles.length) {
//       return;
//     }

//     const validFiles = selectedFiles.filter((file) => {
//       if (!file.type.startsWith("image/")) {
//         return false;
//       }

//       if (file.size > 10 * 1024 * 1024) {
//         return false;
//       }

//       return true;
//     });

//     if (!validFiles.length) {
//       setError(
//         "Please select valid image files under 10MB each."
//       );
//       return;
//     }

//     const totalFiles = [...images, ...validFiles];

//     if (totalFiles.length > 10) {
//       setError("You can upload maximum 10 images.");
//       return;
//     }

//     const newPreviews = validFiles.map((file) =>
//       URL.createObjectURL(file)
//     );

//     setImages(totalFiles);
//     setPreviews((prev) => [...prev, ...newPreviews]);

//     setError("");
//     setSuccess("");
//   };

//   /* =====================================================
//      REMOVE IMAGE
//   ===================================================== */

//   const removeImage = (index) => {
//     setImages((prev) =>
//       prev.filter((_, i) => i !== index)
//     );

//     setPreviews((prev) => {
//       const removedUrl = prev[index];

//       if (removedUrl) {
//         URL.revokeObjectURL(removedUrl);
//       }

//       return prev.filter((_, i) => i !== index);
//     });
//   };

//   /* =====================================================
//      SUBMIT
//   ===================================================== */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     if (!form.title.trim()) {
//       setError("Property title is required.");
//       return;
//     }

//     if (!form.description.trim()) {
//       setError("Property description is required.");
//       return;
//     }

//     if (!form.locality.trim()) {
//       setError("Locality is required.");
//       return;
//     }

//     if (!form.address.trim()) {
//       setError("Address is required.");
//       return;
//     }

//     if (!form.rent) {
//       setError("Rent is required.");
//       return;
//     }

//     if (!images.length) {
//       setError("Please upload at least one property image.");
//       return;
//     }

//     try {
//       setLoading(true);

//       /* =================================================
//          GET ADMIN TOKEN
//       ================================================= */

//       const token = localStorage.getItem("coral_admin_token");

//       if (!token) {
//         setError("Authentication required. Please login again.");
//         return;
//       }

//       /* =================================================
//          FORMDATA
//       ================================================= */

//       const formData = new FormData();

//       formData.append(
//         "title",
//         form.title.trim()
//       );

//       formData.append(
//         "description",
//         form.description.trim()
//       );

//       formData.append(
//         "propertyType",
//         form.propertyType
//       );

//       formData.append(
//         "bhk",
//         form.bhk
//           ? Number(form.bhk)
//           : ""
//       );

//       formData.append(
//         "city",
//         form.city.trim()
//       );

//       formData.append(
//         "locality",
//         form.locality.trim()
//       );

//       formData.append(
//         "address",
//         form.address.trim()
//       );

//       formData.append(
//         "landmark",
//         form.landmark.trim()
//       );

//       formData.append(
//         "pincode",
//         form.pincode.trim()
//       );

//       formData.append(
//         "rent",
//         Number(form.rent)
//       );

//       formData.append(
//         "rentPeriod",
//         form.rentPeriod
//       );

//       formData.append(
//         "securityDeposit",
//         form.securityDeposit
//           ? Number(form.securityDeposit)
//           : 0
//       );

//       formData.append(
//         "maintenance",
//         form.maintenance
//           ? Number(form.maintenance)
//           : 0
//       );

//       formData.append(
//         "maintenancePeriod",
//         form.maintenancePeriod
//       );

//       formData.append(
//         "area",
//         form.area
//           ? Number(form.area)
//           : ""
//       );

//       formData.append(
//         "areaUnit",
//         form.areaUnit
//       );

//       formData.append(
//         "bedrooms",
//         form.bedrooms
//           ? Number(form.bedrooms)
//           : 0
//       );

//       formData.append(
//         "bathrooms",
//         form.bathrooms
//           ? Number(form.bathrooms)
//           : 0
//       );

//       formData.append(
//         "balconies",
//         form.balconies
//           ? Number(form.balconies)
//           : 0
//       );

//       formData.append(
//         "floor",
//         form.floor
//           ? Number(form.floor)
//           : ""
//       );

//       formData.append(
//         "totalFloors",
//         form.totalFloors
//           ? Number(form.totalFloors)
//           : ""
//       );

//       formData.append(
//         "furnishing",
//         form.furnishing
//       );

//       formData.append(
//         "guests",
//         form.guests
//           ? Number(form.guests)
//           : 1
//       );

//       formData.append(
//         "availability",
//         form.availability
//       );

//       formData.append(
//         "availableFrom",
//         form.availableFrom || ""
//       );

//       formData.append(
//         "amenities",
//         JSON.stringify(
//           form.amenities
//             .split(",")
//             .map((item) => item.trim())
//             .filter(Boolean)
//         )
//       );

//       formData.append(
//         "rules",
//         JSON.stringify(
//           form.rules
//             .split(",")
//             .map((item) => item.trim())
//             .filter(Boolean)
//         )
//       );

//       /* =================================================
//          IMAGES

//          IMPORTANT:
//          Backend multer field name must be "images".
//       ================================================= */

//       images.forEach((file) => {
//         formData.append("images", file);
//       });

//       /* =================================================
//          REQUEST
//          AUTHENTICATION FIX
//       ================================================= */

//       const response = await fetch(
//         `${API_URL}/properties`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           credentials: "include",
//           body: formData,
//         }
//       );

//       let data = {};

//       try {
//         data = await response.json();
//       } catch {
//         data = {};
//       }

//       /* =================================================
//          RESPONSE ERROR HANDLING
//       ================================================= */

//       if (!response.ok) {
//         if (response.status === 401) {
//           localStorage.removeItem("coral_admin_token");

//           throw new Error(
//             "Your admin session has expired. Please login again."
//           );
//         }

//         throw new Error(
//           data?.message ||
//             "Unable to create property."
//         );
//       }

//       /* =================================================
//          SUCCESS
//       ================================================= */

//       setSuccess(
//         "Property created successfully. It is now waiting for admin review."
//       );

//       setForm(initialForm);

//       previews.forEach((url) =>
//         URL.revokeObjectURL(url)
//       );

//       setImages([]);
//       setPreviews([]);

//       setTimeout(() => {
//         navigate("/admin/properties");
//       }, 1200);
//     } catch (err) {
//       console.error(
//         "Create property error:",
//         err
//       );

//       setError(
//         err.message ||
//           "Unable to create property."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#F5F7F6]">

//       {/* HEADER */}

//       <header className="border-b border-[#E5E7EB] bg-white">

//         <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">

//           <button
//             type="button"
//             onClick={() => navigate("/admin")}
//             className="flex items-center gap-3"
//           >

//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
//               C
//             </div>

//             <div className="text-left">

//               <p className="text-lg font-black leading-none text-[#073F32]">
//                 Coral
//               </p>

//               <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-gray-400">
//                 Admin Panel
//               </p>

//             </div>

//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/admin")}
//             className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-[#073F32] hover:bg-[#F5F7F6]"
//           >
//             ← Dashboard
//           </button>

//         </div>

//       </header>

//       {/* CONTENT */}

//       <section className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8">

//         <div className="mb-8">

//           <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#18A85B]">
//             Property Management
//           </p>

//           <h1 className="mt-2 text-3xl font-black text-[#073F32] sm:text-4xl">
//             Add Property
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             Create a new property listing from the admin panel.
//           </p>

//         </div>

//         {/* ERROR */}

//         {error && (
//           <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4">

//             <p className="text-sm font-semibold text-red-600">
//               {error}
//             </p>

//           </div>
//         )}

//         {/* SUCCESS */}

//         {success && (
//           <div className="mb-6 rounded-2xl border border-green-100 bg-green-50 px-5 py-4">

//             <p className="text-sm font-semibold text-green-700">
//               {success}
//             </p>

//           </div>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6"
//         >

//           {/* BASIC INFORMATION */}

//           <FormSection
//             title="Basic Information"
//             description="Enter the main details of the property."
//           >

//             <div className="grid gap-5 md:grid-cols-2">

//               <Input
//                 label="Property Title"
//                 name="title"
//                 value={form.title}
//                 onChange={handleChange}
//                 placeholder="2 BHK Premium Flat"
//                 required
//               />

//               <Select
//                 label="Property Type"
//                 name="propertyType"
//                 value={form.propertyType}
//                 onChange={handleChange}
//                 options={[
//                   ["room", "Room"],
//                   ["pg", "PG"],
//                   ["flat", "Flat"],
//                   ["apartment", "Apartment"],
//                   ["house", "House"],
//                   ["villa", "Villa"],
//                   ["studio", "Studio"],
//                 ]}
//               />

//             </div>

//             <div className="mt-5">

//               <label className="text-xs font-extrabold text-gray-500">
//                 DESCRIPTION
//               </label>

//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 placeholder="Describe the property..."
//                 rows={5}
//                 required
//                 className="mt-2 w-full resize-none rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-[#073F32] outline-none focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10"
//               />

//             </div>

//             <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-4">

//               <Input
//                 label="BHK"
//                 name="bhk"
//                 type="number"
//                 min="1"
//                 max="5"
//                 value={form.bhk}
//                 onChange={handleChange}
//                 placeholder="2"
//               />

//               <Input
//                 label="Bedrooms"
//                 name="bedrooms"
//                 type="number"
//                 min="0"
//                 value={form.bedrooms}
//                 onChange={handleChange}
//                 placeholder="2"
//               />

//               <Input
//                 label="Bathrooms"
//                 name="bathrooms"
//                 type="number"
//                 min="0"
//                 value={form.bathrooms}
//                 onChange={handleChange}
//                 placeholder="2"
//               />

//               <Input
//                 label="Balconies"
//                 name="balconies"
//                 type="number"
//                 min="0"
//                 value={form.balconies}
//                 onChange={handleChange}
//                 placeholder="1"
//               />

//             </div>

//           </FormSection>

//           {/* IMAGES */}

//           <FormSection
//             title="Property Images"
//             description="Upload up to 10 property images. The first image will be used as the primary image."
//           >

//             <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-[#FAFBFA] p-6">

//               <label
//                 htmlFor="property-images"
//                 className="flex cursor-pointer flex-col items-center justify-center rounded-2xl px-5 py-10 text-center transition hover:bg-white"
//               >

//                 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#18C66A]/15 text-2xl">
//                   📷
//                 </div>

//                 <p className="mt-4 text-sm font-black text-[#073F32]">
//                   Upload Property Images
//                 </p>

//                 <p className="mt-1 text-xs text-gray-500">
//                   JPG, JPEG, PNG or WEBP • Maximum 10MB each
//                 </p>

//                 <span className="mt-4 rounded-full bg-[#073F32] px-5 py-2.5 text-xs font-black text-white">
//                   Choose Images
//                 </span>

//                 <input
//                   id="property-images"
//                   type="file"
//                   accept="image/jpeg,image/png,image/webp,image/jpg"
//                   multiple
//                   onChange={handleImageChange}
//                   disabled={loading}
//                   className="hidden"
//                 />

//               </label>

//               {/* PREVIEWS */}

//               {previews.length > 0 && (
//                 <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

//                   {previews.map((src, index) => (

//                     <div
//                       key={`${src}-${index}`}
//                       className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white"
//                     >

//                       <img
//                         src={src}
//                         alt={`Property ${index + 1}`}
//                         className="h-40 w-full object-cover"
//                       />

//                       {index === 0 && (
//                         <span className="absolute left-2 top-2 rounded-full bg-[#18C66A] px-3 py-1 text-[10px] font-black text-[#073F32]">
//                           PRIMARY
//                         </span>
//                       )}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           removeImage(index)
//                         }
//                         disabled={loading}
//                         className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-black text-white shadow-lg hover:bg-red-600 disabled:opacity-50"
//                       >
//                         ×
//                       </button>

//                     </div>

//                   ))}

//                 </div>
//               )}

//             </div>

//           </FormSection>

//           {/* LOCATION */}

//           <FormSection
//             title="Location"
//             description="Add the property's complete location."
//           >

//             <div className="grid gap-5 md:grid-cols-2">

//               <Input
//                 label="City"
//                 name="city"
//                 value={form.city}
//                 onChange={handleChange}
//                 required
//               />

//               <Input
//                 label="Locality"
//                 name="locality"
//                 value={form.locality}
//                 onChange={handleChange}
//                 placeholder="Dharampeth"
//                 required
//               />

//             </div>

//             <div className="mt-5">

//               <Input
//                 label="Address"
//                 name="address"
//                 value={form.address}
//                 onChange={handleChange}
//                 placeholder="Complete property address"
//                 required
//               />

//             </div>

//             <div className="mt-5 grid gap-5 md:grid-cols-2">

//               <Input
//                 label="Landmark"
//                 name="landmark"
//                 value={form.landmark}
//                 onChange={handleChange}
//                 placeholder="Near Metro Station"
//               />

//               <Input
//                 label="Pincode"
//                 name="pincode"
//                 value={form.pincode}
//                 onChange={handleChange}
//                 placeholder="440010"
//               />

//             </div>

//           </FormSection>

//           {/* RENT */}

//           <FormSection
//             title="Rent & Money"
//             description="Set the property's pricing details."
//           >

//             <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">

//               <Input
//                 label="Rent"
//                 name="rent"
//                 type="number"
//                 min="0"
//                 value={form.rent}
//                 onChange={handleChange}
//                 placeholder="15000"
//                 required
//               />

//               <Select
//                 label="Rent Period"
//                 name="rentPeriod"
//                 value={form.rentPeriod}
//                 onChange={handleChange}
//                 options={[
//                   ["day", "Per Day"],
//                   ["month", "Per Month"],
//                   ["year", "Per Year"],
//                 ]}
//               />

//               <Input
//                 label="Security Deposit"
//                 name="securityDeposit"
//                 type="number"
//                 min="0"
//                 value={form.securityDeposit}
//                 onChange={handleChange}
//                 placeholder="30000"
//               />

//               <Input
//                 label="Maintenance"
//                 name="maintenance"
//                 type="number"
//                 min="0"
//                 value={form.maintenance}
//                 onChange={handleChange}
//                 placeholder="0"
//               />

//             </div>

//             <div className="mt-5 grid gap-5 sm:grid-cols-2">

//               <Select
//                 label="Maintenance Period"
//                 name="maintenancePeriod"
//                 value={form.maintenancePeriod}
//                 onChange={handleChange}
//                 options={[
//                   ["included", "Included"],
//                   ["monthly", "Monthly"],
//                   ["yearly", "Yearly"],
//                 ]}
//               />

//               <Select
//                 label="Furnishing"
//                 name="furnishing"
//                 value={form.furnishing}
//                 onChange={handleChange}
//                 options={[
//                   [
//                     "fully-furnished",
//                     "Fully Furnished",
//                   ],
//                   [
//                     "semi-furnished",
//                     "Semi Furnished",
//                   ],
//                   [
//                     "unfurnished",
//                     "Unfurnished",
//                   ],
//                 ]}
//               />

//             </div>

//           </FormSection>

//           {/* PROPERTY DETAILS */}

//           <FormSection
//             title="Property Details"
//             description="Add size, floor and capacity information."
//           >

//             <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">

//               <Input
//                 label="Area"
//                 name="area"
//                 type="number"
//                 min="0"
//                 value={form.area}
//                 onChange={handleChange}
//                 placeholder="1200"
//               />

//               <Select
//                 label="Area Unit"
//                 name="areaUnit"
//                 value={form.areaUnit}
//                 onChange={handleChange}
//                 options={[
//                   ["sqft", "Square Feet"],
//                   ["sqm", "Square Meter"],
//                 ]}
//               />

//               <Input
//                 label="Floor"
//                 name="floor"
//                 type="number"
//                 value={form.floor}
//                 onChange={handleChange}
//                 placeholder="3"
//               />

//               <Input
//                 label="Total Floors"
//                 name="totalFloors"
//                 type="number"
//                 value={form.totalFloors}
//                 onChange={handleChange}
//                 placeholder="8"
//               />

//             </div>

//             <div className="mt-5 grid gap-5 sm:grid-cols-2">

//               <Input
//                 label="Maximum Guests"
//                 name="guests"
//                 type="number"
//                 min="1"
//                 value={form.guests}
//                 onChange={handleChange}
//                 placeholder="2"
//               />

//               <Select
//                 label="Availability"
//                 name="availability"
//                 value={form.availability}
//                 onChange={handleChange}
//                 options={[
//                   ["available", "Available"],
//                   ["occupied", "Occupied"],
//                   ["unavailable", "Unavailable"],
//                 ]}
//               />

//             </div>

//             <div className="mt-5">

//               <Input
//                 label="Available From"
//                 name="availableFrom"
//                 type="date"
//                 value={form.availableFrom}
//                 onChange={handleChange}
//               />

//             </div>

//           </FormSection>

//           {/* AMENITIES */}

//           <FormSection
//             title="Amenities & Rules"
//             description="Separate multiple items with commas."
//           >

//             <div>

//               <label className="text-xs font-extrabold text-gray-500">
//                 AMENITIES
//               </label>

//               <input
//                 name="amenities"
//                 value={form.amenities}
//                 onChange={handleChange}
//                 placeholder="WiFi, Parking, Lift, Security, AC"
//                 className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-[#073F32] outline-none focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10"
//               />

//             </div>

//             <div className="mt-5">

//               <label className="text-xs font-extrabold text-gray-500">
//                 PROPERTY RULES
//               </label>

//               <input
//                 name="rules"
//                 value={form.rules}
//                 onChange={handleChange}
//                 placeholder="No smoking, No pets, ID required"
//                 className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-medium text-[#073F32] outline-none focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10"
//               />

//             </div>

//           </FormSection>

//           {/* ACTIONS */}

//           <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

//             <button
//               type="button"
//               onClick={() => navigate("/admin")}
//               disabled={loading}
//               className="rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-black text-[#073F32] hover:bg-gray-50 disabled:opacity-50"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="rounded-full bg-[#18C66A] px-8 py-3.5 text-sm font-black text-[#073F32] hover:bg-[#073F32] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading
//                 ? "Uploading & Creating..."
//                 : "Create Property"}
//             </button>

//           </div>

//         </form>

//       </section>

//     </main>
//   );
// }

// /* =====================================================
//    FORM SECTION
// ===================================================== */

// function FormSection({
//   title,
//   description,
//   children,
// }) {
//   return (
//     <section className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">

//       <h2 className="text-lg font-black text-[#073F32]">
//         {title}
//       </h2>

//       <p className="mt-1 text-sm text-gray-500">
//         {description}
//       </p>

//       <div className="mt-6">
//         {children}
//       </div>

//     </section>
//   );
// }

// /* =====================================================
//    INPUT
// ===================================================== */

// function Input({
//   label,
//   name,
//   type = "text",
//   value,
//   onChange,
//   placeholder,
//   required = false,
//   min,
//   max,
// }) {
//   return (
//     <div>

//       <label
//         htmlFor={name}
//         className="text-xs font-extrabold text-gray-500"
//       >
//         {label.toUpperCase()}
//       </label>

//       <input
//         id={name}
//         name={name}
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required={required}
//         min={min}
//         max={max}
//         className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10"
//       />

//     </div>
//   );
// }

// /* =====================================================
//    SELECT
// ===================================================== */

// function Select({
//   label,
//   name,
//   value,
//   onChange,
//   options,
// }) {
//   return (
//     <div>

//       <label
//         htmlFor={name}
//         className="text-xs font-extrabold text-gray-500"
//       >
//         {label.toUpperCase()}
//       </label>

//       <select
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-[#073F32] outline-none focus:border-[#18C66A] focus:ring-2 focus:ring-[#18C66A]/10"
//       >

//         {options.map(
//           ([optionValue, optionLabel]) => (
//             <option
//               key={optionValue}
//               value={optionValue}
//             >
//               {optionLabel}
//             </option>
//           )
//         )}

//       </select>

//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

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

  minGuests: "1",
  maxGuests: "2",

  extraGuestEnabled: false,
  maxExtraGuests: "0",
  pricePerPerson: "0",
  extraGuestChargePeriod: "perNight",

  sleepingArrangements: [],

  petsAllowed: false,
  maxPets: "0",
  petTypes: [],

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
  charge: "0",
  chargePeriod: "perStay",
});

function parseMoney(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

function parseInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 0
    ? number
    : fallback;
}

function splitCommaSeparated(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminAddProperty() {
  const navigate = useNavigate();
  const previewUrlsRef = useRef([]);

  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) =>
        URL.revokeObjectURL(url)
      );
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

    const invalid = selected.find(
      (file) =>
        !file.type.startsWith("image/") ||
        file.size > 10 * 1024 * 1024
    );

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

    const newUrls = selected.map((file) =>
      URL.createObjectURL(file)
    );

    previewUrlsRef.current.push(...newUrls);

    setImages((previous) => [...previous, ...selected]);
    setPreviews((previous) => [...previous, ...newUrls]);
    setError("");
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
      sleepingArrangements:
        previous.sleepingArrangements.map((item, i) =>
          i === index
            ? { ...item, [field]: value }
            : item
        ),
    }));
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
      sleepingArrangements:
        previous.sleepingArrangements.filter(
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
      petTypes: previous.petTypes.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Property title required hai.";
    if (!form.description.trim()) return "Description required hai.";
    if (!form.city.trim()) return "City required hai.";
    if (!form.locality.trim()) return "Locality required hai.";
    if (!form.address.trim()) return "Address required hai.";
    if (form.rent === "" || parseMoney(form.rent) <= 0) {
      return "Rent zero se zyada hona chahiye.";
    }
    if (!images.length) return "Kam se kam ek property image upload karo.";

    const minGuests = Number(form.minGuests);
    const maxGuests = Number(form.maxGuests);

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

    if (
      form.extraGuestEnabled &&
      parseInteger(form.maxExtraGuests) < 1
    ) {
      return "Extra guest policy enable hai, isliye maximum extra guests kam se kam 1 rakho.";
    }

    if (form.petsAllowed && parseInteger(form.maxPets) < 1) {
      return "Pets allow karne par maximum pets kam se kam 1 rakho.";
    }

    for (const item of form.sleepingArrangements) {
      if (parseInteger(item.quantity) < 1) {
        return "Sleeping arrangement quantity kam se kam 1 honi chahiye.";
      }

      if (parseMoney(item.price) < 0) {
        return "Sleeping arrangement price valid nahi hai.";
      }
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const token = localStorage.getItem("coral_admin_token");

    if (!token) {
      setError("Admin session nahi mila. Dobara login karo.");
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
        formData.append(
          field,
          String(form[field] ?? "").trim()
        );
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
          ["securityDeposit", "maintenance", "bedrooms", "bathrooms", "balconies"].includes(field)
        ) {
          formData.append(field, "0");
        }
      });

      formData.append("minGuests", String(Number(form.minGuests)));
      formData.append("maxGuests", String(Number(form.maxGuests)));

      // Backward compatibility with older property records.
      formData.append("guests", String(Number(form.maxGuests)));

      const extraGuestPolicy = {
        enabled: Boolean(form.extraGuestEnabled),
        maxExtraGuests: form.extraGuestEnabled
          ? parseInteger(form.maxExtraGuests)
          : 0,
        pricePerPerson: form.extraGuestEnabled
          ? parseMoney(form.pricePerPerson)
          : 0,
        chargePeriod: form.extraGuestChargePeriod,
      };

      const sleepingArrangements =
        form.sleepingArrangements.map((item) => ({
          type: item.type,
          label: item.label.trim() || item.type,
          quantity: Math.max(1, parseInteger(item.quantity, 1)),
          isPaid: Boolean(item.isPaid),
          price: item.isPaid ? parseMoney(item.price) : 0,
          chargePeriod: item.chargePeriod,
        }));

      const petPolicy = {
        allowed: Boolean(form.petsAllowed),
        maxPets: form.petsAllowed
          ? parseInteger(form.maxPets)
          : 0,
        types: form.petsAllowed
          ? form.petTypes.map((item) => ({
              type: item.type,
              label: item.label.trim() || item.type,
              charge: parseMoney(item.charge),
              chargePeriod: item.chargePeriod,
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
        form.availableFrom || ""
      );

      formData.append(
        "amenities",
        JSON.stringify(splitCommaSeparated(form.amenities))
      );

      formData.append(
        "rules",
        JSON.stringify(splitCommaSeparated(form.rules))
      );

      images.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(`${API_URL}/properties`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: formData,
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          if (response.status === 401) {
            localStorage.removeItem("coral_admin_token");
          }

          throw new Error(
            data.message ||
              "Admin authentication failed. Login aur admin permissions check karo."
          );
        }

        throw new Error(
          data.message || "Property create nahi ho payi."
        );
      }

      setSuccess(
        data.message ||
          "Property create ho gayi. Approval status backend decide karega."
      );

      setForm(initialForm);
      setImages([]);
      setPreviews([]);

      previews.forEach((url) => {
        URL.revokeObjectURL(url);
        previewUrlsRef.current = previewUrlsRef.current.filter(
          (item) => item !== url
        );
      });

      window.setTimeout(() => {
        navigate("/admin/properties");
      }, 1200);
    } catch (err) {
      console.error("Create property error:", err);
      setError(err.message || "Property create nahi ho payi.");
    } finally {
      setLoading(false);
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
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18C66A] font-black text-[#073F32]">
              C
            </span>
            <span className="text-left">
              <span className="block text-lg font-black text-[#073F32]">
                Coral
              </span>
              <span className="text-xs text-gray-500">Admin Panel</span>
            </span>
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
              <Label>Description</Label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Property ke baare mein details..."
                className="field-input"
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
              <Input label="BHK" name="bhk" type="number" min="0" value={form.bhk} onChange={handleChange} />
              <Input label="Bedrooms" name="bedrooms" type="number" min="0" value={form.bedrooms} onChange={handleChange} />
              <Input label="Bathrooms" name="bathrooms" type="number" min="0" value={form.bathrooms} onChange={handleChange} />
              <Input label="Balconies" name="balconies" type="number" min="0" value={form.balconies} onChange={handleChange} />
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
                disabled={loading}
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
          </Section>

          <Section
            title="3. Location"
            description="Complete property address."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Input label="City" name="city" value={form.city} onChange={handleChange} required />
              <Input label="Locality" name="locality" value={form.locality} onChange={handleChange} required placeholder="Dharampeth" />
              <Input label="Complete Address" name="address" value={form.address} onChange={handleChange} required />
              <Input label="Landmark" name="landmark" value={form.landmark} onChange={handleChange} />
              <Input label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />
            </div>
          </Section>

          <Section
            title="4. Rent & Money"
            description="Base rent aur regular maintenance. Extra charges alag configure honge."
          >
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              <Input label="Base Rent" name="rent" type="number" min="1" value={form.rent} onChange={handleChange} required />

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

              <Input label="Security Deposit" name="securityDeposit" type="number" min="0" value={form.securityDeposit} onChange={handleChange} />

              <Input label="Maintenance" name="maintenance" type="number" min="0" value={form.maintenance} onChange={handleChange} />

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
                  ["fully-furnished", "Fully Furnished"],
                  ["semi-furnished", "Semi Furnished"],
                  ["unfurnished", "Unfurnished"],
                ]}
              />
            </div>
          </Section>

          <Section
            title="5. Guest Capacity"
            description="Maximum included guests BHK se automatically calculate nahi honge. Owner khud set karega."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Minimum Guests"
                name="minGuests"
                type="number"
                min="1"
                value={form.minGuests}
                onChange={handleChange}
                required
              />
              <Input
                label="Maximum Included Guests"
                name="maxGuests"
                type="number"
                min="1"
                value={form.maxGuests}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-5 rounded-2xl border border-gray-200 p-5">
              <Checkbox
                checked={form.extraGuestEnabled}
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
                    value={form.maxExtraGuests}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Price Per Extra Person"
                    name="pricePerPerson"
                    type="number"
                    min="0"
                    value={form.pricePerPerson}
                    onChange={handleChange}
                    required
                  />
                  <Select
                    label="Charge Period"
                    name="extraGuestChargePeriod"
                    value={form.extraGuestChargePeriod}
                    onChange={handleChange}
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
                      className="text-sm font-bold text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                    <Select
                      label="Arrangement Type"
                      value={item.type}
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
                    />

                    <Input
                      label="Quantity"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) =>
                        updateSleepingArrangement(
                          index,
                          "quantity",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="mt-5">
                    <Checkbox
                      checked={item.isPaid}
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
                        value={item.price}
                        onChange={(event) =>
                          updateSleepingArrangement(
                            index,
                            "price",
                            event.target.value
                          )
                        }
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
              className="mt-5 rounded-full border border-green-600 px-5 py-3 text-sm font-bold text-green-700"
            >
              + Add Sleeping Arrangement
            </button>
          </Section>

          <Section
            title="7. Pet Policy"
            description="Pets allow karna hai ya nahi, maximum count aur pet-wise charges configure karo."
          >
            <Checkbox
              checked={form.petsAllowed}
              onChange={(value) => {
                setForm((previous) => ({
                  ...previous,
                  petsAllowed: value,
                  maxPets: value
                    ? previous.maxPets === "0"
                      ? "1"
                      : previous.maxPets
                    : "0",
                  petTypes: value
                    ? previous.petTypes
                    : [],
                }));
              }}
              label="Pets are allowed at this property"
            />

            {form.petsAllowed && (
              <>
                <div className="mt-5 max-w-sm">
                  <Input
                    label="Maximum Pets"
                    name="maxPets"
                    type="number"
                    min="1"
                    value={form.maxPets}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mt-6 space-y-4">
                  {form.petTypes.map((pet, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-gray-200 p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-bold text-[#073F32]">
                          Pet Type {index + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removePetType(index)}
                          className="text-sm font-bold text-red-600"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                        <Select
                          label="Pet Type"
                          value={pet.type}
                          onChange={(event) =>
                            updatePetType(
                              index,
                              "type",
                              event.target.value
                            )
                          }
                          options={PET_TYPES}
                        />

                        <Input
                          label="Custom Label (Optional)"
                          value={pet.label}
                          onChange={(event) =>
                            updatePetType(
                              index,
                              "label",
                              event.target.value
                            )
                          }
                          placeholder="Small dog"
                        />

                        <Input
                          label="Pet Charge"
                          type="number"
                          min="0"
                          value={pet.charge}
                          onChange={(event) =>
                            updatePetType(
                              index,
                              "charge",
                              event.target.value
                            )
                          }
                        />

                        <Select
                          label="Charge Period"
                          value={pet.chargePeriod}
                          onChange={(event) =>
                            updatePetType(
                              index,
                              "chargePeriod",
                              event.target.value
                            )
                          }
                          options={CHARGE_PERIODS}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addPetType}
                  className="mt-5 rounded-full border border-green-600 px-5 py-3 text-sm font-bold text-green-700"
                >
                  + Add Pet Type
                </button>
              </>
            )}
          </Section>

          <Section
            title="8. Property Details & Availability"
            description="Area, floors aur availability."
          >
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              <Input label="Area" name="area" type="number" min="0" value={form.area} onChange={handleChange} />

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

              <Input label="Floor" name="floor" type="number" min="0" value={form.floor} onChange={handleChange} />

              <Input label="Total Floors" name="totalFloors" type="number" min="0" value={form.totalFloors} onChange={handleChange} />

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

              <Input
                label="Available From"
                name="availableFrom"
                type="date"
                value={form.availableFrom}
                onChange={handleChange}
              />
            </div>
          </Section>

          <Section
            title="9. Amenities & Rules"
            description="Items ko commas se separate karo."
          >
            <div>
              <Label>Amenities</Label>
              <textarea
                name="amenities"
                value={form.amenities}
                onChange={handleChange}
                rows={3}
                placeholder="WiFi, Parking, Lift, Security, AC"
                className="field-input"
              />
            </div>

            <div className="mt-5">
              <Label>Property Rules</Label>
              <textarea
                name="rules"
                value={form.rules}
                onChange={handleChange}
                rows={3}
                placeholder="No smoking, ID required"
                className="field-input"
              />
            </div>
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
      `}</style>
    </main>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-black text-[#073F32]">
        {title}
      </h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
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
}) {
  return (
    <div>
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
        className="field-input"
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
}) {
  return (
    <div>
      <Label>{label}</Label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="field-input"
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

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm font-semibold text-[#073F32]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 accent-green-600"
      />
      <span>{label}</span>
    </label>
  );
}
