import { createAsyncThunk } from '@reduxjs/toolkit'

import api from '@services/api'

export const getFavorites = createAsyncThunk(
  'favorite/getFavorites',
  async () => {
    const response = await api.get('/favorites')
    return response.data
  }
)

export const addFavorite = createAsyncThunk(
  'favorite/addFavorite',
  async ({ productId }) => {
    const response = await api.post('/favorites', { productId })
    return response.data
  }
)

export const deleteFavorite = createAsyncThunk(
  'favorite/deleteFavorite',
  async (productId) => {
    await api.delete(`/favorites/${productId}`)
    return { productId }
  }
)
