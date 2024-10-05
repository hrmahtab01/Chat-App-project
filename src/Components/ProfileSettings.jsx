import React, { createRef, useEffect, useState } from "react";
import profileimg from "../assets/mahtab.jpg";
import { RiEdit2Fill } from "react-icons/ri";
import { MdEditDocument, MdAddPhotoAlternate } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import { UserDataStore } from "../Slices/UserDataSlice";
import { getDatabase, ref as dref, update } from "firebase/database";
import {  ref as sref, onValue } from "firebase/database";


const ProfileSettings = () => {
  const db = getDatabase();
  const auth = getAuth();
  const data = useSelector((state) => state.UserData.value);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  let dispatch = useDispatch();
  let [status, Setstatus] = useState(false);
  let [statusData, SetstatusData] = useState("");
  const [statumaindata ,setstatusmaindata]=useState([])

  const handleNameUpdate = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeSubmit = () => {
    if (newName.trim()) {
      updateProfile(auth.currentUser, {
        displayName: newName,
      })
        .then(() => {
          dispatch(UserDataStore(auth.currentUser));
          localStorage.setItem("user", JSON.stringify(auth.currentUser));
          update(dref(db, "users/" + data.uid), {
            username: newName,
          });

          setIsEditingName(false);
        })
        .catch((error) => {
          console.error("Error updating profile: ", error);
        });
    } else {
    }
  };

  let HandleStatusUpdate = () => {
    Setstatus(true);
  };
  let HandleStatusSubmit = () => {
    updateProfile(auth.currentUser, {
      status: statusData,
    })
      .then(() => {
        update(dref(db, "users/" + data.uid), {
          status: statusData,
        }).then(() => {
          Setstatus(false);
        });
      })
      .catch((error) => {});
  };
  let HandleChangeStatusData = (e) => {
    SetstatusData(e.target.value);
  };
  let HandleStatuscancel = () => {
    Setstatus(false);
  };

  useEffect(()=>{
    const statusvalue = sref(db, 'users/' );
    onValue(statusvalue, (snapshot) => {
      let statusarray =[] 
     snapshot.forEach((item)=>{
      if (data.uid == item.key) {
           statusarray.push(item.val().status)
      }
     })
     setstatusmaindata(statusarray)
    });
  },[])

  return (
    <div className="lg:w-full w-full lg:h-[750px] shadow-md shadow-ThirdColor rounded-[16px] lg:py-7 py-10 px-7">
      <div>
        <p className="font-semibold lg:text-xl text-lg font-Nunito text-ThirdColor">
          Profile Settings
        </p>
        <div className="pt-[49px] flex items-center gap-7 border-b border-ThirdColor/25 pb-7 ml-3">
          <img
            className="w-[100px] h-[100px] rounded-full object-cover"
            src={data?.photoURL}
            alt="Profile"
          />
          <div>
            <h3 className="font-semibold lg:text-[25px] text-lg text-ThirdColor font-Nunito">
              {data?.displayName}
            </h3>
            {statumaindata.map((item)=>(

            <p className="font-normal font-Nunito text-xl text-ThirdColor" key={item}>
              {item}
            </p>
            )

            )}
          </div>
        </div>
        <ul className="flex flex-col gap-9 pl-8 mt-11">
          <li
            onClick={handleNameUpdate}
            className="flex items-center gap-9 lg:text-3xl text-xl hover:text-Secondary cursor-pointer"
          >
            <RiEdit2Fill className="text-Secondary cursor-pointer duration-300" />
            Edit Profile Name
          </li>
          <li
            onClick={HandleStatusUpdate}
            className="flex items-center  gap-9 lg:text-3xl text-xl"
          >
            <MdEditDocument className="text-Secondary cursor-pointer hover:text-ThirdColor duration-300" />
            Edit Profile Status Info
          </li>
          <li className="flex items-center gap-9 lg:text-3xl text-xl">
            <MdAddPhotoAlternate className="text-Secondary cursor-pointer hover:text-ThirdColor duration-300" />
            Edit Profile Photo
          </li>
          <li className="flex items-center gap-9 lg:text-3xl text-xl">
            <IoMdHelpCircle className="text-Secondary cursor-pointer hover:text-ThirdColor duration-300" />
            Help
          </li>
        </ul>
      </div>
      {isEditingName && (
        <div className="bg-ThirdColor/50 w-full h-screen absolute top-0 left-0 flex justify-center items-center">
          <div className="w-[500px] h-[300px] bg-[#fff] rounded-xl">
            <p className="text-center mt-4 text-ThirdColor text-2xl font-semibold">
              Update your name
            </p>
            <div className="w-[300px] h-[40px] flex justify-center items-center mx-auto mt-5">
              <input
                onChange={handleNameChange}
                className="w-full h-full pl-4 text-base font-semibold font-Nunito border rounded-lg"
                type="text"
                placeholder="Enter your name"
                value={newName}
              />
            </div>
            <div className="flex justify-center items-center mt-16 gap-4 font-Nunito">
              <button
                onClick={handleChangeSubmit}
                className="bg-Secondary py-3 px-6 rounded-md text-[#fff] font-Nunito hover:scale-110 duration-200 hover:translate-y-2"
              >
                Yes, Save
              </button>
              <button
                onClick={() => setIsEditingName(false)}
                className="bg-Secondary py-3 px-6 rounded-md text-[#fff] hover:scale-110 duration-200 hover:translate-y-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {status && (
        <div className="w-full h-full absolute top-0 left-0 bg-ThirdColor/30 flex justify-center items-center ">
          <div className="w-[500px] h-[300px] bg-[#fff] rounded-xl hadow-md flex flex-col justify-center gap-4 items-center">
            <h2 className="text-lg font-semibold font-Nunito">
              Edit Profile Status{" "}
            </h2>
            <div className="w-[247px] h-[47px] ">
              <input
                onChange={HandleChangeStatusData}
                className="w-full h-full border border-Primary rounded-md pl-3 text-lg"
                type="text"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={HandleStatusSubmit}
                className="py-3 px-6 bg-Secondary text-[#fff] font-semibold font-Nunito rounded-md"
              >
                Yes ,sure
              </button>
              <button
                onClick={HandleStatuscancel}
                className="py-3 px-6 bg-Secondary text-[#fff] font-semibold font-Nunito rounded-md"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
