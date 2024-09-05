import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import { IoInvertModeOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { getAuth, deleteUser ,reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const reauthenticate = (user, currentPassword) => {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, credential);
  };

const AccountSettings = () => {
  const navigate = useNavigate();  // Fix: Added parentheses
  const auth = getAuth();
  const [deleteModal, setDeleteModal] = useState(false);  // Fix: Corrected function name

  const handleDeleteAccount = () => {  // Fix: Corrected function name
    setDeleteModal(true);
  };

  const user = auth.currentUser;

  const handleDeleteSure = () => {
    if (user) {
        deleteUser(user)
          .then(() => {
            navigate("/Login");
          })
          .catch((error) => {
            console.error("Error deleting account: ", error);
            alert("Failed to delete account. Please try again later.");
          });
      } else {
        console.error("No user is currently logged in.");
        alert("No user is logged in.");
      }
  };

  return (
    <div className="w-full h-[750px] shadow-md rounded-[16px]">
      <div className="pt-7 pl-5">
        <h3 className="text-xl font-semibold font-Nunito text-ThirdColor">
          Account Settings
        </h3>
      </div>
      <div className="mt-[35px] ml-[80px]">
        <ul className="flex flex-col gap-7 ">
          <li className="font-normal text-xl font-Nunito text-ThirdColor flex gap-9 items-center">
            <FaKey className="text-Secondary text-2xl cursor-pointer hover:text-ThirdColor duration-300" />
            Change Password
          </li>
          <li className="font-normal text-xl font-Nunito text-ThirdColor flex gap-9 items-center">
            <IoInvertModeOutline className="text-Secondary text-2xl cursor-pointer hover:text-ThirdColor duration-300" />
            Theme
          </li>
          <li className="font-normal text-xl font-Nunito text-ThirdColor flex gap-9 items-center">
            <MdDelete
              onClick={handleDeleteAccount}  // Fix: Corrected function name
              className="text-Secondary text-2xl cursor-pointer hover:text-ThirdColor duration-300"
            />
            Delete Account
          </li>
        </ul>
        {deleteModal && (
          <div className="bg-ThirdColor/50 w-full h-screen absolute top-0 left-0 flex justify-center items-center">
            <div className="w-[500px] h-[300px] bg-[#fff] rounded-xl p-6">
              <p className="text-center text-ThirdColor text-2xl font-semibold">
                Are you sure you want to delete your account?
              </p>
              <div className="flex justify-center items-center mt-20 gap-4">
                <button
                  onClick={handleDeleteSure}
                  className="bg-Secondary py-3 px-6 rounded-md text-[#fff]"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setDeleteModal(false)}
                  className="bg-Secondary py-3 px-6 rounded-md text-[#fff]"
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
