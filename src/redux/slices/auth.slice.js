import { createSlice } from '@reduxjs/toolkit'

import {
  register,
  login,
  getMyProfile,
  changePassword,
} from '../thunks/auth.thunk'

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
    changePasswordData: {
      status: 'idle',
      error: null,
    },
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      state.myProfile.data = {}
      state.myProfile.status = 'idle'
      state.myProfile.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.registerData.status = 'loading'
        state.registerData.error = null
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
        state.loginData.error = null
        state.myProfile.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user } = action.payload
        state.loginData.status = 'succeeded'
        state.myProfile.status = 'succeeded'
        state.myProfile.data = user
      })
      .addCase(login.rejected, (state, action) => {
        state.loginData.status = 'failed'
        state.myProfile.status = 'failed'
        state.loginData.error = action.error.message
      })
      // getMyProfile
      .addCase(getMyProfile.pending, (state) => {
        state.myProfile.status = 'loading'
        state.myProfile.error = null
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.myProfile.status = 'succeeded'
        state.myProfile.data = action.payload
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.myProfile.status = 'failed'
        state.myProfile.error = action.error.message
      })
      // changePassword
      .addCase(changePassword.pending, (state) => {
        state.changePasswordData.status = 'loading'
        state.changePasswordData.error = null
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changePasswordData.status = 'succeeded'
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordData.status = 'failed'
        state.changePasswordData.error = action.error.message
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
