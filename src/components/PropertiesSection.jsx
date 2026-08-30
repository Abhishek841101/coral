import { Link } from "react-router-dom";

const properties = [
  {
    id: 1,
    name: "Coral Grand Residences",
    location: "Nagpur, Maharashtra",
    type: "Premium Apartments",
    price: "₹58 Lakhs",
    status: "Ready to Move",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    name: "Coral Lakeview Villas",
    location: "Udaipur, Rajasthan",
    type: "Luxury Villas",
    price: "₹1.25 Cr",
    status: "Limited Units",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    name: "Coral Urban Heights",
    location: "Pune, Maharashtra",
    type: "2 & 3 BHK Apartments",
    price: "₹72 Lakhs",
    status: "Launching Soon",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function PropertiesSection() {
  return (
    <section
      id="properties"
      className="bg-[#F8F9F7] px-5 py-20 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="mb-3 text-sm font-extrabold tracking-[0.16em] text-[#18C66A]">
              PREMIUM REAL ESTATE
            </p>

            <h2 className="text-4xl font-extrabold tracking-tight text-[#10254A] sm:text-5xl">
              Find your next property
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
              Discover carefully selected residential properties,
              premium apartments and investment opportunities.
            </p>

          </div>

          <Link
            to="/properties"
            className="w-fit rounded-full border border-[#073F32] px-5 py-3 text-sm font-bold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
          >
            View all properties →
          </Link>

        </div>

        {/* Property Cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          {properties.map((property) => (

            <article
              key={property.id}
              className="group overflow-hidden rounded-[30px] border border-[#E5E7EB] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Image */}
              <div className="relative h-[300px] overflow-hidden">

                <img
                  src={property.image}
                  alt={property.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                {/* Status */}
                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#073F32] shadow-md">
                  {property.status}
                </span>

                {/* Location */}
                <div className="absolute bottom-5 left-5 text-white">

                  <p className="text-xs font-bold text-white/80">
                    📍 {property.location}
                  </p>

                </div>

              </div>

              {/* Details */}
              <div className="p-6">

                <p className="text-xs font-extrabold tracking-wider text-[#18A85B]">
                  {property.type}
                </p>

                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#10254A]">
                  {property.name}
                </h3>

                <div className="mt-6 flex items-end justify-between gap-4">

                  <div>

                    <p className="text-xs text-[#667085]">
                      Starting from
                    </p>

                    <p className="mt-1 text-xl font-extrabold text-[#073F32]">
                      {property.price}
                    </p>

                  </div>

                  <Link
                    to={`/property/${property.id}`}
                    className="rounded-full bg-[#18C66A] px-5 py-3 text-xs font-extrabold text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
                  >
                    Explore
                  </Link>

                </div>

              </div>

            </article>

          ))}

        </div>

        {/* CTA */}
        <div className="mt-10 overflow-hidden rounded-[30px] bg-[#073F32] p-7 sm:p-10">

          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">

            <div>

              <p className="text-sm font-extrabold tracking-wider text-[#18C66A]">
                LOOKING FOR SOMETHING SPECIFIC?
              </p>

              <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Tell us what you're looking for.
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                Our property experts can help you find the right
                location, configuration and budget.
              </p>

            </div>

            <Link
              to="/properties"
              className="w-fit shrink-0 rounded-full bg-[#18C66A] px-6 py-3.5 text-sm font-extrabold text-[#073F32] transition hover:bg-white"
            >
              Explore properties →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}