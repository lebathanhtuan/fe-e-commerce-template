import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Layout
import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'
import LoginLayout from './layouts/LoginLayout'

// Auth pages
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'

// User pages
import HomePage from './pages/user/Home'
import ProductListPage from './pages/user/ProductList'
// Admin pages
import DashboardPage from './pages/admin/Dashboard'
import ProductManagementPage from './pages/admin/ProductManagement'
import CreateProductPage from './pages/admin/CreateProduct'
import UpdateProductPage from './pages/admin/UpdateProduct'

import { ROUTES } from './constants/routes'

import { getMyProfile } from './redux/thunks/auth.thunk'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) return
    dispatch(getMyProfile())
  }, [])

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        <Route path={ROUTES.USER.PRODUCTS} element={<ProductListPage />} />
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
      </Route>

      <Route element={<LoginLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
