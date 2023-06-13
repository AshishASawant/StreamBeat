import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieCard from "./MovieCard";
import { useState } from "react";
import { fetchDataFromApi } from "../../utils/movieApi";
import swiperConfig from "../../utils/swiperConfig";

const Recommendation = ({ mediatype, id }) => {
  // let { data } = useFetch(`/${mediatype}/${id}/recommendations`);

  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    fetchDataFromApi(`/${mediatype}/${id}/recommendations`).then((res) => {
      setRecommendation(res);
    });
  }, [id, mediatype]);

   return (recommendation?.results.length!==0?
    <div className="px-2 md:pl-movie-left text-text-primary mt-12">
      <h1 className="text-3xl my-5">Recommendation</h1>
      <div>
      <Swiper {...swiperConfig} slidesPerGroupAuto>
            {recommendation?.results?.map((item) => (
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
    </div>:''
  )
};

export default Recommendation;
