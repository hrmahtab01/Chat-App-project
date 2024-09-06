import React, { useState } from "react";
import profileimg from "../assets/mahtab.jpg";
import { RiEdit2Fill } from "react-icons/ri";
import { MdEditDocument, MdAddPhotoAlternate } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import { UserDataStore } from "../Slices/UserDataSlice";

const ProfileSettings = () => {
  const auth = getAuth();
  const data = useSelector((state) => state.UserData.value);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  let dispatch = useDispatch();
 

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
          dispatch(UserDataStore(auth.currentUser))
          localStorage.setItem("user", JSON.stringify(auth.currentUser) )
          // Profile updated successfully
          setIsEditingName(false); // Close the modal after update
        })
        .catch((error) => {
          console.error("Error updating profile: ", error);
          // Handle error (e.g., show an error message to the user)
        });
    } else {
      // Handle empty name case (e.g., show an error message)
    }
  };

  return (
    <div className="w-full h-[750px] shadow-md rounded-[16px] py-7 px-7">
      <div>
        <p className="font-semibold text-xl font-Nunito text-ThirdColor">
          Profile Settings
        </p>
        <div className="pt-[49px] flex items-center gap-7 border-b border-ThirdColor/25 pb-7 ml-3">
          <img
            className="w-[100px] h-[100px] rounded-full object-cover"
            src={data.photoURL}
            alt="Profile"
          />
          <div>
            <h3 className="font-semibold text-[25px] text-ThirdColor font-Nunito">
              {data.displayName}
            </h3>
            <p className="font-normal font-Nunito text-xl text-ThirdColor">
              Stay home stay safe
            </p>
          </div>
        </div>
        <ul className="flex flex-col gap-9 pl-8 mt-11">
          <li  onClick={handleNameUpdate} className="flex items-center gap-9 text-3xl hover:text-Secondary cursor-pointer">
            <RiEdit2Fill
             
              className="text-Secondary cursor-pointer duration-300"
            />
            Edit Profile Name
          </li>
          <li className="flex items-center gap-9 text-3xl">
            <MdEditDocument className="text-Secondary cursor-pointer hover:text-ThirdColor duration-300" />
            Edit Profile Status Info
          </li>
          <li className="flex items-center gap-9 text-3xl">
            <MdAddPhotoAlternate className="text-Secondary cursor-pointer hover:text-ThirdColor duration-300" />
            Edit Profile Photo
          </li>
          <li className="flex items-center gap-9 text-3xl">
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
     
    </div>
  );
};

export default ProfileSettings;
