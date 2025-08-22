import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, notification } from 'antd'

import { ROUTES } from '@constants/routes'
import { register } from '@redux/thunks/auth.thunk'

import * as S from './styled'

function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    dispatch(
      register({
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
        callback: () => {
          notification.success({
            message: 'Đăng ký thành công',
            description: 'Tài khoản của bạn đã được tạo.',
          })
          navigate(ROUTES.LOGIN)
        },
      })
    )
  }

  return (
    <S.RegisterWrapper>
      <S.RegisterForm>
        <S.Title>Đăng ký</S.Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <S.NameGroup>
            <Form.Item
              name="lastName"
              label="Họ"
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
            >
              <Input placeholder="Nhập họ" />
            </Form.Item>
            <Form.Item
              name="firstName"
              label="Tên"
              style={{ flex: 1 }}
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>
          </S.NameGroup>
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
          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Hai mật khẩu không khớp!'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" size="large" block>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <S.FooterText>
          Bạn đã có tài khoản? <Link to={ROUTES.LOGIN}>Đăng nhập ngay</Link>
        </S.FooterText>
      </S.RegisterForm>
    </S.RegisterWrapper>
  )
}

export default RegisterPage
