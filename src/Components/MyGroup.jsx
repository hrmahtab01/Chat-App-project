import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileImage from "../assets/Signin.png"; 
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const MyGroup = () => {
  const [groupData, setGroupData] = useState([]);
  const db = getDatabase();
  const data = useSelector((state) => state.UserData.value);

  useEffect(() => {
    const groupRef = ref(db, "grouplist/");
    onValue(groupRef, (snapshot) => {
      const groupArray = [];
      snapshot.forEach((item) => {
        if (data.displayName === item.val().AdminName) {
          groupArray.push(item.val());
        }
      });
      setGroupData(groupArray);
    });
  }, [db, data.displayName]);

  return (
    <section>
      <div>
        <div className="w-[427px] shadow-xl rounded-[20px] mt-[43px] py-4 px-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
              My Groups
            </h3>
            <BsThreeDotsVertical className="text-Secondary" />
          </div>

          <div className="w-full h-[300px] overflow-y-scroll cursor-pointer">
            {groupData.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-black/25 pb-6 mt-4">
                <div className="flex gap-3 mt-[17px]">
                  <img
                    src={ProfileImage}
                    alt="Profile"
                    className="w-[52px] h-[52px] rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold font-Nunito text-ThirdColor">
                      {item.groupName}
                    </h3>
                    <p className=" text-base font-medium text-FourColor font-Nunito">
                    Created by : <span className="text-xs font-normal text-FourColor/75">{item.AdminName}</span>
                    </p>
                  </div>
                </div>
                <p className="text-[10px] font-normal font-Nunito text-ThirdColor/50">
                  Today, 8:56pm
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyGroup;
