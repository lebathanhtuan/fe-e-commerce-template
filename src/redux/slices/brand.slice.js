import { createSlice } from '@reduxjs/toolkit'

import { getBrands } from '../thunks/brand.thunk'

export const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brandList: {
      data: [],
      meta: {},
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.brandList.status = 'loading'
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brandList.status = 'succeeded'
        state.brandList.data = action.payload
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.brandList.status = 'failed'
        state.brandList.error = action.error.message
      })
  },
})

export const { createBrand, updateBrand, deleteBrand, getBrand } =
  brandSlice.actions

export default brandSlice.reducer
