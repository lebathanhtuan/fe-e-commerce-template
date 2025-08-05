import { createAsyncThunk } from '@reduxjs/toolkit'

import api from '../../services/api'

export const register = createAsyncThunk('auth/register', async (params) => {
  const { data, callback } = params
  const response = await api.post('/auth/register', data)
  if (callback) callback()
  return response.data
})

export const login = createAsyncThunk('auth/login', async (params) => {
  const { data, callback } = params
  const response = await api.post('/auth/login', data)
  if (callback) callback()
  return response.data
})

export const getMyProfile = createAsyncThunk('auth/getMyProfile', async () => {
  const response = await api.get('/auth/my-profile')
  return response.data
})
