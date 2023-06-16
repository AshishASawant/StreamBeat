import React, { useEffect, useState } from "react";
import { fetchBackendData } from "../../utils/backendApi";
import GetDataMovieCard from "../../components/movie/GetDataMovieCard";
import MovieCardLoading from "../../components/movie/MovieCardLoading";

const WatchLater = () => {
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAllWatchLater();
  }, []);

  const fetchAllWatchLater = async () => {
    setLoading(true);
    const url = `/watchlater`;
    const body = null;
    const response = await fetchBackendData("GET", url, body);
    setWatchLaterList(response);
    setLoading(false);
  };
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-1 gap-y-5 mt-10 min-h-[60px]">
      {loading ? (
        <MovieCardLoading />
      ) : watchLaterList.length !== 0 ? (
        watchLaterList?.map((item) => (
          <GetDataMovieCard
            id={item?.itemId}
            mediatype={item?.mediatype}
            key={item?._id}
          />
        ))
      ) : (
        watchLaterList.length === 0 && <p>No Data Added To Watchlater</p>
      )}
    </div>
  );
};

export default WatchLater;
