import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import progileimage from "../assets/mahtab.jpg";
import Profileimage2 from "../assets/Signin.png";
import profileimage3 from "../assets/Signup.jpg";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  set,
} from "firebase/database";
import moment from "moment";

const Friend = () => {
  let data = useSelector((state) => state.UserData.value);
  let [firndRequestlist, Setfirndrequestlist] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const dataRef = ref(db, "FriendRequest/");
    let array = [];
    onValue(dataRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (data.uid == item.val().ReciverId) {
          array.push({ ...item.val(), uid: item.key });
        }
      });

      Setfirndrequestlist(array);
    });
  }, []);

  let HandleConfirmRequest = (item) => {
    set(push(ref(db, "Friendlist/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "FriendRequest/" + item.uid));
    });
  };

  let handleRequestdelete =(item)=>{
    remove(ref(db, "FriendRequest/" + item.uid));
  }

  return (
    <section>
      <div className="  ">
        <div className="w-[427px]  shadow-xl rounded-[20px] mt-[43px] py-4 px-6 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
              Friend Request
            </h3>
            <BsThreeDotsVertical className="text-Secondary" />
          </div>

          <div className="w-full h-[347px] overflow-y-scroll cursor-pointer">
            {firndRequestlist.map((item) => (
              <div className="border-b border-black/25 pb-6 ">
                <div className="flex justify-between items-center  ">
                  <div className="flex gap-3 mt-[17px]">
                    <img
                      src={item.SenderImage}
                      alt="progileimage"
                      className="w-[70px] h-[70px] rounded-full object-cover"
                    />
                    <div className="">
                      <h3 className="text-xl font-semibold font-Nunito text-ThirdColor">
                        {item.SenderName}
                      </h3>
                      <p className="text-sm font-normal text-FourColor/75">
                        {moment(item.Date, "YYYYMMDDhh:mm").fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => HandleConfirmRequest(item)}
                    className="px-5  py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] "
                  >
                    Accept
                  </button>
                  <button onClick={()=>handleRequestdelete(item)} className="px-5 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] ">
                    Delete
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

export default Friend;
