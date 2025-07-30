import { useEffect, useMemo } from 'react'
import { Space, Form, Button, Input, InputNumber, Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ROUTES } from '../../../constants/routes'
import { getCategories } from '../../../redux/thunks/category.thunk'
import { getProduct, updateProduct } from '../../../redux/thunks/product.thunk'

function UpdateProductPage() {
  const { id } = useParams()
  const [updateForm] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { productDetail } = useSelector((state) => state.product)
  const { categoryList } = useSelector((state) => state.category)

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
    dispatch(getCategories())
    dispatch(getProduct({ id: id }))
  }, [id])

  useEffect(() => {
    updateForm.setFieldsValue({
      name: productDetail.data.name,
      categoryId: productDetail.data.categoryId,
      price: productDetail.data.price,
    })
  }, [productDetail.data.id])

  const renderCategoryOptions = useMemo(() => {
    return categoryList.data.map((item) => {
      return <Select.Option value={item.id}>{item.name}</Select.Option>
    })
  }, [categoryList.data])

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
