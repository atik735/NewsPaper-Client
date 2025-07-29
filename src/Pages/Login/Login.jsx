// src/pages/Login.jsx

import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import { saveUserInDb } from '../../api/utils'

const Login = () => {
  const { signInUser, googleSignIn, loading, user } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/'

  if (user) return <Navigate to={from} replace={true} />

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      const result = await signInUser(email, password)
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL
      }

      await saveUserInDb(userData)
      toast.success('Login successful!')
      navigate(from, { replace: true })
    } catch (err) {
      // console.error(err)
      toast.error(err?.message || 'Login failed')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn()
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL
      }

      await saveUserInDb(userData)
      toast.success('Login with Google successful!')
      navigate(from, { replace: true })
    } catch (err) {
      // console.error(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='w-full max-w-md p-6 bg-white border-gray-50 drop-shadow-lg rounded-lg'>
        <h2 className='text-3xl font-bold text-center mb-4'>Login</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block mb-1 text-sm font-medium'>Email</label>
            <input
              type='email'
              name='email'
              required
              placeholder='Enter your email'
              className='w-full px-3 py-2 rounded border border-gray-300 bg-gray-200 focus:outline-lime-500'
            />
          </div>
          <div>
            <label className='block mb-1 text-sm font-medium'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                required
                placeholder='Enter your password'
                className='w-full px-3 py-2 rounded border border-gray-300 bg-gray-200 focus:outline-lime-500'
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-2.5 text-gray-600 cursor-pointer'
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
          </div>
          <button
            type='submit'
            className='w-full py-2 rounded bg-lime-500 text-white font-medium'
          >
            Login
          </button>
        </form>

        <div className='text-center my-4 text-sm text-gray-500'>Or</div>

        <button
          onClick={handleGoogleSignIn}
          className='w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded hover:bg-gray-200'
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className='text-sm text-center mt-4 text-gray-600'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-lime-500 hover:underline'>
            Sign Up
          </Link>
        </p>

        <div className='text-center mt-4'>
          <Link
            to='/'
            className='inline-block px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600'
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
