import React from "react";
import ReactPlayer from "react-player/youtube";

const PlayScreen = ({ videoId,setVideoId,playerState,setPlayerState }) => {
  return (
    <div className={`${playerState?'fixed':'hidden'} z-20 h-screen w-screen top-0 left-0 flex items-center justify-center backdrop-blur-md`}>
      <div className="md:w-[70%] w-[90%]">
        <button className="float-right" onClick={()=>{
            setVideoId(false)
            setPlayerState(false)}}>Close</button>
        <div className="h-full w-full aspect-video">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls={true}
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayScreen;
