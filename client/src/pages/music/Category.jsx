import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import musicContext from '../../state/musicContext'
import Displaycard from '../../components/music/displaycard/Displaycard'
import Loading from '../../components/Loading'
const Categorie = () => {
  const context=useContext(musicContext)
  const {setLib,categories,loading}=context 
  
  const navigate=useNavigate()
  const newCategorie=(id)=>{
    setLib(id)
    navigate('/music/playlist')
}
    


  return (
    <div className="overflow-hidden w-full">
      {loading?<Loading/>:
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-5 gap-2  max-h-full  overflow-y-scroll overflow-x-hidden hide-scroll  pb-5 md:px-0 px-2">
        {categories?.map((item)=>{
        return(<Displaycard key={item.id} id={item.id} title={item.name} img={item?.icons[0]?.url } subtitle={item.tracks?.total} click={()=>newCategorie(item.id)} / >) 
        })}
      </div>}
    </div>
  )
}

export default Categorie
