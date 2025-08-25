import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, notification } from 'antd'

import { ROUTES } from '@constants/routes'
import { login } from '@redux/thunks/auth.thunk'

import * as S from './styled'

function LoginPage() {
  const [loginForm] = Form.useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loginData } = useSelector((state) => state.auth)

  const handleSubmit = (values) => {
    dispatch(
      login({
        data: values,
        callback: (role) => {
          notification.success({
            message: 'Đăng nhập thành công',
            description: 'Bạn đã đăng nhập vào hệ thống.',
          })
          navigate(role === 'admin' ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.HOME)
        },
      })
    )
  }

  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: 'email',
          errors: [' '],
        },
        {
          name: 'password',
          errors: [loginData.error],
        },
      ])
    }
  }, [loginData.error, loginForm])

  return (
    <>
      <S.LoginWrapper>
        <S.LoginForm>
          <S.Title>Đăng nhập</S.Title>
          <Form form={loginForm} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input type="email" placeholder="Nhập email của bạn" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu của bạn" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" size="large" block>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <S.FooterText>
            Bạn chưa có tài khoản?{' '}
            <Link to={ROUTES.REGISTER}>Đăng ký ngay</Link>
          </S.FooterText>
        </S.LoginForm>
      </S.LoginWrapper>
    </>
  )
}

export default LoginPage
