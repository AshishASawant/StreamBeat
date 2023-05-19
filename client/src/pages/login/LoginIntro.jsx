import React from 'react'
import { Link } from 'react-router-dom'

const LoginIntro = () => {
  return (
    <div className='flex h-full w-full items-center px-7'>
        <div className=''>
        <h1 className='text-7xl font-bold'><span className='text-[red]'>Movie</span> and <span className='text-[green]'>Music</span>, All In One. </h1>
        <p className='font-semibold text-3xl mb-8 whitespace-nowrap'>Pay Less, Enjoy More.</p>
        <Link to='signup' className='bg-[red] text-xl px-10 py-3 rounded-md font-semibold'>TRY NOW</Link>
        </div>
    </div>
  )
}

export default LoginIntro