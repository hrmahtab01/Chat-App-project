import React from "react";
import GroupListCom from "./GroupListCom";
import Friend from "./Firend";
import ChatComponent from "./ChatComponent";

const MessageBox = () => {
  return (
    <div className="flex py-9 gap-[60px]">
      <div>
        <GroupListCom />
        <Friend />
      </div>
      <div>
        <ChatComponent />
      </div>
    </div>
  );
};

export default MessageBox;
