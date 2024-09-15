import React, { useEffect, useState } from "react";
import profileimage from "../assets/mahtab.jpg";
import { FaUser } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserDataStore } from "../Slices/UserDataSlice";
import { getDatabase, ref, onValue } from "firebase/database";

const UserProfile = () => {
  let navigate = useNavigate();
  const data = useSelector((state) => state.UserData.value);
  let [Profieldata, setprofiledata] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const userdata = ref(db, "userprofile/");
    let array = [];
    onValue(userdata, (snapshot) => {
      snapshot.forEach((item) => {
        array.push({ ...item.val(), uid: item.key });
      });
      setprofiledata(array);
    });
    console.log(db);
  }, []);

  let HandleUserfullPhoto = () => {
    navigate("/Profilephoto");
  };

  console.log(Profieldata[0,1,2]);
  
  return (
    <div className="bg-ThirdColor/80 w-full flex justify-center overflow-y-scroll py-10">
      <div className="w-[1000px] h-screen">
        <div className="flex justify-between items-center border-b pb-6 border-[#fff]/30">
          <div className="flex items-center gap-6">
            <div className="w-[170px] h-[170px] relative overflow-hidden rounded-full ">
              <img
                className=" object-cover"
                src={Profieldata.profile_picture}
                alt="profileimage"
              />
              <div
                onClick={HandleUserfullPhoto}
                className="bg-ThirdColor/30 w-full h-full rounded-full absolute top-0 left-0 opacity-0 hover:opacity-100 duration-150"
              ></div>
            </div>
            <div>
              <h3 className="text-[#fff] text-2xl font-semibold font-Nunito ">
                {Profieldata.username}
              </h3>
              <p className="text-[#fff] text-base font-semibold font-Nunito">
                {Profieldata.email}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="py-2 px-4 rounded-md bg-[#fff]/40 flex items-center gap-1 text-[#fff] text-base shadow-md">
              {" "}
              <FaUser className="text-lg" /> Firend
            </button>
            <button className="py-2 px-4 rounded-md bg-Secondary flex items-center gap-1 text-[#fff] text-base shadow-md">
              {" "}
              <AiFillMessage className="text-lg" />
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
