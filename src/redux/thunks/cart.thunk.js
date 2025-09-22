import { createAsyncThunk } from '@reduxjs/toolkit'

import api from '@services/api'

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  const response = await api.get('/carts')
  return response.data
})

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }) => {
    const response = await api.post('/carts', { productId, quantity })
    return response.data
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ id, quantity }) => {
    const response = await api.put(`/carts/${id}`, { quantity })
    return response.data
  }
)

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (id) => {
    await api.delete(`/carts/${id}`)
    return { id }
  }
)
