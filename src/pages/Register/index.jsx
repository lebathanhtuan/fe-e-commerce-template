import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, notification } from 'antd'

import { ROUTES } from '../../constants/routes'
import { register } from '../../redux/thunks/auth.thunk'

function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    dispatch(
      register({
        data: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
        callback: () => {
          notification.success({
            message: 'Registration successful',
            description: 'You can now log in with your credentials.',
          })
          navigate(ROUTES.LOGIN)
        }
      })
    )
  }

  return (
    <div>
      <h1>Register</h1>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
        <Form.Item name="username" label="Username">
          <Input type="username" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input type="email" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                )
              },
            }),
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterPage
