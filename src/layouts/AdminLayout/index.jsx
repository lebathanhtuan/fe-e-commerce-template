import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/layouts/AdminHeader'
import AdminSidebar from '../../components/layouts/AdminSidebar'

import * as S from './styled'

function AdminLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(false)
  return (
    <S.AppContainer>
      <AdminHeader
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <S.MainContainer>
        <AdminSidebar
          isShowSidebar={isShowSidebar}
          setIsShowSidebar={setIsShowSidebar}
        />
        <S.ContentContainer isShowSidebar={isShowSidebar}>
          <Outlet />
        </S.ContentContainer>
      </S.MainContainer>
    </S.AppContainer>
  )
}

export default AdminLayout
