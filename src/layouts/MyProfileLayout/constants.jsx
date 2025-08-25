import {
  IdcardOutlined,
  ShoppingOutlined,
  HeartOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { ROUTES } from '@constants/routes'

export const PROFILE_MENU = [
  {
    label: 'Thông tin cá nhân',
    path: ROUTES.USER.MY_PROFILE.USER_INFO,
    icon: <IdcardOutlined />,
  },
  {
    label: 'Lịch sử mua hàng',
    path: ROUTES.USER.MY_PROFILE.ORDER_HISTORY,
    icon: <ShoppingOutlined />,
  },
  {
    label: 'Sản phẩm yêu thích',
    path: ROUTES.USER.MY_PROFILE.FAVORITE_PRODUCTS,
    icon: <HeartOutlined />,
  },
  {
    label: 'Đổi mật khẩu',
    path: ROUTES.USER.MY_PROFILE.CHANGE_PASSWORD,
    icon: <LockOutlined />,
  },
]
