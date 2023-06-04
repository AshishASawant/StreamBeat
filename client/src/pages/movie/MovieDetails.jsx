import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DetailsBanner from "../../components/movie/DetailsBanner";
import Cast from "../../components/movie/Cast";
import OfficialVideos from "../../components/movie/OfficialVideos";
import Recommendation from "../../components/movie/Recommendation";
import Similar from "../../components/movie/Similar";
import { fetchDataFromApi } from "../../utils/movieApi";

const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [credit, setCredit] = useState(null)
  const [demoUrl, setdemoUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const {url} = useSelector(state=>state.home)
  
  const { mediatype, id } = useParams();
  // let { data } = useFetch(`/${mediatype}/${id}`);
  // let {data:demoUrl}=useFetch(`/${mediatype}/${id}/videos`)
  // let {data:credit}=useFetch(`/${mediatype}/${id}/credits`)
  
  useEffect(() => {
    window.scrollTo(0,0)
    setLoading(true)
    fetchDataFromApi(`/${mediatype}/${id}/videos`).then((res)=>{
      setdemoUrl(res)
    })
    
    fetchDataFromApi(`/${mediatype}/${id}/credits`).then((res)=>{
      setCredit(res)
    })

    fetchDataFromApi(`/${mediatype}/${id}`).then((res)=>{
      setMovieDetail(res)
      setLoading(false)
    })
  }, [id,mediatype]);


  


  return (
    <div className="pb-16 overflow-hidden bg-center bg-no-repeat" style={{
      backgroundImage: `linear-gradient(180deg,rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)),url(${
        url.backdrop + movieDetail?.backdrop_path
      })`,
      backgroundSize:'100% 700px',
      backgroundPositionY:'0px'
    }}>
      <DetailsBanner item={movieDetail} mediatype={mediatype} video={demoUrl?.results?.[0]} crew={credit?.crew} loading={loading}/>
      <Cast cast={credit?.cast} loading={""}/>
      <OfficialVideos videos={demoUrl?.results}/>
      <Recommendation mediatype={mediatype} id={id}/>
      <Similar mediatype={mediatype} id={id}/>
    </div>
  );
};

export default MovieDetails;
