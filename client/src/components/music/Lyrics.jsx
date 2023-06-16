import React, { useContext, useEffect, useState } from "react";
import musicContext from "../../state/musicContext";
import { fetchBackendData } from "../../utils/backendApi";

const Lyrics = () => {
  const context = useContext(musicContext);
  const { tracks,currentIndex } = context;
 const [lyrics, setLyrics] = useState('No Lyrics Found')
  let getLyrics = async () => {
      
      let track=tracks[currentIndex]?.track?.name

      let artist=tracks[currentIndex]?.track?.artists[0]?.name

    let res = await fetchBackendData("GET", `/lyrics?artist=${artist}&track=${track}`, null);
    setLyrics(res.lyrics);
  };
  useEffect(()=>{
    setLyrics(`Loading...`)
    getLyrics()}, [tracks,currentIndex]);


  return <div className="w-full px-2">{lyrics}</div>;
};

export default Lyrics;
