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
      .catch((err) => {
        if (err.response.status) {
          alert(
            "Your Access token has expired. Please signout and login again"
          );
        }
        setLoading(false);
      });
  }, [lib]);

  // const getPlaylist = (id) => {
  //   setChangeTrack(id);
  // };

  return (
    <div className="overflow-hidden w-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 px-2 md:px-0 lg:gap-5 gap-2 max-h-full overflow-y-scroll overflow-x-hidden hide-scroll pb-5">
          {tplayList?.map((item) => {
            return (
              <Displaycard
                key={item.id}
                id={item.id}
                img={item?.images[0]?.url}
                title={item.name}
                subtitle={item.tracks?.total}
                click={() => setChangeTrack(item.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Playlist;
