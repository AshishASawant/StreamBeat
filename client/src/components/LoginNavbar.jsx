
import React from 'react'
import { Link } from 'react-router-dom'

const LoginNavbar = () => {
  return (
<div className='h-[50px] flex items-center px-4 w-full justify-between fixed top-0'>
    <Link to={'/'} className='font-semibold'>
    <span className='text-[red] md:text-3xl text-xl'>Stream</span>
    <span className='text-[green] md:text-3xl text-xl'>Beat</span>
    </Link>
    <div className='flex gap-3'>
    <Link to='login'  className='rounded-md  px-2 text-sm md:text-base py-1 bg-[red] '>LOGIN</Link>
    <Link to='signup'  className='rounded-md px-2 text-sm md:text-base  py-1 bg-[red]'>SIGNUP</Link>
    </div>
</div>  )
}

export default LoginNavbar