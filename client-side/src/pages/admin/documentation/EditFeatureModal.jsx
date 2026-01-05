import React from "react";
import AddFeatureModal from "./AddFeatureModal";

const EditFeatureModal = ({ isOpen, onClose, onSuccess, featureData }) => {
  return (
    <AddFeatureModal
      isOpen={isOpen}
      onClose={onClose}
      onSuccess={onSuccess}
      initialData={featureData}
    />
  );
};

export default EditFeatureModal;
