import React from "react";
import style from "../style/components/loading.module.css";

const Loading = () => {
  return (
    <div className={style["dots-container"]}>
      <div className={style["dot"]}></div>
      <div className={style["dot"]}></div>
      <div className={style["dot"]}></div>
      <div className={style["dot"]}></div>
      <div className={style["dot"]}></div>
    </div>
  );
};

export default Loading;
