import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const register = createAsyncThunk('auth/register', async (params) => {
  const { data, callback } = params
  const response = await axios.post(
    'http://localhost:3000/api/auth/register',
    data
  )
  if (callback) callback()
  return response.data
})

export const login = createAsyncThunk('auth/login', async (params) => {
  const { data, callback } = params
  const response = await axios.post(
    'http://localhost:3000/api/auth/login',
    data
  )
  if (callback) callback()
  return response.data
})

export const getMyProfile = createAsyncThunk('auth/getMyProfile', async () => {
  const response = await axios.get(
    'http://localhost:3000/api/auth/my-profile',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
      },
    }
  )
  return response.data
})
