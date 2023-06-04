import React, { useContext, useEffect, useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { fetchBackendData } from "../../utils/backendApi";
import apiClient from "../../utils/spotify";
import musicContext from "../../state/musicContext";
import { MdEdit, MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const UserPlayList = ({ prop }) => {
  const [data, setData] = useState(prop)
  const [tracksList, setTracksList] = useState([]);
  const context = useContext(musicContext);
  const navigate=useNavigate()
  const [isEdit, setIsEdit] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const { setTracks } = context;
  const state={name:data.name,description:'Your Playlist',images:[{url:`https://picsum.photos/640?random=${data._id}`}],tracks:{total:data.musicPlaylist.length},allTrackData:data,presentPlaylist:data._id}

  useEffect(() => {
    getTrackData();
  }, []);

  const getTrackData = () => {
    for (let i = 0; i < data.musicPlaylist.length; i++) {
      apiClient.get(`tracks/${data.musicPlaylist[i]}`).then((res) => {
        setTracksList((prev) => [...prev, { track: res.data }]);
      });
    }
  };

  const editPlaylistName=async()=>{
    if (!newPlaylistName.trim()) {
      return
    }
    try {
      const url = `/playlist/${data._id}`;
      const body = { name:newPlaylistName };
      const response = await fetchBackendData("PUT", url, body);
      setIsEdit(false)   
      setData({...data,'name':newPlaylistName})
      setNewPlaylistName('')
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  }

  return (
    <div className="w-full md:p-3 p-2 bg-bg-primary hover:bg-bg-secondary text-text-primary relative grid gap-2 rounded-md h-full ">
      <div className={`aspect-square p-0 overflow-hidden `} onClick={()=>navigate(`../playlist/${data._id}`,{state})} >
        <LazyLoadImage
          effect="blur"
          src={`https://picsum.photos/640?random=${data._id}`}
          alt="Artist"
          className="aspect-square  rounded-md  cursor-pointer"
          onClick={() => ""}
        />
      </div>
      {!isEdit ? (
        <button
          className="text-[.9rem] line-clamp-1 capitalize flex gap-2"
          onClick={() => {
            setIsEdit(true);
            setNewPlaylistName(data.name);
          }}
        >
          <MdEdit className="text-xl" />
          {data?.name}
        </button>
      ) : (
        <div className="flex items-center gap-2 overflow-hidden ">
          <input
            type="text"
            className="bg-transparent outline-none text-[.8rem] p-0 flex-1 min-w-[10px]  "
            placeholder="Rename"
            autoFocus={true}
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <MdOutlineDone
            className={`text-xl text-green-600  cursor-pointer ${
              newPlaylistName.trim() ? "visible" : "invisible"
            }`}
            onClick={() => editPlaylistName()}
          />
          <RxCross2
            className="text-xl text-[red] cursor-pointer"
            onClick={() => {
              setIsEdit(false);
              setNewPlaylistName("");
            }}
          />
        </div>
      )}
      <p className="text-xs line-clamp-2">{data?.musicPlaylist?.length}</p>
      {!isEdit && (
        <div className="absolute right-2 bottom-2 cursor-pointer">
          <BsFillPlayCircleFill
            className="text-green-600 text-[1.5rem] md:text-[2.5rem]"
            onClick={() => {
              setTracks(tracksList);
              // setTracksList(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UserPlayList;
