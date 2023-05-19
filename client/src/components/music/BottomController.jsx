import React, { useContext } from "react";
import musicContext from "../../state/musicContext";
import { FaPause } from "react-icons/fa";
import { GoUnmute, GoMute } from "react-icons/go";
import {
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoPlay,
  IoRepeatOutline,
} from "react-icons/io5";
import { RxShuffle } from "react-icons/rx";
const BottomController = () => {
  const context = useContext(musicContext);
  const {
    isPlaying,
    setIsPlaying,
    handleNext,
    handlePrev,
    setInitialLoad,
    audio,
    repeat,
    shuffle,
    currentIndex,
    tracks,
    trackProgress,
    setShuffle,
    setRepeat,
  } = context;

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  const changeCtime = () => {
    audio.currentTime = document.getElementsByName("seekbar")[0].value;
  };

  return (
    <div className="flex md:bg-bg-primary bg-slate-900 text-white md:h-24 h-16 items-center justify-between md:px-7 px-2 overflow-hidden gap-2">
      <div className="flex items-center gap-2 ">
        <div className={!isPlaying ? "disc" : "disc animate"}>
          <img
            src={tracks[currentIndex]?.track?.album?.images[0].url}
            alt="artist"
            className="md:h-16 md:w-16 h-12 w-12 rounded-md"
          />
        </div>
        <div className="disc-info md:w-[10rem] w-[4rem] justify-self-center">
          <p className="disc-title capitalize line-clamp-1 text-xs md:text-base">
            {tracks[currentIndex]?.track?.name}
          </p>
          <p className="disc-subtitle capitalize line-clamp-1 text-[.5rem] md:text-xs">
            {tracks[currentIndex]?.track?.artists[0]?.name}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col-reverse w-1/2 max-w-xl items-center h-full justify-evenly py-2 ">
        <div className="flex gap-2 text-sm w-full items-center justify-center">
          <p className="md:text-sm text-[.5rem]">
            00:{addZero(Math.round(audio.currentTime))}
          </p>
          <input
            type="range"
            name="seekbar"
            max={30}
            value={Math.round(trackProgress)}
            className="w-[80%] md:h-[5px] h-[3px] bg-bg-secondary text-bg-secondary"
            id="seek-bar"
            onChange={changeCtime}
          />
          <p className="md:text-sm text-[.5rem]">00:30</p>
        </div>
        <div className="flex justify-evenly w-full items-center">
          <RxShuffle
            className="md:text-2xl text-lg  cursor-pointer rounded-full p-[.25rem]"
            style={shuffle ? { backgroundColor: "green" } : {}}
            onClick={() => {
              setShuffle((prev) => !prev);
              setRepeat(false);
            }}
          />
          <IoPlaySkipBack
            className="md:text-xl text-base  cursor-pointer"
            onClick={handlePrev}
          />
          <div className="">
            {isPlaying ? (
              <FaPause
                className="text-3xl md:p-3 p-2 cursor-pointer rounded-full bg-green-600 text-black md:h-10 md:w-10  h-full aspect-square"
                // className="res-btn nres-btn pointer .play-pause-btn.active play-pause bplay-pause new-pbtn"
                onClick={() => {
                  setIsPlaying(!isPlaying);
                }}
              />
            ) : (
              <IoPlay
                className="text-3xl md:p-3  p-2 cursor-pointer rounded-full bg-green-600 text-black md:h-10 md:w-10 h-full aspect-square"
                // className="res-btn nres-btn pointer play-pause bplay-pause new-pbtn"
                onClick={() => {
                  setInitialLoad(false);
                  setIsPlaying(!isPlaying);
                }}
              />
            )}
          </div>
          <IoPlaySkipForward
            className="md:text-xl text-base cursor-pointer"
            onClick={handleNext}
          />
          <IoRepeatOutline
            className="md:text-3xl text-xl cursor-pointer rounded-full p-[.25rem]"
            style={repeat ? { backgroundColor: "green" } : {}}
            onClick={() => {
              setRepeat((prev) => !prev);
              setShuffle(false);
            }}
          />
        </div>
      </div>
      <div className="h-14 w-14 lg:grid place-items-center hidden ">
        {!audio.muted ? (
          <GoUnmute
            className="p-2 hover:bg-green-600 rounded-full cursor-pointer w-11 h-11"
            onClick={() => (audio.muted = !audio.muted)}
          />
        ) : (
          <GoMute
            className="p-2 hover:bg-green-600 rounded-full cursor-pointer w-11 h-11"
            onClick={() => (audio.muted = !audio.muted)}
          />
        )}
      </div>
    </div>
  );
};

export default BottomController;
