import React, { useEffect } from "react";
import GroupListCom from "./GroupListCom";
import Friend from "./Firend";
import ChatComponent from "./ChatComponent";
import FriendList from "./FirendList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MsgGrouplist from "./MsgGrouplist";
import MsgFriendlist from "./MsgFriendlist";

const MessageBox = () => {
  const Navigate = useNavigate();
  const chatadata = useSelector((state) => state.chatuserdata.value);
  const chatada = useSelector((state) => state.chatuserdata.value);

  useEffect(() => {
    if (chatada && window.innerWidth < 1024) {
      Navigate("/chat");
    }
  }, [chatadata, Navigate]);

  return (
    
    <div className="flex py-7 gap-[60px] ">
      <div className="flex flex-col lg:gap-8  ">
       <MsgGrouplist/>
       <MsgFriendlist/>
      </div>

      <div className="hidden  lg:block">{chatadata && <ChatComponent />}</div>
    </div>
  );
};

export default MessageBox;
