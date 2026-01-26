import backendConnection from "../api/backendApi";
import { setInformationData } from "./Authentication";
import { getInformationData } from "./Authentication";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import {
  executiveAndAdminConditionalAccess,
  financeConditionalAccess,
  restrictedComponent,
  restrictedComponentOtherCampus,
  noneConditionalAccess,
} from "../components/tools/clientTools";
import DocsLoginModal from "../components/docs/DocsLoginModal";

const PrivateRouteAdmin = ({ element: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const token = sessionStorage.getItem("Token");
  const location = useLocation();
  const lastPart = location.pathname.split("/").pop();
  const secondToTheLast = location.pathname.split("/").slice(-2, -1)[0];
  const thirdToTheLast = location.pathname.split("/").slice(-3)[0];
  const fifthToTheLast = location.pathname.split("/").slice(-6, -4)[0];
  const user = getInformationData();

  const unauthorized =
    !executiveAndAdminConditionalAccess() &&
    !financeConditionalAccess() &&
    restrictedComponent().includes(lastPart);
  const campus = user.campus === "UC-Main";
  const other_campus_authorized =
    restrictedComponentOtherCampus().includes(fifthToTheLast) ||
    restrictedComponentOtherCampus().includes(secondToTheLast) ||
    restrictedComponentOtherCampus().includes(thirdToTheLast) ||
    restrictedComponentOtherCampus().includes(lastPart);

  const checkAuthentication = async () => {
    // Check if this is a docs route
    const isDocsRoute = location.pathname.startsWith('/docs');
    
    // Get fresh token from sessionStorage each time
    const currentToken = sessionStorage.getItem("Token");
    
    // If no token, show modal for docs routes or redirect for admin routes
    if (!currentToken) {
      setIsAuthenticated(false);
      if (isDocsRoute) {
        setShowDocsModal(true);
      }
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.get(
        `${backendConnection()}/api/protected-route-admin`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      setInformationData(response.data.user, response.data.user.role);
      if (response.data.user.role === "Admin") {
        setIsAuthenticated(true);
        setShowDocsModal(false);
      } else {
        setIsAuthenticated(false);
        if (isDocsRoute) {
          setShowDocsModal(true);
        }
      }
    } catch (error) {
      console.error("Not authorized:");
      setIsAuthenticated(false);
      if (isDocsRoute) {
        setShowDocsModal(true);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleDocsLoginSuccess = () => {
    // Recheck authentication after successful login
    setShowDocsModal(false);
    setIsAuthenticated(false);
    setLoading(true);
    
    // Small delay to ensure token is saved in sessionStorage
    setTimeout(() => {
      checkAuthentication();
    }, 100);
  };

  const handleDocsModalClose = () => {
    // User cancelled login - redirect to home
    setShowDocsModal(false);
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="relative min-h-screen flex justify-center items-center bg-gray-100 px-4">
        <div className="flex justify-center items-center h-60vh">
          <InfinitySpin
            visible={true}
            width={200}
            color="#0d6efd"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      </div>
    );
  }

  // Show docs login modal for docs routes when not authenticated
  if (showDocsModal) {
    return (
      <DocsLoginModal
        onClose={handleDocsModalClose}
        onLoginSuccess={handleDocsLoginSuccess}
      />
    );
  }

  return unauthorized && campus && !noneConditionalAccess() ? (
    <Navigate to="/admin/dashboard" replace />
  ) : !campus && !other_campus_authorized && !noneConditionalAccess() ? (
    <Navigate to="/admin/events" replace />
  ) : isAuthenticated && !noneConditionalAccess() ? (
    <Component />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRouteAdmin;
