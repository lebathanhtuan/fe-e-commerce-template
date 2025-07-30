import { createSlice } from '@reduxjs/toolkit'

import { getCategories } from '../thunks/category.thunk'

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryList: {
      data: [],
      meta: {},
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.categoryList.status = 'loading'
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categoryList.status = 'succeeded'
        state.categoryList.data = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categoryList.status = 'failed'
        state.categoryList.error = action.error.message
      })
  },
})

export const { createCategory, updateCategory, deleteCategory, getCategory } =
  categorySlice.actions

export default categorySlice.reducer
