import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function UserLayout() {
  const { myProfile } = useSelector((state) => state.auth)

  return (
    <>
      <div>
        <div style={{ backgroundColor: 'gray', padding: 16 }}>
          User Header - {myProfile.data.username}
        </div>
        <Outlet />
        <div style={{ backgroundColor: 'gray', padding: 16 }}>User Footer</div>
      </div>
    </>
  )
}

export default UserLayout
