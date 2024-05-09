import { apiRequest } from "../api/api";
import { getPosts } from "../redux/slice/postSlice";

export const handleFileUploaded = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "cuisinehub");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload/`,
      formData
    );
    return response.data.secure_url;
  } catch (err) {
    console.log(err);
  }
};

export const fetchPostsRequest = async (token, dispatch, uri) => {
  try {
    const response = await apiRequest({
      url: uri || "/posts",
      token: token,
      method: "POST",
      data: data || {},
    });

    dispatch(getPosts(response?.data));
    return;
  } catch (err) {
    console.log(err);
  }
};

export const likePost = async ({ uri, token }) => {
  try {
    const response = await apiRequest({
      url: uri,
      token: token,
      method: "POST",
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async ({ id, token }) => {
  try {
    await apiRequest({
      url: "/post/" + id,
      token: token,
      method: "DELETE",
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

export const getUserInfo = async (token, id) => {
  try {
    const uri = id === undefined ? "/users/get-user" : "/users/get-user" + id;
    const response = await apiRequest({
      url: uri,
      token: token,
      method: "POST",
    });

    if (response?.message === "Authentication failed") {
      localStorage.removeItem("user");
      window.alert("User session has expired. Login again");
      window.location.replace("/login");
    }

    return response?.user;
  } catch (err) {
    console.log(err);
  }
};

export const viewUserProfile = async (token, id) => {
  try {
    const response = await apiRequest({
      url: "/users/profile-view",
      token: token,
      method: "POST",
      data: { id },
    });

    return;
  } catch (err) {
    console.log(err);
  }
};

export const sendFriendRequest = async (token, id) => {
  try {
    const response = await apiRequest({
      url: "users/friend-request",
      token: token,
      method: "POST",
      data: {
        receiver: id,
      },
    });

    return;
  } catch (err) {
    console.log(err);
  }
};
