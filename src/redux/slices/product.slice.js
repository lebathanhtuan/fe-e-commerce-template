import { createSlice } from '@reduxjs/toolkit'

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../thunks/product.thunk'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    productList: {
      data: [],
      meta: {},
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    productDetail: {
      data: {},
      status: 'idle',
      error: null,
    },
    createProductData: {
      status: 'idle',
      error: null,
    },
    updateProductData: {
      status: 'idle',
      error: null,
    },
    deleteProductData: {
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getProducts
      .addCase(getProducts.pending, (state) => {
        state.productList.status = 'loading'
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const { data, meta, more } = action.payload
        state.productList.status = 'succeeded'
        state.productList.data = more
          ? [...state.productList.data, ...data]
          : data
        state.productList.meta = meta
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.productList.status = 'failed'
        state.productList.error = action.error.message
      })
      // getProduct
      .addCase(getProduct.pending, (state) => {
        state.productDetail.status = 'loading'
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail.status = 'succeeded'
        state.productDetail.data = action.payload
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.productDetail.status = 'failed'
        state.productDetail.error = action.error.message
      })
      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.createProductData.status = 'loading'
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createProductData.status = 'succeeded'
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProductData.status = 'failed'
        state.productDetail.error = action.error.message
      })
      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.updateProductData.status = 'loading'
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.updateProductData.status = 'succeeded'
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductData.status = 'failed'
        state.productDetail.error = action.error.message
      })
      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductData.status = 'loading'
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteProductData.status = 'succeeded'
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductData.status = 'failed'
        state.productDetail.error = action.error.message
      })
  },
})

export default productSlice.reducer
