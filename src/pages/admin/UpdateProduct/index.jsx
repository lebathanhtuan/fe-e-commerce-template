import { useEffect } from 'react'
import { Space, Form, Button, Input, InputNumber } from 'antd'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ROUTES } from '../../../constants/routes'
import { updateProduct, getProduct } from '../../../redux/slices/product.slice'

function UpdateProductPage() {
  const { id } = useParams()
  const [updateForm] = Form.useForm()
  const location = useLocation()
  console.log('🚀 ~ UpdateProductPage ~ location:', location)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { productDetail } = useSelector((state) => state.product)
  console.log('🚀 ~ UpdateProductPage ~ productDetail:', productDetail)

  const handleSubmit = (values) => {
    dispatch(
      updateProduct({
        id: id,
        name: values.name,
        price: values.price,
      })
    )
    navigate(ROUTES.ADMIN.PRODUCTS)
  }

  useEffect(() => {
    dispatch(getProduct({ id: id }))
  }, [id])

  useEffect(() => {
    updateForm.setFieldsValue({
      name: productDetail.name,
      price: productDetail.price,
    })
  }, [productDetail.id])

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Update product page</h2>
      <Form
        name="updateProduct"
        form={updateForm}
        layout="vertical"
        onFinish={(values) => handleSubmit(values)}
        initialValues={{
          name: productDetail.name,
          price: productDetail.price,
        }}
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
              Update Product
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdateProductPage
