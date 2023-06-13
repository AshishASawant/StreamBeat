import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/movieApi";
import { useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";
import MovieCard from "../../components/movie/MovieCard";
import MovieCardLoading from "../../components/movie/MovieCardLoading";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const PersonDetails = () => {
  const { id } = useParams();
  const [personDetail, setPersonDetail] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mediaLoading, setMediaLoading] = useState(true);
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    setLoading(true);
    fetchDataFromApi(`/person/${id}`).then((res) => {
      console.log(res);
      setPersonDetail(res);
      setLoading(false);
    });
    setMediaLoading(true);
    fetchDataFromApi(`/person/${id}/combined_credits`).then((res) => {
      console.log(res);
      setMedia(res.cast);
      setMediaLoading(false);
    });
  }, [id]);

  return (
    <section className="md:pl-movie-left md:px-4 px-2 mt-[80px]  text-text-primary">
      <div className="h-full w-full">
        {loading? (
          <SkeletonTheme baseColor="#202020" highlightColor="#444" width={'100%'}>
            <div className="flex gap-5 w-full ">
              <Skeleton height="100%" width="300px" />
              <div className="w-full flex flex-col gap-2">
              <Skeleton height="30px" width="100%" className="w-full flex-1" />
              <Skeleton height="30px" width="100%" className="w-full flex-1" />
              <Skeleton height="390px" width="100%" className="w-full flex-1" />
              </div>
            </div>
          </SkeletonTheme>
        ) : (
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex-none grid place-items-center">
              <LazyLoadImage
                effect="blur"
                src={url.profile + personDetail?.profile_path || avatar}
                className="w-[300px] rounded-md"
                alt="actor"
              />
            </div>
            <div className="flex flex-col self-end gap-2">
              <h2 className="text-4xl font-bold ">
                {personDetail?.name}({personDetail?.birthday})
              </h2>
              <p className="">
                Place Of Birth : {personDetail?.place_of_birth}
              </p>
              <p>{personDetail?.biography}</p>
            </div>
          </div>
        )}
        <div className="my-10">
          <h1 className="text-3xl font-semibold mb-2 underline underline-offset-4">
            Medias
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 px-2 md:px-0 lg:gap-5 gap-2">
            {mediaLoading ? (
              <MovieCardLoading />
            ) : (
              media?.map((item) => (
                <MovieCard
                  key={item?.id}
                  data={item}
                  mediaType={item?.media_type}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonDetails;
