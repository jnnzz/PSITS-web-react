import React, { useState, useEffect } from "react";
import { activePublishMerchandise, fetchStudentName } from "../../../api/admin";
import ConfirmationModal from "../../../components/common/modal/ConfirmationModal";
import { ConfirmActionType } from "../../../enums/commonEnums";
import { updatePromoCode } from "../../../api/promo";
import { showToast } from "../../../utils/alertHelper";

const PromoEdit = ({ data, onCancel }) => {
  console.log(data);
  const [type, setType] = useState(
    data.type === "All Students" || data.type === "Specific"
      ? "Students"
      : data.type
  );
  const [promoName, setPromoName] = useState(data.promo_name);
  const [studentType, setStudentType] = useState(data.type);
  const [limitType, setLimitType] = useState(data.limit_type);
  const [selectedStudents, setSelectedStudents] = useState(
    data.selected_specific_students
  );
  const [selectedMembers, setSelectedMembers] = useState(
    data.selected_audience
  );
  const [selectedMerchandise, setSelectedMerchandise] = useState(
    data.selected_merchandise
  );
  const [startDate, setStartDate] = useState(() => {
    if (!data?.start_date) return "";
    return new Date(data.start_date).toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    if (!data?.end_date) return "";
    return new Date(data.end_date).toISOString().split("T")[0];
  });
  const [quantity, setQuantity] = useState(data.quantity);
  const [activeMerchandise, setActiveMerchandise] = useState(
    data.selected_merchandise
  );
  const [discount, setDiscount] = useState(data.discount);
  const [confirmModal, setConfirmModal] = useState(false);
  const [searchStudentId, setSearchStudentId] = useState("");
  const [singleStudent, setSingleStudent] = useState(
    data.one_person_limit ? "yes" : "no"
  );
  const [studentSearched, setStudentSearched] = useState([]);
  const [errorName, setErrorName] = useState("");

  const fetchData = async () => {
    try {
      const data = await activePublishMerchandise();

      setActiveMerchandise((prev) => {
        const combined = [...prev, ...(data || [])];

        const unique = combined.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t._id === item._id)
        );

        return unique;
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchStudent = async () => {
    try {
      const data = await fetchStudentName(searchStudentId);
      if (data === undefined) {
        return showToast("error", "No Student Found!");
      }
      setStudentSearched(data ? data : []);
      console.log(data);
      setErrorName("Not Found");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddStudent = () => {
    try {
      if (studentSearched.data === undefined) {
        return showToast("error", "No data!");
      }
      setSelectedStudents((prev) => {
        if (prev.includes(studentSearched.data.id_number)) {
          setErrorName("Student already added");
          setSearchStudentId("");
          return prev;
        }
        setSearchStudentId("");
        setStudentSearched([]);

        return [...prev, studentSearched.data.id_number];
      });
    } catch (error) {
      console.error(error);
    }
    showToast("success", "Student Added!");
  };

  const handleUpdatePromoCode = async () => {
    const promoFormData = new FormData();
    const selectedAudience =
      type === "Members"
        ? selectedMembers
        : studentType === "Specific"
        ? selectedStudents
        : "All Students";
    const formFields = {
      promoId: data._id,
      promoName,
      type: type === "Members" ? type : studentType,
      limitType,
      singleStudent,
      selectedAudience,
      discount,
      quantity,
      startDate,
      endDate,
      selectedMerchandise,
    };

    Object.entries(formFields).forEach(([key, value]) => {
      if (key === "selectedMerchandise" || key === "selectedAudience") {
        promoFormData.append(key, JSON.stringify(value));
      } else {
        promoFormData.append(key, value);
      }
    });

    if (updatePromoCode(promoFormData)) {
      onCancel();
      setConfirmModal(false);
    }

    console.log(selectedMerchandise);

    for (let [key, value] of promoFormData.entries()) {
      console.log(`${key}:`, value);
    }
    onCancel();
  };

  const handleOrgChange = (org) => {
    setSelectedMembers((prev) =>
      prev.includes(org) ? prev.filter((o) => o !== org) : [...prev, org]
    );
  };

  const handleMerchChange = (item) => {
    setSelectedMerchandise((prevSelected) => {
      const isSelected = prevSelected.some((merch) => merch._id === item._id);
      if (isSelected) {
        return prevSelected.filter((merch) => merch._id !== item._id);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Edit Promo Code
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
              Search Student by ID
            </label>
            <div className="flex flex-row gap-3 mb-4">
              <input
                type="number"
                placeholder="e.g. 2021001"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                value={searchStudentId}
                onChange={(e) => setSearchStudentId(e.target.value)}
              />
              <button
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => handleSearchStudent()}
              >
                Search
              </button>
              {studentSearched.data !== undefined && (
                <>
                  <button
                    className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                    onClick={() => handleAddStudent()}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
            {studentSearched.data !== undefined && (
              <>
                {studentSearched.data ? (
                  <span>
                    Found: {studentSearched.data.name} | ID:{" "}
                    {studentSearched.data.id_number}
                  </span>
                ) : studentSearched.length > 0 ? (
                  <span style={{ color: "red" }}>
                    {errorName ? errorName : "Not Found"}
                  </span>
                ) : (
                  <></>
                )}
              </>
            )}

            <div className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[42px] flex flex-wrap gap-2 bg-white">
              {selectedStudents.length > 0 ? (
                selectedStudents.map((student, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                  >
                    {student}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedStudents((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">
                  No students selected
                </span>
              )}
            </div>
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
        {limitType === "Limited" && (
          <>
            <label className="block text-sm font-medium text-gray-600 mb-1 mt-2">
              Single Student?
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
              value={singleStudent}
              onChange={(e) => setSingleStudent(e.target.value)}
            >
              <option value="">--Select--</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </>
        )}

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
              <label key={item._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedMerchandise.some(
                    (merch) => merch._id === item._id
                  )}
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
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            onClick={() => setConfirmModal(true)}
          >
            Update Promo Code
          </button>
        </div>
      </div>
      {confirmModal && (
        <>
          <ConfirmationModal
            confirmType={ConfirmActionType.UPDATE}
            onConfirm={() => handleUpdatePromoCode()}
            onCancel={() => setConfirmModal(false)}
          />
        </>
      )}
    </div>
  );
};

export default PromoEdit;
