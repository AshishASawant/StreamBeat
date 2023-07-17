import React, { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaAngleDown } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdLyrics } from "react-icons/md";
import {
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoPlay,
  IoRepeatOutline,
} from "react-icons/io5";
import { RxShuffle } from "react-icons/rx";
import musicContext from "../../state/musicContext";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";
import Lyrics from "./Lyrics";

const MobileController = ({ isMobileController, setIsMobileController }) => {
  const context = useContext(musicContext);
  const {
    setCurrentTrack,
    setCurrentIndex,
    currentIndex,
    tracks,
    isPlaying,
    setIsPlaying,
    handleNext,
    handlePrev,
    setInitialLoad,
    audio,
    repeat,
    shuffle,
    trackProgress,
    setShuffle,
    setRepeat,
  } = context;

  const [show, setShow] = useState(false);
  const [isLyrics, setIsLyrics] = useState(false);

  const handleOnChange = (index) => {
    setCurrentTrack(tracks[index].track);
    setCurrentIndex(index);
  };

  useEffect(() => {
    let comp = document.getElementById("mobileC");
    comp.addEventListener("scroll", () => enablebg(comp.scrollTop));
    return () => {
      comp.removeEventListener("scroll", enablebg);
    };
    // eslint-disable-next-line
  }, []);

  const enablebg = (height) => {
    if (height > window.innerHeight - window.innerHeight / 1.9) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  const changeCtime = () => {
    audio.currentTime = document.getElementsByName("seekbar")[0].value;
  };

  return (
    <div
      className={`bg-bg-primary xs:hidden ${
        isMobileController ? "translate-y-[0vh] visible" : "translate-y-[100vh] invisible"
      } w-full h-full mb-4 duration-500 rounded-md mr-3 text-text-primary overflow-hidden ease-in-out  overflow-y-scroll hide-scroll  pb-4 fixed top-0 left-0 z-30`}
      id="mobileC"
    >
      <div
        className={`absolute top-0 left-0 w-screen h-[100vh] `}
        style={{
          backgroundImage: `linear-gradient(180deg,rgba(0, 0, 0, 0.3), rgba(31, 28, 28, 1)),url(${
            tracks[currentIndex]?.track?.album?.images[0].url ||
            tracks[0]?.track?.album?.images[0]?.url
          })`,
          backgroundSize: "100% 100%",
        }}
      ></div>
      <div
        className={`w-full p-2 flex items-center sticky top-0 z-30 ${
          show ? "bg-bg-primary" : ""
        }`}
      >
        <FaAngleDown
          className="text-[2.5rem] font-extrabold grid place-items-center p-1  rounded-full "
          onClick={() => setIsMobileController(false)}
        />
        <Marquee>
          <p className="font-bold line-clamp-1 mr-[80vw] text">
            {" "}
            {tracks[currentIndex]?.track?.name}-BY-
            {tracks[currentIndex]?.track?.artists[0]?.name}{" "}
          </p>
        </Marquee>
      </div>
      <div className="flex flex-col h-[90vh] items-center justify-between  pb-5">
        <div className="flex flex-1 items-center px-2 ">
          <LazyLoadImage
            className="rounded-md"
            effect="blur"
            src={
              tracks[currentIndex]?.track?.album?.images[0].url ||
              tracks[0]?.track?.album?.images[0]?.url
            }
          />
        </div>
        <div className="flex flex-col w-full px-2 items-center justify-evenly py-2 z-10 gap-7 ">
          <div className="self-start">
            <p className="capitalize line-clamp-1 text-2xl font-bold">
              {tracks[currentIndex]?.track?.name}
            </p>
            <p className="capitalize text-sm">
              {tracks[currentIndex]?.track?.artists[0]?.name}
            </p>
          </div>
          <div className="flex gap-2 text-sm w-full items-center justify-center">
            <p className="text-sm ">
              00:{addZero(Math.round(audio.currentTime))}
            </p>
            <input
              type="range"
              name="seekbar"
              max={30}
              value={Math.round(trackProgress)}
              className="w-[80%] h-[5px] bg-bg-secondary text-bg-secondary"
              id="seek-bar"
              onChange={changeCtime}
            />
            <p className="text-sm ">00:30</p>
          </div>
          <div className="flex justify-evenly w-full items-center">
            <RxShuffle
              className="text-2xl  cursor-pointer rounded-full p-[.25rem]"
              style={shuffle ? { backgroundColor: "green" } : {}}
              onClick={() => {
                setShuffle((prev) => !prev);
                setRepeat(false);
              }}
            />
            <IoPlaySkipBack
              className="text-xl   cursor-pointer"
              onClick={handlePrev}
            />
            <div className="">
              {isPlaying ? (
                <FaPause
                  className="text-[3rem] p-2 cursor-pointer rounded-full bg-green-600 text-black md:h-10 md:w-10  h-full aspect-square"
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                  }}
                />
              ) : (
                <IoPlay
                  className="text-[3rem] p-2 cursor-pointer rounded-full bg-green-600 text-black md:h-10 md:w-10 h-full aspect-square"
                  onClick={() => {
                    setInitialLoad(false);
                    setIsPlaying(!isPlaying);
                  }}
                />
              )}
            </div>
            <IoPlaySkipForward
              className="text-xl  cursor-pointer"
              onClick={handleNext}
            />
            <IoRepeatOutline
              className="text-3xl cursor-pointer rounded-full p-[.25rem]"
              style={repeat ? { backgroundColor: "green" } : {}}
              onClick={() => {
                setRepeat((prev) => !prev);
                setShuffle(false);
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid mt-4 bg-bg-primary">
        <div className=" font-semibold sticky  bg-bg-primary top-14 flex justify-between">
          <button
            className={`text-2xl  py-2 px-4 ${!isLyrics?'text-green-600':''}`}
            onClick={() => setIsLyrics(false)}
          >
            Queue
          </button>
          <button
            className={`text-2xl py-2 px-4 ${isLyrics?'text-green-600':''}`}
            onClick={() => setIsLyrics(true)}
          >
            <MdLyrics />
          </button>
        </div>
        {isLyrics ? (
          <Lyrics />
        ) : (
          <div className="flex flex-col flex-1">
            {tracks?.map((item, i) => {
              return (
                <div
                  className="flex py-2 items-center gap-2 cursor-pointer hover:bg-slate-900 px-3 rounded-md mx-1 "
                  key={i}
                  onClick={() => handleOnChange(i)}
                  style={
                    item?.track?.name === tracks[currentIndex]?.track?.name
                      ? { color: "green" }
                      : {}
                  }
                >
                  <img
                    src={item?.track?.album?.images[0]?.url}
                    alt="album"
                    className="aspect-square w-12 rounded-md"
                  />
                  <div>
                    <p className="queue-song capitalize text-sm line-clamp-1">
                      {item?.track?.name}
                    </p>
                    <p className="queue-time text-xs line-clamp-1">
                      By {item?.track?.artists[0]?.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileController;
