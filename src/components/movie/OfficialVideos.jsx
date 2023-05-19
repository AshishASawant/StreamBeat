import React, {  useState } from "react";
import Playbtn from "./Playbtn";
import PlayScreen from "./PlayScreen";

const OfficialVideos = ({ videos }) => {
  const [videoId, setVideoId] = useState(null);
  const [playerState, setPlayerState] = useState(false);

  return (
    <div className="px-2 md:pl-movie-left text-text-primary mt-12">
      <h1 className="text-3xl my-5">Official Videos</h1>
      <div className="flex overflow-y-hidden overflow-x-scroll gap-5 hide-scroll flex-none">
        {videos?.map((item) => (
          <div className="">
            <div
              className="w-[23rem] aspect-video  grid place-items-center rounded-md bg-center bg-cover"
              style={{
                backgroundImage: `url(https://img.youtube.com/vi/${item.key}/hqdefault.jpg)`,
              }}
              onClick={() => {
                setVideoId(item?.key);
                setPlayerState(true);
              }}
            >
              <Playbtn />
            </div>
            <p className="text-sm">{item.name}</p>
          </div>
        ))}
      </div>
      <PlayScreen
        videoId={videoId}
        setVideoId={setVideoId}
        playerState={playerState}
        setPlayerState={setPlayerState}
      />
    </div>
  );
};

export default OfficialVideos;
