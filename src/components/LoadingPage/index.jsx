import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import * as S from './styled'

const LoadingPage = () => {
  return (
    <S.LoadingContainer>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      <S.LoadingText>Đang tải dữ liệu, vui lòng đợi...</S.LoadingText>
    </S.LoadingContainer>
  )
}

export default LoadingPage
