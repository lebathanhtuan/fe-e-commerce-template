import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async () => {
    const response = await axios.get('http://localhost:3000/api/categories')
    return response.data
  }
)
