import React from "react";
import profileimg from "../assets/mahtab.jpg";
import { RiEdit2Fill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";
import { useSelector } from "react-redux";

const ProfileSettings = () => {
  const data = useSelector((state) => state.UserData.value);
  return (
    <div className="w-full h-[750px] shadow-md rounded-[16px] py-7 px-7 ">
      <div className="">
        <p className="font-semibold text-xl font-Nunito text-ThirdColor">
          Profile Settings
        </p>
        <div className=" pt-[49px] flex items-center gap-7 border-b border-ThirdColor/25 pb-7 ml-3  ">
          <img
            className="w-[100px] h-[100px] rounded-full object-cover"
            src={data.photoURL}
            alt=""
          />
          <div>
            <h3 className="font-semibold text-[25px] text-ThirdColor font-Nunito">
              {data.displayName}
            </h3>
            <p className="font-normal font-Nunito text-xl text-ThirdColor">
              Stay home stay safe
            </p>
          </div>
        </div>
        <ul className="flex flex-col gap-9 pl-8  mt-11">
          <li className="flex items-center gap-9 text-3xl">
            {" "}
            <RiEdit2Fill className="text-Secondary cursor-pointer hover:text-ThirdColor duration-300" />{" "}
            Edit Profile Name.
          </li>
          <li className="flex items-center gap-9 text-3xl">
            {" "}
            <MdEditDocument className="text-Secondary cursor-pointer hover:text-ThirdColor duration-300" />{" "}
            Edit Profile Status Info.
          </li>
          <li className="flex items-center gap-9 text-3xl">
            {" "}
            <MdAddPhotoAlternate className="text-Secondary cursor-pointer hover:text-ThirdColor duration-300" />{" "}
            Edit Profile Photo.
          </li>
          <li className="flex items-center gap-9 text-3xl">
            <IoMdHelpCircle className="text-Secondary cursor-pointer hover:text-ThirdColor duration-300" />{" "}
            Help.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSettings;
