import { createAsyncThunk } from '@reduxjs/toolkit'

import api from '@services/api'

export const orderFormCart = createAsyncThunk(
  'order/orderFormCart',
  async (params) => {
    const response = await api.post('/orders/orderFormCart', params)
    return response.data
  }
)
