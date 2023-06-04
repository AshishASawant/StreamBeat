import React from "react";
import { useState } from "react";
import Favourite from "./Favourite";
import WatchLater from "./WatchLater";

const MusicLibrary = () => {
  const [currentSearchType, setCurrentSearchType] = useState("watchlater");

  return (
    <div className="md:pl-movie-left md:px-4 px-2 mt-[80px] overflow-hidden overflow-y-scroll hide-scroll text-text-primary">
      <div className="flex items-center justify-between overflow-hidden overflow-y-scroll hide-scroll mb-4 gap-2 flex-col sm:flex-row">
        <h1 className="text-3xl">Library</h1>
        <div className="flex md:w-full items-center justify-center gap-2">
          <button
            className={`px-3 py-2  rounded-md font-semibold ${
              currentSearchType === "watchlater" ? "bg-[red]" : ""
            }`}
            onClick={() => setCurrentSearchType("watchlater")}
          >
            Watchlater
          </button>
          <button
            className={`px-3 py-2  rounded-md font-semibold ${
              currentSearchType === "favourite" ? "bg-[red]" : ""
            }`}
            onClick={() => setCurrentSearchType("favourite")}
          >
            Favourite
          </button>
        </div>
      </div>
      {currentSearchType === "watchlater" ?<WatchLater/> : <Favourite />}
    </div>
  );
};

export default MusicLibrary;
