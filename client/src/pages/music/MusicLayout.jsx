import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MusicSideBar from "../../components/music/MusicSideBar";
import BottomController from "../../components/music/BottomController";
import InfoContainer from "../../components/music/InfoContainer";
import MobileController from "../../components/music/MobileController";

const MusicLayout = ({ setToken }) => {
  const [isMobileController, setIsMobileController] = useState(false)
  return (
    <section className="flex flex-col flex-1 music-height overflow-hidden">
      <div className="w-full flex overflow-y-scroll outlet-height gap-5 hide-scroll music-scroll-nav" id="muLay">
        <div className="hidden md:block">
        <MusicSideBar setToken={setToken} />
        </div>
        <Outlet />
        <InfoContainer />
      </div>
      <BottomController setIsMobileController={setIsMobileController} />
      <MobileController isMobileController={isMobileController} setIsMobileController={setIsMobileController}/>
      <div className="md:hidden">
        <MusicSideBar setToken={setToken} />
      </div>
    </section>
  );
};

export default MusicLayout;
