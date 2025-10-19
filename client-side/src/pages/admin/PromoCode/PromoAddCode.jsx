import React, { useState, useEffect } from "react";
import { activePublishMerchandise } from "../../../api/admin";
import ConfirmationModal from "../../../components/common/modal/ConfirmationModal";
import { ConfirmActionType } from "../../../enums/commonEnums";
import { createPromoCode } from "../../../api/promo";

const PromoAddCode = ({ onCancel }) => {
  const [type, setType] = useState("");
  const [promoName, setPromoName] = useState("");
  const [studentType, setStudentType] = useState("");
  const [limitType, setLimitType] = useState("Limited");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMerchandise, setSelectedMerchandise] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [quantity, setQuantity] = useState(0);
  const [activeMerchandise, setActiveMerchandise] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [confirmModal, setConfirmModal] = useState(false);

  const fetchData = async () => {
    try {
      const data = await activePublishMerchandise();
      setActiveMerchandise(data ? data : []);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreatePromoCode = async () => {
    const promoFormData = new FormData();
    const selectedAudience =
      type === "Members"
        ? selectedMembers
        : studentType === "Specific"
        ? selectedStudents
        : "All Students";
    const formFields = {
      promoName,
      type,
      limitType,
      selectedAudience,
      discount,
      quantity,
      startDate,
      endDate,
      selectedMerchandise,
    };

    Object.entries(formFields).forEach(([key, value]) => {
      if (key === "selectedMerchandise") {
        promoFormData.append(key, JSON.stringify(value));
      } else {
        promoFormData.append(key, value);
      }
    });

    if (createPromoCode(promoFormData)) {
      onCancel;
      setConfirmModal(false);
    }

    console.log(selectedMerchandise);

    for (let [key, value] of promoFormData.entries()) {
      console.log(`${key}:`, value);
    }
  };

  const handleStudentChange = (e) => {
    const values = e.target.value.split(",").map((v) => v.trim());
    setSelectedStudents(values);
  };

  const handleOrgChange = (org) => {
    setSelectedMembers((prev) =>
      prev.includes(org) ? prev.filter((o) => o !== org) : [...prev, org]
    );
  };

  const handleMerchChange = (item) => {
    setSelectedMerchandise((prev) =>
      prev.includes(item) ? prev.filter((m) => m !== item) : [...prev, item]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Add Promo Code
        </h2>

        {/* Promo Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Promo Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
            placeholder="Enter promo name"
            value={promoName}
            onChange={(e) => setPromoName(e.target.value)}
          />
        </div>

        {/* Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Type
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select type</option>

            <option value="Members">Members</option>
            <option value="Students">Students</option>
          </select>
          {type === "Students" && (
            <>
              <label className="block text-sm font-medium text-gray-600 mb-1 mt-2">
                Type of Students
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                value={studentType}
                onChange={(e) => setStudentType(e.target.value)}
              >
                <option value="">Select Student type</option>
                <option value="Specific">Specific</option>
                <option value="All Students">All Students</option>
              </select>
            </>
          )}
          <div></div>
        </div>

        {/* Conditional Fields */}
        {studentType === "Specific" && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Student IDs (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. 2021001, 2021023"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
              onChange={handleStudentChange}
            />
          </div>
        )}

        {type === "Members" && (
          <div>
            <p className="block text-sm font-medium text-gray-600 mb-1">
              Sub Members
            </p>
            <div className="flex flex-wrap gap-3">
              {["Officers", "Media", "Developers", "Volunteers"].map((org) => (
                <label key={org} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(org)}
                    onChange={() => handleOrgChange(org)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-700 text-sm">{org}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Limited / Unlimited */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Limit Type
          </label>
          <div className="flex gap-4">
            {["Limited", "Unlimited"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="limitType"
                  value={option}
                  checked={limitType === option}
                  onChange={() => setLimitType(option)}
                  className="accent-blue-600"
                />
                <span className="text-gray-700 text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quantity */}
        {limitType === "Limited" && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Quantity
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        )}

        {/* Merchandise */}
        <div>
          <p className="block text-sm font-medium text-gray-600 mb-1">
            Applied Merchandise
          </p>
          <div className="grid grid-cols-2 gap-2">
            {activeMerchandise.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedMerchandise.includes(item)}
                  onChange={() => handleMerchChange(item)}
                  className="accent-blue-600"
                />
                <span className="text-gray-700 text-sm">{item.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Start Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Discount (%)
          </label>
          <input
            type="number"
            placeholder="Enter discount percentage"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setConfirmModal(true)}
          >
            Create Promo Code
          </button>
        </div>
      </div>
      {confirmModal && (
        <>
          <ConfirmationModal
            confirmType={ConfirmActionType.CREATE}
            onConfirm={() => handleCreatePromoCode()}
            onCancel={() => setConfirmModal(false)}
          />
        </>
      )}
    </div>
  );
};

export default PromoAddCode;
