import React, { useContext } from "react";
import AlbumImage from "./AlbumImage";
import musicContext from "../../state/musicContext";
import { MdLyrics } from "react-icons/md";
import { useState } from "react";
import Lyrics from "./Lyrics";

const InfoContainer = () => {
  const context = useContext(musicContext);
  const { setCurrentTrack, setCurrentIndex, currentIndex, tracks } = context;
  const [isLyrics, setIsLyrics] = useState(false);

  const handleOnChange = (index) => {
    setCurrentTrack(tracks[index].track);
    setCurrentIndex(index);
  };
  return (
    <div className="bg-bg-primary w-[20rem] mb-4 rounded-md mr-3 text-text-primary overflow-hidden overflow-y-scroll hide-scroll  pb-4 relative hidden md:block">
      <AlbumImage
        url={
          tracks[currentIndex]?.track?.album?.images[0].url ||
          tracks[0]?.track?.album?.images[0]?.url
        }
      />
      <div className="grid mt-4">
        <div className=" font-semibold sticky  bg-bg-primary top-0 flex justify-between">
          <button
            className={`text-2xl  py-2 px-4 ${
              !isLyrics ? "text-green-600" : ""
            }`}
            onClick={() => setIsLyrics(false)}
          >
            Queue
          </button>
          <button
            className={`text-2xl py-2 px-4 ${isLyrics ? "text-green-600" : ""}`}
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

export default InfoContainer;
