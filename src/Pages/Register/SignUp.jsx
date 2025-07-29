import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { imageUpload, saveUserInDb } from '../../api/utils'

const SignUp = () => {
  const { createUser, Updprofile, googleSignIn, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // Password validation function
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < 6) return 'Password must be at least 6 characters'
    if (!hasUpperCase) return 'Password must contain at least one uppercase letter'
    if (!hasLowerCase) return 'Password must contain at least one lowercase letter'
    if (!hasNumber) return 'Password must contain at least one number'
    if (!hasSpecialChar) return 'Password must contain at least one special character'

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const password = form.password.value
    const imageFile = form.image.files[0]

    const passwordError = validatePassword(password)
    if (passwordError) {
      toast.error(passwordError)
      return
    }

    try {
      let imageUrl = ''
      if (imageFile) {
        imageUrl = await imageUpload(imageFile)
      }

      const result = await createUser(email, password)
      await Updprofile({ displayName: name, photoURL: imageUrl })

      const userData = { name, email, image: imageUrl }
      await saveUserInDb(userData)

      toast.success('Signup Successful!')
      navigate('/')
    } catch (error) {
      toast.error(error?.message || 'Signup Failed')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn()
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL
      }
      await saveUserInDb(userData)
      toast.success('Signup Successful with Google!')
      navigate('/')
    } catch (error) {
      toast.error(error?.message || 'Google Signin Failed')
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='max-w-md w-full bg-white p-8 rounded-md shadow-md'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label htmlFor='name' className='block mb-1 font-medium'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              required
              className='w-full border px-3 py-2 rounded focus:outline-lime-500'
              placeholder='Enter your name'
            />
          </div>
          <div>
            <label htmlFor='image' className='block mb-1 font-medium'>Upload Image</label>
            <input
              type='file'
              name='image'
              id='image'
              accept='image/*'
              className='w-full cursor-pointer'
            />
          </div>
          <div>
            <label htmlFor='email' className='block mb-1 font-medium'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              required
              className='w-full border px-3 py-2 rounded focus:outline-lime-500'
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label htmlFor='password' className='block mb-1 font-medium'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                required
                className='w-full border px-3 py-2 rounded focus:outline-lime-500'
                placeholder='Enter your password'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-2 text-xl text-gray-600'
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          <button
            type='submit'
            className='w-full cursor-pointer bg-lime-600 text-white py-2 rounded hover:bg-lime-700 disabled:opacity-50'
          >
            Sign Up
          </button>
        </form>

        <div className='my-5 flex items-center justify-center space-x-2'>
          <hr className='w-full border-gray-300' />
          <span className='text-gray-500'>or</span>
          <hr className='w-full border-gray-300' />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className='w-full flex items-center cursor-pointer justify-center space-x-3 border border-gray-300 py-2 rounded hover:bg-gray-100'
        >
          <FcGoogle size={24} />
          <span>Continue with Google</span>
        </button>

        <p className='mt-5 text-center text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='text-lime-600 hover:underline'>
            Login
          </Link>
        </p>
        <div className='text-center mt-2'>
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

export default SignUp
