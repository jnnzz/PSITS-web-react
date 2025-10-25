import TableComponent from "../../../components/Custom/TableComponent";
import ButtonsComponent from "../../../components/Custom/ButtonsComponent";
import { motion } from "framer-motion";
import PromoAddCode from "./PromoAddCode";
import React from "react";
import { getAllPromoCode, deletePromo } from "../../../api/promo";
import { FaTrash } from "react-icons/fa";
import ConfirmationModal from "../../../components/common/modal/ConfirmationModal";
import { ConfirmActionType } from "../../../enums/commonEnums";
const PromoDashboard = () => {
  const [addModal, setAddModal] = React.useState(false);
  const [promoCodes, setAllPromoCodes] = React.useState([]);
  const [isDelete, setIsDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");

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
      label: "Quantity",
    },
    {
      key: "actions",
      label: "",
      cell: (row) => (
        <ButtonsComponent>
          <button
            onClick={() => handleDelete(row._id)}
            className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            <FaTrash />
          </button>
        </ButtonsComponent>
      ),
    },
  ];

  return (
    <>
      <div>This is Promo Dashboard</div>

      <div>
        <div className="p-2 mb-5">
          <ButtonsComponent>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#0056b3" }} // Hover effect for primary
              whileTap={{ scale: 0.98, backgroundColor: "#003d7a" }} // Active effect for primary
              className="text-sm md:text-base bg-accent text-white flex items-center gap-2 px-5 py-2 border border-neutral-medium rounded-lg shadow-sm hover:shadow-md transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-highlight"
              onClick={handleViewAddModal}
            >
              <i className="fas fa-plus text-white"></i>
              <span className="font-medium">Add Promo Code</span>
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
    </>
  );
};

export default PromoDashboard;
