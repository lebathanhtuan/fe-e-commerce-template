import { Button, Space, Dropdown, Avatar } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  MenuOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { ROUTES } from '@constants/routes'
import { toggleAdminSidebar } from '@redux/slices/common.slice'
import { logout } from '@redux/slices/auth.slice'

import * as S from './styled'

function Header() {
  const { isShowAdminSidebar } = useSelector((state) => state.common)
  const { myProfile } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <Space size={16}>
          <Button
            type="text"
            onClick={() => dispatch(toggleAdminSidebar(!isShowAdminSidebar))}
            icon={<MenuOutlined style={{ color: 'white' }} />}
          />
          <h3>Logo</h3>
        </Space>

        <Space>
          {myProfile.data.avatar ? (
            <Avatar src={myProfile.data.avatar} />
          ) : (
            <Avatar icon={<UserOutlined />} />
          )}
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: 'Trang chủ',
                  icon: <HomeOutlined />,
                  onClick: () => navigate(ROUTES.USER.HOME),
                },
                {
                  key: '2',
                  label: 'Đăng xuất',
                  icon: <LogoutOutlined />,
                  onClick: () => {
                    dispatch(logout())
                    navigate(ROUTES.LOGIN)
                  },
                },
              ],
            }}
          >
            <h3>{myProfile.data.firstName}</h3>
          </Dropdown>
        </Space>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  )
}

export default Header
