import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Form, Input } from 'antd'

import * as S from './styled'

function UserInfo() {
  const [updateUserInfoForm] = Form.useForm()

  const { myProfile } = useSelector((state) => state.auth)

  useEffect(() => {
    if (myProfile.data.id) {
      updateUserInfoForm.setFieldsValue({
        fullName: myProfile.data.fullName,
        email: myProfile.data.email,
        phone: myProfile.data.phone,
      })
    }
  }, [
    myProfile.data.id,
    myProfile.data.fullName,
    myProfile.data.email,
    myProfile.data.phone,
    updateUserInfoForm,
  ])

  const handleUpdateUserInfo = () => {}

  return (
    <Form
      form={updateUserInfoForm}
      name="updateUserInfoForm"
      layout="vertical"
      onFinish={(values) => handleUpdateUserInfo(values)}
    >
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item label="Số điện thoại" name="phone">
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Cập nhật
      </Button>
    </Form>
  )
}

export default UserInfo
