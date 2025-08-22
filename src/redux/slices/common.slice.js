import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    theme: 'light',
    isShowAdminSidebar: true,
  },
  reducers: {
    setTheme: () => {
      // do something
    },
    toggleAdminSidebar: (state, action) => {
      state.isShowAdminSidebar = action.payload
    },
  },
})

export const { setTheme, toggleAdminSidebar } = commonSlice.actions

export default commonSlice.reducer
