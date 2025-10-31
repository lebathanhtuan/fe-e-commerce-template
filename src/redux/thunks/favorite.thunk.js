import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '@services/api'

import { getProduct } from './product.thunk'

export const getFavorites = createAsyncThunk(
  'favorite/getFavorites',
  async () => {
    const response = await api.get('/favorites')
    return response.data
  }
)

export const addFavorite = createAsyncThunk(
  'favorite/addFavorite',
  async ({ productId }, { dispatch }) => {
    const response = await api.post('/favorites', { productId })
    dispatch(getProduct({ id: productId }))
    dispatch(getFavorites())
    return response.data
  }
)

export const removeFavorite = createAsyncThunk(
  'favorite/removeFavorite',
  async (productId, { dispatch }) => {
    await api.delete(`/favorites/${productId}`)
    dispatch(getProduct({ id: productId }))
    dispatch(getFavorites())
    return { productId }
  }
)
