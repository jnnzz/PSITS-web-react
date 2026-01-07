import "../App.css";
import { showToast } from "../utils/alertHelper";
import backendConnection from "./backendApi";
import axios, { AxiosResponse } from "axios";

// Helper to read the token at call time (keeps behavior consistent if sessionStorage changes)
const getToken = (): string | null => sessionStorage.getItem("Token");

const getAuthHeaders = (hasJsonContent = true) => {
  const token = getToken();
  const headers: Record<string, string> = {};
  if (hasJsonContent) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

export const requestMembership = async (id_number: string): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${backendConnection()}/api/students/request`,
      { id_number },
      {
        headers: getAuthHeaders(true),
      }
    );

    if (response.status === 200) {
      showToast("success", response.data.message);
    } else {
      showToast("error", response.data.message);
    }
  } catch (error: any) {
    if (error?.response?.data) {
      showToast("error", error.response.data.message || "An error occurred");
    } else {
      showToast("error", "An error occurred");
    }
    console.error("Error:", error);
  }
};

export const getMembershipStatusStudents = async (id_number: string): Promise<any | undefined> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendConnection()}/api/students/get-membership-status/${id_number}`,
      {
        headers: getAuthHeaders(true),
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    if (error?.response?.data) {
      console.log(error.response.data.message);
    } else {
      console.log(error?.response?.data?.message ?? "An error occurred");
    }
    console.error("Error:", error);
  }
};

export const addToCartApi = async (formData: any): Promise<boolean | void> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${backendConnection()}/api/cart/add-cart`,
      formData,
      {
        headers: getAuthHeaders(true),
      }
    );

    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error: any) {
    if (error?.response?.data) {
      showToast("error", error.response.data.message || "An error occurred");
    } else {
      showToast("error", "An error occurred");
    }
    console.error("Error:", error);
  }
};

export const viewCart = async (id_number: string): Promise<any | null | void> => {
  try {
    const response: AxiosResponse = await axios.get(`${backendConnection()}/api/cart/view-cart`, {
      params: { id_number },
      headers: getAuthHeaders(true),
    });

    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error: any) {
    console.error("Error:", error);
  }
};

export const deleteItem = async (data: any): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${backendConnection()}/api/cart/delete-item-cart`,
      data,
      {
        headers: getAuthHeaders(true),
      }
    );

    if (response.status === 200) {
      showToast("success", response.data.message);
      window.location.reload();
    } else {
      showToast("error", response.data.message);
    }
  } catch (error: any) {
    if (error?.response?.data) {
      console.error("Error:", error);
    } else {
      console.error("Error:", error);
    }
    console.error("Error:", error);
  }
};

export const fetchSpecificStudent = async (id_number: string): Promise<any | null | void> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendConnection()}/api/fetch-specific-student/${id_number}`,
      {
        headers: getAuthHeaders(true),
      }
    );

    if (response.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error: any) {
    if (error?.response?.data) {
      console.error("Error:", error);
    } else {
      console.error("Error:", error);
    }
    console.error("Error:", error);
  }
};

export const searchStudentById = async (id_number: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendConnection()}/api/admin/student_search/${id_number}`,
      {
        headers: getAuthHeaders(true),
      }
    );
    return response.data.data;
  } catch (error: any) {
    throw error?.response?.data?.message || "An error occurred while searching.";
  }
};

export const updateStudentYearLevelForCurrentYear = async (
  id_number: string,
  yearToUpdate: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(
      `${backendConnection()}/api/students/edit-year-level/${id_number}`,
      { year: yearToUpdate },
      {
        headers: getAuthHeaders(true),
      }
    );
    return response.data; // Contains message and updatedStudent data
  } catch (error: any) {
    console.error("Student year level update error: ", error);
    throw error;
  }
};

export const isStudentYearUpdated = async (id_number: string): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${backendConnection()}/api/students/is-year-updated/${id_number}`,
      {
        headers: getAuthHeaders(true),
      }
    );

    return response.data.isYearUpdated;
  } catch (error: any) {
    console.error("Fetching isStudentYearUpdate error: ", error);
    throw error;
  }
};
