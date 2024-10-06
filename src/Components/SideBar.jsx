import React, { useState, useEffect, createRef } from "react";
import { FaHome } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { TbCameraPlus } from "react-icons/tb";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { Oval } from "react-loader-spinner";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { UserDataStore } from "../Slices/UserDataSlice";
import { getDatabase, ref as dref, update } from "firebase/database";
import { FaFacebookMessenger } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import demoimage from "../assets/mahtab.jpg";

const SideBar = () => {
  const db = getDatabase();
  const storage = getStorage();
  const auth = getAuth();
  const navigate = useNavigate();
  const [activesection, setActivesection] = useState("home");
  const data = useSelector((state) => state.UserData.value);
  let [ImageUpdateModal, SetimageUpdateModal] = useState(false);
  let [Loader, setloader] = useState(false);
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  let dispatch = useDispatch();
  const location = useLocation();

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
          localStorage.clear();
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

  let HandlechangeImage = () => {
    SetimageUpdateModal(true);
  };

  let HandleNavigesettings = () => {
    navigate("/settings");
  };
  const handleImageUpload = () => {
    const storageRef = ref(storage, `UsersData/${Date.now()}`);
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((Downloadurl) => {
          updateProfile(auth.currentUser, {
            photoURL: Downloadurl,
          })
            .then(() => {
              toast.success("Profile Update successfully", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
              });
              dispatch(UserDataStore(auth.currentUser));
              update(dref(db, "users/" + data.uid), {
                profile_picture: Downloadurl,
              });
              setloader(true);

              setTimeout(() => {
                setloader(false);
                SetimageUpdateModal(false);
                setCropData("");
                setImage("");
              }, 2000);
            })

            .catch((error) => {
              toast.error("Image upload failed!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
              });
            });
        });
      });
    }
  };

  let HandleImagefile = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  let HandleIgameUpdatecancel = () => {
    SetimageUpdateModal(false);
    setImage("");
  };

  let Handlenavigatenotification = () => {
    navigate("/Notification");
  };
  let HandleNavigateMessage = () => {
    navigate("/messageBox");
  };
  let HandleNavigateHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="h-screen py-5 px-8 hidden lg:block ">
        <div className="lg:w-[186px] h-full w-[100px] bg-Secondary rounded-3xl">
          <div className="text-center pt-9">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden mx-auto relative group">
              <img
                className="w-full h-full  object-cover"
                src={data?.photoURL}
                alt="profileimage"
              />
              <div
                onClick={HandlechangeImage}
                className="w-full h-full bg-[#000]/50 absolute top-0 left-0 flex opacity-0 justify-center items-center group-hover:opacity-100 duration-300 cursor-pointer"
              >
                <TbCameraPlus className="text-[#fff] text-2xl " />
              </div>
            </div>
            <h2 className="text-xl font-semibold font-Nunito mt-2 text-[#fff]">
              {data?.displayName}
            </h2>
          </div>
          <div
            className="w-full h-[89px] relative mt-[60px] cursor-pointer after:contents-[''] after:w-[8px] after:h-full after:bg-Secondary after:absolute after:top-0 after:right-0 after:rounded-s-[25px] after:shadow-md"
            onClick={() => setActivesection("home")}
          >
            <div
              className={`w-[161px] h-[89px] bg-[#ffff] ml-auto rounded-lg ${
                activesection === "home" ? "block" : "hidden"
              } `}
            ></div>
            <FaHome
              className={`text-[46px] absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] ${
                activesection === "home" ? "text-Secondary" : "text-[#fff]"
              }`}
            />
          </div>
          <div
            className="w-full h-[89px] cursor-pointer relative mt-[35px] after:contents-[''] after:w-[8px] after:h-full after:bg-Secondary after:absolute after:top-0 after:right-0 after:rounded-s-[25px] after:shadow-md "
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
            className="w-full h-[89px] cursor-pointer relative mt-[35px] after:contents-[''] after:w-[8px] after:h-full after:bg-Secondary after:absolute after:top-0 after:right-0 after:rounded-s-[25px] after:shadow-md"
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
            className="w-full h-[89px] cursor-pointer relative mt-[35px] after:contents-[''] after:w-[8px] after:h-full after:bg-Secondary after:absolute after:top-0 after:right-0 after:rounded-s-[25px] after:shadow-md "
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
        {ImageUpdateModal && (
          <div className="bg-ThirdColor/40 w-full h-screen absolute top-0 left-0 z-40 flex justify-center items-center">
            <div className="w-[500px] pb-5 bg-[#fff] rounded-xl">
              <p className="text-center mt-4 text-ThirdColor text-2xl font-semibold">
                Update your profile image
              </p>
              <div className=" flex justify-center items-center mx-auto mt-5">
                <input onChange={HandleImagefile} type="file" />
              </div>
              {image && (
                <Cropper
                  ref={cropperRef}
                  style={{ height: 400, width: "100%" }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
              )}
              <div className="flex justify-center items-center mt-16 gap-4 font-Nunito">
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  transition={Slide}
                />
                {Loader ? (
                  <div className="flex justify-center   bg-Secondary py-2 px-9 rounded-md hover:scale-110 duration-200 ">
                    <Oval
                      visible={true}
                      height="32"
                      width="32"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  <button
                    onClick={handleImageUpload}
                    className="bg-Secondary py-3 px-6 rounded-md text-[#fff] font-Nunito hover:scale-110 duration-200 hover:translate-y-2"
                  >
                    Yes, Save
                  </button>
                )}
                <button
                  onClick={HandleIgameUpdatecancel}
                  className="bg-Secondary py-3 px-6 rounded-md text-[#fff] hover:scale-110 duration-200 hover:translate-y-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex fixed top-0 left-0 z-50 w-full h-[60px] lg:hidden shadow-lg  rounded-sm backdrop-blur-md">
        <ul className="flex  gap-12 items-center ml-6">
          {location.pathname === "/" ? (
            <li className="text-2xl font-semibold font-Nunito text-[#fff] bg-Secondary py-2 px-4 rounded-sm">
              <FaHome />
            </li>
          ) : (
            <li
              onClick={HandleNavigateHome}
              className="text-2xl font-semibold font-Nunito text-[#000]"
            >
              <FaHome />
            </li>
          )}

          {  location.pathname === "/messageBox" ? (
            <li className="text-2xl font-semibold font-Nunito text-[#fff] bg-Secondary py-2 px-4 rounded-sm">
              <FaFacebookMessenger />
            </li>
          ) :location.pathname === "/chat" ? (
            <li className="text-2xl font-semibold font-Nunito text-[#fff] bg-Secondary py-2 px-4 rounded-sm">
              <FaFacebookMessenger />
            </li>
          ):
          
          (
            <li
              onClick={HandleNavigateMessage}
              className="text-2xl font-semibold font-Nunito text-[#000]"
            >
              <FaFacebookMessenger />
            </li>
          )}

          {location.pathname === "/Notification" ? (
            <li className="text-2xl font-semibold font-Nunito text-[#fff] bg-Secondary py-2 px-4 rounded-sm">
              <IoNotifications />
            </li>
          ) : (
            <li
              onClick={Handlenavigatenotification}
              className="text-2xl font-semibold font-Nunito text-[#000]"
            >
              <IoNotifications />
            </li>
          )}

          {location.pathname === "/settings" ? (
            <li className="text-2xl font-semibold font-Nunito text-[#fff] bg-Secondary py-2 px-4 rounded-sm">
              <IoMdSettings />
            </li>
          ) : (
            <li
              onClick={HandleNavigesettings}
              className="text-2xl font-semibold font-Nunito text-[#000]"
            >
              <IoMdSettings />
            </li>
          )}

          <div className="w-[38px] h-[38px] items-center  ">
            <img
              className="w-full h-full rounded-full object-cover"
              src={data?.displayName}
              alt="profile image"
            />
          </div>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
