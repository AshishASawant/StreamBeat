import React from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCardLoading = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Skeleton height="20rem" />
      <Skeleton height="20rem" />
      <Skeleton height="20rem" />
      <Skeleton height="20rem" />
      <Skeleton height="20rem" />
      <Skeleton height="20rem" />
      <Skeleton height="20rem" />
      <Skeleton height="20rem" />
      <Skeleton height="20rem" />
      <Skeleton height="20rem" />
      <Skeleton height="20rem" />
      <Skeleton height="20rem" />
  </SkeletonTheme>  )
}

export default MovieCardLoading