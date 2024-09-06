import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbCameraPlus } from "react-icons/tb";
import { getAuth, signOut } from "firebase/auth";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideBar = () => {
  const auth = getAuth();
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
      // setTimeout(() => {
      //   navigate("/Login");
      // }, 1500);
    }
  }, [activesection, navigate]);
  let handleSignout = () => {
    signOut(auth)
      .then(() => {
        toast.success("SignOut success", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/login");
          localStorage.clear()
        }, 2000);
      })
      .catch((error) => {
        console.log(error);

        toast.error("Login failed", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="h-screen py-9 px-8">
      <div className="lg:w-[186px] h-full w-[100px] bg-Secondary rounded-3xl">
        <div className="text-center pt-9">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mx-auto relative group">
            <img
              className="w-full h-full  object-cover"
              src={data.photoURL}
              alt="profileimage"
            />
            <div className="w-full h-full bg-[#000]/50 absolute top-0 left-0 flex opacity-0 justify-center items-center group-hover:opacity-100 duration-300">
              <TbCameraPlus className="text-[#fff] text-2xl " />
            </div>
          </div>
          <h2 className="text-xl font-semibold font-Nunito mt-2 text-[#fff]">
            {data.displayName}
          </h2>
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
          className="w-full h-[89px] relative mt-[35px] after:contents-[''] after:w-[8px] after:h-full after:bg-Secondary after:absolute after:top-0 after:right-0 after:rounded-s-[25px] after:shadow-md"
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
        <div className="text-sm">
        <ImExit className="text-[46px]" onClick={handleSignout} />
          <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
