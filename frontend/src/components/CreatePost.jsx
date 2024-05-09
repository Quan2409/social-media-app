import React, { useState, useRef } from "react";
import Modal from "react-modal";
import NoProfile from "../assets/images/user-profile.svg";
import style from "../styles/page/create.module.css";
import * as yup from "yup";

//config react-modal
Modal.setAppElement("#root");

const CreatePost = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  //validation schema
  const validationSchema = yup.object({
    title: yup.string().required("Wire a title, please"),
    description: yup.string().required("Wire some description, please"),
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // handle change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    try {
      await yup.reach(validationSchema, name).validate(value);
      setError({ ...error, [name]: "" });
    } catch (err) {
      setError({ ...error, [name]: err.message });
    }
  };

  // handle submit
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Valid Data: ", formData);
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setError(errors);
    }
  };

  return (
    <>
      <div className={style["create-post"]}>
        <div className={style["form"]}>
          <figure>
            <img
              src={user?.avatar ?? NoProfile}
              alt="avatar"
              className={style["avatar"]}
              width={50}
              height={50}
            />
          </figure>
          <div>
            <input
              type="text"
              placeholder="What's the content today ?"
              onClick={openModal}
              ref={modalRef}
            />
            {/* modal */}
            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              className={style["modal"]}
            >
              <div className={style["modal-form"]}>
                <form onSubmit={handlePostSubmit}>
                  <h1 className={style["modal-title"]}>Create New Post</h1>

                  <input
                    className={style["title-ip"]}
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                  />
                  {error.title && (
                    <p className={style["error"]}>{error.title}</p>
                  )}

                  <textarea
                    className={style["title-ip"]}
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                  />
                  {error.description && (
                    <p className={style["error"]}>{error.description}</p>
                  )}

                  <div>
                    <label
                      htmlFor="fileInput"
                      className={style["custom-file-upload"]}
                    >
                      {/* {fileName !== "" ? fileName : "Choose file"} */}
                      Choose File
                      <input
                        id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                        onChange={() => {}}
                      />
                    </label>
                  </div>

                  <div className={style["btn-actions"]}>
                    <button className={style["post-btn"]}>Post</button>
                    <button className={style["close-btn"]} onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
