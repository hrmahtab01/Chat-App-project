import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import { IoInvertModeOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import {
  getAuth,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [email, setEmail] = useState(""); // Track the user's email
  const [password, setPassword] = useState(""); // Track the user's password
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleDeleteAccountClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);
        await deleteUser(user);

        localStorage.clear();
        navigate("/login");
      } catch (error) {
        console.error("Error deleting user: ", error);

        if (error.code === "auth/requires-recent-login") {
          alert("You need to reauthenticate to perform this action. Please log in again.");
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    } else {
      console.warn("No current user found");
    }
  };

  const handleEditPasswordClick = () => {
    setIsEditPasswordModalOpen(true);
  };

  const handlePasswordChangeSubmit =  () => {
    const newPassword = getASecureRandomPassword();
    updatePassword(user, newPassword).then(() => {
      isEditPasswordModalOpen(false)
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  };

  return (
    <div className="w-full h-[750px] shadow-md rounded-[16px]">
      <div className="pt-7 pl-5">
        <h3 className="text-xl font-semibold font-Nunito text-ThirdColor">
          Account Settings
        </h3>
      </div>
      <div className="mt-[35px] ml-[80px]">
        <ul className="flex flex-col gap-7">
          <li onClick={handleEditPasswordClick} className="font-normal text-xl font-Nunito text-ThirdColor flex gap-9 items-center hover:text-Secondary duration-100 cursor-pointer">
            <FaKey
              
              className="text-Secondary text-2xl cursor-pointer hover:text-ThirdColor duration-300"
            />
            Change Password
          </li>
          <li className="font-normal text-xl font-Nunito text-ThirdColor flex gap-9 items-center">
            <IoInvertModeOutline className="text-Secondary text-2xl cursor-pointer hover:text-ThirdColor duration-300" />
            Theme
          </li>
          <li  onClick={handleDeleteAccountClick} className="font-normal text-xl font-Nunito text-ThirdColor flex gap-9 items-center hover:text-Secondary duration-100 cursor-pointer">
            <MdDelete
             
              className="text-Secondary text-2xl cursor-pointer hover:text-ThirdColor duration-300"
            />
            Delete Account
          </li>
        </ul>
        {isDeleteModalOpen && (
          <div className="bg-ThirdColor/50 w-full h-screen absolute top-0 left-0 flex justify-center items-center">
            <div className="w-[500px] pb-5 bg-[#fff] rounded-xl">
              <p className="text-center mt-4 text-ThirdColor text-2xl font-semibold">
                Are you sure you want to delete your account? Please enter your password to confirm.
              </p>
              <div className="flex flex-col items-center mt-4 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-3/4 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-3/4 p-2 border border-gray-300 rounded-md"
                />
                <div className="flex justify-center items-center mt-4 gap-4">
                  <button
                    onClick={handleConfirmDelete}
                    className="bg-Secondary py-3 px-6 rounded-md text-[#fff] hover:scale-110 duration-200 hover:translate-y-2"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="bg-Secondary py-3 px-6 rounded-md text-[#fff] hover:scale-110 duration-200 hover:translate-y-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isEditPasswordModalOpen && (
          <div className="bg-ThirdColor/50 w-full h-screen absolute top-0 left-0 flex justify-center items-center">
            <div className="w-[500px] h-[300px] bg-[#fff] rounded-xl">
              <p className="text-center mt-4 text-ThirdColor text-2xl font-semibold">
                Update your password
              </p>
              <div className="w-[300px] h-[40px] flex justify-center items-center mx-auto mt-5">
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-full pl-4 text-base font-semibold font-Nunito border rounded-lg"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                />
              </div>
              <div className="flex justify-center items-center mt-16 gap-4 font-Nunito">
                <button
                  onClick={handlePasswordChangeSubmit}
                  className="bg-Secondary py-3 px-6 rounded-md text-[#fff] font-Nunito hover:scale-110 duration-200 hover:translate-y-2"
                >
                  Yes, Save
                </button>
                <button
                  onClick={() => setIsEditPasswordModalOpen(false)}
                  className="bg-Secondary py-3 px-6 rounded-md text-[#fff] hover:scale-110 duration-200 hover:translate-y-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
