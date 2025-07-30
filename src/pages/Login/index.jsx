import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, notification } from 'antd'

import { ROUTES } from '../../constants/routes'
import { login } from '../../redux/thunks/auth.thunk'

function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    dispatch(
      login({
        data: values,
        callback: () => {
          notification.success({
            message: 'Login successful',
            description: 'You are now logged in.',
          })
          navigate(ROUTES.USER.HOME)
        },
      })
    )
  }

  return (
    <div>
      <h1>Login</h1>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
        <Form.Item name="email" label="Email">
          <Input type="email" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage
