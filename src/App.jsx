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

const App = () => {
  let router = createBrowserRouter(
    createRoutesFromElements([
      <>
        <Route key="Login" path="/Login" element={<Signup />} />,
        <Route path="/Signup" element={<Signin />} />
        <Route path="/" element={<RootElement />}>
          <Route index element={<Home />} />
        </Route>
        ,
      </>,
    ])
  );

  return <RouterProvider router={router} />;
};

export default App;
