
import React from 'react'
import { Link } from 'react-router-dom'

const LoginNavbar = () => {
  return (
<div className='h-[50px] flex items-center px-4 w-full justify-between fixed top-0'>
    <div className='font-semibold'>
    <span className='text-[red] text-3xl'>Stream</span>
    <span className='text-[green] text-3xl'>Beat</span>
    </div>
    <div className='flex gap-3'>
    <Link to='login'  className='rounded-md px-4 py-1 bg-[red]'>LOGIN</Link>
    <Link to='signup'  className='rounded-md px-4 py-1 bg-[red]'>SIGNUP</Link>
    </div>
</div>  )
}

export default LoginNavbar