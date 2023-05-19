import React from 'react'
import CastCard from './CastCard'

const Cast = ({cast}) => {
    
  return (
    <div className='px-2 md:pl-movie-left text-text-primary mt-16'>
            <h1 className='text-3xl my-5'>Top Cast</h1>
            <div className='flex overflow-y-hidden overflow-x-scroll flex-none gap-5 hide-scroll'>
                {
                    cast?.map(member=>(
                        <CastCard member={member}/>
                    ))
                }

            </div>
        </div>
  )
}

export default Cast