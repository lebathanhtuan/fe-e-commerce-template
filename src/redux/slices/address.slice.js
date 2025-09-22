import { createSlice } from '@reduxjs/toolkit'

import { getCities, getDistricts, getWards } from '../thunks/address.thunk'

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    cityList: {
      data: [],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    districtList: {
      data: [],
      status: 'idle',
      error: null,
    },
    wardList: {
      data: [],
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get cities
      .addCase(getCities.pending, (state) => {
        state.cityList.status = 'loading'
        state.cityList.error = null
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.cityList.status = 'succeeded'
        state.cityList.data = action.payload
      })
      .addCase(getCities.rejected, (state, action) => {
        state.cityList.status = 'failed'
        state.cityList.error = action.error.message
      })
      // Get districts
      .addCase(getDistricts.pending, (state) => {
        state.districtList.status = 'loading'
        state.districtList.error = null
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.districtList.status = 'succeeded'
        state.districtList.data = action.payload
      })
      .addCase(getDistricts.rejected, (state, action) => {
        state.districtList.status = 'failed'
        state.districtList.error = action.error.message
      })
      // Get wards
      .addCase(getWards.pending, (state) => {
        state.wardList.status = 'loading'
        state.wardList.error = null
      })
      .addCase(getWards.fulfilled, (state, action) => {
        state.wardList.status = 'succeeded'
        state.wardList.data = action.payload
      })
      .addCase(getWards.rejected, (state, action) => {
        state.wardList.status = 'failed'
        state.wardList.error = action.error.message
      })
  },
})

export default addressSlice.reducer
