import React, { useEffect } from "react";
import { loginEndpoint, setClientToken } from "../../utils/spotify";
import { useLocation} from "react-router-dom";



const MusicLogin = ({setToken}) => {

  const location =useLocation()

  useEffect(() => {
    let token = localStorage.getItem("token");
    let hash = location.hash;
    // window.location.hash = "";
    if (hash) {
      const newtoken = hash.split("&")[0].split("=")[1];
      localStorage.setItem("token", newtoken);
      setToken(newtoken);
      setClientToken(newtoken);
      // navigate('/music/home')
    } 
    if(token) {
      setToken(token);
      setClientToken(token);
      // navigate('/music/home')
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="w-full flex items-center justify-center gap-5 flex-col text-text-primary h-[90%]">
      <div className=" grid gap-5">
        <div className="flex flex-col items-center justify-center gap-3 ">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/2048px-Spotify_App_Logo.svg.png" alt="spotify" className="aspect-square max-w-[150px] md:max-w-[200px] rounded-full"/>
          <p className="">T-Series</p>
        </div>
        <div className="">
          <p className="text-green-600">
            Use the following credentials for login
          </p>
          <p className="">Username : tseries@yopmail.com</p>
          <p className="">Password : Spotify Clone</p>
        </div>
        <a href={loginEndpoint} className="bg-green-600 px-4 py-2 rounded-full">
          <button className="text-center w-full" >LOG IN</button>
        </a>
      </div>
    </div>
  );
};

export default MusicLogin;
