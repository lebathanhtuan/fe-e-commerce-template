import { Space, Form, Button, Input, InputNumber } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { ROUTES } from '../../../constants/routes'
import { createProduct } from '../../../redux/slices/product.slice'

function CreateProductPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    dispatch(createProduct(values))
    navigate(ROUTES.ADMIN.PRODUCTS)
  }

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Create product page</h2>
      <Form
        name="createProduct"
        layout="vertical"
        onFinish={(values) => handleSubmit(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input the product name!' },
          ]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber
            placeholder="Enter price"
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              htmlType="buttom"
              onClick={() => navigate(ROUTES.ADMIN.PRODUCTS)}
            >
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Create Product
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateProductPage
