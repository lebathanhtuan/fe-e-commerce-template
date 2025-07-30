import { useEffect, useMemo } from 'react'
import { Space, Form, Button, Input, InputNumber, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ROUTES } from '../../../constants/routes'
import { createProduct } from '../../../redux/thunks/product.thunk'
import { getCategories } from '../../../redux/thunks/category.thunk'

function CreateProductPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { createProductData } = useSelector((state) => state.product)
  const { categoryList } = useSelector((state) => state.category)

  const handleSubmit = (values) => {
    dispatch(
      createProduct({
        data: values,
        callback: () => navigate(ROUTES.ADMIN.PRODUCTS),
      })
    )
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const renderCategoryOptions = useMemo(() => {
    return categoryList.data.map((item) => {
      return <Select.Option value={item.id}>{item.name}</Select.Option>
    })
  }, [categoryList.data])

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
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: 'Please input the category!' }]}
        >
          <Select
            placeholder="Enter category"
            loading={categoryList.status === 'loading'}
          >
            {renderCategoryOptions}
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
              htmlType="button"
              onClick={() => navigate(ROUTES.ADMIN.PRODUCTS)}
            >
              Back
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={createProductData.status === 'loading'}
            >
              Create Product
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateProductPage
