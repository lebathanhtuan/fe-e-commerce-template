import { createSlice } from '@reduxjs/toolkit'

import {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
} from '../thunks/cart.thunk'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: {
      data: [],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    addToCartData: {
      status: 'idle',
      error: null,
    },
    updateCartItemData: {
      status: 'idle',
      error: null,
    },
    deleteCartItemData: {
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getCartItems
      .addCase(getCartItems.pending, (state) => {
        state.cartItems.status = 'loading'
        state.cartItems.error = null
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems.status = 'succeeded'
        state.cartItems.data = action.payload
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.cartItems.status = 'failed'
        state.cartItems.error = action.error.message
      })
      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.addToCartData.status = 'loading'
        state.addToCartData.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const cartId = action.payload.id
        const existItemIndex = state.cartItems.data.findIndex(
          (item) => item.id === cartId
        )
        if (existItemIndex !== -1) {
          state.cartItems.data[existItemIndex] = action.payload
        } else {
          state.cartItems.data.push(action.payload)
        }
        state.addToCartData.status = 'succeeded'
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addToCartData.status = 'failed'
        state.addToCartData.error = action.error.message
      })

      // updateCartItem
      .addCase(updateCartItem.pending, (state) => {
        state.updateCartItemData.status = 'loading'
        state.updateCartItemData.error = null
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const cartId = action.payload.id
        const existItemIndex = state.cartItems.data.findIndex(
          (item) => item.id === cartId
        )
        state.cartItems.data[existItemIndex] = action.payload
        state.updateCartItemData.status = 'succeeded'
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.updateCartItemData.status = 'failed'
        state.updateCartItemData.error = action.error.message
      })

      // deleteCartItem
      .addCase(deleteCartItem.pending, (state) => {
        state.deleteCartItemData.status = 'loading'
        state.deleteCartItemData.error = null
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const { id } = action.payload
        state.cartItems.data = state.cartItems.data.filter(
          (item) => item.id !== id
        )
        state.deleteCartItemData.status = 'succeeded'
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.deleteCartItemData.status = 'failed'
        state.deleteCartItemData.error = action.error.message
      })
  },
})

export default cartSlice.reducer
