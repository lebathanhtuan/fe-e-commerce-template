import { useState, useEffect } from 'react'
import { Modal, FloatButton, Button, Input, List, Avatar, Tabs } from 'antd'
import { MessageOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import io from 'socket.io-client'

const socket = io(import.meta.env.VITE_END_POINT)

import * as S from './styled'

const ChatBox = () => {
  const [chatSession, setChatSession] = useState({})
  const [newMessage, setNewMessage] = useState('')
  const [roomActive, setRoomActive] = useState('')

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage || !roomActive) return
    socket.emit('admin_send_message', {
      message: newMessage,
      roomName: roomActive,
    })
    setNewMessage('')
  }

  useEffect(() => {
    socket.emit('admin_join_dashboard')

    socket.on('new_chat_session', (data) => {
      setChatSession((prev) => ({
        ...prev,
        [data.roomName]: [],
      }))
      if (!roomActive) setRoomActive(data.roomName)
    })

    socket.on('receive_message', (data) => {
      setChatSession((prev) => ({
        ...prev,
        [data.roomName]: [...(prev[data.roomName] || []), data],
      }))
    })

    return () => {
      socket.off('new_chat_session')
      socket.off('receive_message')
    }
  }, [])

  return (
    <>
      <Tabs
        activeKey={roomActive}
        tabPosition="top"
        items={Object.keys(chatSession).map((key) => ({
          key,
          label: `Room ${key}`,
        }))}
        onChange={(key) => setRoomActive(key)}
      />
      {roomActive && (
        <>
          <S.ChatContent>
            <List
              itemLayout="horizontal"
              dataSource={chatSession[roomActive] || []}
              renderItem={(item) => (
                <List.Item style={{ border: 'none' }}>
                  <List.Item.Meta
                    avatar={
                      item.sender !== 'Shop' ? (
                        <Avatar icon={<UserOutlined />} />
                      ) : null
                    }
                    title={item.sender !== 'Shop' ? item.sender : ''}
                    description={
                      <S.MessageBubble isUser={item.sender === 'Shop'}>
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
        </>
      )}
    </>
  )
}

export default ChatBox
