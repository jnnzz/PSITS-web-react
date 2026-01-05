import { useState, useEffect } from "react";
import { activePublishMerchandise, fetchStudentName } from "../../../api/admin";
import ConfirmationModal from "../../../components/common/modal/ConfirmationModal";
import { ConfirmActionType } from "../../../enums/commonEnums";
import { createPromoCode } from "../../../api/promo";
import { showToast } from "../../../utils/alertHelper";

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
  const [searchStudentId, setSearchStudentId] = useState("");
  const [singleStudent, setSingleStudent] = useState("no");
  const [studentSearched, setStudentSearched] = useState([]);
  const [errorName, setErrorName] = useState("");

  const fetchData = async () => {
    try {
      const data = await activePublishMerchandise();
      console.log(data);
      setActiveMerchandise(data ? data : []);
      console.log(data);
    } catch (error) {
      console.error(error);
      onCancel();
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

    if (createPromoCode(promoFormData)) {
      onCancel();
      setConfirmModal(false);
    }

    console.log(selectedMerchandise);

    for (let [key, value] of promoFormData.entries()) {
      console.log(`${key}:`, value);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-center text-xl font-semibold text-gray-800">
          Add Promo Code
        </h2>

        {/* Promo Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Promo Name
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter promo name"
            value={promoName}
            onChange={(e) => setPromoName(e.target.value)}
          />
        </div>

        {/* Type Dropdown */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Type
          </label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select type</option>

            <option value="Members">Members</option>
            <option value="Students">Students</option>
          </select>
          {type === "Students" && (
            <>
              <label className="mb-1 mt-2 block text-sm font-medium text-gray-600">
                Type of Students
              </label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
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
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Search Student by ID
            </label>
            <div className="mb-4 flex flex-row gap-3">
              <input
                type="number"
                placeholder="e.g. 2021001"
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
                value={searchStudentId}
                onChange={(e) => setSearchStudentId(e.target.value)}
              />
              <button
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => handleSearchStudent()}
              >
                Search
              </button>
              {studentSearched.data !== undefined && (
                <>
                  <button
                    className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
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

            <div className="flex min-h-[42px] w-full flex-wrap gap-2 rounded-md border border-gray-300 bg-white px-3 py-2">
              {selectedStudents.length > 0 ? (
                selectedStudents.map((student, index) => (
                  <span
                    key={index}
                    className="flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-700"
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
                <span className="text-sm text-gray-400">
                  No students selected
                </span>
              )}
            </div>
          </div>
        )}

        {type === "Members" && (
          <div>
            <p className="mb-1 block text-sm font-medium text-gray-600">
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
                  <span className="text-sm text-gray-700">{org}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Limited / Unlimited */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
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
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
        {limitType === "Limited" && (
          <>
            <label className="mb-1 mt-2 block text-sm font-medium text-gray-600">
              Single Student?
            </label>
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
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
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Quantity
            </label>
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        )}

        {/* Merchandise */}
        <div>
          <p className="mb-1 block text-sm font-medium text-gray-600">
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
                <span className="text-sm text-gray-700">{item.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Start Date
            </label>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Expiry Date
            </label>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Discount */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Discount (%)
          </label>
          <input
            type="number"
            placeholder="Enter discount percentage"
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring focus:ring-blue-200"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            className="rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
