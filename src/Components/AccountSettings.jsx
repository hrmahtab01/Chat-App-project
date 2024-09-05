import React from 'react'
import { FaKey } from "react-icons/fa";
import { IoInvertModeOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const AccountSettings = () => {
  return (
    <div className='w-full h-[750px] shadow-md rounded-[16px]'>
        <div className='pt-7 pl-5'>
            <h3 className='text-xl font-semibold font-Nunito text-ThirdColor'>Account Settings</h3>

        </div>
        <div className='mt-[35px] ml-[80px]'>
            <ul className='flex flex-col gap-7 '>
                <li className='font-normal text-xl font-Nunito text-ThirdColor flex gap-9 items-center'> <FaKey className='text-Secondary text-2xl'/>Change Password</li>
                <li className='font-normal text-xl font-Nunito text-ThirdColor flex gap-9 items-center'> <IoInvertModeOutline className='text-Secondary text-2xl'/>Theme.</li>
                <li className='font-normal text-xl font-Nunito text-ThirdColor flex gap-9 items-center'><MdDelete className='text-Secondary text-2xl'/>Delete Account.</li>
            </ul>
        </div>

      
    </div>
  )
}

export default AccountSettings
