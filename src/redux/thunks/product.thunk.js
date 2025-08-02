import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (params) => {
    const response = await axios.get('http://localhost:3000/api/products', {
      params: params,
    })
    return {
      ...response.data,
      more: params.more,
    }
  }
)

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (params) => {
    const response = await axios.get(
      `http://localhost:3000/api/products/${params.id}`
    )
    return response.data
  }
)

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (params) => {
    const response = await axios.post(
      'http://localhost:3000/api/products',
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
      `http://localhost:3000/api/products/${params.id}`,
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
      `http://localhost:3000/api/products/${params.id}`
    )
    params.callback()
    return response.data
  }
)
