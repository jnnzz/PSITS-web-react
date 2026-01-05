import TableComponent from "../../../components/Custom/TableComponent";
import ButtonsComponent from "../../../components/Custom/ButtonsComponent";
import { motion } from "framer-motion";
import PromoAddCode from "./PromoAddCode";
import PromoView from "./PromoView";
import PromoLog from "./PromoLog";
import PromoEdit from "./PromoEdit";
import React from "react";
import { getAllPromoCode, deletePromo } from "../../../api/promo";
import { FaTrash, FaEye, FaPen } from "react-icons/fa";
import ConfirmationModal from "../../../components/common/modal/ConfirmationModal";
import { ConfirmActionType } from "../../../enums/commonEnums";
const PromoDashboard = () => {
  const [addModal, setAddModal] = React.useState(false);
  const [promoCodes, setAllPromoCodes] = React.useState([]);
  const [isDelete, setIsDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [isShow, setIsShow] = React.useState(false);
  const [promoData, setPromoData] = React.useState({});
  const [isPromoLog, setIsPromoLog] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editData, setEditData] = React.useState({});
  const current = new Date();

  const fetchAllPromoCodes = async () => {
    try {
      const data = await getAllPromoCode();
      console.log(data);
      setAllPromoCodes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDelete(true);
  };

  const handleView = (data) => {
    setPromoData(data);
    setIsShow(true);
  };
  const handleCloseAdd = () => {
    setIsShow(false);
    fetchAllPromoCodes();
  };
  const handleEditModal = (data) => {
    setIsEdit(true);
    setEditData(data);
  };
  const handleCloseEdit = () => {
    setIsEdit(false);
    fetchAllPromoCodes();
  };

  const handleDeletion = async () => {
    try {
      if (await deletePromo(deleteId)) {
        setIsDelete(false);
        setDeleteId("");
        fetchAllPromoCodes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchAllPromoCodes();
    if (!addModal) {
      fetchAllPromoCodes();
    }
  }, []);

  const handleViewAddModal = () => {
    setAddModal(true);
  };
  const handleViewLogsModal = () => {
    setIsPromoLog(true);
  };

  const columns = [
    {
      key: "promo_name",
      label: "Promo Name",
      sortable: true,
    },

    {
      key: "type",
      label: "Type",
      sortable: true,
    },
    {
      key: "limit_type",
      label: "Limit Type",
      sortable: true,
    },
    {
      key: "discount",
      label: "Discount",
      sortable: true,
      cell: (row) => (
        <>
          <div>{row.discount} %</div>
        </>
      ),
    },
    {
      key: "quantity",
      label: "Stocks",
      sortable: true,
      cell: (row) => (
        <div
          style={{
            color: row.quantity <= 0 ? "red" : "inherit",
            fontWeight: row.quantity <= 0 ? "bold" : "normal",
          }}
        >
          {row.quantity <= 0 ? "Out of Stocks" : `${row.quantity} `}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      cell: (row) => (
        <div
          className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
            current >= new Date(row.start_date) &&
            current <= new Date(row.end_date)
              ? "bg-green-100 text-green-800"
              : current < new Date(row.start_date)
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {current >= new Date(row.start_date) &&
          current <= new Date(row.end_date)
            ? "Active"
            : current < new Date(row.start_date)
              ? "Upcoming"
              : "Expired"}
        </div>
      ),
    },

    {
      key: "actions",
      label: "",
      cell: (row) => (
        <ButtonsComponent>
          <button
            onClick={() => handleEditModal(row)}
            className="ml-2 text-blue-500 transition-colors duration-200 hover:text-blue-700"
          >
            <FaPen />
          </button>
          <button
            onClick={() => handleView(row)}
            className="ml-2 text-blue-500 transition-colors duration-200 hover:text-blue-700"
          >
            <FaEye />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="ml-2 text-red-500 transition-colors duration-200 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </ButtonsComponent>
      ),
    },
  ];

  return (
    <>
      <div>
        <div className="mb-5 p-2">
          <ButtonsComponent>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#0056b3" }} // Hover effect for primary
              whileTap={{ scale: 0.98, backgroundColor: "#003d7a" }} // Active effect for primary
              className="flex items-center gap-2 rounded-lg border border-neutral-medium bg-accent px-5 py-2 text-sm text-white shadow-sm transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-highlight md:text-base"
              onClick={handleViewAddModal}
            >
              <i className="fas fa-plus text-white"></i>
              <span className="font-medium">Add Promo Code</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#1f2937" }}
              whileTap={{ scale: 0.98, backgroundColor: "#111827" }}
              className="flex items-center gap-2 rounded-lg border border-gray-500 bg-gray-700 px-5 py-2 text-sm text-white shadow-sm transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 md:text-base"
              onClick={() => handleViewLogsModal()}
            >
              <i className="fas fa-file-alt text-white"></i>
              <span className="font-medium">Cleanup Log</span>
            </motion.button>
          </ButtonsComponent>
        </div>
        {addModal && <PromoAddCode onCancel={() => setAddModal(false)} />}
        <TableComponent data={promoCodes} columns={columns} />
      </div>
      {isDelete && (
        <>
          <ConfirmationModal
            confirmType={ConfirmActionType.DELETION}
            onCancel={() => setIsDelete(false)}
            onConfirm={() => handleDeletion()}
          />
        </>
      )}
      {isShow && (
        <>
          <PromoView data={promoData} onClose={() => handleCloseAdd()} />
        </>
      )}
      {isEdit && (
        <>
          <PromoEdit data={editData} onCancel={() => handleCloseEdit()} />
        </>
      )}
      {isPromoLog && (
        <>
          <PromoLog isOpen={isPromoLog} onClose={() => setIsPromoLog(false)} />
        </>
      )}
    </>
  );
};

export default PromoDashboard;
