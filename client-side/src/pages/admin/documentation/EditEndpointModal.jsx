import React from "react";
import AddEndpointModal from "./AddEndpointModal";

const EditEndpointModal = ({ isOpen, onClose, onSuccess, endpointData }) => {
  return (
    <AddEndpointModal
      isOpen={isOpen}
      onClose={onClose}
      onSuccess={onSuccess}
      initialData={endpointData}
    />
  );
};

export default EditEndpointModal;
