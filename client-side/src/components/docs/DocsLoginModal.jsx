import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { InfinitySpin } from "react-loader-spinner";
import FormInput from "../forms/FormInput";
import FormButton from "../forms/FormButton";
import { login } from "../../api/index";
import {
  attemptAuthentication,
  resetAttemptAuthentication,
  getTimeout,
  getAttemptAuthentication,
} from "../../authentication/Authentication";
import { showToast } from "../../utils/alertHelper";

const DocsLoginModal = ({ onClose, onLoginSuccess }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const [formData, setFormData] = useState({
    id_number: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval;
    if (remainingTime !== null && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [remainingTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    const idNumberRegex = /^\d{8}(-admin)?$/;

    if (!formData.id_number) {
      newErrors.id_number = "ID Number is required.";
    } else if (!idNumberRegex.test(formData.id_number)) {
      newErrors.id_number = "ID Number must be 8 digits.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      if (getAttemptAuthentication() < 3 && getTimeout() === null) {
        const data = await login(formData);

        if (data) {
          if (data.role === "Admin") {
            resetAttemptAuthentication();
            showToast("success", data.message);

            // Call the success callback to trigger authentication recheck
            if (onLoginSuccess) {
              onLoginSuccess();
            }
          } else {
            attemptAuthentication();
            setRemainingTime(60);
          }
        } else {
          attemptAuthentication();
          setRemainingTime(60);
        }
      } else {
        showToast(
          "error",
          `Maximum login attempts reached. Please wait ${remainingTime} seconds before trying again!`
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      showToast("error", "An unexpected error occurred. Please try again.");
    } finally {
      getTimeout();
      setIsLoading(false);
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    animate: { scale: 1 },
    whileHover: { scale: 0.98 },
    whileTap: { scale: 1 },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      {/* Overlay background - removed onClick to prevent accidental closing */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative rounded-xl shadow-2xl w-full max-w-md z-20 overflow-hidden transition-colors bg-white`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <InfinitySpin
              visible={true}
              width={200}
              color="#0d6efd"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-lock text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Authentication Required
              </h2>
              <p className="text-blue-100 text-sm">
                Please login to access the Developer Portal
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="p-6 space-y-5">
              <FormInput
                label="ID Number"
                type="text"
                id="id-number-docs"
                name="id_number"
                value={formData.id_number}
                onChange={handleChange}
                error={errors.id_number}
              />

              <FormInput
                label="Password"
                type="password"
                id="password-docs"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              <FormButton
                type="submit"
                text="Login to Continue"
                styles="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                variants={buttonVariants}
              />

              <div className="text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm transition-colors text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="px-6 py-4 border-t transition-colors bg-gray-50 border-gray-200">
              <p className="text-xs text-center text-gray-600">
                <i className="fas fa-info-circle mr-1"></i>
                Access is available to PSITS Admin accounts only
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default DocsLoginModal;
