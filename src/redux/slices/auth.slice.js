import { createSlice } from '@reduxjs/toolkit'

import { register, login, getMyProfile } from '../thunks/auth.thunk'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    myProfile: {
      data: {},
      status: 'idle',
      error: null,
    },
    registerData: {
      status: 'idle',
      error: null,
    },
    loginData: {
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.registerData.status = 'loading'
      })
      .addCase(register.fulfilled, (state) => {
        state.registerData.status = 'succeeded'
      })
      .addCase(register.rejected, (state, action) => {
        state.registerData.status = 'failed'
        state.registerData.error = action.error.message
      })
      // login
      .addCase(login.pending, (state) => {
        state.loginData.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user } = action.payload
        localStorage.setItem('accessToken', token)
        state.loginData.status = 'succeeded'
        state.myProfile.data = user
      })
      .addCase(login.rejected, (state, action) => {
        state.loginData.status = 'failed'
        state.loginData.error = action.error.message
      })
      // getMyProfile
      .addCase(getMyProfile.pending, (state) => {
        state.myProfile.status = 'loading'
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.myProfile.status = 'succeeded'
        state.myProfile.data = action.payload
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.myProfile.status = 'failed'
        state.myProfile.error = action.error.message
      })
  },
})

export const { createAuth, updateAuth, deleteAuth, getAuth } = authSlice.actions

export default authSlice.reducer
