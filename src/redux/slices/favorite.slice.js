import { createSlice } from '@reduxjs/toolkit'

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../thunks/favorite.thunk'

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favoriteList: {
      data: [],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    addFavoriteData: {
      status: 'idle',
      error: null,
    },
    removeFavoriteData: {
      status: 'idle',
      error: null,
    },
  },
  reducers: {
    clearFavorites: (state) => {
      state.favoriteList.data = []
      state.favoriteList.status = 'idle'
      state.favoriteList.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // getFavorites
      .addCase(getFavorites.pending, (state) => {
        state.favoriteList.status = 'loading'
        state.favoriteList.error = null
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favoriteList.status = 'succeeded'
        state.favoriteList.data = action.payload
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.favoriteList.status = 'failed'
        state.favoriteList.error = action.error.message
      })

      // addFavorite
      .addCase(addFavorite.pending, (state) => {
        state.addFavoriteData.status = 'loading'
        state.addFavoriteData.error = null
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.addFavoriteData.status = 'succeeded'
        state.favoriteList.data.push(action.payload)
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.addFavoriteData.status = 'failed'
        state.addFavoriteData.error = action.error.message
      })

      // removeFavorite
      .addCase(removeFavorite.pending, (state) => {
        state.removeFavoriteData.status = 'loading'
        state.removeFavoriteData.error = null
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.removeFavoriteData.status = 'succeeded'
        state.favoriteList.data = state.favoriteList.data.filter(
          (item) => item.productId !== action.payload.productId
        )
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.removeFavoriteData.status = 'failed'
        state.removeFavoriteData.error = action.error.message
      })
  },
})

export const { clearFavorites } = favoriteSlice.actions

export default favoriteSlice.reducer
