import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import musicContext from "../../state/musicContext";
import apiClient from "../../utils/spotify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DetailedPlaylistCard from "../../components/music/DetailedPlaylistCard";
import { IoPlay } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { fetchBackendData } from "../../utils/backendApi";
import Loading from "../../components/Loading";

const DetailedPlaylist = () => {
  const context = useContext(musicContext);
  const { setTracks, setCurrentIndex } = context;
  const [currentList, setcurrentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { state } = location;

  const handleOnChange = (index) => {
    setTracks([currentList[index]]);
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  useEffect(() => {
    if (state.allTrackData) {
      setLoading(true);
      for (let i = 0; i < state.allTrackData?.musicPlaylist?.length; i++) {
        apiClient
          .get(`tracks/${state.allTrackData.musicPlaylist[i]}`)
          .then((res) => {
            setcurrentList((prev) => [...prev, { track: res.data }]);
          });
      }
      setLoading(false);
    } else {
      getPlaylistData(params?.id);
    }
    // eslint-disable-next-line
  }, [params?.id]);

  const getPlaylistData = (id) => {
    setLoading(true);
    apiClient
      .get(`playlists/${id}/tracks`)
      .then(({ data }) => {
        setcurrentList(data.items);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert(
            "Your Access token has expired. Please signout and login again"
          );
        }
        setLoading(false);
      });
  };

  const deleteEntirePlaylist = async () => {
    try {
      setLoading(true)
      const url = `/playlist/${state?.presentPlaylist}`;
      const body = null;
      fetchBackendData("DELETE", url, body).then(() => {
        setLoading(false);
        navigate("../library");
      });
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  };

  return loading ? (
    <div className="w-full">
      <Loading />
    </div>
  ) : (
    <div className="overflow-y-scroll hide-scroll w-full text-text-primary px-2 relative py-5">
      <div className="flex gap-5 w-full">
        {
          <LazyLoadImage
            effect="blur"
            src={
              state?.images[0]?.url ||
              `https://picsum.photos/640?random=${state.allTrackData._id}`
            }
            className="rounded-md md:h-[20rem] md:w-[20rem] sm:h-[15rem] sm:w-[15rem] h-[10rem] w-[10rem] flex-none "
          />
        }
        <div className="self-end flex-1 ">
          <div className="flex gap-10 mb-3 items-center ">
            <button className="rounded-full bg-green-600  text-black grid place-items-center text-4xl p-3 aspect-square">
              <IoPlay
                className="cursor-pointer "
                onClick={() => {
                  setTracks(currentList);
                  setCurrentIndex(0);
                }}
              />
            </button>
            {state?.presentPlaylist && (
              <button className="rounded-full  text-[red] grid place-items-center text-4xl p-3 aspect-square">
                <AiFillDelete
                  className="cursor-pointer "
                  onClick={() => {
                    deleteEntirePlaylist();
                  }}
                />
              </button>
            )}
          </div>
          <p className="uppercase text-[0.6rem] md:text-base">Playlist</p>
          <h2 className="lg:text-[4.5rem] sm:text-[3rem] text-[1.5rem] font-extrabold text-green-600 line-clamp-2">
            {state?.name}
          </h2>
          {/* <p className="text-xs md:text-base">{state?.description}</p> */}
          <p className="text-xs md:text-base">
            Total Tracks : {state?.tracks?.total}
          </p>
        </div>
        <div></div>
      </div>
      <div className=" mt-5">
        {currentList?.map((item, i) => (
          <DetailedPlaylistCard
            item={item?.track}
            key={item?.id || i}
            index={i}
            click={handleOnChange}
            presentPlaylist={state?.presentPlaylist}
          />
        ))}
      </div>
    </div>
  );
};

export default DetailedPlaylist;
