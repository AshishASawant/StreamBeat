import React, { useEffect, useState } from "react";
import { fetchBackendData } from "../../utils/backendApi";
import GetDataMovieCard from "../../components/movie/GetDataMovieCard";
import MovieCardLoading from "../../components/movie/MovieCardLoading";

const Favourite = () => {
  const [favouriteList, setFavouriteList] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchAllFavourite();
  }, []);

  const fetchAllFavourite = async () => {
    setloading(true);
    const url = `/favourite/movie`;
    const body = null;
    const response = await fetchBackendData("GET", url, body);
    setFavouriteList(response);
    setloading(false);
  };
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-1 gap-y-5 mt-10">
      {loading ? (
        <MovieCardLoading />
      ) : favouriteList.length !== 0 ? (
        favouriteList?.map((item) => (
          <GetDataMovieCard
            id={item?.itemId}
            mediatype={item?.mediatype}
            key={item?._id}
          />
        ))
      ) : (
        favouriteList.length === 0 && <p>No Data Added To Favourite</p>
      )}
    </div>
  );
};

export default Favourite;
