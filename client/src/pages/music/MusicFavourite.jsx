import React, { useEffect, useContext, useState } from "react";
import { fetchBackendData } from "../../utils/backendApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import musicContext from "../../state/musicContext";
import apiClient from "../../utils/spotify";
import DetailedPlaylistCard from "../../components/music/DetailedPlaylistCard";
import { IoPlay } from "react-icons/io5";
import Loading from '../../components/Loading'

const MusicFavourite = () => {
  const [favouriteList, setFavouriteList] = useState([]);
  const context = useContext(musicContext);
  const [loading, setloading] = useState(true)
  const { setTracks,setCurrentIndex,setInitialLoad } = context;

  useEffect(() => {
    fetchAllFavourite();
  }, []);

  const fetchAllFavourite = async () => {
    setloading(true)
    const url = `/favourite/music`;
    const body = null;
    const response = await fetchBackendData("GET", url, body);
    for (let i = 0; i < response.length; i++) {
      apiClient.get(`tracks/${response[i].itemId}`).then((res) => {
        // console.log(res);
        setFavouriteList((prev) => [...prev, { track: res.data }]);
      });
    }
    setloading(false)
  };

  const handleOnChange = (index) => {
    setInitialLoad(0)
    setTracks([favouriteList[index]]);
  };

  return (
    loading?<Loading/>:<div className="overflow-y-scroll hide-scroll w-full text-text-primary px-2">
      <div className="flex gap-5 w-full">
        <LazyLoadImage
          effect="blur"
          src={
            "https://www.cassandragaisford.com/wp-content/uploads/2016/10/love-clipart-clip-art-love-clipart.png"
          }
          className="rounded-md md:h-[20rem] md:w-[20rem] sm:h-[15rem] sm:w-[15rem] h-[10rem] w-[10rem] "
        />
        <div className="self-end flex-1">
          <button className="rounded-full bg-green-600 mb-3 text-black grid place-items-center p-3 text-4xl aspect-square">
            <IoPlay
              className="cursor-pointer "
              onClick={() => {
                setInitialLoad(0)
                setTracks(favouriteList);
                setCurrentIndex(0)
              }}
            />
          </button>
          <p className="uppercase text-[0.6rem] md:text-base">Playlist</p>
          <h2 className="lg:text-[4.5rem] sm:text-[3rem] text-[1.5rem] font-extrabold text-green-600">
            Favourite
          </h2>
          <p className="text-xs md:text-base">Your Favourites</p>
          <p className="text-xs md:text-base">
            Total Tracks : {favouriteList.length}
          </p>
        </div>
        <div></div>
      </div>
      <div className=" mt-5">
        {favouriteList?.map((item, i) => (
          <DetailedPlaylistCard
            item={item?.track}
            key={item?.id}
            index={i}
            click={handleOnChange}
            fav={true}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicFavourite;
