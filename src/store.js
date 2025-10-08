import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/slices/auth.slice'
import productReducer from './redux/slices/product.slice'
import categoryReducer from './redux/slices/category.slice'
import reviewReducer from './redux/slices/review.slice'
import cartReducer from './redux/slices/cart.slice'
import addressReducer from './redux/slices/address.slice'
import orderReducer from './redux/slices/order.slice'
import commonReducer from './redux/slices/common.slice'
import favoriteReducer from './redux/slices/favorite.slice'

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    review: reviewReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    common: commonReducer,
    favorite: favoriteReducer,
  },
})
