import axios from "axios";
import { server } from "../config/api-config";

export const resetPasswordRequest = async (email) => {
  try {
    const response = await axios.post(`${server}/user/send-request`, email);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Server error occurred");
  }
};
