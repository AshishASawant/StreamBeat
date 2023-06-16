import React, {  useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoPlay } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { fetchBackendData } from "../../utils/backendApi";
import PlaylistModel from "./PlaylistModel";

const DetailedPlaylistCard = ({ item, index,click,fav,presentPlaylist }) => {
  const [favourite, setFavourite] = useState(fav);
  const [isModel, setIsModel] = useState(false)
  const [shouldReturn, setShouldReturn] = useState(true)
  
  useEffect(() => {
    checkFavExists(item?.id,'music').then((res) => {
      setFavourite(res)
    });
    // eslint-disable-next-line
  }, [item?.id]);

  const checkFavExists = async (itemId,mediatype) => {
    const url = `/favourite/music/check`;
    const body = { itemId, mediatype };
    const response = await fetchBackendData("GET", url, body);
    return response.exists;
  };

  const handleMobileClick=(index)=>{
    if(window.innerWidth<768){
      click(index)
    }
  }
  

  const handleAddFavMusic = async (itemId,mediatype) => {
    try {
      const url = `/favourite/music/`;
      const body = { itemId, mediatype };
      fetchBackendData("POST", url, body);
      setFavourite(true);
      // Handle the response as needed
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  
  const handleDeleteFavMusic = async (itemId,mediatype) => {
    try {
      const url = `/favourite/music`;
      const body = { itemId, mediatype };
      fetchBackendData("DELETE", url, body);
      setFavourite(false);
      // Handle the response as needed
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  return (shouldReturn?
    <div className="w-full border-white h-[60px] mt-4 flex items-center gap-3 justify-between md:px-0 " onClick={()=>handleMobileClick(index)}>
      <div className="flex gap-2 items-center ">
        <p className="h-full w-5 text-center hidden sm:block font-semibold">{index + 1}</p>
        <LazyLoadImage
          effect="blur"
          src={item?.album?.images[0]?.url}
          className="aspect-square h-[60px] w-[60px] rounded-md"
        />
        <div className="overflow-hidden text-ellipsis flex-1">
          <p className="queue-song capitalize text-sm line-clamp-1">
            {item?.name}
          </p>
          <p className="queue-time text-xs line-clamp-1">
            By {item?.artists[0]?.name}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="text-3xl flex items-center ">
          {favourite ? (
            <button onClick={()=>handleDeleteFavMusic(item.id,'music')}>
              <AiFillHeart />
            </button>
          ) : (
            <button onClick={()=>handleAddFavMusic(item.id,'music')}>
              <AiOutlineHeart />
            </button>
          )}
        </div>
        <button className=" hover:bg-bg-main rounded-full text-3xl" onClick={(e)=>setIsModel(true)}>
          <BiDotsVerticalRounded />
        </button>
        <button className="sm:block hidden">
          <IoPlay className="text-3xl md:p-3 p-2 cursor-pointer rounded-full bg-green-600 text-black md:h-10 md:w-10 h-full aspect-square" onClick={() => {
                  click(parseInt(index))
                }} />
        </button>
      </div>
      {isModel && <PlaylistModel item={item} setIsModel={setIsModel} presentPlaylist={presentPlaylist} setShouldReturn={setShouldReturn}/>}
    </div>:''
  );
};

export default DetailedPlaylistCard;
