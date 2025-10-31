import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearCart } from '@redux/slices/cart.slice'

import api from '@services/api'

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (params, { dispatch }) => {
    const { data, callback } = params

    // Log để theo dõi (có thể xóa sau khi test)
    if (data.paymentMethod === 'PAYPAL') {
      console.log('Creating order with PayPal payment:', {
        transactionId: data.paypalTransactionId,
        payerEmail: data.paypalPayerEmail,
      })
    }

    const response = await api.post('/orders/create-order', data)
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
