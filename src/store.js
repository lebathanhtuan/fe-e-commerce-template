import { configureStore } from '@reduxjs/toolkit'
import productReducer from './redux/slices/product.slice'
import brandReducer from './redux/slices/brand.slice'

export default configureStore({
  reducer: {
    product: productReducer,
    brand: brandReducer,
  },
})
