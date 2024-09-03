import React, { useState } from "react";
import SigninImg from "../assets/Signin.png";
import { Link, useNavigate } from "react-router-dom";
import { GoCheck } from "react-icons/go";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { TailSpin } from "react-loader-spinner";
import { getDatabase, ref, set } from "firebase/database";

const Signin = () => {
  const db = getDatabase();
  const auth = getAuth();
  let Navigate = useNavigate();
  let [name, setname] = useState("");
  let [email, setemail] = useState("");
  let [password, Setpassword] = useState("");
  let [nameerr, setnameerr] = useState("");
  let [emailerr, setemailerr] = useState("");
  let [emailerre, setemailerre] = useState("");
  let [passworderr, Setpassworderr] = useState("");
  let [showpassword, Setshowpassword] = useState(false);
  let [items, setitems] = useState(false);
  let [loader, Setloader] = useState(false);

  let handleEmailChange = (e) => {
    setemail(e.target.value);
    setemailerr("");
    setemailerre("");
  };
  let handleNameChange = (e) => {
    setname(e.target.value);
    setnameerr("");
  };
  let handlePassChange = (e) => {
    Setpassword(e.target.value);
    Setpassworderr("");
  };

  let handleSubmit = () => {
    if (!email) {
      setemailerr("!");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setemailerre("Invalid email");
    }
    if (!name) {
      setnameerr("!");
    }
    if (!password) {
      Setpassworderr("!");
    }

    if (email && name && password) {
      Setloader(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          
          sendEmailVerification(auth.currentUser)
            .then(() => {
              updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: "/Signin.png",
            
                
              }).then(() => {
                set(ref(db, "users/" + userCredential.user.uid), {
                  username: userCredential.user.displayName,
                  email: userCredential.user.email,
                 profile_picture: "/Signin.png",
                  Date: `${new Date().getFullYear()}-${
                    new Date().getMonth()
                  } + 1  ${new Date().getDay()}-${new Date().getHours()}-${
                    new Date().getMinutes()
                  }-${new Date().getSeconds()}`,
                }).then(() => {
                  setTimeout(() => {
                    Setloader(false);
                    Navigate("/Login");
                    const user = userCredential.user;
                  }, 2000);
                });
              });
            })
            .catch((error) => {
              console.log(error);
            });
        
        })
        .catch((error) => {
          setTimeout(() => {
            Setloader(false);
            if (error.code.includes("auth/email-already-in-use")) {
              setemailerre("Email already used");
            }
          }, 2000);
        });
    }
  };

  let handleshowpassword = () => {
    Setshowpassword(!showpassword);
  };

  let handleitems = () => {
    setitems(true);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 ">
      <div className="flex justify-end items-center w-full  h-full">
        <div className="lg:mr-[69px]">
          <h1 className="text-Primary text-[34px] font-bold font-Nunito ">
            Get started with easily register
          </h1>
          <p className="text-xl font-normal font-Nunito text-ThirdColor opacity-50 mt-[13px]">
            Free register and you can enjoy it
          </p>

          <div className="w-[268px] h-[62px] mt-[61px] relative lg:w-[368px] lg:h-[82px] md:w-[368px] md:h-[82px] mx-auto lg:mx-0">
            <label className="absolute -top-[14px] left-[50px] bg-[#ffff] py-1 px-3 text-sm font-semibold text-[#11175D] font-Nunito">
              Email Address
            </label>
            <input
              onChange={handleEmailChange}
              value={email}
              className={`w-full h-full border-2 rounded-xl ${
                emailerr ? "border-lal" : "border-[#11175D]/50"
              } ${
                emailerre ? "border-lal" : "border-[#11175D]/50"
              } lg:pl-[52px] md:pl-[26px] pl-[15px] text-xl font-semibold text-[#11175D]`}
              type="text"
              placeholder="Enter your email"
            />
            {emailerr && (
              <div className="w-5 h-5 rounded-full bg-[#A52A2A] absolute top-[50%] right-3 translate-y-[-50%]  flex justify-center items-center">
                <p className="text-[#FFFf] text-xl">{emailerr}</p>
              </div>
            )}
            {emailerre && (
              <p className="text-lal font-normal text-xl font-Nunito">
                {emailerre}
              </p>
            )}
          </div>

          <div className="w-[268px] h-[62px] mt-[61px] relative lg:w-[368px] lg:h-[82px] md:w-[368px] md:h-[82px] mx-auto lg:mx-0">
            <label className="absolute -top-[14px] left-[50px] bg-[#ffff] py-1 px-3 text-sm font-semibold text-[#11175D] font-Nunito">
              Full name
            </label>
            <input
              value={name}
              onChange={handleNameChange}
              className={`w-full h-full border-2 rounded-xl ${
                nameerr ? "border-lal" : "border-[#11175D]/50"
              } lg:pl-[52px] md:pl-[26px] pl-[15px] text-xl font-semibold text-[#11175D]`}
              type="text"
              placeholder="Enter your name"
            />
            {nameerr && (
              <div className="w-5 h-5 rounded-full bg-[#A52A2A] absolute top-[50%] right-3 translate-y-[-50%]  flex justify-center items-center">
                <p className="text-[#FFFf] text-xl">{nameerr}</p>
              </div>
            )}
          </div>
          <div className="w-[268px] h-[62px] mt-[61px] relative lg:w-[368px] lg:h-[82px] md:w-[368px] md:h-[82px] mx-auto lg:mx-0">
            <label className="absolute -top-[14px] left-[50px] bg-[#ffff] py-1 px-3 text-sm font-semibold text-[#11175D] font-Nunito">
              Password
            </label>

            <input
              value={password}
              onChange={handlePassChange}
              className={`w-full h-full border-2 rounded-xl ${
                passworderr ? "border-lal" : "border-[#11175D]/50"
              } lg:pl-[52px] md:pl-[26px] pl-[15px] text-xl font-semibold text-[#11175D] `}
              type={showpassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <div className="flex gap-[6px] ">
              <div
                onClick={handleshowpassword}
                className="w-5 h-5 border-[2px] mt-2"
              >
                {showpassword ? (
                  <GoCheck className="text-[18px] text-Primary" />
                ) : (
                  ""
                )}
              </div>
              <div className=" mt-1">
                <p className="text-lg font-normal font-Nunito ">
                  Show password
                </p>
              </div>
            </div>
            {passworderr && (
              <div className="w-5 h-5 rounded-full bg-[#A52A2A] absolute top-[50%] right-3 translate-y-[-50%]  flex justify-center items-center">
                <p className="text-[#FFFf] text-xl">{passworderr}</p>
              </div>
            )}
          </div>
          {loader ? (
            <div className="flex justify-center mt-8 mr-20">
              <TailSpin
                visible={true}
                height="50"
                width="50"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=" justify-center items-center"
              />
            </div>
          ) : (
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={handleSubmit}
                className=" py-4 px-[100px]  lg:py-[20px] lg:px-[145px] md:py-[20px] md:px-[145px] bg-Secondary rounded-xl text-xl font-semibold font-Nunito text-[#ffffff] mt-[51px]"
              >
                Sign up
              </button>
            </div>
          )}
          <p className="text-sm text-[#03014C] font-normal font-Nunito mt-[35px] ml-[75px]">
            Already have an account ?{" "}
            <Link to="/Login" className="font-bold font-Nunito text-[#EA6C00]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full mt-4 lg:mt-0 hidden md:block">
        <img
          className=" w-full max-h-screen object-cover"
          src={SigninImg}
          alt="Sign "
        />
      </div>
    </div>
  );
};

export default Signin;
