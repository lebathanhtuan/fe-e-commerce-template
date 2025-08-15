import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

import { ROUTES } from '../../../constants/routes'

const socket = io('http://localhost:3000')

function HomePage() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [roomName, setRoomName] = useState('')

  const { myProfile } = useSelector((state) => state.auth)

  useEffect(() => {
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

    return () => {
      socket.off('receive_message')
    }
  }, [myProfile.data.id, roomName])

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

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main area of the application.</p>
      <p>
        You can navigate to the
        <Link to={ROUTES.ADMIN.PRODUCTS}>Product Management</Link>
        page to manage products.
      </p>
      <div>
        <div>Chat</div>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender !== 'Shop' ? 'Bạn' : 'Shop'}: </strong>
              <span>{msg.message}</span>
            </p>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default HomePage
