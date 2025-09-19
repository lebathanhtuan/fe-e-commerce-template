import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Layout
import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'
import LoginLayout from './layouts/LoginLayout'
import MyProfileLayout from './layouts/MyProfileLayout'

// Auth pages
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'

// User pages
import HomePage from './pages/user/Home'
import ProductListPage from './pages/user/ProductList'
import ProductDetailPage from './pages/user/ProductDetail'
import CartPage from './pages/user/Cart'
import CheckoutPage from './pages/user/Checkout'
import UserInfoPage from './pages/user/UserInfo'
import ChangePasswordPage from './pages/user/ChangePassword'
// Admin pages
import DashboardPage from './pages/admin/Dashboard'
import ProductManagementPage from './pages/admin/ProductManagement'
import CreateProductPage from './pages/admin/CreateProduct'
import UpdateProductPage from './pages/admin/UpdateProduct'
import ChatBoxPage from './pages/admin/ChatBox'

import { ROUTES } from './constants/routes'

import { getMyProfile } from './redux/thunks/auth.thunk'
import { getCartItems } from './redux/thunks/cart.thunk'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) return
    dispatch(getMyProfile())
    dispatch(getCartItems())
  }, [])

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        <Route path={ROUTES.USER.PRODUCTS} element={<ProductListPage />} />
        <Route
          path={ROUTES.USER.PRODUCT_DETAIL}
          element={<ProductDetailPage />}
        />
        <Route path={ROUTES.USER.CART} element={<CartPage />} />
        <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />} />
        <Route element={<MyProfileLayout />}>
          <Route
            path={ROUTES.USER.MY_PROFILE.USER_INFO}
            element={<UserInfoPage />}
          />
          {/* <Route
            path={ROUTES.USER.MY_PROFILE.ORDER_HISTORY}
            element={<OrderHistoryPage />}
          />
          <Route
            path={ROUTES.USER.MY_PROFILE.FAVORITE_PRODUCTS}
            element={<FavoriteProductsPage />}
          /> */}
          <Route
            path={ROUTES.USER.MY_PROFILE.CHANGE_PASSWORD}
            element={<ChangePasswordPage />}
          />
        </Route>
      </Route>

      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
        <Route
          path={ROUTES.ADMIN.PRODUCTS}
          element={<ProductManagementPage />}
        />
        <Route
          path={ROUTES.ADMIN.CREATE_PRODUCT}
          element={<CreateProductPage />}
        />
        <Route
          path={ROUTES.ADMIN.UPDATE_PRODUCT}
          element={<UpdateProductPage />}
        />
        <Route path={ROUTES.ADMIN.CHAT_BOX} element={<ChatBoxPage />} />
      </Route>

      <Route element={<LoginLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
