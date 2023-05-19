import React from 'react'

const Toggle = ({method,state}) => {
  return (
    <div className='flex h-min  bg-black rounded-full px-1 py-1 relative'>
        <span className='z-10 md:w-20 w-14  md:text-base text-center text-sm' onClick={()=>method('movie')}>Movie</span>
        <span className='z-10 md:w-20 w-14  md:text-base text-center text-sm' onClick={()=>method('music')}>Music</span>
        <span className={`absolute  md:w-20 w-14 md:h-6 h-5 rounded-full transition-all duration-300 ${state!=="movie"?"md:translate-x-[80px] translate-x-[56px] bg-green-600":"bg-red-600"}`}></span>
    </div>
  )
}

export default Toggle