import React from "react";
import mahtabimg from "../assets/mahtab.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const ChatComponent = () => {
  return (
    <div className="w-[1000px] pb-2  shadow-md rounded-[16px] px-8">
      <div className="flex justify-between items-center  border-b border-black/25 pb-6 mt-4 ">
        <div className="flex gap-3  relative">
          <img
            src={mahtabimg}
            alt="progileimage"
            className="w-[70px] h-[70px] rounded-full object-cover "
          />
          <div className="w-4 h-4 bg-[#00FF75] absolute right-[90px] bottom-0 rounded-full"></div>
          <div className="">
            <h3 className="text-xl font-semibold font-Nunito text-ThirdColor">
              Raghav
            </h3>
            <p className="text-sm font-normal text-FourColor/75">Online</p>
          </div>
        </div>
        <BsThreeDotsVertical />
      </div>
      <div className="border-b border-ThirdColor/25 pb-7">
        <div className="relative overflow-hidden">
          <div className="w-[200px]  h-[60px] bg-[#F1F1F1]  rounded-[10px] mt-[25px] ml-[54px] flex justify-center items-center ">
            <h3 className="text-[16px] font-semibold font-Nunito text-ThirdColor">
              Hey There !
            </h3>
          </div>
          <div className="w-[30px] h-[30px] bg-[#f1f1f1] rotate-[200deg] absolute left-12 bottom-[-5px]"></div>
        </div>
        <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1">
          Today, 2:01pm
        </p>
        <div className="relative overflow-hidden ">
          <div className="w-[245px]  h-[60px] bg-[#F1F1F1]  rounded-[10px] mt-[25px] ml-[54px] flex justify-center items-center ">
            <h3 className="text-[16px] font-semibold font-Nunito text-ThirdColor">
              How are you doing?
            </h3>
          </div>
          <div className="w-[30px] h-[30px] bg-[#f1f1f1] rotate-[200deg] absolute left-12 bottom-[-5px]"></div>
        </div>
        <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1">
          Today, 2:02pm
        </p>
        <div className="flex justify-end relative overflow-hidden  mt-[25px]">
          <div className="w-[123px] h-[60px] bg-Secondary rounded-xl flex justify-center items-center  ">
            <p className="text-[#fff] text-[16px] font-medium font-Nunito">
              Hello...
            </p>
          </div>
          <div className="w-[40px] h-[40px] bg-Secondary rotate-[-25deg] absolute right-[-9px] bottom-[-12px] "></div>
        </div>
        <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1 flex justify-end">
          Today, 2:12pm
        </p>
        <div className="flex justify-end relative overflow-hidden  mt-[25px]">
          <div className="w-[310px] h-[60px] bg-Secondary rounded-xl flex justify-center items-center  ">
            <p className="text-[#fff] text-[16px] font-medium font-Nunito">
              I am good and hoew about you?
            </p>
          </div>
          <div className="w-[40px] h-[40px] bg-Secondary rotate-[-25deg] absolute right-[-9px] bottom-[-12px] "></div>
        </div>
        <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1 flex justify-end">
          Today, 2:12pm
        </p>
        <div className="relative overflow-hidden">
          <div className="w-[420px]  h-[60px] bg-[#F1F1F1]  rounded-[10px] mt-[25px] ml-[54px] flex justify-center items-center ">
            <h3 className="text-[16px] font-semibold font-Nunito text-ThirdColor">
            I am doing well. Can we meet up tomorrow?
            </h3>
          </div>
          <div className="w-[30px] h-[30px] bg-[#f1f1f1] rotate-[200deg] absolute left-12 bottom-[-5px]"></div>
        </div>
        <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1">
          Today, 2:15pm
        </p>
        <div className="flex justify-end relative overflow-hidden  mt-[25px]">
          <div className="w-[120px] h-[60px] bg-Secondary rounded-xl flex justify-center items-center  ">
            <p className="text-[#fff] text-[16px] font-medium font-Nunito">
              Sure?
            </p>
          </div>
          <div className="w-[40px] h-[40px] bg-Secondary rotate-[-25deg] absolute right-[-9px] bottom-[-12px] "></div>
        </div>
        <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1 flex justify-end">
          Today, 2:16pm
        </p>
        
      </div>
     <div className="mt-[25px] flex justify-center gap-5">
     <div className="w-[530px] h-[45px] relative ">
        <input className=" w-full h-full bg-[#F1F1F1] rounded-[10px] text-xl pl-4" type="text" />
      <MdEmojiEmotions className="absolute top-[50%] right-10 translate-y-[-50%] text-Secondary text-base " />
      <FaCamera className="absolute top-[50%] right-4 translate-y-[-50%] text-Secondary text-base  " />
      </div>
      <div className="py-[15px] px-[15px] bg-Secondary rounded-[10px]">
      <IoIosSend className=" text-[#fff] text-lg" />
      </div>
     </div>
    </div>
  );
};

export default ChatComponent;
