import { createSlice } from '@reduxjs/toolkit'

import { getReviews } from '../thunks/review.thunk'

export const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviewList: {
      data: [],
      meta: {},
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.reviewList.status = 'loading'
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviewList.status = 'succeeded'
        state.reviewList.data = action.payload
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.reviewList.status = 'failed'
        state.reviewList.error = action.error.message
      })
  },
})

export default reviewSlice.reducer
