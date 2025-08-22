import { Outlet } from 'react-router-dom'

import * as S from './styled'

function LoginLayout() {
  return (
    <S.LayoutContainer>
      <Outlet />
    </S.LayoutContainer>
  )
}

export default LoginLayout
