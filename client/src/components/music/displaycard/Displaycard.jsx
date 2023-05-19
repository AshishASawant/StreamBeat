import React from 'react'
import {BsFillPlayCircleFill} from 'react-icons/bs'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Displaycard = ({title,subtitle,img,click}) => {
  return (
      
        <div className="w-full md:p-3 p-2 bg-bg-primary hover:bg-bg-secondary text-text-primary relative grid gap-2 rounded-md h-full " >
          <div className='min-w-[7rem] aspect-square lg:min-w-[11rem] p-0 overflow-hidden h-'>
          <LazyLoadImage effect='blur' src={img } alt="Artist" className='w-full h-min  rounded-md  cursor-pointer' />
          </div>
          <p className='text-[.9rem] line-clamp-1'>{title}</p>
          <p className='text-xs line-clamp-2'>{subtitle}</p>
          <div className="absolute right-2 bottom-2 cursor-pointer">
          <BsFillPlayCircleFill  className='text-green-600 text-[1.5rem] md:text-[2.5rem]' onClick={click}/>
          </div>
         </div>
   
  )
}

export default Displaycard
