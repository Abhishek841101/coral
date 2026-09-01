import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

export default function AdminProperties() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("pending");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      let url = `${API_URL}/admin/properties`;

      if (filter === "pending") {
        url += "?approvalStatus=pending";
      }

      if (filter === "approved") {
        url += "?approvalStatus=approved";
      }

      if (filter === "rejected") {
        url += "?approvalStatus=rejected";
      }

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to fetch properties."
        );
      }

      setProperties(data.properties || []);
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "Unable to fetch properties."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filter]);

  const handleAction = async (
    id,
    action,
    reason = ""
  ) => {
    try {
      setActionLoading(`${action}-${id}`);
      setError("");

      let method = "PATCH";
      let endpoint = "";

      if (action === "approve") {
        endpoint = `/admin/properties/${id}/approve`;
      }

      if (action === "reject") {
        endpoint = `/admin/properties/${id}/reject`;
      }

      if (action === "activate") {
        endpoint = `/admin/properties/${id}/activate`;
      }

      if (action === "deactivate") {
        endpoint = `/admin/properties/${id}/deactivate`;
      }

      if (action === "delete") {
        method = "DELETE";
        endpoint = `/admin/properties/${id}`;
      }

      const response = await fetch(
        `${API_URL}${endpoint}`,
        {
          method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          ...(action === "reject"
            ? {
                body: JSON.stringify({
                  reason,
                }),
              }
            : {}),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Action failed."
        );
      }

      await fetchProperties();
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to perform action."
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt(
      "Enter rejection reason:"
    );

    if (reason === null) {
      return;
    }

    await handleAction(
      id,
      "reject",
      reason
    );
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) {
      return;
    }

    await handleAction(
      id,
      "delete"
    );
  };

  return (
    <main className="min-h-screen bg-[#F5F7F6]">

      {/* HEADER */}

      <header className="border-b border-[#E5E7EB] bg-white">

        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">

          <button
            type="button"
            onClick={() =>
              navigate("/admin")
            }
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
            onClick={() =>
              navigate("/admin/properties/add")
            }
            className="rounded-full bg-[#18C66A] px-5 py-2.5 text-sm font-black text-[#073F32] transition hover:bg-[#073F32] hover:text-white"
          >
            + Add Property
          </button>

        </div>

      </header>


      {/* CONTENT */}

      <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8">

        {/* TITLE */}

        <div>

          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#18A85B]">
            Property Management
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#073F32] sm:text-4xl">
            Properties
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review and manage property listings.
          </p>

        </div>


        {/* FILTERS */}

        <div className="mt-7 flex flex-wrap gap-2">

          <FilterButton
            active={filter === "pending"}
            onClick={() =>
              setFilter("pending")
            }
          >
            Pending
          </FilterButton>

          <FilterButton
            active={filter === "approved"}
            onClick={() =>
              setFilter("approved")
            }
          >
            Approved
          </FilterButton>

          <FilterButton
            active={filter === "rejected"}
            onClick={() =>
              setFilter("rejected")
            }
          >
            Rejected
          </FilterButton>

          <FilterButton
            active={filter === "all"}
            onClick={() =>
              setFilter("all")
            }
          >
            All
          </FilterButton>

        </div>


        {/* ERROR */}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
            <p className="text-sm font-semibold text-red-600">
              {error}
            </p>
          </div>
        )}


        {/* LOADING */}

        {loading ? (

          <div className="mt-8 grid gap-5 lg:grid-cols-2">

            {Array.from({
              length: 4,
            }).map((_, index) => (
              <PropertySkeleton
                key={index}
              />
            ))}

          </div>

        ) : properties.length === 0 ? (

          <div className="mt-8 rounded-[28px] bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F8F0] text-2xl">
              🏠
            </div>

            <h2 className="mt-5 text-xl font-black text-[#073F32]">
              No properties found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are no properties in this category.
            </p>

          </div>

        ) : (

          <div className="mt-8 grid gap-5 lg:grid-cols-2">

            {properties.map(
              (property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  actionLoading={actionLoading}
                  onApprove={() =>
                    handleAction(
                      property._id,
                      "approve"
                    )
                  }
                  onReject={() =>
                    handleReject(
                      property._id
                    )
                  }
                  onActivate={() =>
                    handleAction(
                      property._id,
                      "activate"
                    )
                  }
                  onDeactivate={() =>
                    handleAction(
                      property._id,
                      "deactivate"
                    )
                  }
                  onDelete={() =>
                    handleDelete(
                      property._id
                    )
                  }
                />
              )
            )}

          </div>

        )}

      </section>

    </main>
  );
}


/* =====================================================
   PROPERTY CARD
===================================================== */

function PropertyCard({
  property,
  actionLoading,
  onApprove,
  onReject,
  onActivate,
  onDeactivate,
  onDelete,
}) {
  const image =
    property.images?.find(
      (item) =>
        item.isPrimary
    )?.url ||
    property.images?.[0]?.url;

  const owner =
    property.owner;

  const isPending =
    property.approvalStatus ===
    "pending";

  const isApproved =
    property.approvalStatus ===
    "approved";

  const isRejected =
    property.approvalStatus ===
    "rejected";

  return (
    <article className="overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white shadow-sm">

      {/* IMAGE */}

      <div className="relative h-60 bg-[#E9F8F0]">

        {image ? (

          <img
            src={image}
            alt={property.title}
            className="h-full w-full object-cover"
          />

        ) : (

          <div className="flex h-full items-center justify-center text-5xl">
            🏠
          </div>

        )}

        <div className="absolute left-4 top-4">

          <StatusBadge
            status={
              property.approvalStatus
            }
          />

        </div>

      </div>


      {/* DETAILS */}

      <div className="p-6">

        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">

            <h2 className="text-xl font-black text-[#073F32]">
              {property.title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {property.locality},{" "}
              {property.city}
            </p>

          </div>

          <div className="shrink-0 text-right">

            <p className="text-xs text-gray-400">
              Rent
            </p>

            <p className="text-lg font-black text-[#073F32]">
              ₹
              {Number(
                property.rent
              ).toLocaleString(
                "en-IN"
              )}
              <span className="text-xs font-semibold text-gray-400">
                /{property.rentPeriod}
              </span>
            </p>

          </div>

        </div>


        {/* PROPERTY INFO */}

        <div className="mt-4 flex flex-wrap gap-2">

          {property.propertyType && (
            <InfoBadge>
              {property.propertyType}
            </InfoBadge>
          )}

          {property.bhk && (
            <InfoBadge>
              {property.bhk} BHK
            </InfoBadge>
          )}

          {property.area && (
            <InfoBadge>
              {property.area}{" "}
              {property.areaUnit}
            </InfoBadge>
          )}

          {property.furnishing && (
            <InfoBadge>
              {property.furnishing.replace(
                "-",
                " "
              )}
            </InfoBadge>
          )}

          <InfoBadge>
            {property.availability}
          </InfoBadge>

        </div>


        {/* OWNER */}

        <div className="mt-5 rounded-2xl bg-[#F8F9F7] p-4">

          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-gray-400">
            Property Owner
          </p>

          <p className="mt-1 text-sm font-black text-[#073F32]">
            {owner?.name || "Unknown"}
          </p>

          {owner?.email && (
            <p className="mt-1 text-xs text-gray-500">
              {owner.email}
            </p>
          )}

          {owner?.phone && (
            <p className="mt-1 text-xs text-gray-500">
              {owner.phone}
            </p>
          )}

        </div>


        {/* REJECTION REASON */}

        {isRejected &&
          property.rejectionReason && (
            <div className="mt-4 rounded-2xl bg-red-50 p-4">

              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-red-400">
                Rejection Reason
              </p>

              <p className="mt-1 text-sm text-red-600">
                {property.rejectionReason}
              </p>

            </div>
          )}


        {/* ACTIONS */}

        <div className="mt-5 flex flex-wrap gap-2">

          {isPending && (
            <>
              <ActionButton
                variant="approve"
                loading={
                  actionLoading ===
                  `approve-${property._id}`
                }
                onClick={onApprove}
              >
                ✓ Approve
              </ActionButton>

              <ActionButton
                variant="reject"
                loading={
                  actionLoading ===
                  `reject-${property._id}`
                }
                onClick={onReject}
              >
                ✕ Reject
              </ActionButton>
            </>
          )}


          {isApproved &&
            property.status ===
              "active" && (
              <ActionButton
                variant="secondary"
                loading={
                  actionLoading ===
                  `deactivate-${property._id}`
                }
                onClick={onDeactivate}
              >
                Deactivate
              </ActionButton>
            )}


          {isApproved &&
            property.status ===
              "inactive" && (
              <ActionButton
                variant="approve"
                loading={
                  actionLoading ===
                  `activate-${property._id}`
                }
                onClick={onActivate}
              >
                Activate
              </ActionButton>
            )}


          {isRejected && (
            <ActionButton
              variant="approve"
              loading={
                actionLoading ===
                `approve-${property._id}`
              }
              onClick={onApprove}
            >
              ✓ Approve
            </ActionButton>
          )}


          <ActionButton
            variant="danger"
            loading={
              actionLoading ===
              `delete-${property._id}`
            }
            onClick={onDelete}
          >
            Delete
          </ActionButton>

        </div>

      </div>

    </article>
  );
}


/* =====================================================
   STATUS
===================================================== */

function StatusBadge({
  status,
}) {
  const labels = {
    pending: "Pending Review",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-black capitalize text-[#073F32] shadow-sm backdrop-blur">
      {labels[status] || status}
    </span>
  );
}


/* =====================================================
   FILTER BUTTON
===================================================== */

function FilterButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm font-black transition ${
        active
          ? "bg-[#073F32] text-white"
          : "bg-white text-gray-500 hover:bg-[#E9F8F0] hover:text-[#073F32]"
      }`}
    >
      {children}
    </button>
  );
}


/* =====================================================
   ACTION BUTTON
===================================================== */

function ActionButton({
  children,
  onClick,
  loading,
  variant = "secondary",
}) {
  const classes = {
    approve:
      "bg-[#18C66A] text-[#073F32] hover:bg-[#073F32] hover:text-white",

    reject:
      "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white",

    danger:
      "bg-gray-100 text-gray-600 hover:bg-red-600 hover:text-white",

    secondary:
      "border border-gray-200 bg-white text-[#073F32] hover:bg-gray-100",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`rounded-full px-4 py-2.5 text-xs font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${classes[variant]}`}
    >
      {loading
        ? "Please wait..."
        : children}
    </button>
  );
}


/* =====================================================
   INFO BADGE
===================================================== */

function InfoBadge({
  children,
}) {
  return (
    <span className="rounded-full bg-[#F8F9F7] px-3 py-1.5 text-[11px] font-bold capitalize text-gray-600">
      {children}
    </span>
  );
}


/* =====================================================
   SKELETON
===================================================== */

function PropertySkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">

      <div className="h-60 animate-pulse bg-gray-200" />

      <div className="p-6">

        <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200" />

        <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-gray-200" />

        <div className="mt-5 h-16 animate-pulse rounded-2xl bg-gray-200" />

        <div className="mt-5 h-10 animate-pulse rounded-full bg-gray-200" />

      </div>

    </div>
  );
}