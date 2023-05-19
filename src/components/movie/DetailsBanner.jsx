import React, { useState } from "react";
import { useSelector } from "react-redux";
import PosterFallBack from "../../assets/no-poster.png";
import dayjs from "dayjs";
import Rating from "./Rating";
import { useEffect } from "react";
import Playbtn from "./Playbtn";
import PlayScreen from "./PlayScreen";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailsBanner = ({ item, video, crew, loading }) => {
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

  useEffect(() => {
    setVideoId(video?.key);
  }, [video]);

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
          <div className="grid gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold">
                {item?.name || item?.title} (
                {dayjs(item?.release_date).format("YYYY")})
              </h2>
              <p className="text-sm md:text-base">{item?.tagline}</p>
            </div>
            <div className="flex gap-3">
              {item?.genres?.map((item) => (
                <span
                  key={item.id}
                  className="p-1 rounded-md bg-movie-button line-clamp-1 h-min text-xs"
                >
                  {item?.name}
                </span>
              ))}
            </div>
            <div className="flex h-16 justify-self-start my-2 gap-4">
              <Rating value={item?.vote_average} textSize={"1.5rem"} />
              <div
                className="flex flex-1 items-center justify-center gap-2 play-con"
                onClick={() => {
                  setVideoId(video?.key);
                  setPlayerState(true);
                }}
              >
                <Playbtn />
                <p className="whitespace-nowrap text-[red]">Watch Now</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl">OverView</h2>
              <p className="text-sm md:text-sm pt-1">{item?.overview}</p>
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
