import React, { useState } from "react";
import Playbtn from "./Playbtn";
import PlayScreen from "./PlayScreen";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper";

const OfficialVideos = ({ videos }) => {
  const [videoId, setVideoId] = useState(null);
  const [playerState, setPlayerState] = useState(false);

  return (
    <div className="px-2 md:pl-movie-left text-text-primary mt-12">
      <h1 className="text-3xl my-5">Official Videos</h1>
      <div className="flex overflow-y-hidden overflow-x-scroll gap-5 hide-scroll flex-none">
        <Swiper
          slidesPerView={1.1}
          spaceBetween={10}
          centeredSlides={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {videos?.map((item) => (
            <SwiperSlide>
              <div key={item.id}>
                <div
                  className="w-full aspect-video  grid place-items-center rounded-md bg-center bg-cover"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${item.key}/maxresdefault.jpg)`,
                  }}
                  onClick={() => {
                    setVideoId(item?.key);
                    setPlayerState(true);
                  }}
                >
                  <Playbtn />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <PlayScreen
        videoId={videoId}
        setVideoId={setVideoId}
        playerState={playerState}
        setPlayerState={setPlayerState}
      />
    </div>
  );
};

export default OfficialVideos;
