import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <>
      <div>
        <div style={{ backgroundColor: 'gray', padding: 16 }}>User Header</div>
        <Outlet />
        <div style={{ backgroundColor: 'gray', padding: 16 }}>User Footer</div>
      </div>
    </>
  )
}

export default UserLayout
