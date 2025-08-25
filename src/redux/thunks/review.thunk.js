import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getReviews = createAsyncThunk('review/getReviews', async () => {
  const response = await axios.get('http://localhost:3000/api/reviews')
  return response.data
})
