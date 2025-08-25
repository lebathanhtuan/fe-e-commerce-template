import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UserHeader from '@components/UserHeader'
import UserFooter from '@components/UserFooter'
import UserChatBox from '@components/UserChatBox'

import * as S from './styled'

function UserLayout() {
  const { myProfile } = useSelector((state) => state.auth)

  return (
    <S.LayoutContainer>
      <UserHeader />
      <S.MainContainer>
        <Outlet />
      </S.MainContainer>
      <UserFooter />
      {myProfile.data.role !== 'admin' && <UserChatBox />}
    </S.LayoutContainer>
  )
}

export default UserLayout
