import React from "react";
import { useSelector } from "react-redux";
import avatar from '../../assets/avatar.png'
import { LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CastCard = ({ member }) => {
    const {url}=useSelector(state=>state.home)

  return (
    <div
      key={member.id}
      className=" text-text-primary"
    >
        <div className="w-32 items-center">
      <LazyLoadImage
        effect="blur"
        width={'100%'}
        src={member.profile_path?url.profile + member.profile_path:avatar}
        alt="cast"
        className="w-full h-32 rounded-full"
        />
      <h2 className='w-full overflow-hidden text-sm whitespace-nowrap text-ellipsis mt-1'>{member.name}</h2>
      <p className='w-full overflow-hidden text-text-secondary text-xs  whitespace-nowrap'>{member.character}</p>
        </div>
    </div>
  );
};

export default CastCard;
