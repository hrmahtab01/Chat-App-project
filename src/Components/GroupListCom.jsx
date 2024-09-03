import React from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import progileimage from "../assets/mahtab.jpg";
import Profileimage2 from "../assets/Signin.png"
import profileimage3 from "../assets/Signup.jpg"
import { FaPlus } from "react-icons/fa6";

const GroupListCom = () => {
  return (
    <section>
      <div className="  ">
        <div className="w-[427px]  relative h-[59px] ">
          <input
            type="text"
            placeholder="Search"
            className=" w-full h-full shadow-lg rounded-[20px] placeholder:absolute placeholder:top-2/4 placeholder:left-14 placeholder:translate-y-[-50%] outline-none type pl-16"
          />
          <CiSearch className="absolute top-2/4 left-4 translate-y-[-50%] text-[19px] text-ThirdColor font-bold" />
          <BsThreeDotsVertical className="absolute right-0 top-2/4  translate-y-[-50%] text-Secondary text-lg" />
        </div>

         <div className="w-[427px] shadow-xl rounded-[20px]  py-4 px-6  mt-[43px]">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
            Groups List
            </h3>
            <BsThreeDotsVertical className="text-Secondary" />
          </div>

          <div className="w-full h-[347px] overflow-y-scroll cursor-pointer ">
            <div className="flex justify-between items-center  border-b border-black/25 pb-3 mt-4">
              <div className="flex gap-3 mt-[17px]">
                <img
                  src={Profileimage2}
                  alt="progileimage"
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
                <div className="">
                  <h3 className="text-lg font-semibold font-Nunito text-ThirdColor">
                  Friends Reunion
                  </h3>
                  <p className="text-sm font-medium text-FourColor">
                  Hi Guys, Wassup!
                  </p>
                </div>
              </div>
              <button className="px-5 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] ">
             Join
                </button>
            </div>
            <div className="flex justify-between items-center  border-b border-black/25 pb-3 mt-4">
              <div className="flex gap-3 mt-[17px]">
                <img
                  src={profileimage3}
                  alt="progileimage"
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
                <div className="">
                  <h3 className="text-lg font-semibold font-Nunito text-ThirdColor">
                  Friends Forever
                  </h3>
                  <p className="text-sm font-medium text-FourColor font-Nunito">Good to see you.</p>
                </div>
              </div>
              <button className="px-5 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] ">
             Join
                </button>
            </div>
            <div className="flex justify-between items-center  border-b border-black/25 pb-3 mt-4">
              <div className="flex gap-3 mt-[17px]">
                <img
                  src={progileimage}
                  alt="progileimage"
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
                <div className="">
                  <h3 className="text-lg font-semibold font-Nunito text-ThirdColor">
                  Hi Guys
                  </h3>
                  <p className="text-sm font-medium text-FourColor font-Nunito">
                  What plans today?
                  </p>
                </div>
              </div>
              <button className="px-5 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] ">
             Join
                </button>
            </div>
            <div className="flex justify-between items-center  border-b border-black/25 pb-3 mt-4">
              <div className="flex gap-3 mt-[17px]">
                <img
                  src={profileimage3}
                  alt="progileimage"
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
                <div className="">
                  <h3 className="text-lg font-semibold font-Nunito text-ThirdColor">
                  Crazy Cousins
                  </h3>
                  <p className="text-xs font-normal text-FourColor/75">
                  Hi Guys, Wassup!
                  </p>
                </div>
              </div>
              <button className="px-5 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] ">
             Join
                </button>
            </div>
            <div className="flex justify-between items-center  border-b border-black/25 pb-3 mt-4">
              <div className="flex gap-3 mt-[17px]">
                <img
                  src={profileimage3}
                  alt="progileimage"
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
                <div className="">
                  <h3 className="text-lg font-semibold font-Nunito text-ThirdColor">
                    Kiran
                  </h3>
                  <p className="text-xs font-normal text-FourColor/75">
                  Good to see you.
                  </p>
                </div>
              </div>
              <button className="px-5 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] ">
             Join
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupListCom;
