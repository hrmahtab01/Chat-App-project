import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { ref as dref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { userprofilestore } from "../Slices/UserProfile";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiSearch } from "react-icons/ci";

const UserList = () => {
  const navigate = useNavigate();
  const db = getDatabase();
  const data = useSelector((state) => state.UserData.value);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [requestSent, setRequestSent] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [srcUser, Setsrcuser] = useState([]);

  useEffect(() => {
    const fetchUsers = ref(db, "users/");
    onValue(fetchUsers, (snapshot) => {
      const userArray = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          userArray.push({ ...item.val(), uid: item.key });
        }
      });
      setUsers(userArray);
    });
  }, [data.uid, db]);

  useEffect(() => {
    const fetchFriendData = ref(db, "FriendRequest/");
    onValue(fetchFriendData, (snapshot) => {
      const friendArray = [];
      snapshot.forEach((item) => {
        friendArray.push(item.val().SenderId + item.val().ReciverId);
      });
      setFriendData(friendArray);
    });
  }, [data.uid, db]);

  useEffect(() => {
    const fetchRequests = ref(db, "Friendlist/");
    onValue(fetchRequests, (snapshot) => {
      const requestsArray = [];
      snapshot.forEach((item) => {
        requestsArray.push(item.val().SenderId + item.val().ReciverId);
      });
      setRequestSent(requestsArray);
    });
  }, [data.uid, db]);

  useEffect(() => {
    const fetchBlockedUsers = ref(db, "blocklist/");
    onValue(fetchBlockedUsers, (snapshot) => {
      const blockedArray = [];
      snapshot.forEach((item) => {
        blockedArray.push(item.val().blockby + item.val().blockuser);
      });
      setBlockedUsers(blockedArray);
    });
  }, []);

  const handleSendFriendRequest = (item) => {
    const requestData = {
      SenderId: data.uid,
      SenderName: data.displayName,
      SenderImage: data.photoURL,
      Senderemail: data.email,
      ReciverId: item.uid,
      ReciverName: item.username,
      ReciverImage: item.profile_picture,
      Reciveremail: item.email,
      Date: moment().format(),
    };

    set(push(ref(db, "FriendRequest/")), requestData)
      .then(() => {
        toast.success("Friend Request Success", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      })
      .catch(() => {
        toast.error("🦄 Wow so easy!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      });
  };

  const handleShowProfile = (item) => {
    set(dref(db, "userprofile/" + item.uid), {
      username: item.username,
      email: item.email,
      profile_picture: item.profile_picture,
    }).then(() => {
      dispatch(userprofilestore(item));
      navigate("/Userprofile");
    });
  };

  const HandleDeleterequest = (item) => {
    remove(ref(db, "FriendRequest/" + item.uid));
  };

  const HandlesrcUser = (e) => {
    let Sreach = users.filter((item) => item.username.toLowerCase().includes(e.target.value.toLowerCase()));
    Setsrcuser(Sreach);
  };

  

  return (
    <section>
      <div>
        <div className="lg:w-[427px] w-[370px]  relative h-[59px] mt-[60px] lg:mt-0 ">
          <input
            onChange={HandlesrcUser}
            type="text"
            placeholder="Search"
            className=" w-full h-full shadow-lg rounded-[20px] placeholder:absolute placeholder:top-2/4 placeholder:left-14 placeholder:translate-y-[-50%] outline-none type pl-16"
          />
          <CiSearch className="absolute top-2/4 left-4 translate-y-[-50%] text-[19px] text-ThirdColor font-bold" />
          <BsThreeDotsVertical className="absolute right-0 top-2/4  translate-y-[-50%] text-Secondary text-lg" />
        </div>
        <div className="lg:w-[427px] w-[370px] shadow-xl rounded-[20px] py-4 px-6 mt-[43px] ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
              User List
            </h3>
            <BsThreeDotsVertical className="text-Secondary" />
          </div>
          <div className="w-full h-[300px] overflow-y-scroll cursor-pointer no-scrollbar">
            {srcUser.length > 0  ?
              srcUser.map((user, index) => {
                  const isBlocked =
                    blockedUsers.includes(data.uid + user.uid) ||
                    blockedUsers.includes(user.uid + data.uid);
                  const isFriend =
                    friendData.includes(data.uid + user.uid) ||
                    friendData.includes(user.uid + data.uid);
                  const isRequestSent =
                    requestSent.includes(data.uid + user.uid) ||
                    requestSent.includes(user.uid + data.uid);

                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-black/25 pb-3 mt-4"
                    >
                      <div className="flex gap-3 mt-[17px]">
                        <img
                          onClick={() => handleShowProfile(user)}
                          src={user.profile_picture}
                          alt="profile"
                          className="w-[52px] h-[52px] rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                            {user.username}
                          </h3>
                          <p className="text-xs font-normal text-FourColor/75 font-Nunito">
                            {moment(user.Date, "YYYYMMDDhh:mm").fromNow()}
                          </p>
                        </div>
                      </div>
                      {isBlocked ? (
                        <button className="px-2 py-2 bg-[#E50000] font-semibold font-Nunito text-[#fff] rounded-[5px]">
                          Blocked
                        </button>
                      ) : isFriend ? (
                        <button
                          onClick={() => HandleDeleterequest(item)}
                          className="px-2 py-2 bg-[#E50000] font-semibold font-Nunito text-[#fff] rounded-[5px]"
                        >
                          <RxCross2 />
                        </button>
                      ) : isRequestSent ? (
                        <button className="px-2 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px]">
                          Friend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSendFriendRequest(user)}
                          className="px-2 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px]"
                        >
                          <FaPlus />
                        </button>
                      )}
                    </div>
                  );
                })
              : users.map((user, index) => {
                  const isBlocked =
                    blockedUsers.includes(data.uid + user.uid) ||
                    blockedUsers.includes(user.uid + data.uid);
                  const isFriend =
                    friendData.includes(data.uid + user.uid) ||
                    friendData.includes(user.uid + data.uid);
                  const isRequestSent =
                    requestSent.includes(data.uid + user.uid) ||
                    requestSent.includes(user.uid + data.uid);

                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-black/25 pb-3 mt-4"
                    >
                      <div className="flex gap-3 mt-[17px]">
                        <img
                          onClick={() => handleShowProfile(user)}
                          src={user.profile_picture}
                          alt="profile"
                          className="w-[52px] h-[52px] rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                            {user.username}
                          </h3>
                          <p className="text-xs font-normal text-FourColor/75 font-Nunito">
                            {moment(user.Date, "YYYYMMDDhh:mm").fromNow()}
                          </p>
                        </div>
                      </div>
                      {isBlocked ? (
                        <button className="px-2 py-2 bg-[#E50000] font-semibold font-Nunito text-[#fff] rounded-[5px]">
                          Blocked
                        </button>
                      ) : isFriend ? (
                        <button
                          onClick={() => HandleDeleterequest(item)}
                          className="px-2 py-2 bg-[#E50000] font-semibold font-Nunito text-[#fff] rounded-[5px]"
                        >
                          <RxCross2 />
                        </button>
                      ) : isRequestSent ? (
                        <button className="px-2 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px]">
                          Friend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSendFriendRequest(user)}
                          className="px-2 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px]"
                        >
                          <FaPlus />
                        </button>
                      )}
                    </div>
                  );
                })}
          </div>
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition:Slide
          />
        </div>
      </div>
    </section>
  );
};

export default UserList;
