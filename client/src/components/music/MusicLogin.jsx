import React, { useEffect } from "react";
import { loginEndpoint, setClientToken } from "../../utils/spotify";
import { useLocation } from "react-router-dom";
import logo from '../../assets/stream-beat logo.png'

const MusicLogin = ({ setToken }) => {
  const location = useLocation();

  useEffect(() => {
    let token = localStorage.getItem("token");
    let hash = location.hash;
    if (hash) {
      const newToken = hash.split("&")[0].split("=")[1];
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setClientToken(newToken);
    }
    if (token) {
      setToken(token);
      setClientToken(token);
    }

    // eslint-disable-next-line
  }, []);
  return (
    <div className="w-full flex items-center justify-center gap-5 flex-col text-text-primary h-[90%]">
      <div className=" grid gap-5">
        <div className="flex flex-col items-center justify-center gap-3 ">
          <img
            src={logo}
            alt="spotify"
            className="max-w-[350px] md:max-w-[550px] rounded-full"
          />
          <div className="font-semibold">
            <span className="text-[red] md:text-3xl text-xl">Stream</span>
            <span className="text-[green] md:text-3xl text-xl">Beat</span>
          </div>
        </div>
        <div className="">
          <p className="text-green-600">
            Use the following credentials for login
          </p>
          <p className="">Username : tseries@yopmail.com</p>
          <p className="">Password : SpotifyClone</p>
        </div>
        <a href={loginEndpoint} className="bg-green-600 px-4 py-2 rounded-full">
          <button className="text-center w-full">LOG IN</button>
        </a>
      </div>
    </div>
  );
};

export default MusicLogin;
