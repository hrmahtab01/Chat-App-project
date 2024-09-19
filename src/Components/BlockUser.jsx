import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import progileimage from "../assets/mahtab.jpg";
import Profileimage2 from "../assets/Signin.png";
import profileimage3 from "../assets/Signup.jpg";
import { FaPlus } from "react-icons/fa6";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { data } from "autoprefixer";
import { useSelector } from "react-redux";
import moment from "moment";

const BlockUser = () => {
  let data = useSelector((state) => state.UserData.value);

  const db = getDatabase();
  const [blockuserdata, SetblockUserdata] = useState([]);

  useEffect(() => {
    const blockuserdata = ref(db, "blocklist/");
    onValue(blockuserdata, (snapshot) => {
      let array = [];
      const data = snapshot.val();
      snapshot.forEach((item) => {
        if (data.uid == item.val().blockby || data.uid == item.BlockUser) {
          array.push({ ...item.val(), key: item.key });
        }
      });
      SetblockUserdata(array);
    });
  }, []);

  const HandleUnblock =(item)=>{

    const requestData = {
      SenderId: data.uid,
      SenderName: data.displayName,
      SenderImage: data.photoURL,
      Senderemail: data.email,
      ReciverId: item.blockuser,
      ReciverName: item.blockusername,
      ReciverImage: item.profile_picture,
      Reciveremail: item.email,
      Date: moment().format(),
    };
    
    console.log(item);
    
    set(push(ref(db, "FriendRequest/")), requestData).then(() => {
     
    });

  }
  return (
    <section>
      <div className="  ">
        <div className="w-[427px] shadow-xl rounded-[20px]  py-4 px-6 mt-[43px]">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
              Blocked Users
            </h3>
            <BsThreeDotsVertical className="text-Secondary" />
          </div>

          <div className="w-full h-[347px] overflow-y-scroll cursor-pointer ">
            {blockuserdata.map((item) => (
              <div className="flex justify-between items-center  border-b border-black/25 pb-3 mt-4">
                <div className="flex gap-3 mt-[17px]">
                  <img
                    src={Profileimage2}
                    alt="progileimage"
                    className="w-[52px] h-[52px] rounded-full object-cover"
                  />
                  <div className="">
                    {data.uid == item.blockby ? (
                      <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                        {item.blockusername}
                      </h3>
                    ) : (
                      <h3 className="text-sm font-semibold font-Nunito text-ThirdColor">
                        {item.blockbyname}
                      </h3>
                    )}

                    <p className="text-xs font-normal text-FourColor/75 mt-1">
                      Today, 8:56pm
                    </p>
                  </div>
                </div>
                {data.uid == item.blockby && (
                  <button onClick={()=>HandleUnblock(item)} className="px-2  bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px]  text-xl ">
                    unblock
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

export default BlockUser;
