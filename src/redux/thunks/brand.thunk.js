import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getBrands = createAsyncThunk('brand/getBrands', async () => {
  const response = await axios.get('http://localhost:3000/brands')
  return response.data
})
