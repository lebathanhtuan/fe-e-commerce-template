import * as S from './styled'

function AdminSidebar({ isShowSidebar, setIsShowSidebar }) {
  return (
    <S.SidebarContainer isShowSidebar={isShowSidebar}>
      <button onClick={() => setIsShowSidebar(!isShowSidebar)}>Close</button>
      <ul>
        <li>Dashboard</li>
        <li>Settings</li>
        <li>Profile</li>
        <li>Logout</li>
      </ul>
    </S.SidebarContainer>
  )
}

export default AdminSidebar
