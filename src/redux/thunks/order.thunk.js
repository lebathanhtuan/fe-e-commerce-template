import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearCart } from '@redux/slices/cart.slice'

import api from '@services/api'

export const orderFormCart = createAsyncThunk(
  'order/orderFormCart',
  async (params, { dispatch }) => {
    const { data, callback } = params
    const response = await api.post('/orders/checkout', data)
    await dispatch(clearCart())
    if (callback) callback()
    return response.data
  }
)

export const getUserOrders = createAsyncThunk(
  'order/getUserOrders',
  async () => {
    const response = await api.get('/orders/user-orders')
    return response.data
  }
)
