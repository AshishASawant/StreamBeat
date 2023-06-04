import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { GiCancel } from "react-icons/gi";
import { MdDelete, MdOutlineDone, MdOutlinePlaylistAdd } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { fetchBackendData } from "../../utils/backendApi";

const PlaylistModel = ({
  item,
  setIsModel,
  presentPlaylist,
  setShouldReturn,
}) => {
  const [createNew, setCreateNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [userPlayList, setUserPlayList] = useState([]);

  useEffect(() => {
    getPlaylist();
  }, [item]);

  const createNewPlaylist = async (type) => {
    try {
      const url = `/playlist/create`;
      const body = { name: newPlaylistName, type };
      setCreateNew(false);
      setNewPlaylistName("");
      fetchBackendData("POST", url, body);
      getPlaylist();
      // Handle the response as needed
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const getPlaylist = async () => {
    try {
      const url = `/playlist`;
      const response = await fetchBackendData("GET", url);
      setUserPlayList(response);
      // Handle the response as needed
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };
  const addMusicToPlaylist = async (playlistId, musicId) => {
    try {
      const url = `/playlist/${playlistId}/add`;
      const body = { musicId };
      fetchBackendData("POST", url, body);
      setIsModel(false);
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const deleteMusicFromPlayList = async (playlistId, musicId) => {
    try {
      const url = `/playlist/${playlistId}/remove`;
      const body = { musicId };
      fetchBackendData("DELETE", url, body);
      setShouldReturn(false);
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  return (
    <div className="fixed h-screen w-screen z-20 top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center px-2">
      <div className="bg-bg-main p-2 rounded-md w-96">
        <div className="flex gap-3 items-center">
          <LazyLoadImage
            effect="blur"
            src={item?.album?.images[0]?.url}
            className="aspect-square h-[60px] w-[60px] rounded-md"
          />
          <div className="overflow-hidden text-ellipsis flex-1">
            <p className="queue-song capitalize text-sm line-clamp-1">
              {item?.name}
            </p>
            <p className="queue-time text-xs line-clamp-1">
              By {item?.artists[0]?.name}
            </p>
          </div>
          <button className="text-2xl" onClick={() => setIsModel(false)}>
            <GiCancel />
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {userPlayList.map(
            (data) =>
              presentPlaylist !== data._id && (
                <button
                  key={data._id}
                  className="py-1 w-fit flex gap-2 items-center"
                  onClick={() => addMusicToPlaylist(data._id, item.id)}
                >
                  <MdOutlinePlaylistAdd className="text-3xl" />
                  Add to {data.name}
                </button>
              )
          )}
          {!createNew ? (
            <button
              className="py-1 w-fit flex gap-3 items-center"
              onClick={() => setCreateNew(true)}
            >
              <IoIosCreate className="text-2xl" />
              Create New Playlist
            </button>
          ) : (
            <div className="flex w-full items-center  my-1">
              <IoIosCreate className="text-2xl" />
              <input
                type="text"
                className="bg-transparent outline-none pl-1 flex-1"
                placeholder="new playlist"
                autoFocus={true}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
              <MdOutlineDone
                className={`text-2xl text-green-600 mx-2 cursor-pointer ${
                  newPlaylistName.trim() ? "visible" : "invisible"
                }`}
                onClick={() => createNewPlaylist("music")}
              />
              <RxCross2
                className="text-2xl text-[red] cursor-pointer"
                onClick={() => {
                  setCreateNew(false);
                  setNewPlaylistName("");
                }}
              />
            </div>
          )}
          {presentPlaylist && (
            <button
              className="flex gap-2 bg-[red] items-center justify-center mt-1 rounded-md py-2"
              onClick={() => deleteMusicFromPlayList(presentPlaylist, item.id)}
            >
              <MdDelete className="text-xl" /> <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistModel;
