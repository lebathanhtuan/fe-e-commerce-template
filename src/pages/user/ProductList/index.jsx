import { useState, useEffect, useMemo } from 'react'
import { Flex, Row, Col, Card, Button, Radio, Checkbox, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link, generatePath } from 'react-router-dom'

import { getProducts } from '@redux/thunks/product.thunk'
import { getCategories } from '@redux/thunks/category.thunk'

import { PRODUCT_LIMIT } from '@constants/paging'
import { ROUTES } from '@constants/routes'

import * as S from './styled'

function ProductListPage() {
  const [filterParams, setFilterParams] = useState({
    categoryIds: [],
    q: '',
    sort: 'id',
    order: 'asc',
    page: 1,
    limit: PRODUCT_LIMIT,
  })

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
      <Checkbox key={item.id} value={item.id}>
        {item.name}
      </Checkbox>
    ))
  }, [categoryList.data])

  const renderProductItems = useMemo(() => {
    return productList.data.map((product) => (
      <Col xs={8} md={8} lg={6} key={product.id}>
        <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: product.id })}>
          <Card
            size="small"
            hoverable
            cover={
              <img alt={product.name} src={'https://placehold.co/600x400'} />
            }
            style={{ width: '100%' }}
          >
            <Card.Meta title={product.name} description={product.price} />
          </Card>
        </Link>
      </Col>
    ))
  }, [productList.data])

  return (
    <S.Container>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card
            title="Filter categories"
            size="small"
            style={{ width: '100%' }}
          >
            <Checkbox.Group
              onChange={(values) => handleFilter('categoryIds', values)}
              value={filterParams.categoryIds}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {renderCategoryOptions}
            </Checkbox.Group>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Input.Search
            placeholder="Search products..."
            onSearch={(value) => handleFilter('q', value)}
            style={{ marginBottom: 16 }}
          />
          {loading ? (
            <p>Loading....</p>
          ) : (
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              {renderProductItems}
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
