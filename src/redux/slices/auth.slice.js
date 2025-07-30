import { createSlice } from '@reduxjs/toolkit'

import { register, login } from '../thunks/auth.thunk'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
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
      .addCase(register.fulfilled, (state, action) => {
        state.registerData.status = 'succeeded'
        state.registerData.data = action.payload
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
        console.log('🚀 ~ action.payload.token:', action.payload.token)
        localStorage.setItem('accessToken', action.payload.token)
        state.loginData.status = 'succeeded'
        state.loginData.data = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loginData.status = 'failed'
        state.loginData.error = action.error.message
      })
  },
})

export const { createAuth, updateAuth, deleteAuth, getAuth } = authSlice.actions

export default authSlice.reducer
