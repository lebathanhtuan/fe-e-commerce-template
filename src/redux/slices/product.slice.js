import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    productList: JSON.parse(localStorage.getItem('productList')) || [],
    productDetail: {},
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
})

export const { createProduct, updateProduct, deleteProduct, getProduct } =
  productSlice.actions

export default productSlice.reducer
