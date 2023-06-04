import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCardLoading = () => {
  return (
    <SkeletonTheme
      baseColor="#202020"
      highlightColor="#444"
    >
      <div className="h-[15rem] md:h-[24rem]">
        <Skeleton height="100%" />
      </div>
      <div className="h-[15rem] md:h-[24rem]">
        <Skeleton height="100%" />
      </div>
      <div className="h-[15rem] md:h-[24rem]">
        <Skeleton height="100%" />
      </div>
      <div className="h-[15rem] md:h-[24rem]">
        <Skeleton height="100%" />
      </div>
      <div className="h-[15rem] md:h-[24rem]">
        <Skeleton height="100%" />
      </div>
      <div className="h-[15rem] md:h-[24rem]">
        <Skeleton height="100%" />
      </div>
    </SkeletonTheme>
  );
};

export default MovieCardLoading;
