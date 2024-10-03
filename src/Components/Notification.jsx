import React from "react";
import GroupListCom from "./GroupListCom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";

const Notification = () => {
  return (
    <>
      <div className="w-full mt-7 lg:mt-0">
        <div className="w-full  relative h-[59px] my-9  ">
          <input
            type="text"
            placeholder="Search"
            className=" w-full h-full shadow-lg rounded-[20px] placeholder:absolute placeholder:top-2/4 placeholder:left-14 placeholder:translate-y-[-50%] outline-none type pl-16"
          />
          <CiSearch className="absolute top-2/4 left-4 translate-y-[-50%] text-[19px] text-ThirdColor font-bold" />
          <BsThreeDotsVertical className="absolute right-0 top-2/4  translate-y-[-50%] text-Secondary text-lg" />
        </div>
        <div className="w-full  shadow-md rounded-[20px] mt-6 px-8">
          <div className="border-b border-ThirdColor/25 pb-6 flex items-center pt-7 ml-8 gap-10">
            <div className=" ">
              <IoIosNotifications className="text-3xl text-Secondary" />
            </div>
            <p className="text-[16px] font-Nunito font-medium text-ThirdColor w-[1100px]">
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              voluptate aute id deserunt nisi.
            </p>
          </div>
          <div className="border-b border-ThirdColor/25 pb-6 flex items-center pt-7 ml-8  gap-10">
            <div className=" ">
              <IoIosNotifications className="text-3xl text-Secondary" />
            </div>
            <p className="text-[16px] font-Nunito font-medium text-ThirdColor ">
              So yes, the alcohol (ethanol) in hand sanitizers can be absorbed
              through the skin, but no, it would not cause intoxication.
            </p>
          </div>
          <div className="border-b border-ThirdColor/25 pb-6 flex items-center pt-7 ml-8 gap-10 ">
            <div className="">
              <IoIosNotifications className="text-3xl text-Secondary" />
            </div>
            <p className="text-[16px] font-Nunito font-medium text-ThirdColor ">
              How a visual artist redefines success in graphic design
            </p>
          </div>
          <div className="border-b border-ThirdColor/25 pb-6 flex items-center pt-7 ml-8 gap-10">
            <div className=" ">
              <IoIosNotifications className="text-3xl text-Secondary" />
            </div>
            <p className="text-[16px] font-Nunito font-medium text-ThirdColor w-[900px] ">
              For athletes, high altitude produces two contradictory effects on
            </p>
          </div>
          <div className="border-b border-ThirdColor/25 pb-6 flex items-center pt-7 ml-8 gap-10">
            <div className=" ">
              <IoIosNotifications className="text-3xl text-Secondary" />
            </div>
            <p className="text-[16px] font-Nunito font-medium text-ThirdColor ">
              consectetur adipiscing elit duis tristique sollicitudin nibh sit
              amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus
              vitae congue
            </p>
          </div>
          <div className="border-b border-ThirdColor/25 pb-6 flex items-center pt-7 ml-8 gap-10 ">
            <IoIosNotifications className="text-3xl text-Secondary" />
            <p className="text-[16px] font-Nunito font-medium text-ThirdColor ">
              In fermentum posuere urna nec
            </p>
          </div>
          <div className="border-b border-ThirdColor/25 pb-6 flex items-center pt-7 ml-8 gap-10 ">
            <IoIosNotifications className="text-3xl text-Secondary" />
            <p className="text-[16px] font-Nunito font-medium text-ThirdColor ">
              ID: 22739
            </p>
          </div>
          <div className="flex items-center pt-7 ml-8 gap-10 pb-16">
            <div className="   ">
              <IoIosNotifications className="text-3xl text-Secondary" />
            </div>
            <p className="text-[16px] font-Nunito font-medium text-ThirdColor ">
              How We Keep Brand Consistency in Our Visual Language — A Design
              System for Illustrations
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
