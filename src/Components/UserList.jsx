import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { getDatabase, ref, onValue } from "firebase/database";
import moment from "moment";
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  const [udata, setUdata] = useState([]);
  const data = useSelector((state) => state.UserData.value);

  useEffect(() => {
    const usersdata = ref(db, "users/");
    const arary = [];
    onValue(usersdata, (snapshot) => {
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          arary.push(item.val());
        }
      });
      setUdata(arary);
    });
  }, [data.uid, db]);

  return (
    <section>
      <div>
        <div className="w-[427px] shadow-xl rounded-[20px] py-4 px-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
              User List
            </h3>
            <BsThreeDotsVertical className="text-Secondary" />
          </div>

          <div className="w-full h-[451px] overflow-y-scroll cursor-pointer">
            {udata.map((item) => (
              <div key={item.uid} className="flex justify-between items-center border-b border-black/25 pb-3 mt-4">
                <div className="flex gap-3 mt-[17px]">
                  <img
                    src={item.profile_picture}
                    alt="profile"
                    className="w-[52px] h-[52px] rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                      {item.username}
                    </h3>
                    <p className="text-xs font-normal text-FourColor/75 font-Nunito">
                      {moment(item.Date, "YYYYMMDDhh:mm").fromNow()}
                    </p>
                  </div>
                </div>
                <button className="px-2 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px]">
                  <FaPlus />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserList;
