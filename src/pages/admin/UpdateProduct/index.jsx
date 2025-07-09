import { useEffect, useMemo } from 'react'
import { Space, Form, Button, Input, InputNumber, Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ROUTES } from '../../../constants/routes'
import { getBrands } from '../../../redux/thunks/brand.thunk'
import { getProduct, updateProduct } from '../../../redux/thunks/product.thunk'

function UpdateProductPage() {
  const { id } = useParams()
  const [updateForm] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { productDetail } = useSelector((state) => state.product)
  const { brandList } = useSelector((state) => state.brand)

  const handleSubmit = (values) => {
    dispatch(
      updateProduct({
        id: id,
        data: values,
        callback: () => navigate(ROUTES.ADMIN.PRODUCTS),
      })
    )
  }

  useEffect(() => {
    dispatch(getBrands())
    dispatch(getProduct({ id: id }))
  }, [id])

  useEffect(() => {
    updateForm.setFieldsValue({
      name: productDetail.data.name,
      brandId: productDetail.data.brandId,
      price: productDetail.data.price,
    })
  }, [productDetail.data.id])

  const renderBrandOptions = useMemo(() => {
    return brandList.data.map((item) => {
      return <Select.Option value={item.id}>{item.name}</Select.Option>
    })
  }, [brandList.data])

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
          label="Brand"
          name="brandId"
          rules={[{ required: true, message: 'Please input the brand!' }]}
        >
          <Select
            placeholder="Enter brand"
            loading={brandList.status === 'loading'}
          >
            {renderBrandOptions}
          </Select>
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
