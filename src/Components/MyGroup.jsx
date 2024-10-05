import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileImage from "../assets/Signin.png";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const MyGroup = () => {
  const [groupData, setGroupData] = useState([]);
  const db = getDatabase();
  const data = useSelector((state) => state.UserData.value);

  useEffect(() => {
    const groupRef = ref(db, "grouplist/");
    onValue(groupRef, (snapshot) => {
      const groupArray = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().adminid) {
          groupArray.push(item.val());
        }
      });
      setGroupData(groupArray);
    });
  }, [db, data.displayName]);

  return (
    <section>
      <div>
        <div className="lg:w-[450px] w-[370px] shadow-md shadow-ThirdColor rounded-[20px] lg:mt-[43px] mt-[70px] py-4 px-6 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
              My Groups
            </h3>
            <BsThreeDotsVertical className="text-Secondary" />
          </div>

          <div className="w-full lg:h-[300px] h-[404px] overflow-y-scroll cursor-pointer no-scrollbar">
            {groupData.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-black/25 pb-6 mt-4"
              >
                <div className="flex gap-3 mt-[17px]">
                  <div>
                    <img
                      src={ProfileImage}
                      alt="Profile"
                      className="w-[52px] h-[52px] rounded-full object-cover "
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold font-Nunito text-ThirdColor">
                      {item.groupName}
                    </h3>
                    <p className=" text-base font-medium text-FourColor font-Nunito">
                      Created by :{" "}
                      <span className="text-base font-normal text-FourColor/75">
                        {data ?.displayName}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-3">
                  <button className="px-3  py-2 bg-Secondary text-xl font-semibold font-Nunito text-[#fff] rounded-[5px] ">
                    <MdOutlineDriveFileRenameOutline />
                  </button>
                  <button className="px-3 py-2 bg-[#E50000] font-semibold text-xl font-Nunito text-[#fff] rounded-[5px] ">
                    <MdOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyGroup;
