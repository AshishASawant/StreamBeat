import React from "react";
import {  useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { setProgress } from "../state/loadingSlice";

const TopLoading = () => {
  const {loading}=useSelector(state=>state)
  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={loading.progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </div>
  );
};

export default TopLoading;
