import React from 'react'

const AlbumImage = ({url}) => {
  return (
    <div className='relative grid place-items-center mt-4 m-4'>
      <img src={url} alt="Album " className='w-full aspect-square z-10 rounded-lg' />
      <img src={url} alt="Album " className='w-[88%] aspect-square rounded-lg absolute top-[1.8rem] blur-sm ' />
      </div>
  )
}

export default AlbumImage
