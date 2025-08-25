import styled from 'styled-components'
import { Button } from 'antd'

export const ChatContent = styled.div`
  max-height: 400px;
  overflow-y: auto;
`

export const MessageBubble = styled.div`
  background-color: ${(props) => (props.isUser ? '#1890ff' : '#f0f2f5')};
  color: ${(props) => (props.isUser ? '#fff' : 'rgba(0, 0, 0, 0.85)')};
  padding: 8px 12px;
  border-radius: 15px;
  max-width: 70%;
  word-wrap: break-word;
  margin-bottom: 8px;
  margin-left: ${(props) => (props.isUser ? 'auto' : '0')};
  margin-right: ${(props) => (props.isUser ? '0' : 'auto')};
`
