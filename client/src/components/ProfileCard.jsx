import React from "react";
import style from "../style/components/profileCard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import { LiaEditSolid } from "react-icons/lia";
import { CiLocationOn } from "react-icons/ci";
import Avatar from "../assets/avatar.png";

const ProfileCard = ({ user }) => {
  const { user: data } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className={style["profile-card"]}>
      <div className={style["profile-info"]}>
        <Link to="profile/:id">
          <img src={Avatar} alt="" className={style["profile-info__avatar"]} />
        </Link>
        <div>
          <p className={style["profile-info__name"]}>
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : "No Name"}
          </p>
          <p className={style["profile-info__profession"]}>
            {user?.profession ?? "No Profession"}
          </p>
        </div>
        <LiaEditSolid className={style["edit-ic"]} />
      </div>

      <div className={style["detail-info"]}>
        <div className={style["detail-info__location"]}>
          <CiLocationOn className="text-xl text-ascent-1 location-ic" />
          <span>{user?.location ?? "Add Location"}</span>
        </div>
        <div className={style["detail-info__profession"]}>
          <BsBriefcase className="text-xl text-ascent-1 suitcase-ic" />
          <span>{user?.profession ?? "Add Profession"}</span>
        </div>
      </div>

      <div className={style["other-information"]}>
        <div className={style["other-information__joined"]}>
          <p>Joined</p>
          <span>Time</span>
        </div>

        <div className={style["other-information__viewer"]}>
          <p>Viewer</p>
          <span>{user?.views} 0 </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
