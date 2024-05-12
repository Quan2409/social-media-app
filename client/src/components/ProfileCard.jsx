import React from "react";
import style from "../style/components/profileCard.module.css";
import cardStyle from "../style/components/user.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import { LiaEditSolid } from "react-icons/lia";
import { CiLocationOn } from "react-icons/ci";
import Avatar from "../assets/avata.png";

const ProfileCard = () => {
  const { user: data } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <div className={style["profile-card"]}>
        <div className={cardStyle["profile-info"]}>
          <Link to="">
            <img
              src={Avatar}
              alt=""
              className={cardStyle["profile-info__avatar"]}
            />
          </Link>
          <div>
            <p className={cardStyle["profile-info__name"]}>Your Name</p>
            <p className={cardStyle["profile-info__profession"]}>Profession</p>
          </div>
        </div>
        <LiaEditSolid className={cardStyle["edit-ic"]} />

        <div className={style["profile-info__location"]}>
          <CiLocationOn className="text-xl text-ascent-1 location-ic" />
          <span>Add Location</span>
        </div>
        <div className={style["profile-info__profession"]}>
          <BsBriefcase className="text-xl text-ascent-1 suitcase-ic" />
          <span>Add Profession</span>
        </div>

        <div className={style["other-information"]}>
          <h2>0 Friends</h2>
          <div className={style["viewer"]}>
            <p>Who views your profile</p>
            <span>0</span>
          </div>
          <div className={style["joined"]}>
            <p>Joined</p>
            <span>Time</span>
          </div>
        </div>
      </div>

      {/* <div className="w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-6">
        <div className="w-full flex items-center justify-between border-b pb-5 border-[#66666645]">
          <Link className="flex gap-2">
            <img
              src={Avatar}
              alt="Avatar"
              className="w-14 h-14 object-cover rounded-r-full rounded-l-full"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium text-ascent-1">Your Name</p>
              <p className="text-ascent-2">Profession</p>
            </div>
          </Link>
          <div>
            
          </div>
        </div>


        <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
          <p className="text-xl text-ascent-1 font-semibold">Friends</p>

          <div className="flex items-center justify-between">
            <span className="text-ascent-2">Who view your profile</span>
            <span className="text-ascent-1 text-lg">0</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-ascent-2">Joined</span>
            <span className="text-ascent-1 text-base">...</span>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProfileCard;
