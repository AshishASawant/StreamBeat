import React, { useContext, useEffect, useState } from "react";
import Displaycard from "../../components/music/displaycard/Displaycard";
import musicContext from "../../state/musicContext";
import apiClient from "../../utils/spotify";
import Loading from "../../components/Loading";
import MusicFavourite from "./MusicFavourite";
import UserPlayList from "./UserPlayList";
import { fetchBackendData } from "../../utils/backendApi";

const Library = () => {
  const context = useContext(musicContext);
  const { playList, setPlayList, setChangeTrack,setCurrentIndex } = context;
  const [loading, setLoading] = useState(false);
  const [currentSearchType, setCurrentSearchType] = useState("playlist");

  const [userPlayList, setUserPlayList] = useState([]);

  useEffect(() => {
    getPlaylist();
  }, []);

  const getPlaylist = async () => {
    try {
      const url = `/playlist`;
      const response = await fetchBackendData("GET", url);
      setUserPlayList(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("me/playlists")
      .then(({ data }) => {
        setPlayList(data.items);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPlaylist = (id) => {
    setChangeTrack(id);
    setCurrentIndex(0)
  };

  return (
    <div className="w-full text-text-primary overflow-hidden overflow-y-scroll hide-scroll py-4">
      <div className="flex items-center justify-between  mb-4">
        <h1 className="sm:text-3xl text-2xl md:px-0 px-2">Library</h1>
        <div className="flex md:w-full items-center justify-center gap-2 mr-1">
          <button
            className={`px-3 py-2  rounded-md font-semibold ${
              currentSearchType === "playlist" ? "bg-[red]" : ""
            }`}
            onClick={() => setCurrentSearchType("playlist")}
          >
            Playlist
          </button>
          <button
            className={`px-3 py-2  rounded-md font-semibold ${
              currentSearchType === "favourite" ? "bg-[red]" : ""
            }`}
            onClick={() => setCurrentSearchType("favourite")}
          >
            Favourite
          </button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (currentSearchType==='playlist'?
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 px-2 md:px-0 lg:gap-5 gap-2">
          {userPlayList.map(data=><UserPlayList prop={data}  key={data._id}/>
            )}
          {playList.map((item) => {
            return (
              <Displaycard
                key={item.id}
                id={item.id}
                item={item}
                img={item?.images[0]?.url}
                title={item.name}
                subtitle={item.tracks?.total}
                click={() => openPlaylist(item.id)}
                link={true}
              />
            );
          })}
        </div>:<MusicFavourite/>
      )}
    </div>
  );
};

export default Library;
