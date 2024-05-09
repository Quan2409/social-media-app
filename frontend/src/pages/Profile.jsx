import React from "react";
import noProfile from "../assets/images/user-profile.svg";
import style from "../styles/page/profile.module.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUpdateProfile } from "../redux/slice/userSlice";
import EditProfile from "../components/EditProfile";

const Profile = ({ user }) => {
  const { user: data, isEdit } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <div className={style["user-profile"]}>
        <div className={style["profile"]}>
          <figure>
            <Link to={"/profile/" + user?._id}>
              <img
                src={user?.avatar ?? noProfile}
                alt={user?.email}
                className={style["profile-avatar"]}
                width={50}
                height={50}
              />
            </Link>
          </figure>
          <div>
            <p className={style["username"]}>
              {user?.firstName ?? "No Name"} {user?.lastName}
            </p>
            <p className={style["profession"]}>
              {user?.profession ?? "No Profession"}
            </p>
          </div>

          {user?._id === data?._id ? (
            <>
              <button
                className={style["edit-btn"]}
                onClick={() => dispatch(setUpdateProfile(true))}
              >
                Edit
              </button>
            </>
          ) : (
            <button className={style["edit-btn"]} onClick={() => {}}>
              Add
            </button>
          )}
        </div>
        <div className={style["information"]}>
          <span className={style["profile-location"]}>
            {user?.location ?? "Add Location"}
          </span>
          <span className={style["profile-profession"]}>
            {user?.profession ?? "Add Profession"}
          </span>
          <span className={style["join-time"]}>
            <b>Joined at</b>: {moment(user?.createdAt).fromNow()}
          </span>
        </div>
      </div>

      {isEdit && <EditProfile />}
    </>
  );
};

export default Profile;
