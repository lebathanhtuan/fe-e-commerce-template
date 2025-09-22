import { useMemo } from 'react'
import {
  Table,
  Button,
  InputNumber,
  Row,
  Col,
  Card,
  Space,
  Breadcrumb,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'

import { ROUTES } from '@constants/routes'
import { updateCartItem, deleteCartItem } from '@redux/thunks/cart.thunk'

function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cartItems } = useSelector((state) => state.cart)

  const totalPrice = useMemo(
    () =>
      cartItems.data.reduce((total, item) => {
        return total + item.quantity * parseFloat(item.product.price)
      }, 0),
    [cartItems.data]
  )

  // const totalPrice = useMemo(() => {
  //   let total = 0
  //   cartItems.data.forEach((item) => {
  //     total += item.quantity * parseFloat(item.product.price)
  //   })
  //   return total
  // }, [cartItems.data])

  const handleChangeQuantity = (cartId, value) => {
    dispatch(updateCartItem({ id: cartId, quantity: value }))
  }

  const handleDeleteCartItem = (id) => {
    dispatch(deleteCartItem(id))
  }

  const tableColumn = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => item.product.name,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, item) => {
        return `${parseFloat(item.product.price).toLocaleString()} VNĐ`
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, item) => (
        <InputNumber
          value={item.quantity}
          min={1}
          onChange={(value) => handleChangeQuantity(item.id, value)}
        />
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      render: (_, item) =>
        `${(
          parseFloat(item.product.price) * item.quantity
        ).toLocaleString()} VNĐ`,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <Button danger onClick={() => handleDeleteCartItem(item.id)}>
          Xóa
        </Button>
      ),
    },
  ]

  return (
    <>
      <h2 style={{ marginBottom: 16, textAlign: 'center' }}>Giỏ hàng</h2>
      <Card size="small">
        <Table
          columns={tableColumn}
          dataSource={cartItems.data}
          rowKey="productId"
          pagination={false}
        />
      </Card>
      <Row justify="end" style={{ margin: '24px 0' }}>
        <Col span={8}>
          <Card size="small" title="Tổng tiền">
            {totalPrice.toLocaleString()} VND
          </Card>
        </Col>
      </Row>
      <Row justify="end">
        <Button
          type="primary"
          disabled={!cartItems.data.length}
          onClick={() => navigate(ROUTES.USER.CHECKOUT)}
        >
          Tiếp theo
        </Button>
      </Row>
    </>
  )
}

export default CartPage
