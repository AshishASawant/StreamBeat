import React from 'react'
import {HiArrowSmLeft,HiArrowSmRight} from 'react-icons/hi'

const ScrollWrapper = () => {
  return (
    <div className='flex md:gap-5 gap-2 overflow-x-scroll hide-scroll w-full h-max'>
        {/* <button className='absolute left-0'><HiArrowSmLeft/></button>
        <button className='absolute right-0'><HiArrowSmRight/></button> */}
    </div>
  )
}

export default ScrollWrapper