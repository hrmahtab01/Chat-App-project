import React from "react";
import GroupListCom from "./GroupListCom";
import Friend from "./Firend";
import ChatComponent from "./ChatComponent";
import FriendList from "./FirendList";

const MessageBox = () => {
  return (
    <div className="flex py-7 gap-[60px]">
      <div className="flex flex-col gap-8">
        <GroupListCom />
        <FriendList/>
      </div>
      <div>
        <ChatComponent />
      </div>
    </div>
  );
};

export default MessageBox;
