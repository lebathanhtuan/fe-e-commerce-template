import { useEffect } from 'react'
import { Flex, Table, Button, Space, Popconfirm } from 'antd'
import { useNavigate, generatePath } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ROUTES } from '../../../constants/routes'
import { getProducts, deleteProduct } from '../../../redux/thunks/product.thunk'

function ProductManagementPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { productList } = useSelector((state) => state.product)

  const handleDeleteProduct = (id) => {
    dispatch(
      deleteProduct({
        id: id,
        callback: () => dispatch(getProducts()),
      })
    )
  }

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: '16px' }}
      >
        <h2>Product management page</h2>
        <Button
          type="primary"
          onClick={() => navigate(ROUTES.ADMIN.CREATE_PRODUCT)}
        >
          Create product
        </Button>
      </Flex>
      <Table
        loading={productList.status === 'loading'}
        dataSource={productList.data}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (_, record) => record.category_name,
          },
          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => record.price.toLocaleString(),
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <Space>
                <Button
                  type="primary"
                  ghost
                  onClick={() =>
                    navigate(
                      generatePath(ROUTES.ADMIN.UPDATE_PRODUCT, {
                        id: record.id,
                      }),
                      {
                        state: {
                          name: record.name,
                          price: record.price,
                        },
                      }
                    )
                  }
                >
                  Update
                </Button>
                <Popconfirm
                  title="Delete the product"
                  description="Are you sure to delete this product?"
                  onConfirm={() => handleDeleteProduct(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
        rowKey="id"
      />
    </div>
  )
}

export default ProductManagementPage
