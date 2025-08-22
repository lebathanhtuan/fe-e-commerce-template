import React, { useState } from 'react'
import { Modal, FloatButton, Button, Input, List, Avatar } from 'antd'
import { MessageOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'

import * as S from './styled'

const ChatBox = () => {
  const [isShowChatBox, setIsShowChatBox] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      text: 'Chào bạn, mình có thể giúp gì cho bạn?',
      isUser: false,
    },
  ])

  const showModal = () => {
    setIsShowChatBox(true)
  }

  const handleOk = () => {
    setIsShowChatBox(false)
  }

  const handleCancel = () => {
    setIsShowChatBox(false)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessages = [...messages, { text: message, isUser: true }]
      setMessages(newMessages)
      setMessage('')

      // Giả lập phản hồi từ Admin sau 1 giây
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: 'Cảm ơn bạn đã nhắn tin. Admin sẽ phản hồi bạn sớm nhất có thể.',
            isUser: false,
          },
        ])
      }, 1000)
    }
  }

  return (
    <>
      <FloatButton
        type="primary"
        icon={<MessageOutlined />}
        onClick={showModal}
      />
      <Modal
        title="Chat với Admin"
        visible={isShowChatBox}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <S.ChatContent>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item) => (
              <List.Item style={{ border: 'none' }}>
                <List.Item.Meta
                  avatar={
                    !item.isUser ? <Avatar icon={<UserOutlined />} /> : null
                  }
                  title={!item.isUser ? 'Admin' : ''}
                  description={
                    <S.MessageBubble isUser={item.isUser}>
                      {item.text}
                    </S.MessageBubble>
                  }
                />
              </List.Item>
            )}
          />
        </S.ChatContent>
        <Input.Group compact style={{ marginTop: 16 }}>
          <Input.TextArea
            style={{ width: 'calc(100% - 40px)' }}
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoSize={{ minRows: 1, maxRows: 3 }}
            onPressEnter={handleSendMessage}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            style={{ width: 40 }}
          />
        </Input.Group>
      </Modal>
    </>
  )
}

export default ChatBox
