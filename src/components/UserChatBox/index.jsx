import { useState, useEffect } from 'react'
import { Modal, FloatButton, Button, Input, List, Avatar } from 'antd'
import { MessageOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

const socket = io(import.meta.env.VITE_END_POINT)

import * as S from './styled'

const UserChatBox = () => {
  const [isShowChatBox, setIsShowChatBox] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [roomName, setRoomName] = useState('')

  const { myProfile } = useSelector((state) => state.auth)

  const showModal = () => {
    setIsShowChatBox(true)
  }

  const handleOk = () => {
    setIsShowChatBox(false)
  }

  const handleCancel = () => {
    setIsShowChatBox(false)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage || !roomName) return
    const message = {
      message: newMessage,
      roomName: roomName,
    }
    socket.emit('client_send_message', message)
    setNewMessage('')
  }

  useEffect(() => {
    if (isShowChatBox) {
      const userId = myProfile.data.id
      const currentRoom = userId ? `user_${userId}` : `guest_${socket.id}`
      setRoomName(currentRoom)

      const userData = userId ? { userId: userId } : { questId: socket.id }
      socket.emit('client_join_chat', userData)

      socket.on('receive_message', (data) => {
        if (data.roomName === roomName) {
          setMessages((prev) => [...prev, data])
        }
      })
    } else {
      setMessages([])
      setRoomName('')
      socket.off('client_join_chat')
      socket.off('receive_message')
    }
  }, [isShowChatBox, myProfile.data.id, roomName])

  useEffect(() => {
    return () => {
      socket.off('client_join_chat')
      socket.off('receive_message')
    }
  }, [])

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
                    item.sender === 'Shop' ? (
                      <Avatar icon={<UserOutlined />} />
                    ) : null
                  }
                  title={item.sender === 'Shop' ? 'Admin' : ''}
                  description={
                    <S.MessageBubble isUser={item.sender !== 'Shop'}>
                      {item.message}
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
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

export default UserChatBox
