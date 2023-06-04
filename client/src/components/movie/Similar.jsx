import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MovieCard from "./MovieCard";
import { fetchDataFromApi } from "../../utils/movieApi";
import swiperConfig from "../../utils/swiperConfig";

const Similar = ({ mediatype, id }) => {
  // let { data } = useFetch(`/${mediatype}/${id}/similar`);

  const [similar, setSimilar] = useState(null)

  useEffect(() => {
    fetchDataFromApi(`/${mediatype}/${id}/similar`).then((res) => {
      setSimilar(res);
    });
  }, [id, mediatype]);

  
  return (
    <div className="px-2 md:pl-movie-left text-text-primary mt-12">
      <h1 className="text-3xl my-5">Similar</h1>
      <div>
      <Swiper {...swiperConfig} slidesPerGroupAuto>
            {similar?.results?.map((item) => (
              <SwiperSlide className="swiper-card" key={item.id}>
                <MovieCard
                  key={item.id}
                  data={item}
                  mediaType={mediatype}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Similar;
