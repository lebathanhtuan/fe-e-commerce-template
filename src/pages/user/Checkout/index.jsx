import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Form,
  Button,
  Input,
  Select,
  Radio,
  Row,
  Col,
  Card,
  Space,
  Table,
  Breadcrumb,
} from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import { getCities } from '@redux/thunks/address.thunk'
import { ROUTES } from '@constants/routes'
import { getDistricts, getWards } from '../../../redux/thunks/address.thunk'
import { orderFormCart } from '../../../redux/thunks/order.thunk'

function CheckoutFormPage() {
  const [checkoutForm] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { myProfile } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.cart)
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.address
  )

  const totalPrice = useMemo(
    () =>
      cartItems.data.reduce((total, item) => {
        return total + item.quantity * item.product.price
      }, 0),
    [cartItems.data]
  )

  const tableColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => item.product.name,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (_, item) =>
        `${(item.product.price * item.quantity).toLocaleString()} VND`,
    },
  ]

  const handleSubmitCheckoutForm = (values) => {
    dispatch(
      orderFormCart({
        data: values,
        callback: navigate(ROUTES.USER.CHECKOUT_SUCCESS),
      })
    )
  }

  useEffect(() => {
    dispatch(getCities())
  }, [])

  useEffect(() => {
    if (!myProfile.data.id) return
    const { firstName, lastName, email, phone } = myProfile.data
    checkoutForm.setFieldsValue({
      recipientName: `${lastName} ${firstName}`,
      recipientEmail: email,
      recipientPhone: phone,
    })
  }, [myProfile.data.id])

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((city) => (
      <Select.Option key={city.code} value={city.code}>
        {city.name}
      </Select.Option>
    ))
  }, [cityList.data])

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((district) => (
      <Select.Option key={district.code} value={district.code}>
        {district.name}
      </Select.Option>
    ))
  }, [districtList.data])

  const renderWardOptions = useMemo(() => {
    return wardList.data.map((ward) => (
      <Select.Option key={ward.code} value={ward.code}>
        {ward.name}
      </Select.Option>
    ))
  }, [wardList.data])

  return (
    <>
      <h2 style={{ marginBottom: 16, textAlign: 'center' }}>
        Thủ tục thanh toán
      </h2>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Form
            name="checkoutForm"
            form={checkoutForm}
            layout="vertical"
            onFinish={(values) => handleSubmitCheckoutForm(values)}
          >
            <Card
              size="small"
              title="Thông tin giao hàng"
              style={{ marginBottom: 24 }}
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Họ và tên"
                    name="recipientName"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="recipientEmail"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Số điện thoại"
                    name="recipientPhone"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Tỉnh/Thành"
                    name="cityCode"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Select
                      onChange={(value) => {
                        dispatch(getDistricts({ cityCode: value }))
                        checkoutForm.setFieldsValue({
                          districtCode: undefined,
                          wardCode: undefined,
                        })
                      }}
                      allowClear
                    >
                      {renderCityOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Quận/Huyện"
                    name="districtCode"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Select
                      onChange={(value) => {
                        dispatch(getWards({ districtCode: value }))
                        checkoutForm.setFieldsValue({
                          wardCode: undefined,
                        })
                      }}
                      allowClear
                      disabled={!checkoutForm.getFieldValue('cityCode')}
                    >
                      {renderDistrictOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Phường/Xã"
                    name="wardCode"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Select
                      allowClear
                      disabled={!checkoutForm.getFieldValue('districtCode')}
                    >
                      {renderWardOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Địa chỉ"
                    name="shippingAddress"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card
              size="small"
              title="Thông tin thanh toán"
              style={{ marginBottom: 24 }}
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Phương thức thanh toán"
                    name="paymentMethod"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value="COD">COD</Radio>
                        <Radio value="BANK_TRANSFER">ATM</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Row justify="space-between">
              <Button onClick={() => navigate(ROUTES.USER.CART)}>
                Trở lại
              </Button>
              <Button type="primary" htmlType="submit">
                Thanh toán
              </Button>
            </Row>
          </Form>
        </Col>
        <Col span={10}>
          <Card size="small" title="Giỏ hàng" style={{ marginBottom: 24 }}>
            <Table
              size="small"
              columns={tableColumn}
              dataSource={cartItems.data}
              rowKey="id"
              pagination={false}
            />
            <h4 style={{ marginTop: 16, textAlign: 'right' }}>Tổng tiền</h4>
            <p style={{ textAlign: 'right' }}>
              {totalPrice?.toLocaleString()} VND
            </p>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CheckoutFormPage
