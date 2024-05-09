import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { setUpdateProfile } from "../redux/slice/userSlice";
import style from "../styles/page/updateProfile.module.css";

//config react-modal
Modal.setAppElement("#root");

const EditProfile = () => {
  const { user, isEdit } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [error, setError] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);

  //handle change
  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };

  //handle submit
  const handleUpdate = () => {
    //
  };

  const closeModal = () => {
    dispatch(setUpdateProfile(false));
  };

  return (
    <>
      <div>
        <Modal
          isOpen={isEdit}
          onRequestClose={closeModal}
          className={style["modal"]}
        >
          <form onSubmit={handleUpdate}>
            <h1 className={style["modal-title"]}>Update Profile</h1>
            <input
              className={style["firstName-ip"]}
              type="text"
              name="firstName"
              placeholder="First Name"
              value={user?.firstName}
            />
            <input
              className={style["lastName-ip"]}
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={user?.lastName}
            />
            <input
              className={style["lastName-ip"]}
              type="text"
              name="location"
              placeholder="Location"
            />
            <input
              className={style["lastName-ip"]}
              type="text"
              name="profession"
              placeholder="Profession"
            />

            <div>
              <label
                htmlFor="fileInput"
                className={style["custom-file-upload"]}
              >
                {/* {fileName !== "" ? fileName : "Choose file"} */}
                Choose Avatar
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleSelect(e);
                  }}
                />
              </label>
            </div>
            <div className={style["btn-actions"]}>
              <button className={style["update-btn"]}>Update</button>
              <button className={style["close-btn"]} onClick={closeModal}>
                Close
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default EditProfile;
