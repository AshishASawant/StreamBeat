import React, { useEffect, useState } from "react";
import { fetchBackendData } from "../../utils/backendApi";
import GetDataMovieCard from '../../components/movie/GetDataMovieCard'

const Favourite = () => {
  const [favouriteList, setFavouriteList] = useState([]);

  useEffect(() => {
      fetchAllFavourite();
  }, []);

  const fetchAllFavourite = async () => {
    const url = `/favourite/movie`;
    const body = null;
    const response = await fetchBackendData("GET", url, body);
    setFavouriteList(response);
  };
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-1 gap-y-5 mt-10">
      {favouriteList?.map((item) => (
        <GetDataMovieCard
          id={item?.itemId}
          mediatype={item?.mediatype}
          key={item?._id}
        />
      ))}
    </div>
  );
};

export default Favourite;
