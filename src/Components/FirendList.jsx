import React from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import progileimage from "../assets/mahtab.jpg";
import Profileimage2 from "../assets/Signin.png";
import profileimage3 from "../assets/Signup.jpg";

const FriendList = () => {
  return (
    <section>
      <div className="  ">
        <div className="w-[427px] shadow-xl rounded-[20px]  py-4 px-6 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
              Friends
            </h3>
            <BsThreeDotsVertical className="text-Secondary" />
          </div>

          <div className="w-full h-[451px] overflow-y-scroll cursor-pointer ">
            <div className="flex justify-between items-center  border-b border-black/25 pb-6 mt-4">
              <div className="flex gap-3 mt-[17px]">
                <img
                  src={Profileimage2}
                  alt="progileimage"
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
                <div className="">
                  <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                    Raghav
                  </h3>
                  <p className="text-xs font-normal text-FourColor/75">
                    Dinner?
                  </p>
                </div>
              </div>
              <p className="text-[10px] font-normal font-Nunito text-ThirdColor/50">
                Today, 8:56pm
              </p>
            </div>
            <div className="flex justify-between items-center  border-b border-black/25 pb-6 mt-4">
              <div className="flex gap-3 mt-[17px]">
                <img
                  src={profileimage3}
                  alt="progileimage"
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
                <div className="">
                  <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                    Swathi
                  </h3>
                  <p className="text-xs font-normal text-FourColor/75">Sure!</p>
                </div>
              </div>
              <p className="text-[10px] font-normal font-Nunito text-ThirdColor/50">
                Today, 2:31pm
              </p>
            </div>
            <div className="flex justify-between items-center  border-b border-black/25 pb-6 mt-4">
              <div className="flex gap-3 mt-[17px]">
                <img
                  src={progileimage}
                  alt="progileimage"
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
                <div className="">
                  <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                    Kiran
                  </h3>
                  <p className="text-xs font-normal text-FourColor/75">
                    Hi.....
                  </p>
                </div>
              </div>
              <p className="text-[10px] font-normal font-Nunito text-ThirdColor/50">
                Yesterday, 6:22pm
              </p>
            </div>
            <div className="flex justify-between items-center  border-b border-black/25 pb-6 mt-4">
              <div className="flex gap-3 mt-[17px]">
                <img
                  src={profileimage3}
                  alt="progileimage"
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
                <div className="">
                  <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                    Kiran
                  </h3>
                  <p className="text-xs font-normal text-FourColor/75">
                    Hi.....
                  </p>
                </div>
              </div>
              <p className="text-[10px] font-normal font-Nunito text-ThirdColor/50">
                Today, 12:22pm
              </p>
            </div>
            <div className="flex justify-between items-center  border-b border-black/25 pb-6 mt-4">
              <div className="flex gap-3 mt-[17px]">
                <img
                  src={profileimage3}
                  alt="progileimage"
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
                <div className="">
                  <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                    Kiran
                  </h3>
                  <p className="text-xs font-normal text-FourColor/75">
                    Hi.....
                  </p>
                </div>
              </div>
              <p className="text-[10px] font-normal font-Nunito text-ThirdColor/50">
                Today, 12:22pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FriendList;
