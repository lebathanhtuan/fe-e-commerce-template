import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/slices/auth.slice'
import productReducer from './redux/slices/product.slice'
import categoryReducer from './redux/slices/category.slice'
import commonReducer from './redux/slices/common.slice'

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    common: commonReducer,
  },
})
