import React, { useContext, useEffect, useState } from "react";
import musicContext from "../../state/musicContext";
import apiClient from "../../utils/spotify";
import Displaycard from "../../components/music/displaycard/Displaycard";
import Loading from "../../components/Loading";

const Playlist = () => {
  const context = useContext(musicContext);
  const { lib, setChangeTrack } = context;
  const [loading, setLoading] = useState(false);
  const [tplayList, setTplayList] = useState([]);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`browse/categories/${lib}/playlists`)
      .then(({ data }) => {
        setTplayList(data.playlists.items);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
       // eslint-disable-next-line
  }, [lib]);

 

  return (
    <div className="w-full text-text-primary overflow-hidden overflow-y-scroll hide-scroll py-4">
      <div className="flex items-center justify-between  mb-4">
        <h1 className="sm:text-3xl text-2xl md:px-0 px-2">Explore Playlists</h1>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 px-2 md:px-0 lg:gap-5 gap-2">
          {tplayList?.map((item) => {
            return (
              <Displaycard
                key={item.id}
                id={item.id}
                img={item?.images[0]?.url}
                title={item.name}
                subtitle={item.tracks?.total}
                click={() => {
                  setChangeTrack(item.id);
                }}
                link={true}
                item={item}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Playlist;
