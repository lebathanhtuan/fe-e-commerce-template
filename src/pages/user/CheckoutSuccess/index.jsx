import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import { ROUTES } from '@constants/routes'

function CheckoutSuccessPage() {
  const navigate = useNavigate()

  return (
    <>
      <h2 style={{ marginBottom: 16, textAlign: 'center' }}>
        Bạn đã đặt hàng thành công!
      </h2>
      <Button
        type="primary"
        onClick={() => navigate(ROUTES.USER.MY_PROFILE.ORDER_HISTORY)}
        style={{ marginRight: 8 }}
      >
        Kiểm tra đơn hàng
      </Button>
      <Button onClick={() => navigate(ROUTES.USER.HOME)}>
        Quay về trang chủ
      </Button>
    </>
  )
}

export default CheckoutSuccessPage
