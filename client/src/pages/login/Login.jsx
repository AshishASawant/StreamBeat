import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchBackendData } from '../../utils/backendApi'
import { useDispatch } from 'react-redux'
import { updateLoginState } from '../../state/loginSlice'

const Login = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const dispatch=useDispatch()

  


  const handleLogin=async(e)=>{
    e.preventDefault()
    let body={'email':userEmail,'password':userPassword}
    let res=await fetchBackendData('POST','/user/login',body)
    dispatch(updateLoginState(res.token))
  }

  return (
    <div className='flex h-full w-full items-center justify-center px-7'>
      <div className='grid gap-5 bg-[rgba(0,0,0,0.5)] p-10'>
        <h1 className='text-3xl font-semibold'>Login</h1>
        <form className='flex flex-col gap-2 w-[25rem]' onSubmit={handleLogin}>
          <input type="email" placeholder='Email' className='bg-bg-main border-none outline-none px-4 py-2' onChange={(e)=>setUserEmail(e.target.value)} required/>
          <input type="password" placeholder='Password' className='bg-bg-main border-none outline-none px-4 py-2'  onChange={(e)=>setUserPassword(e.target.value)} required minLength={6} />
          <button type='submit' className='px-4 py-2 w-full bg-[red]'>Log in</button>
        </form>
        <button>Don't have An Account ? </button>
        <Link to='/signup' className='px-4 py-2 w-full bg-[red] text-center'>Sign Up</Link>
      </div>
</div>
  )
}

export default Login