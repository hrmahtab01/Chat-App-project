import React from "react";
import mahtabimg from "../assets/mahtab.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatComponent = () => {
  return (
    <div className="w-[1000px] h-screen shadow-md rounded-[16px]">
      <div className="flex justify-between items-center  border-b border-black/25 pb-6 mt-4 px-8">
        <div className="flex gap-3  relative">
          <img
            src={mahtabimg}
            alt="progileimage"
            className="w-[70px] h-[70px] rounded-full object-cover "
          />
          <div className="w-4 h-4 bg-[#008000] absolute right-[90px] bottom-0 rounded-full"></div>
          <div className="">
            <h3 className="text-xl font-semibold font-Nunito text-ThirdColor">
              Raghav
            </h3>
            <p className="text-sm font-normal text-FourColor/75">Online</p>
          </div>
        </div>
        <BsThreeDotsVertical />
      </div>
    <div>
    <div className="relative overflow-hidden">
        <div className="w-[200px]  h-[60px] bg-[#F1F1F1]  rounded-[10px] mt-[56px] ml-[54px] flex justify-center items-center ">
            <h3 className="text-[16px] font-semibold font-Nunito text-ThirdColor">Hey There !</h3>
        </div>
        <div className="w-[30px] h-[30px] bg-[#f1f1f1] rotate-[200deg] absolute left-12 bottom-[-5px]"></div>
      </div>
      <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1">Today, 2:01pm</p>
      <div className="relative overflow-hidden ">
        <div className="w-[245px]  h-[60px] bg-[#F1F1F1]  rounded-[10px] mt-[29px] ml-[54px] flex justify-center items-center ">
            <h3 className="text-[16px] font-semibold font-Nunito text-ThirdColor">How are you doing?</h3>
        </div>
        <div className="w-[30px] h-[30px] bg-[#f1f1f1] rotate-[200deg] absolute left-12 bottom-[-5px]"></div>
      </div>
      <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1">Today, 2:02pm</p>
      
    </div>
  
    </div>
  );
};

export default ChatComponent;
