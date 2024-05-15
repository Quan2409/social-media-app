export const server = "http://localhost:4000";

// export const api = axios.create({
//   baseURL: server,
//   responseType: "json",
// });

// export const sendRequest = async ({ url, token, data, method }) => {
//   try {
//     const response = await api(url, {
//       method: method || "GET",
//       data: data,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token ? `Bearer ${token}` : "",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     const errors = error.response.data;
//     console.error(errors);
//     return {
//       message: errors.message,
//     };
//   }
// };
