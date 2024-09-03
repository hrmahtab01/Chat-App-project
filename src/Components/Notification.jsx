import React from "react";
import GroupListCom from "./GroupListCom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const Notification = () => {
  return (
    <div className="w-full  relative h-[59px] my-9 ">
      <input
        type="text"
        placeholder="Search"
        className=" w-full h-full shadow-lg rounded-[20px] placeholder:absolute placeholder:top-2/4 placeholder:left-14 placeholder:translate-y-[-50%] outline-none type pl-16"
      />
      <CiSearch className="absolute top-2/4 left-4 translate-y-[-50%] text-[19px] text-ThirdColor font-bold" />
      <BsThreeDotsVertical className="absolute right-0 top-2/4  translate-y-[-50%] text-Secondary text-lg" />
    </div>
  );
};

export default Notification;
