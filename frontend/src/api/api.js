import axios from "axios";

const apiUrl = "http://localhost:3005";
export const apiServer = axios.create({
  baseURL: apiUrl,
  responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await apiServer(url, {
      method: method || "GET",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result?.data;
  } catch (err) {
    const error = err.response.data;
    console.log(error);
    return { status: error.success, message: error.message };
  }
};
