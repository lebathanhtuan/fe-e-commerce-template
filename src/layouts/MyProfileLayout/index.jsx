import { useMemo } from 'react'
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom'
import { Card, Row, Col, Breadcrumb, Space } from 'antd'
import { useSelector } from 'react-redux'
import { CameraOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons'

import { ROUTES } from '@constants/routes'
import LoadingPage from '@components/LoadingPage'

import { PROFILE_MENU } from './constants'

import * as S from './styled'

function Profile() {
  const { pathname } = useLocation()

  const { myProfile } = useSelector((state) => state.auth)

  const accessToken = localStorage.getItem('accessToken')

  const handleChangeAvatar = async () => {}

  const renderProfileMenu = useMemo(() => {
    return PROFILE_MENU.map((item, index) => {
      return (
        <Link to={item.path} key={index} style={{ color: 'black' }}>
          <S.ProfileMenuItem active={item.path === pathname}>
            <div>{item.icon}</div>
            <p style={{ marginLeft: 12 }}>{item.label}</p>
          </S.ProfileMenuItem>
        </Link>
      )
    })
  }, [pathname])

  const profileLabel = useMemo(() => {
    return PROFILE_MENU.find((item) => item.path === pathname)?.label
  }, [pathname])

  if (accessToken && myProfile.loading) {
    return <LoadingPage />
  } else if (!myProfile.data.id) {
    return <Navigate to={ROUTES.USER.HOME} />
  }
  return (
    <S.MyProfileContainer>
      <Row gutter={[16, 16]}>
        <Col md={6}>
          <S.ProfileMenuWrapper bordered={false} size="small">
            <S.AvatarContainer>
              <S.AvatarUpload>
                <S.AvatarEdit>
                  <input
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => handleChangeAvatar(e)}
                  />
                  <label htmlFor="imageUpload">
                    <CameraOutlined style={{ fontSize: 16 }} />
                  </label>
                </S.AvatarEdit>
                {myProfile.data.avatarUrl ? (
                  <S.AvatarPreview
                    src={myProfile.data.avatarUrl}
                    alt="User profile picture"
                  />
                ) : (
                  <S.AvatarDefaultWrapper>
                    <S.AvatarDefaultContainer
                      icon={<UserOutlined style={{ fontSize: 36 }} />}
                    />
                  </S.AvatarDefaultWrapper>
                )}
              </S.AvatarUpload>
              <h3>
                {myProfile.data.firstName} {myProfile.data.lastName}
              </h3>
              <p>{myProfile.data.email}</p>
            </S.AvatarContainer>
            <S.ProfileMenuContainer>{renderProfileMenu}</S.ProfileMenuContainer>
          </S.ProfileMenuWrapper>
        </Col>
        <Col md={18}>
          <Card bordered={false} size="small" title={profileLabel}>
            <Outlet />
          </Card>
        </Col>
      </Row>
    </S.MyProfileContainer>
  )
}

export default Profile
