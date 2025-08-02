import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Layout
import AdminLayout from './layouts/AdminLayout'
import UserLayout from './layouts/UserLayout'

import Register from './pages/Register'
import Login from './pages/Login'

// User pages
import HomePage from './pages/user/Home'
import ProductListPage from './pages/user/ProductList'
// Admin pages
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

        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>

      <Route element={<AdminLayout />}>
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
    </Routes>
  )
}

export default App
