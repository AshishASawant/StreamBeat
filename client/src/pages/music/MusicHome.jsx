import React, { useContext, useEffect, useState } from "react";
import apiClient from "../../utils/spotify";
import musicContext from "../../state/musicContext";
import Displaycard from "../../components/music/displaycard/Displaycard";
import { Swiper, SwiperSlide } from "swiper/react";
import swiperConfig from "../../utils/swiperConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MusicHome = () => {
  const context = useContext(musicContext);
  const {
    newRelease,
    featured,
    currentIndex,
    tracks,
    setTracks,
    setChangeTrack,
  } = context;

  const {app}=useSelector(state=>state)
  const [similar, setSimilar] = useState([]);
  const navigate = useNavigate();

  const getArtist = (item,link) => {
    console.log(item)
    let newArr = [];
    apiClient.get(`artists/${item.id}/top-tracks?market=ES`).then(({ data }) => {
      let musicPlaylist=[]
      for (let i = 0; i < data.tracks.length; i++) {
        musicPlaylist.push(data.tracks[i].id)
      }
      const state = {
        name: item.name,
        description: "Similar Artist",
        images: [{ url: item.images[0].url }],
        tracks: { total: data.tracks.length },
        allTrackData: { musicPlaylist},
      };
      if (link) {
        navigate(`../playlist/${item.id}`, { state });
      } 
      else{
        data.tracks.forEach((element) => {
          newArr.push({ track: element });
          setTracks(newArr);
        });
      }
    });
  };

  const getAlbum = (item, url, link) => {
    let newArr = [];
    apiClient.get(`albums/${item.id}/tracks`).then(({ data }) => {
      let musicPlaylist=[]
      for (let i = 0; i < data.items.length; i++) {
        musicPlaylist.push(data.items[i].id)
        // console.log(data.items[i])
        
      }
      const state = {
        name: item.name,
        description: "New Released",
        images: [{ url: `${url}` }],
        tracks: { total: data.items.length },
        allTrackData: { musicPlaylist},
      };
      if (link) {
        navigate(`../playlist/${item.id}`, { state });
      } else {
        data.items.forEach((element) => {
          newArr.push({
            track: { ...element, album: { ...element, images: [{ url }] } },
          });
          setTracks(newArr);
        });
      }
    });
  };

  useEffect(() => {
    apiClient
      .get(
        `/artists/${tracks[currentIndex]?.track?.artists[0]?.id}/related-artists`
      )
      .then((res) => {
        const a = res.data?.artists;
        setSimilar(a);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, [currentIndex, tracks]);

  const greet = () => {
    let today = new Date();
    let curHr = today.getHours();

    if (curHr < 12) {
      return "Morning";
    } else if (curHr < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  };

  return (
    <div className="h-full w-full pt-5 md:px-0 px-2 flex flex-col gap-4 text-text-primary overflow-x-hidden hide-scroll">
      <h1 className=" text-3xl font-extrabold">Good {greet()} {app.userName} </h1>
      <div className="w-full grid gap-3">
        <h1 className="text-2xl font-semibold">New Release</h1>
        <div className="flex md:gap-5 gap-2 overflow-x-scroll hide-scroll h-max">
          <Swiper {...swiperConfig} slidesPerGroupAuto>
            {newRelease?.map((item) => {
              return (
                <SwiperSlide className="swiper-card" key={item.id}>
                  <Displaycard
                    id={item.id}
                    title={item.name}
                    img={item?.images[0]?.url}
                    subtitle={item.total_tracks}
                    isMin={true}
                    click={() => getAlbum(item, item.images[0]?.url)}
                    link={true}
                    linkFunc={() => getAlbum(item, item.images[0]?.url, true)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="w-full grid gap-3">
        <h1 className="text-2xl font-semibold">Featured For You</h1>
        <div className="flex md:gap-5 gap-2 overflow-x-scroll hide-scroll">
          <Swiper {...swiperConfig} slidesPerGroupAuto>
            {featured?.map((item) => {
              return (
                <SwiperSlide className="swiper-card" key={item.id}>
                  <Displaycard
                    id={item.id}
                    title={item.name}
                    item={item}
                    img={item?.images[0]?.url}
                    subtitle={item.description}
                    click={() => setChangeTrack(item.id)}
                    isMin={true}
                    link={true}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="w-full grid gap-3">
        <h1 className="text-2xl font-semibold">Similar Artist</h1>
        <div className="flex md:gap-5 gap-2 overflow-x-scroll hide-scroll">
          <Swiper {...swiperConfig} slidesPerGroupAuto>
            {similar?.map((item) => {
              return (
                <SwiperSlide className="swiper-card" key={item.id}>
                  <Displaycard
                    id={item.id}
                    title={item.name}
                    img={item?.images[0]?.url}
                    isMin={true}
                    subtitle={`Followers: ${item.followers.total}`}
                    click={() => getArtist(item)}
                    link={true}
                    linkFunc={() => getArtist(item, true)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MusicHome;
