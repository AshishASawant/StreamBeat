import React, { useState, useEffect } from "react";
import apiClient from "../utils/spotify";
import musicContext from "./musicContext";
import { useSelector } from "react-redux";

const Musicstate = (props) => {
  const [playList, setPlayList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lib, setLib] = useState({});
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const { duration } = audio;
  const [trackProgress, setTrackProgress] = useState(0);
  const [categories, setcategories] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  let prevTrack = localStorage.getItem("prevPlayingTrack");
  let prevIndex = parseInt(localStorage.getItem("prevPlayingIndex"));
  const { login } = useSelector((state) => state);

  const getCategory = () => {
    apiClient.get(`browse/categories`).then(({ data }) => {
      setcategories(data.categories.items);
      setLib(data.categories.items[0].id);
      if (prevTrack && prevTrack.length>2) {
        setTracks(JSON.parse(prevTrack));
        setCurrentIndex(prevIndex || 0);
      } else {
        apiClient
          .get(`browse/categories/${data.categories.items[1].id}/playlists`)
          .then(({ data }) => {
            setChangeTrack(data.playlists.items[0].id);
          });
      }
    });
  };

  useEffect(() => {
    if(!login.current) return;
    getCategory();
    apiClient
      .get(`/browse/new-releases`)
      .then((res) => {
        const a = res.data?.albums.items;
        setNewRelease(a);
      })
      .catch((err) => console.error(err));

    apiClient
      .get(`/browse/featured-playlists`)
      .then((res) => {
        const a = res.data?.playlists.items;
        setFeatured(a);
      })
      .catch((err) => console.error(err));

      return(()=>audio.pause())
    // eslint-disable-next-line
  }, [login.current]);

  const setChangeTrack = (id) => {
    setLoading(true);
    apiClient
      .get(`playlists/${id}/tracks`)
      .then(({ data }) => {
        setTracks(data.items);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert(
            "Your Access token has expired. Please signout and login again"
          );
        }
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    setCurrentTrack(tracks[0]?.track);
    if (initialLoad && prevIndex) {
      setCurrentIndex(prevIndex);
      audio.src = tracks[prevIndex]?.track?.preview_url;
    } else {
      audio.src = tracks[0]?.track?.preview_url;
      setCurrentIndex(0);
      }
    if (!initialLoad) {
      setIsPlaying(true);
      audio.play();
    }
    localStorage.setItem("prevPlayingTrack", JSON.stringify(tracks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks]);

  useEffect(() => {
    audio.src = tracks[currentIndex]?.track?.preview_url;
    if (!initialLoad) {
      setIsPlaying(true);
      audio.play();
      localStorage.setItem("prevPlayingIndex", currentIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  //this useeffect play/pauses the music

  setInterval(() => {
    setTrackProgress(audio.currentTime);
  }, 1000);

  audio.onended = () => {
    if (tracks.length === 1) {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
      }
    } else {
      handleNext();
    }
  };

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const handleNext = () => {
    if (repeat) {
      audio.currentTime = 0;
      audio.play();
    } else if (shuffle) {
      const newIndex = Math.floor(
        Math.random() * (tracks.length - 1 - 0 + 1) + 0
      );
      if (tracks[newIndex]?.track?.preview_url) {
        setCurrentIndex(newIndex);
      } else {
        handleNext();
      }
    } else {
      if (currentIndex === tracks.length - 1) {
        setCurrentIndex(0);
        return;
      }
      let nextIndex = currentIndex + 1;
      while (nextIndex < tracks.length) {
        if (tracks[nextIndex]?.track?.preview_url) {
          setCurrentIndex(nextIndex);
          break;
        }
        nextIndex++;
      }
    }
  };
  const handlePrev = () => {
    if (repeat) {
      setCurrentIndex(currentIndex);
      audio.currentTime = 0;
      audio.play();
    } else if (shuffle) {
      const newIndex = Math.floor(
        Math.random() * (tracks.length - 1 - 0 + 1) + 0
      );
      if (tracks[newIndex]?.track?.preview_url) {
        setCurrentIndex(newIndex);
      } else {
        handleNext();
      }
    } else {
      if (currentIndex === 0) {
        setCurrentIndex(tracks.length - 1);
        return;
      }
      let prevIndex = currentIndex - 1;
      while (prevIndex >= 0) {
        if (tracks[prevIndex]?.track?.preview_url) {
          setCurrentIndex(prevIndex);
          audio.currentTime = 0;
          audio.play();
          break;
        }
        prevIndex--;
      }
    }
  };

  // document.body.onkeyup = function (e) {
  //   if (
  //     (e.key === " " || e.code === "Space") &&
  //     window.location.pathname !== "/music/search" &&
  //     window.location.pathname !== "/movie/search"
  //   ) {
  //     isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  //   }
  // };
  return (
    <musicContext.Provider
      value={{
        playList,
        setPlayList,
        tracks,
        setTracks,
        currentTrack,
        setCurrentTrack,
        currentIndex,
        setCurrentIndex,
        audio,
        isPlaying,
        setIsPlaying,
        handleNext,
        handlePrev,
        setTrackProgress,
        trackProgress,
        currentPercentage,
        shuffle,
        repeat,
        lib,
        setShuffle,
        setRepeat,
        setLib,
        categories,
        setcategories,
        loading,
        setLoading,
        setChangeTrack,
        getCategory,
        setNewRelease,
        setFeatured,
        newRelease,
        featured,
        setInitialLoad,
      }}
    >
      {props.children}
    </musicContext.Provider>
  );
};

export default Musicstate;
