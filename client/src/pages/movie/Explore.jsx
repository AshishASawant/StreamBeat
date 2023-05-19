import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/movieApi";
import Select from "react-select";
import MovieCard from "../../components/movie/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetch from "../../hooks/useFetch";
import MovieCardLoading from "../../components/movie/MovieCardLoading";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];


const Explore = () => {

   
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  let { mediatype } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediatype}/list`);

  const fetchInitialData = () => {
    fetchDataFromApi(`/discover/${mediatype}`, filters).then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
    });
};

const fetchNextPageData = () => {
    fetchDataFromApi(
        `/discover/${mediatype}?page=${pageNum}`,
        filters
    ).then((res) => {
        if (data?.results) {
            setData({
                ...data,
                results: [...data?.results, ...res.results],
            });
        } else {
            setData(res);
        }
        setPageNum((prev) => prev + 1);
    });
};

useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();

    // eslint-disable-next-line
}, [mediatype]);

const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
        setSortby(selectedItems);
        if (action.action !== "clear") {
            filters.sort_by = selectedItems.value;
        } else {
            delete filters.sort_by;
        }
    }

    if (action.name === "genres") {
        setGenre(selectedItems);
        if (action.action !== "clear") {
            let genreId = selectedItems.map((g) => g.id);
            genreId = JSON.stringify(genreId).slice(1, -1);
            filters.with_genres = genreId;
        } else {
            delete filters.with_genres;
        }
    }

    setPageNum(1);
    fetchInitialData();
};

  return (
    <div className="px-2 md:pl-movie-left mt-[80px] text-text-primary w-full hide-scroll">
      <div className="flex items-center justify-between flex-col md:flex-row hide-scroll">
        <h1 className="capitalize text-3xl">
          Explore {mediatype === "tv" ? "Tv Shows" : "Movies"}
        </h1>
        <div className="flex gap-5 flex-col md:flex-row">
          <Select
            isMulti
            name="genres"
            value={genre}
            closeMenuOnSelect={false}
            options={genresData?.genres}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            onChange={onChange}
            placeholder="Select genres"
            className="min-w-[250px] md:max-w-[500px] w-full"
            classNamePrefix="react-select"
          />
          <Select
            name="sortby"
            value={sortby}
            options={sortbyData}
            onChange={onChange}
            isClearable={true}
            placeholder="Sort by"
            className="min-w-[250px] max-w-[500px] w-full"
            classNamePrefix="react-select"
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={data?.results?.length || 0}
        next={fetchNextPageData}
        hasMore={true}
        loader={<MovieCardLoading/>}
        className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-1 gap-y-5 mt-10"
      >
        {data?.results?.map((item) => (
          <MovieCard key={item.id} data={item} mediaType={mediatype} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Explore;
