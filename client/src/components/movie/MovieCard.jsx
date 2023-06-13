import React from "react";
import { useSelector } from "react-redux";
import PosterFallBack from "../../assets/no-poster.png";
import dayjs from "dayjs";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MovieCard = ({ data, mediaType }) => {
  const navigate = useNavigate();

  const { url, loading } = useSelector((state) => state.home);
  return loading ? (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="flex gap-3">
        <Skeleton height="100%" width={"100%"} />
      </div>
    </SkeletonTheme>
  ) : (
    <div className="bg-bg-primary rounded-md lg:min-w-[15rem] sm:min-w-[13rem] min-w-[8rem]">
      <LazyLoadImage
        effect="blur"
        width={"100%"}
        // height={'100%'}
        src={
          (data.poster_path ? data.poster_path : data.profile_path)
            ? url.poster +
              (data.poster_path ? data.poster_path : data.profile_path)
            : PosterFallBack
        }
        alt="poster"
        className="md:h-80 h-[12rem] w-full rounded-t-md cursor-pointer"
        onClick={() => {
          navigate(
            `../../movie/${data?.media_type || mediaType || "movie"}/${data.id}`
          );
        }}
      />
      <div className="p-2 relative ">
        {/* <div className="aspect-square md:w-14 w-10 bg-black rounded-full mb-2 ml-1 p-1 md:top-[-2rem] top-[-1.5rem] right-2 absolute"> */}
        <div className="aspect-square md:w-14 w-10 bg-black rounded-full mb-2 ml-1 p-1 top-[-100%] right-2 absolute">
          <Rating value={data.vote_average} textSize={"1.6rem"} />
        </div>
        <h4 className="md:text-lg text-xs line-clamp-1 ">
          {data.title || data.name}
        </h4>
        <span className="md:text-sm text-[.6rem] text-text-secondary">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
