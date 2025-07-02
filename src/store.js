import { configureStore } from '@reduxjs/toolkit'
import productReducer from './redux/slices/product.slice'

export default configureStore({
  reducer: {
    product: productReducer,
  },
})
