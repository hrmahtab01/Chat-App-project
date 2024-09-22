import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import moment from "moment";

const BlockUser = () => {
  const userData = useSelector((state) => state.UserData.value);
  const db = getDatabase();
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blockedUsersRef = ref(db, "blocklist/");
    const unsubscribe = onValue(blockedUsersRef, (snapshot) => {
      const users = [];
      snapshot.forEach((item) => {
        const itemData = item.val();
        if (
          userData.uid === itemData.blockby ||
          userData.uid === itemData.blockuser
        ) {
          users.push({ ...itemData, key: item.key });
        }
      });
      setBlockedUsers(users);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, userData.uid]);

  const handleUnblock = (item) => {
    set(push(ref(db, "Friendlist/")), {
      SenderId: userData.uid,
      SenderName: userData.displayName,
      SenderImage: userData.photoURL,
      Senderemail: userData.email,
      ReciverId: item.blockuser,
      ReciverName: item.blockusername,
      ReciverImage: item.blockuserimage,
      Reciveremail: item.blockuseremail,
      Date: moment().format(),
    }).then(() => {
      remove(ref(db, "blocklist/" + item.key));
    });
  };

  return (
    <section>
      <div className="w-[427px] shadow-xl rounded-[20px] py-4 px-6 mt-[43px]">
        <div className="flex justify-between items-center">
          <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
            Blocked Users
          </h3>
          <BsThreeDotsVertical className="text-Secondary" />
        </div>

        <div className="w-full h-[300px] overflow-y-scroll cursor-pointer">
          {blockedUsers.map((item) => (
            <div
              key={item.key}
              className="flex justify-between items-center border-b border-black/25 pb-3 mt-4"
            >
              <div className="flex gap-3 mt-[17px]">
                {userData.uid == item.blockby ? (
                  <img
                    src={item.blockuserimage}
                    alt={`${
                      userData.uid === item.blockby
                        ? item.blockuserimage
                        : item.blcokbyimage
                    }'s profile`}
                    className="w-[52px] h-[52px] rounded-full object-cover"
                  />
                ) : (
                  <img
                    src={item.blcokbyimage}
                    alt={`${
                      userData.uid === item.blockby
                        ? item.blockuserimage
                        : item.blcokbyimage
                    }'s profile`}
                    className="w-[52px] h-[52px] rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                    {userData.uid === item.blockby
                      ? item.blockusername
                      : item.blockbyname}
                  </h3>
                  <p className="text-xs font-normal text-FourColor/75 mt-1">
                    {moment(item.Date).fromNow()}
                  </p>
                </div>
              </div>
              {userData.uid === item.blockby && (
                <button
                  onClick={() => handleUnblock(item)}
                  className="px-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] text-xl"
                >
                  Unblock
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlockUser;
