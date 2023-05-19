import React, { useState } from 'react'
import { fetchDataFromApi } from '../../utils/movieApi'
import MovieCard from '../../components/movie/MovieCard'
import { useEffect } from 'react'

const MovieSearch = () => {

  const [searchData, setSearchData] = useState([])
  const [currentSearchType, setCurrentSearchType] = useState('movie')
  const [query, setQuery] = useState('')

  const getSearchData=()=>{
      fetchDataFromApi(`/search/${currentSearchType}?query=${encodeURIComponent(query)}`).then(res=>setSearchData(res))
  }

  useEffect(() => {
    getSearchData()
    
    // eslint-disable-next-line
  }, [currentSearchType,query])
  



  return (
    <div className='px-2 md:pl-movie-left mt-[80px] text-text-primary w-full flex flex-col'>
      <div className='flex w-full items-center justify-center gap-2'>
      <button className={`px-3 py-2 w-20 rounded-md font-semibold ${currentSearchType==='movie'?"bg-[red]":''}`} onClick={()=>setCurrentSearchType('movie')} >MOVIE</button>
      <button className={`px-3 py-2 w-20 rounded-md font-semibold ${currentSearchType==='tv'?"bg-[red]":''}`} onClick={()=>setCurrentSearchType('tv')}>TV</button>
      <button className={`px-3 py-2 w-20 rounded-md font-semibold ${currentSearchType==='person'?"bg-[red]":''}`} onClick={()=>setCurrentSearchType('person')}>Person</button>
      </div>
      <div className='mt-7'>
        <input type="text" placeholder='Search' className='w-full bg-transparent px-4 py-3 hover:border-white outline-none select focus:border-green-700 border-black border-2 rounded-md shadow-none box text-[19px]' onChange={(e)=>setQuery(e.target.value)} />
      </div>
      <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-1 gap-y-5 mt-10'>
        {searchData?.results?.map(item=>(<MovieCard key={item.id} data={item} mediaType={currentSearchType}/> ))}
      </div>
    
    </div>
  )
}

export default MovieSearch