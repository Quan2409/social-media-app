import axios from "axios";
import { server } from "../config/api-config";

export const registerRequest = async (formData) => {
  try {
    const response = await axios.post(`${server}/auth/register`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Server error occurred");
  }
};

export const loginRequest = async (formData) => {
  try {
    const response = await axios.post(`${server}/auth/login`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Server error occurred");
  }
};
