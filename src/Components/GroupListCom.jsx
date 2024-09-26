import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import progileimage from "../assets/mahtab.jpg";
import Profileimage2 from "../assets/Signin.png";
import profileimage3 from "../assets/Signup.jpg";
import { FaPlus } from "react-icons/fa6";
import { getDatabase, push, ref, set ,onValue  } from "firebase/database";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { InfinitySpin,  } from "react-loader-spinner";


const GroupListCom = () => {
  const data = useSelector((state) => state.UserData.value);
  const db = getDatabase();
  let [CreateModal, SetCreateModal] = useState(false);
  const [Groupname, Setgrupname] = useState("");
  const [Loader, setloader] = useState(false);
  const [Groupdata ,Setgroupdata]=useState([])

  const HandleCreatModal = () => {
    SetCreateModal(!CreateModal);
  };

  let HandleGroupname = (e) => {
    Setgrupname(e.target.value);
  };

  const HandleSubmitGroup = () => {
    set(push(ref(db, "grouplist/")), {
      groupName: Groupname,
      AdminName: data.displayName,
    })
      .then(() => {
        setloader(true);
      })
      .then(() => {
        setTimeout(() => {
          setloader(false);
          SetCreateModal(false);
        }, 2000);
      });
  };

  useEffect(()=>{
    const groupref = ref(db, 'grouplist/');
    onValue(groupref, (snapshot) => {
     const grouparray =[]
     snapshot.forEach((item)=>{
      grouparray.push(item.val())
     })
     Setgroupdata(grouparray)
    });
  },[])

  return (
    <section>
      <div className="  ">
        <div className="w-[427px]  relative h-[59px] ">
          <input
            type="text"
            placeholder="Search"
            className=" w-full h-full shadow-lg rounded-[20px] placeholder:absolute placeholder:top-2/4 placeholder:left-14 placeholder:translate-y-[-50%] outline-none type pl-16"
          />
          <CiSearch className="absolute top-2/4 left-4 translate-y-[-50%] text-[19px] text-ThirdColor font-bold" />
          <BsThreeDotsVertical className="absolute right-0 top-2/4  translate-y-[-50%] text-Secondary text-lg " />
        </div>

        <div className="max-w-[427px] shadow-xl rounded-[20px]  py-4 px-6  mt-[43px]">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
              Groups List
            </h3>
            <BsThreeDotsVertical
              onClick={HandleCreatModal}
              className="text-Secondary"
            />
          </div>

          <div className="w-full h-[300px] overflow-y-scroll cursor-pointer ">
            {CreateModal ? (
              <div className="flex flex-col mt-4">
                <input
                  onChange={HandleGroupname}
                  className="py-4 px-3 border border-[#000] rounded-lg bg-ThirdColor text-[#fff] text-lg font-medium font-Nunito shadow-md shadow-Primary outline-none "
                  type="text"
                  placeholder="Enter your Group name"
                />
                {Loader ? (
                 <div className="text-lg font-medium font-Nunito text-[#fff] bg-ThirdColor  px-3 rounded-lg mt-3 shadow-md shadow-Secondary flex justify-center items-center">
                   <InfinitySpin
                    visible={true}
                    width="120"
                    color="#fff"
                    ariaLabel="infinity-spin-loading"
                  />
                 </div>
                ) : (
                  <button
                    onClick={HandleSubmitGroup}
                    className="text-lg font-medium font-Nunito text-[#fff] bg-Secondary py-2 px-3 rounded-lg mt-3 shadow-md shadow-Secondary"
                  >
                    {Loader && <PacmanLoader />}
                    Create Group
                  </button>
                )}
              </div>
            ) : (
           
            <>
            {Groupdata.map((item)=>(
                <div className="flex justify-between items-center  border-b border-black/25 pb-3 mt-4">
                <div className="flex gap-3 mt-[17px]">
                  <img
                    src={Profileimage2}
                    alt="progileimage"
                    className="w-[52px] h-[52px] rounded-full object-cover"
                  />
                  <div className="">
                    <h3 className="text-lg font-semibold font-Nunito text-ThirdColor">
                     {item.groupName
                     }
                    </h3>
                    <p className="text-sm font-medium text-FourColor">
                    Created by : {item.AdminName}
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] ">
                  Join
                </button>
              </div>
            ))}
            </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupListCom;
