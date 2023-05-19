import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchBackendData } from '../../utils/backendApi'

const Signup = () => {

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userName, setUserName] = useState('')
  
  
    const handleSignIn=async(e)=>{
      e.preventDefault()
      let body={'name':userName,'email':userEmail,'password':userPassword}
      let res=await fetchBackendData('POST','/user/register',body)
      console.log(res)
    }
  return (
<div className='flex h-full w-full items-center justify-center px-7'>
      <div className='grid gap-5 bg-[rgba(0,0,0,0.5)] p-10 w-[27rem]'>
        <h1 className='text-3xl font-semibold'>Signup</h1>
        <form className='flex flex-col gap-2 w-full' onSubmit={handleSignIn} autoComplete="off">
          <input type="text" placeholder='Name' className='bg-bg-main border-none outline-none px-4 py-2' onChange={(e)=>setUserName(e.target.value)} required/>
          <input type="email" placeholder='Email' className='bg-bg-main border-none outline-none px-4 py-2' onChange={(e)=>setUserEmail(e.target.value)} required/>
          <input type="password" placeholder='Password' className='bg-bg-main border-none outline-none px-4 py-2'  onChange={(e)=>setUserPassword(e.target.value)} required minLength={6} />
          <button type='submit' className='px-4 py-2 w-full bg-[red]'>Sign Up</button>
        </form>
        <button>Allready have An Account ? </button>
        <Link to='/login' className='px-4 py-2 w-full bg-[red] text-center'>Log In</Link>
      </div>
</div>  )
}

export default Signup