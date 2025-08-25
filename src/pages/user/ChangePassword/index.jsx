import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input } from 'antd'

import { changePassword } from '@redux/thunks/auth.thunk'

function ChangePassword() {
  const [changePasswordForm] = Form.useForm()

  const { changePasswordData } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (changePasswordData.error) {
      changePasswordForm.setFields([
        {
          name: 'oldPassword',
          errors: ['Mật khẩu cũ không đúng!'],
        },
      ])
    }
  }, [changePasswordData.error, changePasswordForm])

  const handleChangePassword = (values) => {
    dispatch(
      changePassword({
        data: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        callback: () => changePasswordForm.resetFields(),
      })
    )
  }

  return (
    <Form
      form={changePasswordForm}
      name="changePasswordForm"
      layout="vertical"
      onFinish={(values) => handleChangePassword(values)}
      autoComplete="off"
    >
      <Form.Item
        label="Mật khẩu cũ"
        name="oldPassword"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu cũ!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Mật khẩu mới"
        name="newPassword"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu mới!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Xác nhận mật khẩu mới"
        name="confirmNewPassword"
        rules={[
          {
            required: true,
            message: 'Vui lòng xác nhận mật khẩu mới!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject('Mật khẩu không khớp!')
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        block
        loading={changePasswordData.load}
      >
        Thay đổi
      </Button>
    </Form>
  )
}

export default ChangePassword
