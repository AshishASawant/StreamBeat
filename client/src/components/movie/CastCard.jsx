import React from "react";
import { useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";

const CastCard = ({ member }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  return (
    <div
      className=" text-text-primary flex-none"
      onClick={() => navigate(`../person/${member.id}`)}
    >
      <LazyLoadImage
        effect="blur"
        src={member.profile_path ? url.profile + member.profile_path : avatar}
        alt="cast"
        className="w-48 aspect-square rounded-full"
      />
      <h2 className="w-full overflow-hidden text-sm whitespace-nowrap text-ellipsis mt-1">
        {member.name}
      </h2>
      <p className="w-full overflow-hidden text-text-secondary text-xs  whitespace-nowrap">
        {member.character}
      </p>
    </div>
  );
};

export default CastCard;
