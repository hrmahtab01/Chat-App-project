import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [activesection, setActivesection] = useState(null);

  const data = useSelector((state) => state.UserData.value);

  useEffect(() => {
    if (activesection === "notification") {
      navigate("/Notification");
    } else if (activesection === "home") {
      navigate("/");
    } else if (activesection === "message") {
      navigate("/messageBox");
    } else if (activesection === "Settings") {
      navigate("/settings");
    } else if (activesection === "exit") {
      setTimeout(() => {
        navigate("/Login");
      }, 1500);
    }
  }, [activesection, navigate]);

  return (
    <div className="h-screen py-9 px-8">
      <div className="w-[186px] h-full bg-Secondary rounded-3xl">
        <div className="text-center">
          <div>
            <img
              className="w-[100px] h-[100px] rounded-full mt-9 inline-block object-cover"
              src={data.photoURL}
              alt="profileimage"
            />
            <h2 className="text-xl font-semibold font-Nunito mt-2 text-[#fff]">
              {data.displayName}
            </h2>
          </div>
        </div>
        <div
          className="w-full h-[89px] relative mt-[60px] after:contents-[''] after:w-[8px] after:h-full after:bg-Secondary after:absolute after:top-0 after:right-0 after:rounded-s-[25px] after:shadow-md"
          onClick={() => setActivesection("home")}
        >
          <div
            className={`w-[161px] h-[89px] bg-[#ffff] ml-auto rounded-lg ${
              activesection === "home" ? "block" : "hidden"
            }`}
          ></div>
          <FaHome
            className={`text-[46px] absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] ${
              activesection === "home" ? "text-Secondary" : "text-[#fff]"
            }`}
          />
        </div>
        <div
          className="w-full h-[89px] relative mt-[60px] after:contents-[''] after:w-[8px] after:h-full after:bg-Secondary after:absolute after:top-0 after:right-0 after:rounded-s-[25px] after:shadow-md"
          onClick={() => setActivesection("message")}
        >
          <div
            className={`w-[161px] h-[89px] bg-[#ffff] ml-auto rounded-lg ${
              activesection === "message" ? "block" : "hidden"
            }`}
          ></div>
          <AiOutlineMessage
            className={`text-[46px] absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] ${
              activesection === "message" ? "text-Secondary" : "text-[#fff]"
            }`}
          />
        </div>
        <div
          className="w-full h-[89px] relative mt-[35px] after:contents-[''] after:w-[8px] after:h-full after:bg-Secondary after:absolute after:top-0 after:right-0 after:rounded-s-[25px] after:shadow-md"
          onClick={() => setActivesection("notification")}
        >
          <div
            className={`w-[161px] h-[89px] bg-[#ffff] ml-auto rounded-lg ${
              activesection === "notification" ? "block" : "hidden"
            }`}
          ></div>
          <IoNotificationsOutline
            className={`text-[46px] absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] ${
              activesection === "notification"
                ? "text-Secondary"
                : "text-[#fff]"
            }`}
          />
        </div>
        <div
          className="w-full h-[89px] relative mt-[35px] after:contents-[''] after:w-[8px] after:h-full after:bg-Secondary after:absolute after:top-0 after:right-0 after:rounded-s-[25px] after:shadow-md "
          onClick={() => setActivesection("Settings")}
        >
          <div
            className={`w-[161px] h-[89px] bg-[#ffff] ml-auto rounded-lg ${
              activesection === "Settings" ? "block" : "hidden"
            }`}
          ></div>
          <IoSettingsOutline
            className={`text-[46px] absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] ${
              activesection === "Settings" ? "text-Secondary" : "text-[#fff]"
            }`}
          />
        </div>
        <div
          className="mt-[78px] flex justify-center text-[46px] text-[#FFF]"
          onClick={() => setActivesection("exit")}
        >
          <ImExit />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
