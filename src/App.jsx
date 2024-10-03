import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Home from "./Components/Home";
import RootElement from "./Components/RootElement";
import Notification from "./Components/Notification";
import MessageBox from "./Components/MessageBox";
import SettingsCom from "./Components/SettingsCom";
import UserProfile from "./Components/UserProfile";
import UserprofilePhoto from "./Components/UserprofilePhoto";
import ChatComponent from "./Components/ChatComponent";

const App = () => {
  let router = createBrowserRouter(
    createRoutesFromElements([
      <>
        <Route key="Login" path="/Login" element={<Signup />} />,
        <Route path="/Signup" element={<Signin />} />
        <Route path="/" element={<RootElement />}>
          <Route index element={<Home />} />
          <Route path="/Notification" element={<Notification />}></Route>
          <Route path="/messageBox" element={<MessageBox />}></Route>
          <Route path="/settings" element={<SettingsCom />}></Route>
          <Route path="/Userprofile" element={<UserProfile/>}/>
          <Route path="Profilephoto" element={<UserprofilePhoto/>}/>
          <Route path="/chat" element={<ChatComponent/>}/>
        </Route>
        ,
      </>,
    ])
  );

  return <RouterProvider router={router} />;
};

export default App;
