import React, { useEffect, useState } from "react";
import GroupListCom from "./GroupListCom";
import Friend from "./Firend";
import FriendList from "./FirendList";
import MyGroup from "./MyGroup";
import UserList from "./UserList";
import BlockUser from "./BlockUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserDataStore } from "../Slices/UserDataSlice";

const Home = () => {
  let dispatch = useDispatch();
  const auth = getAuth();
  let [verify, Setverify] = useState(false);
  let navigate = useNavigate();
  let data = useSelector((state) => state.UserData.value);
 
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      dispatch(UserDataStore(user));
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      Setverify(false);
      navigate("/");
    }
  });

  useEffect(() => {
    if (!data) {
      navigate("/Login");
    } else if (!data.emailVerified) {
      Setverify(false);
    } else {
      Setverify(true);
    }
  });
  return (
    <>
      {verify ? (
        <section className="sm:py-9 sm:flex sm:w-full sm:justify-around grid grid-cols-1 mt-[100px] lg:mt-0 pb-8 lg:pb-0  ">
          <div>
            <GroupListCom />
            <Friend />
          </div>
          <div>
            <FriendList />
            <MyGroup />
          </div>
          <div>
            <UserList />
            <BlockUser />
          </div>
        </section>
      ) : (
        <div className="w-full h-screen bg-Primary/80 absolute top-0 flex justify-center items-center ">
          <p className="text-[#fff] text-2xl font-semibold">
            Check Your Mailbox And Verify Your Email
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
