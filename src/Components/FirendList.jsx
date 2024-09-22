import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import progileimage from "../assets/mahtab.jpg";
import Profileimage2 from "../assets/Signin.png";
import profileimage3 from "../assets/Signup.jpg";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FriendList = () => {
  let navigate = useNavigate();
  let data = useSelector((state) => state.UserData.value);
  const db = getDatabase();
  let [FriendData, SetfriendData] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "Friendlist/");
    onValue(starCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().SenderId ||
          data.uid == item.val().ReciverId
        ) {
          array.push({ ...item.val(), uid: item.key });
        }
      });
      SetfriendData(array);
    });
  }, [navigate, db]);

  let HandleUSerprofile = (item) => {
    set(ref(db, "Userprofiledata/"), {
      ...item,
    }).then(() => {
      navigate("/Userprofile");
    });
  };
  let HandleBlock = (item) => {
    if (data.uid == item.SenderId) {
      set(push(ref(db, "blocklist/")), {
        blockby: item.SenderId,
        blockbyname: item.SenderName,
        blcokbyimage:item.SenderImage,
        blockbyemail:item.Senderemail,
        blockuser: item.ReciverId,
        blockusername: item.ReciverName,
        blockuserimage:item.ReciverImage,
        blockuseremail:item.Reciveremail

      }).then(() => {
        remove(ref(db, "Friendlist/" + item.uid));
      });
      {
      }
    } else {
      set(push(ref(db, "blocklist/")), {
        blockby: item.ReciverId,
        blockbyname: item.ReciverName,
        blcokbyimage:item.ReciverImage,
        blockbyemail:item.Reciveremail,
        blockuser: item.SenderId,
        blockusername: item.SenderName,
        blockuserimage:item.SenderImage,
        blockuseremail:item.Senderemail
      }).then(() => {
        remove(ref(db, "Friendlist/" + item.uid));
      });
    }
  };

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
          <div className="w-full h-[404px] overflow-y-scroll  cursor-pointer ">
            {FriendData.map((item) => (
              <div className="flex justify-between items-center  border-b border-black/25 pb-6 mt-4">
                <div className="flex gap-3 mt-[17px]">
                  {data.uid == item.ReciverId ? (
                    <div className="w-[52px] h-[52px] relative">
                      <img
                        src={item.SenderImage}
                        alt="progileimage"
                        className=" w-full h-full rounded-full object-cover"
                      />
                      <div
                        onClick={() => HandleUSerprofile(item)}
                        className="w-full h-full bg-ThirdColor/40 absolute top-0 left-0 rounded-full opacity-0 hover:opacity-100 duration-100"
                      ></div>
                    </div>
                  ) : (
                    <div className="w-[52px] h-[52px] relative">
                      <img
                        src={item.ReciverImage}
                        alt="progileimage"
                        className=" w-full h-full rounded-full object-cover"
                      />
                      <div
                        onClick={() => HandleUSerprofile(item)}
                        className="w-full h-full bg-ThirdColor/40 absolute top-0 left-0 rounded-full opacity-0 hover:opacity-100 duration-100"
                      ></div>
                    </div>
                  )}

                  <div className="">
                    {data.uid == item.ReciverId ? (
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
                <button
                  onClick={() => HandleBlock(item)}
                  className="px-3 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px]"
                >
                  Block
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FriendList;
