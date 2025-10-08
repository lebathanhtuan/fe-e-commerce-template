import { createSlice } from '@reduxjs/toolkit'

import { getUserOrders } from '../thunks/order.thunk'

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    userOrders: {
      data: [],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get cities
      .addCase(getUserOrders.pending, (state) => {
        state.userOrders.status = 'loading'
        state.userOrders.error = null
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders.status = 'succeeded'
        state.userOrders.data = action.payload
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.userOrders.status = 'failed'
        state.userOrders.error = action.error.message
      })
  },
})

export default addressSlice.reducer
