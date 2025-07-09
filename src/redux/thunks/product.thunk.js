import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk('product/getProducts', async () => {
  const response = await axios.get(
    'http://localhost:3000/products?_expand=brand&_sort=id&_order=desc'
  )
  return response.data
})

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (params) => {
    const response = await axios.get(
      `http://localhost:3000/products/${params.id}`
    )
    return response.data
  }
)

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (params) => {
    const response = await axios.post(
      'http://localhost:3000/products',
      params.data
    )
    params.callback()
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (params) => {
    const response = await axios.patch(
      `http://localhost:3000/products/${params.id}`,
      params.data
    )
    params.callback()
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (params) => {
    const response = await axios.delete(
      `http://localhost:3000/products/${params.id}`
    )
    params.callback()
    return response.data
  }
)
