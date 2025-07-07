import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk('product/getProducts', async () => {
  const response = await axios.get(
    'http://localhost:3001/products?_expand=brand'
  )
  return response.data
})
