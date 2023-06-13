import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import Rating from "./Rating";


const HeroBanner = ({ item }) => {
  const { url, genres } = useSelector((state) => state.home);

  return(
    <div
      key={item.id}
      className="h-[700px]  grid  w-full bg-center bg-cover  text-white items-center md:pl-[10rem] p-4 pt-[55px]"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${
          url.backdrop + item?.backdrop_path
        })`,
      }}
    >
      <div className="w-full max-w-[600px] grid gap-5">
        <h2 className="text-4xl font-extrabold ">
          {item?.title || item?.name}
        </h2>
        <div className="my-5 flex items-center gap-4">
          <div className="w-16">
            <Rating value={item?.vote_average} textSize={"1.7rem"} />
          </div>
          <div className="flex gap-3 flex-wrap">
            {item?.genre_ids.map((id,i) => (
              <span
                key={genres[id]?.id || i}
                className="sm:p-2 p-1 rounded-md sm:text-base text-xs bg-movie-button line-clamp-1 h-min"
              >
                {genres[id]?.name}
              </span>
            ))}
          </div>
        </div>
        <p className="line-clamp-6 sm:line-clamp-none overflow-hidden text-ellipsis">{item?.overview}</p>
        <Link
          to={`../../movie/${item.media_type || "movie"}/${item?.id}`}
          className="bg-movie-button rounded-md px-3 py-2 w-max font-semibold flex items-center gap-2"
        >
          <BsFillPlayFill className=" text-3xl" />
          Watch Now
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
