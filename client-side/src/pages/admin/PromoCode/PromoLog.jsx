import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPromoLog } from "../../../api/promo";

const PromoLog = ({ isOpen, onClose }) => {
  const [promoLog, setPromoLog] = useState([]);

  const fetchPromoLog = async () => {
    try {
      const data = await getPromoLog();
      console.log(data);
      setPromoLog(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPromoLog();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  // Pagination logic
  const indexOfLast = currentPage * logsPerPage;
  const indexOfFirst = indexOfLast - logsPerPage;
  const currentLogs = promoLog.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(promoLog.length / logsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Clean-up Promo Logs
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-gray-700">#</th>
                <th className="px-4 py-2 border-b text-gray-700">
                  Description
                </th>
                <th className="px-4 py-2 border-b text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.length > 0 ? (
                currentLogs.map((log, index) => (
                  <tr
                    key={log._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 border-b text-gray-600">
                      {(currentPage - 1) * logsPerPage + (index + 1)}
                    </td>
                    <td className="px-4 py-2 border-b text-gray-800">
                      {log.description}
                    </td>
                    <td className="px-4 py-2 border-b text-gray-500">
                      {new Date(log.date).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center text-gray-500 py-4 italic"
                  >
                    No logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 gap-2">
            <button
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-gray-700 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PromoLog;
