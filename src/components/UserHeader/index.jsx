import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Dropdown, Space, Button, Badge, Input, Avatar } from 'antd'
import {
  LogoutOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  DashboardOutlined,
} from '@ant-design/icons'

import { ROUTES } from '@constants/routes'
import { logout } from '@redux/slices/auth.slice'

import * as S from './styled'

function UserHeader() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { myProfile } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.cart)

  return (
    <S.HeaderContainer>
      <h2>Menu</h2>
      <S.HeaderNavigation>
        <Link to={ROUTES.USER.PRODUCTS} style={{ color: 'white' }}>
          Sản phẩm
        </Link>
      </S.HeaderNavigation>
      <Space size={24}>
        <Badge count={cartItems.data.length}>
          <Link to={ROUTES.USER.CART}>
            <ShoppingCartOutlined style={{ fontSize: 24, color: 'white' }} />
          </Link>
        </Badge>
        {myProfile.data.id ? (
          <Space>
            {myProfile.data.avatar ? (
              <S.AvatarPreview
                src={myProfile.data.avatar}
                alt="User profile picture"
              />
            ) : (
              <Avatar
                style={{ backgroundColor: '#87d068' }}
                icon={<UserOutlined />}
              />
            )}
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: 'Dashboard',
                    icon: <DashboardOutlined />,
                    onClick: () => navigate(ROUTES.ADMIN.DASHBOARD),
                    style: {
                      display:
                        myProfile.data.role === 'admin' ? 'block' : 'none',
                    },
                  },
                  {
                    key: '2',
                    label: 'Thông tin cá nhân',
                    icon: <UserOutlined />,
                    onClick: () => navigate(ROUTES.USER.MY_PROFILE.USER_INFO),
                  },
                  {
                    key: '3',
                    label: 'Đăng xuất',
                    onClick: () => dispatch(logout()),
                    icon: <LogoutOutlined />,
                  },
                ],
              }}
            >
              <h3>{myProfile.data.firstName}</h3>
            </Dropdown>
          </Space>
        ) : (
          <Button onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Button>
        )}
      </Space>
    </S.HeaderContainer>
  )
}

export default UserHeader
