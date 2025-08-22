import { Outlet } from 'react-router-dom'

import UserHeader from '@components/UserHeader'
import UserFooter from '@components/UserFooter'
import ChatBox from '@components/ChatBox'

import * as S from './styled'

function UserLayout() {
  return (
    <S.LayoutContainer>
      <UserHeader />
      <S.MainContainer>
        <Outlet />
      </S.MainContainer>
      <UserFooter />
      <ChatBox />
    </S.LayoutContainer>
  )
}

export default UserLayout
