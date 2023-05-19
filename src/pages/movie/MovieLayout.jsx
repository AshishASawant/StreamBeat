import React,{useEffect} from 'react'
import Sidebar from '../../components/movie/MovieSideBar'
import { Outlet } from 'react-router-dom'
import { fetchDataFromApi } from "../../utils/movieApi";
import {  useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "../../state/homeSlice";

const MovieLayout = () => {


  useEffect(() => {
    fetchApiConfig()
    genresCall()

    // eslint-disable-next-line
  }, [])

  const dispatch = useDispatch();

  useEffect(() => {
      fetchApiConfig();
      genresCall();

      // eslint-disable-next-line
  }, []);

  const fetchApiConfig = () => {
      fetchDataFromApi("/configuration").then((res) => {
          const url = {
              backdrop: res.images.secure_base_url + "original",
              poster: res.images.secure_base_url + "original",
              profile: res.images.secure_base_url + "original",
          };

          dispatch(getApiConfiguration(url));
      });
  };

  const genresCall = async () => {
      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {};

      endPoints.forEach((url) => {
          promises.push(fetchDataFromApi(`/genre/${url}/list`));
      });

      const data = await Promise.all(promises);
      data.map(({ genres }) => {
          return genres.map((item) => (allGenres[item.id] = item));
      });

      dispatch(getGenres(allGenres));
  };
  

  return (
<section className="flex flex-col overflow-hidden overflow-y-scroll hide-scroll">
      <div className="w-full movie-scroll-nav">
        <div className="hidden md:block absolute left-5 z-10 overflow-hidden overflow-y-scroll hide-scroll">
        <Sidebar />
        </div>
        <Outlet />
      </div>
      <div className="md:hidden">
        <Sidebar/>
      </div>
    </section>  )
}

export default MovieLayout