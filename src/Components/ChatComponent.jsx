import React, { useEffect, useState } from "react";
import mahtabimg from "../assets/mahtab.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import { useRef } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { Navigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref as sref,
  uploadBytes,
} from "firebase/storage";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';


const ChatComponent = () => {
  const storage = getStorage();
  const db = getDatabase();
  const chatadata = useSelector((state) => state.chatuserdata.value);
  let data = useSelector((state) => state.UserData.value);
  const [chat, Setchat] = useState("");
  const [chatuserdata, Setchatuserdata] = useState([]);
  const [emojipiker, Setemojipiker] = useState(false);
  const scroller = useRef(null);
  const [createImagemodal, SetcreateImagemodal] = useState(false);
  const [imagedata, Setimagedata] = useState(null);
  

  let HandleChating = (e) => {
    Setchat(e.target.value);
  };
  let HandleChatSubmit = () => {
    set(push(ref(db, "chatlist/")), {
      senderid: data.uid,
      SenderName: data.displayName,
      reciverid: chatadata.userid,
      recivername: chatadata.name,
      chatvalue: chat,
      Date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
    }).then(() => {
      Setchat("");
    });
  };

  useEffect(() => {
    const chatRef = ref(db, "chatlist/");
    onValue(chatRef, (snapshot) => {
      let chatarray = [];
      snapshot.forEach((item) => {
        if (
          (data.uid == item.val().senderid &&
            chatadata.userid == item.val().reciverid) ||
          (data.uid == item.val().reciverid &&
            chatadata.userid == item.val().senderid)
        ) {
          chatarray.push({ ...item.val(), uid: item.key });
        }
      });
      Setchatuserdata(chatarray);
      Setemojipiker(false);
    });
  }, [data.uid, chatadata?.userid, db]);

  let HandleSelectEmoji = (e) => {
    Setchat((prevent) => prevent + e.emoji);
  };

  useEffect(() => {
    scroller.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chatuserdata]);

  // useEffect(()=>{
  //   if (Navigatemsg ==='true') {
  //     Navigate('/messageBox')
  //   }
  // },[Navigate])

  let HandleImagemodal = () => {
    SetcreateImagemodal(true);
  };
  let Handleimagefile = (e) => {
    Setimagedata(e.target.files[0]);
  };
  let HandleImagesent = () => {
    const storageRef = sref(storage, `chatimage/ ${Date.now()}`);

    uploadBytes(storageRef, imagedata).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "chatlist/")), {
          senderid: data.uid,
          SenderName: data.displayName,
          reciverid: chatadata.userid,
          recivername: chatadata.name,
          imagevalue: downloadURL,
          Date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
        }).then(() => {
          SetcreateImagemodal(false);
        });
      });
    });
  };

  let HadleImageModalcancel = () => {
    SetcreateImagemodal(false);
  };

  return (
    <div className="lg:w-[1000px] w-full pb-8 lg:h-[850px] max-h-screen mt-12 lg:mt-0  shadow-md shadow-ThirdColor rounded-[16px] px-8 relative  ">
      <div className="flex justify-between items-center  border-b border-black/25 pb-6 mt-4 relative ">
        <div className="flex gap-3  relative mt-4">
          <img
            src={chatadata?.image}
            alt="progileimage"
            className="w-[70px] h-[70px]  rounded-full object-cover "
          />

          <div className="">
            <h3 className="text-xl font-semibold font-Nunito text-ThirdColor">
              {chatadata?.name}
            </h3>
            <p className="text-sm font-normal text-FourColor/75">Online</p>
          </div>
        </div>
        <BsThreeDotsVertical />
      </div>
      <div className=" w-full lg:h-[600px] h-[450px] mb-10 overflow-y-scroll no-scroll no-scrollbar  ">
        <div className="relative overflow-hidden">
          {chatuserdata.map((item) =>
            data.uid == item.reciverid ? (
              <div ref={scroller}>
                <div className="flex justify-start relative overflow-hidden  mt-[15px] lg:ml-[54px]">
                  <div className="  bg-[#F1F1F1]  rounded-[10px] flex justify-center items-center px-3 py-2  ">
                    {item.chatvalue ? (
                      <h3 className="text-[16px] font-semibold font-Nunito text-ThirdColor ">
                        {item.chatvalue}
                      </h3>
                    ) : (
                      <PhotoProvider>
                      <PhotoView src={item.imagevalue}>
                        <img className="lg:w-[300px] lg:h-[300px] w-[150px] h-[150px] object-cover" src={item.imagevalue} alt="" />
                      </PhotoView>
                    </PhotoProvider>
                    )}
                    
                  </div>
                </div>
                <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1 ">
                  {moment(item.Date, "YYYYMMDDhh:mm").fromNow()}
                </p>
              </div>
            ) : (
              <div ref={scroller}>
                <div className="flex justify-end relative overflow-hidden  mt-[15px] lg:mr-[54px]">
                    {item.chatvalue ? (
                  <div className="  max-w-[200px]  bg-Secondary rounded-xl flex justify-center items-center px-3 py-2  ">
                      <h3 className="text-[16px] font-semibold font-Nunito text-[#fff] ">
                        {item.chatvalue}
                      </h3>
                  </div>
                    ) : 
                    <PhotoProvider>
                    <PhotoView src={item.imagevalue}>
                      <img className="lg:w-[300px] lg:h-[300px] w-[150px] h-[150px]" src={item.imagevalue} alt="" />
                    </PhotoView>
                  </PhotoProvider>
                    }
                </div>
                <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1 flex justify-end lg:mr-[54px]">
                  {moment(item.Date, "YYYYMMDDhh:mm").fromNow()}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      <div className="mt-[25px] flex justify-center gap-5 absolute lg:bottom-3 lg:right-60 right-5 bottom-0 border-t border-ThirdColor/25 pt-7 ">
        <div className="lg:w-[530px] w-[330px] h-[45px] relative px-10  ">
          <input
            onChange={HandleChating}
            value={chat}
            className=" lg:w-[500px] w-[310px] h-full bg-[#F1F1F1] rounded-[10px] text-xl pl-4 lg:pr-20 pr-14   "
            type="text"
          />
          <MdEmojiEmotions
            onClick={() => Setemojipiker(!emojipiker)}
            className="absolute top-[50%] right-5 lg:right-10 translate-y-[-50%] text-Secondary text-lg cursor-pointer "
          />

          <FaCamera
            onClick={HandleImagemodal}
            className="absolute top-[50%] right-0 lg:right-4 translate-y-[-50%] text-Secondary text-base cursor-pointer  "
          />
        </div>
        <div
          onClick={HandleChatSubmit}
          className="py-[10px] px-[10px]  bg-Secondary rounded-[10px] lg:ml-0 "
        >
          <IoIosSend className=" text-[#fff] text-2xl" />
        </div>
      </div>
      {emojipiker && (
        <div className="absolute bottom-[100px] right-[100px] ">
          <EmojiPicker  onEmojiClick={HandleSelectEmoji} />
        </div>
      )}
      {createImagemodal && (
        <div className="bg-ThirdColor/30 absolute top-0 left-0 w-full h-screen flex justify-center items-center">
          <div className="w-[500px] h-[300px] bg-[#Fff] rounded-md shadow-md flex flex-col justify-center items-center">
            <h3 className="text-center mt-3 text-lg font-semibold font-Nunito text-[#000]">
              Chose your image
            </h3>
            <div className=" flex justify-center mt-3">
              <input onChange={Handleimagefile} type="file" />
            </div>
            <div className="flex justify-center gap-4 mt-7">
              <button
                onClick={HandleImagesent}
                className="py-2 px-3 bg-Secondary rounded-md text-[#Fff] font-semibold font-Nunito text-lg"
              >
                Sent
              </button>
              <button
                onClick={HadleImageModalcancel}
                className="py-2 px-3 bg-Secondary rounded-md text-[#Fff] font-semibold font-Nunito text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
