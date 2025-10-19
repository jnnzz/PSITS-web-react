import "../App.css";
import { showToast } from "../utils/alertHelper";
import backendConnection from "./backendApi";
import axios from "axios";

const token = sessionStorage.getItem("Token");

export const createPromoCode = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(
      `${backendConnection()}/api/promo/create`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
        showToast("success", response.data.message);
        return true;
    } else {
        showToast("error", response.data.message);
        return false;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      showToast("error", error.response.data.message || "An error occurred");
    } else {
      showToast("error", "An error occurred");
    }
    console.error("Error:", error);
  }
};
