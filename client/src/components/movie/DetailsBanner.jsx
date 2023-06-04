import React, { useState } from "react";
import { useSelector } from "react-redux";
import PosterFallBack from "../../assets/no-poster.png";
import dayjs from "dayjs";
import Rating from "./Rating";
import { useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import PlayScreen from "./PlayScreen";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchBackendData } from "../../utils/backendApi";

const DetailsBanner = ({ item, video, crew, loading, mediatype }) => {
  const { url } = useSelector((state) => state.home);
  const director = crew?.filter((member) => member.job === "Director");
  const writer = crew?.filter(
    (member) =>
      member.job === "Writer" ||
      member.job === "Screenplay" ||
      member.job === "Story" ||
      member.job === "Writing"
  );
  const [videoId, setVideoId] = useState(null);
  const [playerState, setPlayerState] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [watchLater, setWatchLater] = useState(false);

  useEffect(() => {
    setVideoId(video?.key);
  }, [video]);

  useEffect(() => {
    checkFavExists(item.id).then((res) => {
      setIsFavourite(res)
    });
    checkWatchLaterExists(item.id).then((res) => {
      setWatchLater(res)
    });
  }, [item?.id]);

  const checkFavExists = async (itemId) => {
    const url = `/favourite/movie/check`;
    const body = { itemId, mediatype };
    const response = await fetchBackendData("GET", url, body);
    return response.exists;
  };

  const handleAddFavMovie = async (itemId) => {
    try {
      const url = `/favourite/movie/`;
      const body = { itemId, mediatype };
      const response = await fetchBackendData("POST", url, body);
      setIsFavourite(true);
      // Handle the response as needed
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const handleDeleteFavMovie = async (itemId) => {
    try {
      const url = `/favourite/movie`;
      const body = { itemId, mediatype };
      const response = await fetchBackendData("DELETE", url, body);
      setIsFavourite(false);
      // Handle the response as needed
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const checkWatchLaterExists = async (itemId) => {
    try {
      const url = `/watchlater/movie/check`;
      const body = { itemId, mediatype };
      const response = await fetchBackendData("GET", url,body);
      return response.exists;
    } catch (error) {
      console.error(error);
      // Handle the error as needed
      return false;
    }
  };

  const handleAddToWatchLater = async (itemId) => {
    try {
      const url = `/watchlater/movie`;
      const body = { itemId, mediatype };
      const response = await fetchBackendData("POST", url, body);
      setWatchLater(true)
      // Handle the response as needed
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const handleRemoveFromWatchLater = async (itemId) => {
    try {
      const url = `/watchlater/movie`;
      const body = { itemId, mediatype };
      const response = await fetchBackendData("DELETE", url, body);
      setWatchLater(false)
      // Handle the response as needed
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const convertTime = (time) => {
    const hour = Math.floor(time / 60);
    const minute = time % 60;
    return `${hour}h ${minute}m`;
  };

  return (
    <div className="w-full md:mt-[120px] mt-[60px] px-2 md:pl-movie-left flex items-center text-text-primary">
      {!loading ? (
        <div className="flex gap-5 md:flex-row flex-col items-center lg:px-16 ">
          <LazyLoadImage
            effect="blur"
            src={url.poster + item?.poster_path || PosterFallBack}
            alt="banner image"
            className="md:max-w-[55rem]  rounded-md md:h-[30rem] h-[25rem] max-w-[90vw]"
          />
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold">
                {item?.name || item?.title} (
                {dayjs(item?.release_date).format("YYYY")})
              </h2>
              <p className="text-sm md:text-base">{item?.tagline}</p>
            </div>
            <div className="flex gap-5 items-center">
              <div className=" h-16 w-16">
                <Rating value={item?.vote_average} textSize={"1.5rem"} />
              </div>
              <div className="flex gap-3 flex-wrap">
                {item?.genres?.map((item) => (
                  <span
                    key={item.id}
                    className="p-1 rounded-md bg-movie-button line-clamp-1 h-min text-xs"
                  >
                    {item?.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl">OverView</h2>
              <p className="text-sm md:text-sm pt-1">{item?.overview}</p>
            </div>
            <div className="flex my-2 gap-4 flex-wrap items-center ">
              <button className="grid place-items-center text-4xl mx-2 text-[red]">
                {isFavourite ? (
                  <MdOutlineFavorite
                    onClick={() => {
                      handleDeleteFavMovie(item.id);
                    }}
                  />
                ) : (
                  <MdOutlineFavoriteBorder
                    onClick={() => {
                      handleAddFavMovie(item.id);
                    }}
                  />
                )}
              </button>
              <button
                className="flex items-center justify-center gap-2 bg-[red] px-4 py-3 rounded-md"
                onClick={() => {
                  setVideoId(video?.key);
                  setPlayerState(true);
                }}
              >
                <FaPlay />
                <p className="whitespace-nowrap">WATCH NOW</p>
              </button>
              <div className="flex gap-3 flex-1">
                {watchLater ? (
                  <button
                    className="flex items-center justify-center gap-2 bg-[red] px-4 py-3 rounded-md w-full sm:w-fit"
                    onClick={() => {
                      handleRemoveFromWatchLater(item.id)
                    }}
                  >
                    <p className="whitespace-nowrap">REMOVE FROM WATCH LATER</p>
                  </button>
                ) : (
                  <button
                    className="flex items-center justify-center gap-2 bg-[red] px-4 py-3 rounded-md w-full sm:w-fit"
                    onClick={() => {
                      handleAddToWatchLater(item.id)
                    }}
                  >
                    <p className="whitespace-nowrap">ADD TO WATCH LATER</p>
                  </button>
                )}
              </div>
            </div>
            <div>
              <div className="flex md:flex-row gap-1 justify-between text-sm md:text-base md:gap-7 border-y-[.01px] p-2">
                <div className="flex gap-1 flex-wrap md:flex-row flex-col items-center">
                  <p className="">Status:</p>
                  <p className="text-text-secondary">{item?.status}</p>
                </div>
                <div className="flex gap-1 flex-wrap md:flex-row flex-col items-center">
                  <p className="whitespace-nowrap">Release Date:</p>
                  <p className="text-text-secondary">
                    {dayjs(item?.release_date).format("MMM D, YYYY")}
                  </p>
                </div>
                <div className="flex gap-1 flex-wrap md:flex-row flex-col items-center">
                  <p>RunTime:</p>
                  <p className="text-text-secondary">
                    {item?.episode_run_time
                      ? `${item.episode_run_time[0]}m`
                      : convertTime(item?.runtime)}
                  </p>
                </div>
              </div>
              {director?.length !== 0 && (
                <div className="flex gap-1 border-b-[.01px] p-2">
                  <p>Director:</p>
                  <p className="text-text-secondary">
                    {director?.map(
                      (person, i) =>
                        `${person.name} ${
                          director?.length - 1 !== i ? "," : ""
                        } `
                    )}
                  </p>
                </div>
              )}
              {writer?.length !== 0 && (
                <div className="flex gap-1 border-b-[.01px] p-2">
                  <p>Writer:</p>
                  <p className="text-text-secondary">
                    {writer?.map(
                      (person, i) =>
                        `${person.name} ${writer?.length - 1 !== i ? "," : ""} `
                    )}
                  </p>
                </div>
              )}
              {item?.created_by && (
                <div className="flex gap-1 border-b-[.01px] p-2">
                  <p>Creator:</p>
                  <p className="text-text-secondary">
                    {item?.created_by?.map(
                      (person, i) =>
                        `${person.name} ${
                          item?.created_by?.length - 1 !== i ? "," : ""
                        } `
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex gap-5 text-text-primary items-center justify-center">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <div className="md:w-[23rem] rounded-md md:h-[30rem] h-[25rem] max-w-[90vw]">
              <Skeleton height="100%" width="100%" className="" />
            </div>
          </SkeletonTheme>
          <div className="flex flex-col w-[60%]">
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton height="2rem" width="100%" />
              <Skeleton height="1rem" width="100%" />
              <Skeleton height="4rem" width="100%" className="mt-3" />
              <Skeleton height="3rem" width="100%" className="mt-5" />
              <Skeleton height="1rem" width="100%" className="" />
              <Skeleton height="1rem" width="100%" className="" />
              <Skeleton height="1rem" width="100%" className="" />
              <Skeleton height="10rem" width="100%" className="mt-3" />
            </SkeletonTheme>
          </div>
        </div>
      )}
      <PlayScreen
        videoId={videoId}
        setVideoId={setVideoId}
        playerState={playerState}
        setPlayerState={setPlayerState}
      />
    </div>
  );
};

export default DetailsBanner;
