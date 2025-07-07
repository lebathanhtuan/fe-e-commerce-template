import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { getProducts } from '../thunks/product.thunk'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    productList: JSON.parse(localStorage.getItem('productList')) || [],
    productDetail: {},
    loading: false,
  },
  reducers: {
    getProduct: (state, action) => {
      const { id } = action.payload
      state.productDetail = state.productList.find(
        (product) => product.id === id
      )
    },
    createProduct: (state, action) => {
      const newProduct = {
        id: uuidv4(),
        ...action.payload,
      }
      state.productList.unshift(newProduct)
      localStorage.setItem('productList', JSON.stringify(state.productList))
    },
    updateProduct: (state, action) => {
      const { id, name, price } = action.payload
      const productIndex = state.productList.findIndex(
        (product) => product.id === id
      )
      if (productIndex !== -1) {
        state.productList.splice(productIndex, 1, {
          id: id,
          name: name,
          price: price,
        })
        localStorage.setItem('productList', JSON.stringify(state.productList))
      }
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload
      state.productList = state.productList.filter(
        (product) => product.id !== id
      )
      localStorage.setItem('productList', JSON.stringify(state.productList))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        console.log('pending')
        state.loading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log('fulfilled')
        state.productList = action.payload
        state.loading = false
      })
      .addCase(getProducts.rejected, (state, action) => {
        console.log('rejected')
        state.loading = false
      })
  },
})

export const { createProduct, updateProduct, deleteProduct, getProduct } =
  productSlice.actions

export default productSlice.reducer
