import React, { useEffect, useState } from "react";
import { fetchBackendData } from "../../utils/backendApi";
import GetDataMovieCard from '../../components/movie/GetDataMovieCard'

const WatchLater = () => {
  const [watchLaterList, setWatchLaterList] = useState([])

  useEffect(() => {
    fetchAllWatchLater();
  }, []);

  const fetchAllWatchLater = async () => {
    const url = `/watchlater`;
    const body = null;
    const response = await fetchBackendData("GET", url, body);
    setWatchLaterList(response);
  };
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-1 gap-y-5 mt-10">
      {watchLaterList?.map((item) => (
        <GetDataMovieCard
          id={item?.itemId}
          mediatype={item?.mediatype}
          key={item?._id}
        />
      ))}
    </div>
  );
};

export default WatchLater;
