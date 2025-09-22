import { createAsyncThunk } from '@reduxjs/toolkit'

import api from '@services/api'

export const getCities = createAsyncThunk('address/getCities', async () => {
  const response = await api.get('/addresses/cities')
  return response.data
})

export const getDistricts = createAsyncThunk(
  'address/getDistricts',
  async (params) => {
    const response = await api.get('/addresses/districts', { params })
    return response.data
  }
)

export const getWards = createAsyncThunk('address/getWards', async (params) => {
  const response = await api.get('/addresses/wards', { params })
  return response.data
})
