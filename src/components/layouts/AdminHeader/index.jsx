import * as S from './styled'

function AdminHeader({ isShowSidebar, setIsShowSidebar }) {
  return (
    <S.HeaderContainer>
      <S.HeaderButton onClick={() => setIsShowSidebar(!isShowSidebar)}>
        Menu
      </S.HeaderButton>
      <h2>Username</h2>
    </S.HeaderContainer>
  )
}

export default AdminHeader
