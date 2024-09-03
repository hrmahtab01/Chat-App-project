import React, { useState } from "react";
import profileimage from "../assets/mahtab.jpg";
import { FaHome } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [Active, SetActive] = useState(false);
  let data = useSelector((state)=>state.UserData.value)
  console.log(data);
  

  let handleActive = () => {
    SetActive(true);
  };
  return (
    <>
      <div className=" h-screen py-9 px-8">
        <div className="w-[186px] h-full bg-Secondary rounded-3xl">
          <div className="text-center">
            <img
              className="w-[100px] h-[100px] rounded-full mt-9 inline-block object-cover"
              src={data.photoURL}
              alt="profileimage"
            />
            <h2 className="text-xl font-semibold font-Nunito mt-2 text-[#fff]">{data.displayName}</h2>
          </div>
          <div className="w-full h-[89px] relative mt-[60px]  after:contents-[''] after:w-[8px] after:h-full after:bg-Secondary after:absolute after:top-0 after:right-0 after:rounded-s-[25px] after:shadow-md ">
            <div className="w-[161px] h-[89px]  bg-[#ffff]  ml-auto rounded-lg "></div>
            <FaHome className="text-[46px] absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] " />
          </div>
          <div className="w-full h-[89px] relative mt-[35px]  ">
            <div className="w-[161px] h-[89px]  bg-[#ffff] ml-auto rounded-lg hidden"></div>

            <AiOutlineMessage
              className="text-[46px] absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] text-[#fff] "
              onClick={handleActive}
            />
          </div>
          <div className="w-full h-[89px] relative mt-[35px]">
            <div className="w-[161px] h-[89px]  bg-[#ffff] ml-auto rounded-lg hidden"></div>
            <IoNotificationsOutline className="text-[46px] absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] text-[#fff]" />
          </div>
          <div className="w-full h-[89px] relative mt-[35px] ">
            <div className="w-[161px] h-[89px]  bg-[#ffff] ml-auto rounded-lg hidden"></div>
            <IoSettingsOutline className="text-[46px] absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] text-[#fff] " />
          </div>
          <div className="mt-[78px] flex justify-center text-[46px] text-[#FFF] ">
            <ImExit />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
