import { useState, useEffect } from 'react'
import { Flex, Row, Col, Card, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import * as S from './styled'

import { getProducts } from '../../../redux/thunks/product.thunk'

function ProductListPage() {
  const [page, setPage] = useState(1)

  const dispatch = useDispatch()

  const { productList, loading } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const renderProductItems = () => {
    const newProductList = productList.slice(0, page * 4)
    return newProductList.map((product) => (
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
      {loading ? (
        <p>Loading....</p>
      ) : (
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          {renderProductItems()}
        </Row>
      )}
      {productList.length > page * 4 && (
        <Flex justify="center">
          <Button onClick={() => setPage(page + 1)}>Load more</Button>
        </Flex>
      )}
    </S.Container>
  )
}

export default ProductListPage
