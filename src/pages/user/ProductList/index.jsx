import { useState, useEffect, useMemo } from 'react'
import { Flex, Row, Col, Card, Button, Radio, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { getProducts } from '../../../redux/thunks/product.thunk'
import { getCategories } from '../../../redux/thunks/category.thunk'

import { PRODUCT_LIMIT } from '../../../constants/paging'

import * as S from './styled'

function ProductListPage() {
  const [filterParams, setFilterParams] = useState({
    categoryId: undefined,
    q: '',
    sort: 'id',
    order: 'asc',
    page: 1,
    limit: PRODUCT_LIMIT,
  })
  console.log('🚀 ~ ProductListPage ~ filterParams:', filterParams)

  const dispatch = useDispatch()

  const { productList, loading } = useSelector((state) => state.product)
  const { categoryList } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(getProducts(filterParams))
    dispatch(getCategories())
  }, [])

  const handleFilter = (key, value) => {
    const newFilterParams = {
      ...filterParams,
      page: 1,
      [key]: value,
    }
    setFilterParams(newFilterParams)
    dispatch(getProducts(newFilterParams))
  }

  const handleLoadMore = () => {
    const newFilterParams = {
      ...filterParams,
      page: filterParams.page + 1,
    }
    setFilterParams(newFilterParams)
    dispatch(getProducts({ ...newFilterParams, more: true }))
  }

  const renderCategoryOptions = useMemo(() => {
    return categoryList.data.map((item) => (
      <Radio key={item.id} value={item.id}>
        {item.name}
      </Radio>
    ))
  }, [categoryList.data])

  const renderProductItems = () => {
    return productList.data.map((product) => (
      <Col span={6} key={product.id}>
        <Card
          hoverable
          cover={
            <img alt={product.name} src={'https://placehold.co/600x400'} />
          }
          style={{ width: '100%' }}
        >
          <Card.Meta title={product.name} description={product.price} />
        </Card>
      </Col>
    ))
  }

  return (
    <S.Container>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Filter categories" style={{ width: '100%' }}>
            <Radio.Group
              onChange={(e) => handleFilter('categoryId', e.target.value)}
              value={filterParams.categoryId}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {renderCategoryOptions}
            </Radio.Group>
          </Card>
        </Col>
        <Col span={18}>
          <Input.Search
            placeholder="Search products..."
            onSearch={(value) => handleFilter('q', value)}
            style={{ marginBottom: 16 }}
          />
          {loading ? (
            <p>Loading....</p>
          ) : (
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              {renderProductItems()}
            </Row>
          )}
          {productList.data.length < productList.meta.total && (
            <Flex justify="center">
              <Button onClick={() => handleLoadMore()}>Load more</Button>
            </Flex>
          )}
        </Col>
      </Row>
    </S.Container>
  )
}

export default ProductListPage
