import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Space,
  Breadcrumb,
  Card,
  Button,
  InputNumber,
  Form,
  Input,
  Rate,
  App,
} from 'antd'
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
} from '@ant-design/icons'

import { ROUTES } from '@constants/routes'
import { getProduct } from '@redux/thunks/product.thunk'
import { addToCart, getCartItems } from '@redux/thunks/cart.thunk'

import * as S from './styled'

const ProductDetailPage = () => {
  const [reviewForm] = Form.useForm()
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const { notification } = App.useApp()

  const dispatch = useDispatch()
  const { myProfile } = useSelector((state) => state.auth)
  const { productDetail } = useSelector((state) => state.product)
  const { reviewList } = useSelector((state) => state.review)

  const isFavorite = false

  const averageRate = 4.5

  useEffect(() => {
    dispatch(getProduct({ id: parseInt(id) }))
  }, [id])

  const handleAddToCart = () => {
    if (!myProfile.data.id) {
      return notification.error({
        message: 'Lỗi',
        description: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng',
      })
    }
    dispatch(addToCart({ productId: parseInt(id), quantity }))
    notification.success({
      message: 'Thành công',
      description: 'Thêm sản phẩm vào giỏ hàng thành công',
    })
  }

  const handleToggleFavorite = () => {}

  const handleReviewProduct = () => {}

  const renderReviewForm = useMemo(() => {
    if (myProfile.data.id) {
      const isReviewed = false
      if (isReviewed) {
        return (
          <S.ReviewFormWrapper>
            Bạn đã đánh giá sản phẩm này
          </S.ReviewFormWrapper>
        )
      }
      return (
        <S.ReviewFormWrapper>
          <Form
            form={reviewForm}
            name="reviewForm"
            layout="vertical"
            initialValues={{
              rate: 0,
              comment: '',
            }}
            onFinish={(values) => handleReviewProduct(values)}
          >
            <Form.Item
              label="Đánh giá sao"
              name="rate"
              rules={[
                { required: true, message: 'Nhận xét là bắt buộc' },
                {
                  min: 1,
                  type: 'number',
                  message: 'Đánh giá sao là bắt buộc',
                },
              ]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              label="Nhận xét"
              name="comment"
              rules={[{ required: true, message: 'Nhận xét là bắt buộc' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi
            </Button>
          </Form>
        </S.ReviewFormWrapper>
      )
    }
    return <S.ReviewFormWrapper>Bạn chưa đăng nhập</S.ReviewFormWrapper>
  }, [myProfile.data])

  const renderReviewList = useMemo(() => {
    return reviewList.data.map((item) => {
      return (
        <S.ReviewItemWrapper key={item.id}>
          <Space>
            <h3>{item.user.fullName}</h3>
          </Space>
          <Rate
            value={item.rate}
            disabled
            style={{ display: 'block', fontSize: 12 }}
          />
          <p>{item.comment}</p>
        </S.ReviewItemWrapper>
      )
    })
  }, [reviewList.data])

  return (
    <S.ProductDetailWrapper>
      <Card size="small" bordered={false}>
        <Row gutter={[16, 16]}>
          <Col md={10} sm={24}>
            <img
              src={productDetail.data.images || 'https://placehold.co/600x400'}
              alt=""
              width="100%"
              height="auto"
              style={{ objectFit: 'cover' }}
            />
          </Col>
          <Col md={14} sm={24}>
            <p>{productDetail.data.category?.name}</p>
            <h1>{productDetail.data.name}</h1>
            <Space align="start" style={{ marginBottom: 8 }}>
              <Rate value={averageRate} allowHalf disabled />
              <span>{`(${
                averageRate ? `${averageRate} sao` : 'Chưa có đánh giá'
              })`}</span>
            </Space>
            <h2 style={{ color: '#006363' }}>
              {parseInt(productDetail.data.price).toLocaleString()} ₫
            </h2>
            <div style={{ margin: '8px 0' }}>
              <InputNumber
                value={quantity}
                min={1}
                onChange={(value) => setQuantity(value)}
              />
            </div>
            <Space>
              <Button
                size="large"
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => handleAddToCart()}
              >
                Add to cart
              </Button>
              <Button
                size="large"
                type="text"
                danger={isFavorite}
                icon={
                  isFavorite ? (
                    <HeartFilled style={{ fontSize: 24 }} />
                  ) : (
                    <HeartOutlined style={{ fontSize: 24, color: '#414141' }} />
                  )
                }
                onClick={() => handleToggleFavorite()}
              ></Button>
              <p>0 Lượt thích</p>
            </Space>
          </Col>
        </Row>
      </Card>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={16}>
          <Card size="small" title="Thông tin sản phẩm" bordered={false}>
            <div className="ql-editor" style={{ padding: 0 }}>
              <div>{productDetail.data.description}</div>
            </div>
          </Card>
          <Card
            size="small"
            title="Đánh giá"
            bordered={false}
            style={{ marginTop: 16 }}
          >
            {renderReviewForm}
            {renderReviewList}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size="small" title="Cấu hình" bordered={false}>
            Cấu hình
          </Card>
        </Col>
      </Row>
    </S.ProductDetailWrapper>
  )
}

export default ProductDetailPage
