import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";

const SettingsCom = () => {
  return (
    <div className="w-full lg:px-10 lg:mt-0 mt-7 mb-7 lg:mb-0">
      <div className="w-full  relative h-[59px] my-9 lg:block hidden ">
        <input
          type="text"
          placeholder="Search"
          className=" w-full h-full shadow-md shadow-ThirdColor rounded-[20px] placeholder:absolute placeholder:top-2/4 placeholder:left-14 placeholder:translate-y-[-50%] outline-none type pl-16 text-xl"
        />
        <CiSearch className="absolute top-2/4 left-4 translate-y-[-50%] text-[19px] text-ThirdColor font-bold" />
        <BsThreeDotsVertical className="absolute right-0 top-2/4  translate-y-[-50%] text-Secondary text-lg" />
      </div>
      <div className="gap-9 grid grid-cols-1 lg:grid-cols-2">
        <ProfileSettings />
        <AccountSettings />
      </div>
    </div>
  );
};

export default SettingsCom;
