import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileImage from "../assets/Signin.png";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaHandLizard } from "react-icons/fa";
import {
  getDownloadURL,
  getStorage,
  ref as pref,
  uploadBytes,
} from "firebase/storage";

const MyGroup = () => {
  const [groupData, setGroupData] = useState([]);
  const db = getDatabase();
  const data = useSelector((state) => state.UserData.value);
  const [groupmodal, Setgroupmodal] = useState(false);
  const [updategrou, Setupdategroup] = useState(false);
  const [Groupdataname, Setgroupdataname] = useState("");
  const [groupmodalphoto, SetgroupMOdalphoto] = useState(false);
  const [Photodata, Setphotodata] = useState("");
  const storage = getStorage();
  const [groupid, setgroupid] = useState(null);

  useEffect(() => {
    const groupRef = ref(db, "grouplist/");
    onValue(groupRef, (snapshot) => {
      const groupArray = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().adminid) {
          groupArray.push({ ...item.val(), uid: item.key });
        }
      });
      setGroupData(groupArray);
    });
  }, [db, data.displayName]);

  let HandleremoveConfirm = (item) => {
    remove(ref(db, "grouplist/" + item.uid));
    Setgroupmodal(false);
  };

  let HandleUpdateconfirm = (item) => {
    update(ref(db, "grouplist/" + item.uid), {
      groupName: Groupdataname,
    }).then(() => {
      Setupdategroup(false);
    });
  };
  let HandlegroupmodalOpen = (item) => {
    SetgroupMOdalphoto(true);
    setgroupid(item.uid);
  };
  let HandleSubmitphoto = (groupid) => {
    const storageRef = pref(storage, `groupphoto/ ${Date.now()}`);
    uploadBytes(storageRef, Photodata).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        update(ref(db, "grouplist/" + groupid), {
          groupphoto: downloadURL,
        }),
          SetgroupMOdalphoto(false);
      });
    });
  };
  return (
    <section>
      <div>
        <div className="lg:w-[450px] w-[370px] shadow-md shadow-ThirdColor rounded-[20px] lg:mt-[43px] mt-[70px] py-4 px-6 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-ThirdColor font-semibold font-Nunito">
              My Groups
            </h3>
            <BsThreeDotsVertical className="text-Secondary" />
          </div>

          <div className="w-full lg:h-[300px] h-[404px] overflow-y-scroll cursor-pointer no-scrollbar">
            {groupData.map((item) => (
              <>
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-black/25 pb-6 mt-4"
                >
                  <div className="flex gap-3 mt-[17px]">
                    <div className="relative">
                      <img
                        src={item.groupphoto}
                        alt="Profile"
                        className="w-[52px] h-[52px] rounded-full object-cover  "
                      />
                      <div
                        onClick={() => HandlegroupmodalOpen(item)}
                        className="w-full h-full bg-ThirdColor/40 absolute top-0 left-0 rounded-full opacity-0 hover:opacity-100 duration-100"
                      ></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold font-Nunito text-ThirdColor">
                        {item.groupName}
                      </h3>
                      <p className=" text-base font-medium text-FourColor font-Nunito">
                        Created by :{" "}
                        <span className="text-base font-normal text-FourColor/75">
                          {data?.displayName}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => Setupdategroup(item)}
                      className="px-3  py-2 bg-Secondary text-xl font-semibold font-Nunito text-[#fff] rounded-[5px] "
                    >
                      <MdOutlineDriveFileRenameOutline />
                    </button>
                    <button
                      onClick={() => Setgroupmodal(item)}
                      className="px-3 py-2 bg-[#E50000] font-semibold text-xl font-Nunito text-[#fff] rounded-[5px] "
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
                </div>
                {groupmodal && groupmodal.uid == item.uid && (
                  <div className="bg-ThirdColor/40 w-full h-full absolute top-0 left-0 flex justify-center items-center z-50">
                    <div className="w-[400px] h-[200px] bg-[#fff] rounded-md shadow-md shadow-ThirdColor">
                      <h3 className="text-lg text-[#000] font-semibold font-Nunito text-center px-10 mt-7">
                        We are permanently deleting your group. Are you sure?{" "}
                      </h3>
                      <div className="flex justify-center gap-4 mt-5">
                        <button
                          onClick={() => HandleremoveConfirm(item)}
                          className="py-2 px-3 bg-Secondary rounded-md text-[#fff] font-Nunito font-semibold text-lg"
                        >
                          Yes ,Sure
                        </button>
                        <button
                          onClick={() => Setgroupmodal(false)}
                          className="py-2 px-3 bg-Secondary rounded-md text-[#fff] font-Nunito font-semibold text-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {updategrou && updategrou.uid == item.uid && (
                  <div className="bg-ThirdColor/40 w-full h-full absolute top-0 left-0 flex justify-center items-center z-50">
                    <div className="w-[400px] h-[250px] bg-[#fff] rounded-md shadow-md shadow-ThirdColor px-12">
                      <h3 className="text-lg text-[#000] font-semibold font-Nunito text-center  mt-7">
                        We are permanently Change your group Name. Are you sure?{" "}
                      </h3>
                      <input
                        onChange={(e) => Setgroupdataname(e.target.value)}
                        className="px-3 w-[200px] h-[37px]  rounded-md ml-10 mt-4 border"
                        type="text"
                        placeholder="Type new name"
                      />
                      <div className="flex justify-center gap-4 mt-5">
                        <button
                          onClick={() => HandleUpdateconfirm(item)}
                          className="py-2 px-3 bg-Secondary rounded-md text-[#fff] font-Nunito font-semibold text-lg"
                        >
                          Yes ,Sure
                        </button>
                        <button
                          onClick={() => Setupdategroup(false)}
                          className="py-2 px-3 bg-Secondary rounded-md text-[#fff] font-Nunito font-semibold text-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        {groupmodalphoto && (
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
                    onClick={() => SetgroupMOdalphoto(false)}
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

export default MyGroup;
