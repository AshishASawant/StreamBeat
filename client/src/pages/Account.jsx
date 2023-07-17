import React, { useContext, useRef, useState, useEffect } from "react";
import { GiCancel } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineLogin } from "react-icons/ai";
import { RiImageEditFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLoginState } from "../state/loginSlice";
import musicContext from "../state/musicContext";
import { fetchBackendData } from "../utils/backendApi";
import { setProgress } from '../state/loadingSlice'

import logo from "../assets/avatar.png";
import { updateUserName } from "../state/appSlice";
const Account = ({ setMenu, setToken, userData,setUserImage, userImage }) => {
  let context = useContext(musicContext);
  let { audio } = context;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);
  const [prevValue, setPrevValue] = useState({
    name: userData?.name,
    email: userData?.email,
  });

  const imageRef = useRef();

  const handleImageUpload = async (newImage) => {
    dispatch(setProgress(50))
    try {
      const formData = new FormData();
      formData.append("image", newImage);

      const response = await fetchBackendData(
        "POST",
        "/user/uploadImage",
        formData
      );
      if (response.image) {
        setUserImage(response.image);
        console.log(response.image);
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }
    dispatch(setProgress(100))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let body = { name, email };
      fetchBackendData("PUT", "/user/updateProfile", body).then(() => {
        setPrevValue({ name, email });
        dispatch(updateUserName(name))
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.7)] z-40 overflow-hidden">
      <div className=" flex flex-col max-w-[25rem] w-full bg-bg-primary h-full float-right p-4 relative overflow-hidden">
        <button
          className="p-2 sm:text-xl text-base hover:bg-bg-dull rounded-full w-min"
          onClick={() => setMenu(false)}
        >
          <GiCancel />
        </button>
        <div className="flex flex-col mt-5 items-center gap-5">
          <div className="relative w-56 rounded-full aspect-square">
            <RiImageEditFill
              className="text-3xl absolute cursor-pointer top-[45%] left-[45%]"
              onClick={() => imageRef.current.click()}
            ></RiImageEditFill>
            <LazyLoadImage
              src={userImage ? `data:image/png;base64,${userImage} ` : logo}
              className="w-56 rounded-full aspect-square self-center "
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            ref={imageRef}
            className="hidden"
          />
          <form
            onSubmit={handleSubmit}
            className="grid gap-3 sm:text-xl text-base whitespace-nowrap w-full"
          >
            <div className="flex gap-3 items-center ">
              <label className="">Name :</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none border-none flex-1"
                minLength={2}
              />
              {(prevValue.name !== name) &&
              <RxCross2 onClick={() => setName(prevValue.name)} className="cursor-pointer font-semibold" />}
            </div>
            <div className="flex gap-3 items-center">
              <label>Email :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none border-none flex-1"
              />
              {(prevValue.email !== email) &&
              <RxCross2 onClick={() => setEmail(prevValue.email)} className="cursor-pointer font-semibold" />}
            </div>
            <button
              type="submit"
              className={`px-4 py-2 bg-[red] 
              disabled:bg-red-900
               rounded-md`}
               disabled={ (prevValue.name !== name || prevValue.email !== email)?false:true}
            >
              Update Profile
            </button>
          </form>
        </div>
        <div className="absolute bottom-0 left-0 w-full px-2 py-4 flex-wrap gap-2 flex justify-between">
          <button
            className="bg-red-700 hover:bg-[red] flex p-2 items-center justify-center gap-2 rounded-md flex-1 whitespace-nowrap"
            onClick={() => {
              dispatch(updateLoginState(false));
              navigate("/");
            }}
          >
            <AiOutlineLogin className="text-xl whitespace-nowrap" />
            <span>Log Out App</span>
          </button>
          <button
            className="bg-red-700 hover:bg-[red] flex p-2 items-center gap-2 rounded-md flex-1 justify-center whitespace-nowrap"
            onClick={(e) => {
              e.preventDefault();
              setMenu(false);
              audio.pause();
              setToken("");
              localStorage.removeItem("token");

              navigate("/music/login");
            }}
          >
            <AiOutlineLogin className="text-xl whitespace-nowrap" />
            <span>Log Out Music</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
