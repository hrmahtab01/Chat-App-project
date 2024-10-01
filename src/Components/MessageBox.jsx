import React from "react";
import GroupListCom from "./GroupListCom";
import Friend from "./Firend";
import ChatComponent from "./ChatComponent";
import FriendList from "./FirendList";
import { useSelector } from "react-redux";

const MessageBox = () => {
  const chatadata = useSelector((state) => state.chatuserdata.value);

  return (
    <div className="flex py-7 gap-[60px]">
      <div className="flex flex-col gap-8">
        
        <FriendList />
      </div>
      {chatadata && (
        <div>
          <ChatComponent />
        </div>
      )}
    </div>
  );
};

export default MessageBox;
