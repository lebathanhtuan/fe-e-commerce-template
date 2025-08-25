import {
  DashboardOutlined,
  ProductOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { ROUTES } from '@constants/routes'

export const SIDEBAR_ITEMS = [
  {
    name: 'Dashboard',
    icon: <DashboardOutlined />,
    path: ROUTES.ADMIN.DASHBOARD,
  },
  {
    name: 'Sản phẩm',
    icon: <ProductOutlined />,
    path: ROUTES.ADMIN.PRODUCTS,
  },
  {
    name: 'Chat box',
    icon: <MessageOutlined />,
    path: ROUTES.ADMIN.CHAT_BOX,
  },
]
