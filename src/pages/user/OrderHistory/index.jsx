import { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import { getUserOrders } from '@redux/thunks/order.thunk'

const OrderHistories = () => {
  const dispatch = useDispatch()

  const { userOrders } = useSelector((state) => state.order)
  console.log('🚀 ~ OrderHistories ~ userOrders:', userOrders)

  useEffect(() => {
    dispatch(getUserOrders())
  }, [])

  const tableColumns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'orderItems',
      key: 'orderItems',
      render: (_, item) => `${item.order_items.length} sản phẩm`,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (_, item) => `${item.totalAmount?.toLocaleString()} VND`,
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, item) => dayjs(item.createdAt).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'address',
      key: 'address',
      render: (_, item) => item.shippingAddress,
    },
  ]

  return (
    <Table
      columns={tableColumns}
      dataSource={userOrders.data}
      rowKey="id"
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <ul>
            {record.order_items.map((item) => (
              <li key={item.id}>
                {item.productName}
                {` - ${item.price?.toLocaleString()} VND`}
                {` - ${item.quantity}`}
                {` - ${(item.price * item.quantity).toLocaleString()} VND`}
              </li>
            ))}
          </ul>
        ),
      }}
    />
  )
}

export default OrderHistories
