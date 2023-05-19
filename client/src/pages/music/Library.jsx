import React, { useContext, useEffect, useState } from 'react'
import Displaycard from '../../components/music/displaycard/Displaycard'
import musicContext from '../../state/musicContext'
import apiClient from '../../utils/spotify'
import Loading from '../../components/Loading'

const Library = () => {


  const context = useContext(musicContext)
  const {playList,setPlayList,setChangeTrack}=context
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
   apiClient.get('me/playlists').then(({data})=>{
    setPlayList(data.items)
    setLoading(false)
   }).catch((err)=>{
    if(err.response.status===401){
      alert('Your Access token has expired. Please signout and login again')
    }
    setLoading(false)
   })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openPlaylist=(id)=>{
    setChangeTrack(id)
  }

  return (
    <div className="overflow-hidden w-full">
    {loading?<Loading/>:
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 px-2 md:px-0 lg:gap-5 gap-2 max-h-full overflow-y-scroll overflow-x-hidden hide-scroll pb-5">
      {playList.map((item)=>{
         return (<Displaycard key={item.id} id={item.id} img={item?.images[0]?.url} title={item.name} subtitle={item.tracks?.total} click={()=>openPlaylist(item.id)} / >)
         
        })}
    </div>}
  </div>
)
}

export default Library