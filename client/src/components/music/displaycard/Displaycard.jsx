import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const Displaycard = ({
  title,
  subtitle,
  img,
  click,
  link,
  item,
  isMin,
  linkFunc,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full md:p-3 p-2 bg-bg-primary hover:bg-bg-secondary text-text-primary relative grid gap-2 rounded-md h-full ">
      <div
        className={`${
          isMin ? "min-w-[7rem]  lg:min-w-[11rem]" : ""
        } w-full aspect-square p-0 overflow-hidden `}
      >
        <LazyLoadImage
          effect="blur"
          src={img}
          alt="Artist"
          className="aspect-square w-full rounded-md  cursor-pointer"
          onClick={() =>
            link
              ? linkFunc
                ? linkFunc()
                : navigate(`../playlist/${item?.id}`, { state: item })
              : click() 
          }
        />
      </div>
      <p className="text-[.9rem] line-clamp-1">{title}</p>
      <p className="text-xs line-clamp-2">{subtitle}</p>
      <div className="absolute right-2 bottom-2 cursor-pointer">
        <BsFillPlayCircleFill
          className="text-green-600 text-[1.5rem] md:text-[2.5rem]"
          onClick={click}
        />
      </div>
    </div>
  );
};

export default Displaycard;
