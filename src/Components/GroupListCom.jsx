import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import progileimage from "../assets/mahtab.jpg";
import Profileimage2 from "../assets/Signin.png";
import profileimage3 from "../assets/Signup.jpg";
import { FaPlus } from "react-icons/fa6";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  update,
} from "firebase/database";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { InfinitySpin } from "react-loader-spinner";
import {
  getDownloadURL,
  getStorage,
  ref as pref,
  uploadBytes,
} from "firebase/storage";

const GroupListCom = () => {
  const data = useSelector((state) => state.UserData.value);
  const db = getDatabase();
  let [CreateModal, SetCreateModal] = useState(false);
  const [Groupname, Setgrupname] = useState("");
  const [Loader, setloader] = useState(false);
  const [Groupdata, Setgroupdata] = useState([]);
  const [GroupSrcData, SetGroupsrcdata] = useState([]);
  const [groupmodal, SetgroupMOdal] = useState(false);
  const [Photodata, Setphotodata] = useState("");
  const storage = getStorage();
  const [groupid, setgroupid] = useState(null);

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
      adminid: data.uid,
      groupphoto: profileimage3,
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

  useEffect(() => {
    const groupref = ref(db, "grouplist/");
    onValue(groupref, (snapshot) => {
      const grouparray = [];
      snapshot.forEach((item) => {
        grouparray.push({ ...item.val(), uid: item.key });
      });
      Setgroupdata(grouparray);
    });
  }, []);

  const HandleSreachgrouplist = (e) => {
    const grouplist = Groupdata.filter((item) =>
      item.groupName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    SetGroupsrcdata(grouplist);
  };

  const HandlegroupmodalOpen = (item) => {
    SetgroupMOdal(true);
    setgroupid(item.uid);
  };

  const HandleSubmitphoto = (groupid) => {
    const storageRef = pref(storage, `groupphoto/ ${Date.now()}`);
    uploadBytes(storageRef, Photodata).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        update(ref(db, "grouplist/" + groupid), {
          groupphoto: downloadURL,
        }),then(()=>{
          SetgroupMOdal(false)
        })
      });
    });
  };
  const HandlecancelPhoto = () => {
    SetgroupMOdal(false);
  };
 
  

  return (
    <section>
      <div className="  ">
        <div className="lg:w-[450px] w-[370px] relative h-[59px] ">
          <input
            onChange={HandleSreachgrouplist}
            type="text"
            placeholder="Search"
            className=" w-full h-full shadow-md shadow-ThirdColor rounded-[20px] placeholder:absolute placeholder:top-2/4 placeholder:left-14 placeholder:translate-y-[-50%] outline-none type pl-16"
          />
          <CiSearch className="absolute top-2/4 left-4 translate-y-[-50%] text-[19px] text-ThirdColor font-bold" />
          <BsThreeDotsVertical className="absolute right-0 top-2/4  translate-y-[-50%] text-Secondary text-lg " />
        </div>

        <div className="lg:w-[450px] w-[370px] shadow-md shadow-ThirdColor rounded-[20px]  py-4 px-6  mt-[43px]">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
              Groups List
            </h3>
            <BsThreeDotsVertical
              onClick={HandleCreatModal}
              className="text-Secondary"
            />
          </div>

          <div className="w-full lg:h-[300px] h-[404px] overflow-y-scroll cursor-pointer relative no-scrollbar ">
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
                {GroupSrcData.length > 0
                  ? GroupSrcData.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center  border-b border-black/25 pb-3 mt-4"
                      >
                        <div className="flex gap-3 mt-[17px]">
                          <div className="relative">
                            <img
                              src={item.groupphoto}
                              alt="progileimage"
                              className="w-[52px] h-[52px] rounded-full object-cover"
                            />
                            <div
                              onClick={() => HandleUSerprofile(item)}
                              className="w-full h-full bg-ThirdColor/40 absolute top-0 left-0 rounded-full opacity-0 hover:opacity-100 duration-100"
                            ></div>
                          </div>
                          <div className="">
                            <h3 className="text-lg font-semibold font-Nunito text-ThirdColor">
                              {item.groupName}
                            </h3>
                            <p className=" text-base font-medium text-FourColor font-Nunito">
                              Created by :{" "}
                              <span className="text-base font-normal text-FourColor/75">
                                {item.AdminName}
                              </span>
                            </p>
                          </div>
                        </div>
                        {data.uid == item.uid ? (
                          <button className="px-4 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] ">
                            invite
                          </button>
                        ) : (
                          <button className="px-4 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] ">
                            Join
                          </button>
                        )}
                      </div>
                    ))
                  : Groupdata.map((item) => {
                      const isinvite = data.uid === item.adminid;
                      return (
                        <div className="flex justify-between items-center  border-b border-black/25 pb-3 mt-4">
                          <div className="flex gap-3 mt-[17px]">
                            <div className="relative">
                              <img
                                src={item.groupphoto}
                                alt="progileimage"
                                className="w-[52px] h-[52px] rounded-full object-cover"
                              />
                              <div
                                onClick={() => HandlegroupmodalOpen(item)}
                                className="w-full h-full bg-ThirdColor/40 absolute top-0 left-0 rounded-full opacity-0 hover:opacity-100 duration-100"
                              ></div>
                            </div>
                            <div className="">
                              <h3 className="text-lg font-semibold font-Nunito text-ThirdColor">
                                {item.groupName}
                              </h3>
                              <p className=" text-base font-medium text-FourColor font-Nunito">
                                Created by :{" "}
                                <span className="text-base font-normal text-FourColor/75">
                                  {item.AdminName}
                                </span>
                              </p>
                            </div>
                          </div>
                          {isinvite ? (
                            <button className="px-4 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] ">
                              invite
                            </button>
                          ) : (
                            <button className="px-4 py-2 bg-Secondary font-semibold font-Nunito text-[#fff] rounded-[5px] ">
                              Join
                            </button>
                          )}
                        </div>
                      );
                    })}
              </>
            )}
          </div>
        </div>
        {groupmodal &&  Groupdata.adminid ===data.uid && (
          <div className="bg-ThirdColor/30 w-full h-screen absolute top-0 left-0 flex justify-center items-center z-40  ">
            <div className="w-[500px]  bg-[#fff] rounded-lg shadow-lal shadow-md pb-4">
              <h3 className="text-center text-lg font-medium font-Nunito text-ThirdColor mt-6">
                Upload Group Photo
              </h3>
              <div className="w-full h-full  flex flex-col justify-center items-center mt-3">
                <input
                  onChange={(e) => Setphotodata(e.target.files[0])}
                  className="mx-auto"
                  type="file"
                />
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => HandleSubmitphoto(groupid)}
                    className="py-3 px-6 bg-Secondary text-lg font-semibold text-[#fff] font-Nunito rounded-lg shadow-md shadow-ThirdColor hover:scale-105 duration-150  hover:translate-y-[-4px]"
                  >
                    Submit
                  </button>
                  <button
                    onClick={HandlecancelPhoto}
                    className="py-3 px-6 bg-Secondary text-lg font-semibold text-[#fff] font-Nunito rounded-lg shadow-md shadow-ThirdColor hover:scale-105 duration-150  hover:translate-y-[-4px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GroupListCom;
