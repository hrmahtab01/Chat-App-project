import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserprofilePhoto = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.UserData.value);
  const [userFullPhotos, setUserFullPhotos] = useState([]);

  useEffect(() => {
    const friendsDataRef = ref(db, "Friendlist/");
    const array = [];

    onValue(friendsDataRef, (snapshot) => {
      const tempArray = [];
      snapshot.forEach((item) => {
        const itemData = item.val();
        tempArray.push({
          senderId: itemData.SenderId,
          receiverId: itemData.ReciverId,
          senderImage: itemData.SenderImage,
          receiverImage: itemData.ReciverImage,
        });
      });
      setUserFullPhotos(tempArray);
    });
  }, [data.uid, db]);

  const getProfileImage = () => {
    const userPhoto = userFullPhotos.find(
      (item) => item.receiverId === data.uid || item.senderId === data.uid
    );
    return userPhoto ? (userPhoto.senderId === data.uid ? userPhoto.senderImage : userPhoto.receiverImage) : '';
  };

  return (
    <div className="w-full bg-FourColor">
      <div className="w-full h-screen">
        <img className="w-full h-full" src={getProfileImage()} alt="User Profile" />
      </div>
      <div></div>
    </div>
  );
};

export default UserprofilePhoto;
