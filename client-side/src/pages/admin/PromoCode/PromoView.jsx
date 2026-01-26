import React, { useState } from "react";

const PromoView = ({ data, onClose }) => {
  if (!data) return null;

  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const current = new Date();
  const isActive = current >= data.start_date && current <= data.end_date;
  const formatDate = (date) => new Date(date).toLocaleDateString();

  const filteredMerchandise = data.selected_merchandise?.map((merch) => ({
    ...merch,
    items: merch.items?.filter((item) =>
      item.id_number.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Promo Details
        </h2>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "overview"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "merch"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("merch")}
          >
            Selected Merchandise
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-medium">Promo Name</p>
                <p>{data.promo_name}</p>
              </div>
              <div>
                <p className="font-medium">Type</p>
                <p>{data.type}</p>
              </div>
              <div>
                <p className="font-medium">Limit Type</p>
                <p>{data.limit_type}</p>
              </div>
              <div>
                <p className="font-medium">One Person Limit</p>
                <p>{data.one_person_limit ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="font-medium">Discount</p>
                <p>{data.discount}%</p>
              </div>
              <div>
                <p className="font-medium">Quantity</p>
                <p>{data.quantity}</p>
              </div>
              <div>
                <p className="font-medium">Start Date</p>
                <p>{formatDate(data.start_date)}</p>
              </div>
              <div>
                <p className="font-medium">End Date</p>
                <p>{formatDate(data.end_date)}</p>
              </div>

              <div>
                <p className="font-medium">Promo Status</p>
                <p
                  className={`font-semibold ${
                    data.status === "Active" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {data.status === "Active" ? "Active" : "Expired"}
                </p>
              </div>
              <div>
                <p className="font-medium">Created By</p>
                <p>{data.created_by ? data.created_by : "N/A"}</p>
              </div>
            </div>

            {/* Audience Section */}
            <div>
              <p className="font-medium text-gray-800">Selected Audience</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.selected_audience?.length > 0 ? (
                  data.selected_audience.map((aud, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 rounded-lg text-gray-700 text-xs"
                    >
                      {aud}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No audience selected</p>
                )}
              </div>
            </div>

            {/* Specific Students */}
            {data.selected_specific_students?.length > 0 && (
              <div>
                <p className="font-medium text-gray-800">Specific Students</p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  {data.selected_specific_students.map((stud, i) => (
                    <li key={i}>{stud}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Button */}
            <div className="flex justify-end mt-6">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                onClick={() => setActiveTab("merch")}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Selected Merchandise Tab */}
        {activeTab === "merch" && (
          <div className="space-y-4">
            {/* Search */}
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Search student ID..."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Merchandise List */}
            {filteredMerchandise?.length > 0 ? (
              filteredMerchandise.map((merch) => (
                <div key={merch._id} className="border rounded-lg p-3 mb-2">
                  <p className="font-semibold text-gray-700">{merch.name}</p>
                  <p className="text-xs text-gray-500 mb-1">
                    Students who used promo:
                  </p>
                  <ul className="ml-4 mt-1 text-sm text-gray-600 list-disc">
                    {merch.items?.length > 0 ? (
                      merch.items.map((item) => (
                        <li key={item._id}>
                          <span className="font-medium">{item.id_number}</span>{" "}
                          —{" "}
                          {item.promo_used
                            ? formatDate(item.promo_used)
                            : "No usage yet"}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 italic text-sm">
                        No students found
                      </li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No merchandise selected</p>
            )}

            {/* Back Button */}
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm"
                onClick={() => setActiveTab("overview")}
              >
                ← Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoView;
