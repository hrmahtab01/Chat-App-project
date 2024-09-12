import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import progileimage from "../assets/mahtab.jpg";
import Profileimage2 from "../assets/Signin.png";
import profileimage3 from "../assets/Signup.jpg";
import { getDatabase, ref, onValue } from "firebase/database";
import moment from "moment";
import { useSelector } from "react-redux";

const FriendList = () => {
  let data = useSelector((state) => state.UserData.value);
  const db = getDatabase();
  let [FriendData, SetfriendData] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "Friendlist/");
    let array = [];
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().SenderId ||
          data.uid == item.val().ReciverId
        ) {
          array.push(item.val());
        }
      });
      SetfriendData(array);
    });
  },[]);

  return (
    <section>
      <div className="  ">
        <div className="w-[427px] shadow-xl rounded-[20px]  py-4 px-6 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
              Friends
            </h3>
            <BsThreeDotsVertical className="text-Secondary" />
          </div>
          <div className="w-full h-[451px] overflow-y-scroll cursor-pointer ">
            {FriendData.map((item) => (
              <div className="flex justify-between items-center  border-b border-black/25 pb-6 mt-4">
                <div className="flex gap-3 mt-[17px]">
                  {data.uid == item.ReciverId ? (
                    <img
                      src={item.SenderImage}
                      alt="progileimage"
                      className="w-[52px] h-[52px] rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.ReciverImage}
                      alt="progileimage"
                      className="w-[52px] h-[52px] rounded-full object-cover"
                    />
                  )}

                  <div className="">
                    {data.uid == item.ReciverId  ? (
                      <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                        {item.SenderName}
                      </h3>
                    ) : (
                      <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                        {item.ReciverName}
                      </h3>
                    )}

                    <p className="text-xs font-normal text-FourColor/75">
                      {moment(item.Date, "YYYYMMDDhh:mm").fromNow()}
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

export default FriendList;
