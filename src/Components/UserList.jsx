import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import moment from "moment";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

const UserList = () => {
  const db = getDatabase();
  const [udata, setUdata] = useState([]);
  const data = useSelector((state) => state.UserData.value);
  let [requestsend, Setrequestend] = useState([]);
  let [frienddata, setfrienddata] = useState([]);

  useEffect(() => {
    const usersdata = ref(db, "users/");
    const array = [];
    onValue(usersdata, (snapshot) => {
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          array.push({ ...item.val(), uid: item.key });
        }
      });
      setUdata(array);
    });
  }, [data.uid, db]);

  useEffect(() => {
    const usersdata = ref(db, "FriendRequest/");
    const array = [];
    onValue(usersdata, (snapshot) => {
      snapshot.forEach((item) => {
        array.push(item.val().SenderId + item.val().ReciverId);
      });
      setfrienddata(array);
    });
  }, [data.uid, db]);

  useEffect(() => {
    const friendsdata = ref(db, "Friendlist/");
    const array = [];
    onValue(friendsdata, (snapshot) => {
      snapshot.forEach((item) => {
        array.push(item.val().SenderId + item.val().ReciverId);
      });
      Setrequestend(array);
    });
  }, [data.uid, db]);

  let Handlesendfirendrequest = (item) => {
    set(push(ref(db, "FriendRequest/")), {
      SenderId: data.uid,
      SenderName: data.displayName,
      SenderImage: data.photoURL,
      Senderemail: data.email,
      ReciverId: item.uid,
      ReciverName: item.username,
      ReciverImage: item.profile_picture,
      Reciveremail: item.email,
      Date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
    }).then(() => {
      alert("success");
    });
  };

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
            {udata.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-black/25 pb-3 mt-4"
              >
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

                {frienddata.includes(data.uid + item.uid) ||
                frienddata.includes(item.uid + data.uid) ? (
                  <button className="px-2 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px]">
                    <RxCross2 />
                  </button>
                ) : requestsend.includes(data.uid + item.uid) ||
                  requestsend.includes(item.uid + data.uid) ? (
                  <button className="px-2 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px]">
                  friend
                  </button>
                ) : (
                  <button
                    onClick={() => Handlesendfirendrequest(item)}
                    className="px-2 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px]"
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserList;
