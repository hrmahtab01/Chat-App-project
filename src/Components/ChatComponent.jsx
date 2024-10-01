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

const ChatComponent = () => {
  const db = getDatabase();
  const chatadata = useSelector((state) => state.chatuserdata.value);
  let data = useSelector((state) => state.UserData.value);
  const [chat, Setchat] = useState("");
  const [chatuserdata, Setchatuserdata] = useState([]);
  const [emojipiker, Setemojipiker] = useState(false);
  const scroller =useRef(null)

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
      Setemojipiker(false)
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

  return (
    <div className="w-[1000px] pb-8 h-[850px]  shadow-md rounded-[16px] px-8 relative  ">
      <div className="flex justify-between items-center  border-b border-black/25 pb-6 mt-4 relative ">
        <div className="flex gap-3  relative">
          <img
            src={chatadata?.image}
            alt="progileimage"
            className="w-[70px] h-[70px] rounded-full object-cover "
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
      <div  className=" w-full h-[600px] overflow-y-scroll no-scroll no-scrollbar  ">
        <div className="relative overflow-hidden">
          {chatuserdata.map((item) =>
            data.uid == item.reciverid ? (
              <div ref={scroller} >
                <div  className="flex justify-start relative overflow-hidden  mt-[15px] ml-[54px]">
                  <div className="  bg-[#F1F1F1]  rounded-[10px] flex justify-center items-center px-3 py-2  ">
                    <h3 className="text-[16px] font-semibold font-Nunito text-ThirdColor ">
                      {item.chatvalue}
                    </h3>
                  </div>
                </div>
                <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1 ">
                  {moment(item.Date, "YYYYMMDDhh:mm").fromNow()}
                </p>
              </div>
            ) : (
              <div ref={scroller} >
                <div className="flex justify-end relative overflow-hidden  mt-[15px] mr-[54px]">
                  <div className="  max-w-[200px]  bg-Secondary rounded-xl flex justify-center items-center px-3 py-2  ">
                    <p className="text-[#fff] text-[16px] font-medium font-Nunito">
                      {item.chatvalue}
                    </p>
                  </div>
                </div>
                <p className="ml-[50px] text-sm font-normal font-Nunito text-ThirdColor/25 mt-1 flex justify-end mr-[54px]">
                  {moment(item.Date, "YYYYMMDDhh:mm").fromNow()}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      <div className="mt-[25px] flex justify-center gap-5 absolute bottom-3 right-60 border-t border-ThirdColor/25 pt-7 ">
        <div className="w-[530px] h-[45px] relative px-10 ">
          <input
            onChange={HandleChating}
            value={chat}
            className=" w-[500px] h-full bg-[#F1F1F1] rounded-[10px] text-xl pl-4 pr-20 "
            type="text"
          />
          <MdEmojiEmotions
            onClick={() => Setemojipiker(!emojipiker)}
            className="absolute top-[50%] right-10 translate-y-[-50%] text-Secondary text-lg cursor-pointer "
          />

          <FaCamera className="absolute top-[50%] right-4 translate-y-[-50%] text-Secondary text-base cursor-pointer  " />
        </div>
        <div
          onClick={HandleChatSubmit} 
          className="py-[10px] px-[10px] bg-Secondary rounded-[10px]"
        >
          <IoIosSend className=" text-[#fff] text-2xl" />
        </div>
      </div>
      {emojipiker && (
        <div className="absolute bottom-[100px] right-[100px]">
          <EmojiPicker onEmojiClick={HandleSelectEmoji} />
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
