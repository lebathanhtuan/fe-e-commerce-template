import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AdminHeader from '@components/AdminHeader'
import AdminSidebar from '@components/AdminSidebar'
import LoadingPage from '@components/LoadingPage'

import { ROUTES } from '@constants/routes'

import * as S from './styled'

function AdminLayout() {
  const { isShowAdminSidebar } = useSelector((state) => state.common)
  const { myProfile } = useSelector((state) => state.auth)

  const accessToken = localStorage.getItem('accessToken')

  if (accessToken && myProfile.status !== 'succeeded') {
    return <LoadingPage />
  } else if (myProfile.data.role !== 'admin') {
    return <Navigate to={ROUTES.USER.HOME} />
  }
  return (
    <S.AppWrapper>
      <AdminHeader />
      <S.AppContainer>
        <AdminSidebar />
        <S.AppContent $isShowAdminSidebar={isShowAdminSidebar}>
          <Outlet />
        </S.AppContent>
      </S.AppContainer>
    </S.AppWrapper>
  )
}

export default AdminLayout
