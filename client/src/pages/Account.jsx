import React from "react";
import { GiCancel } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLoginState } from "../state/loginSlice";
const Account = ({ setMenu }) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.7)] z-40">
      <div className=" flex flex-col max-w-[25rem] w-full bg-bg-primary h-full float-right p-4 relative">
        <button
          className="p-2 text-xl hover:bg-bg-dull rounded-full w-min"
          onClick={() => setMenu(false)}
        >
          <GiCancel />
        </button>
        <div className="flex flex-col mt-5 items-center">
          <LazyLoadImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThTFHNvudF14DrJhIbjvNi8KhuKPaOrCivYw&usqp=CAU"
            className="w-56 rounded-full aspect-square self-center"
          />
          <h2 className="mt-5 text-red-700">Some User </h2>
          <p>joined at 12 May 2023</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full px-2 py-4 flex-wrap gap-2 flex justify-between">
          <button
            className="bg-red-700 flex p-2 items-center justify-center gap-2 rounded-md flex-1 whitespace-nowrap"
            onClick={() => {
              dispatch(updateLoginState(false))
              navigate('/')
            }}
          >
            <AiOutlineLogin className="text-xl whitespace-nowrap" />
            <span>Log Out App</span>
          </button>
          <button className="bg-red-700 flex p-2 items-center gap-2 rounded-md flex-1 justify-center whitespace-nowrap">
            <AiOutlineLogin className="text-xl whitespace-nowrap" />
            <span>Log Out Music</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
