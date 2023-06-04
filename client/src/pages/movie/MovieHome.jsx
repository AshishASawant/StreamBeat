import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import HeroBanner from "../../components/movie/HeroBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TimeWindowToggle from "../../components/movie/TimeWindowToggle";
import MovieCard from "../../components/movie/MovieCard";
import swiperConfig from '../../utils/swiperConfig'

const MovieHome = () => {
  const [heroBannerData, setHeroBannerData] = useState([]);
  const { data, loading } = useFetch("/movie/now_playing");
  const [trending, setTrending] = useState({
    currentWindow: "day",
    data: [],
    loading: null,
  });
  const [popular, setPopular] = useState({ currentWindow: "movie", data: [] });
  const [topRated, setTopRated] = useState({
    currentWindow: "movie",
    data: [],
  });


  useEffect(() => {
    setHeroBannerData(data?.results);
  }, [data]);

  return (
    <section className="flex flex-col text-white overflow-hidden overflow-y-scroll hide-scroll pb-16">
      {loading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div>
            <Skeleton height="700px" width="100%" />
          </div>
        </SkeletonTheme>
      ) : (
        <div className="w-full overflow-hidden h-[700px]  overflow-y-scroll hide-scroll">
          <Swiper
            cssMode={true}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            grabCursor={true}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {heroBannerData?.map((item) => (
              <SwiperSlide key={item?.id}>
                <HeroBanner key={item.id} item={item} loading={loading} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="md:pl-movie-left md:px-4 px-2 overflow-hidden overflow-y-scroll hide-scroll mt-5">
        <div className="flex items-center justify-between overflow-hidden overflow-y-scroll hide-scroll mb-4">
          <h1 className="text-2xl">Trending</h1>
          <TimeWindowToggle
            window={["day", "week"]}
            url={`/trending/all/${trending.currentWindow}`}
            storage={setTrending}
            originalWindow={trending}
          />
        </div>
        <div>
          <Swiper {...swiperConfig} slidesPerGroupAuto>
            {trending?.data?.map((item) => (
              <SwiperSlide className="swiper-card" key={item?.id}>
                <MovieCard
                  key={item.id}
                  data={item}
                  mediaType={trending.currentWindow}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="md:pl-movie-left md:px-4 px-2 overflow-hidden overflow-y-scroll hide-scroll mt-5">
        <div className="flex items-center justify-between overflow-hidden overflow-y-scroll hide-scroll mb-4">
          <h1 className="text-2xl">What's Popular</h1>
          <TimeWindowToggle
            window={["movie", "tv"]}
            url={`/${popular.currentWindow}/popular`}
            storage={setPopular}
            originalWindow={popular}
          />
        </div>
        <div>
          <Swiper
           {...swiperConfig}
          >
            {popular?.data?.map((item) => (
              <SwiperSlide className="swiper-card" key={item?.id}>
                <MovieCard
                  key={item.id}
                  data={item}
                  mediaType={popular.currentWindow}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="md:pl-movie-left md:px-4 px-2 overflow-hidden overflow-y-scroll hide-scroll mt-5">
        <div className="flex items-center justify-between overflow-hidden overflow-y-scroll hide-scroll mb-4">
          <h1 className="text-2xl">Top Rated</h1>
          <TimeWindowToggle
            window={["movie", "tv"]}
            url={`/${topRated.currentWindow}/top_rated`}
            storage={setTopRated}
            originalWindow={topRated}
          />
        </div>
        <div>
          <Swiper {...swiperConfig} slidesPerGroupAuto slidesPerView={'auto'}
          >
            {topRated?.data?.map((item) => (
              <SwiperSlide className="swiper-card" key={item?.id}>
                <MovieCard
                  key={item.id}
                  data={item}
                  mediaType={topRated.currentWindow}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MovieHome;
