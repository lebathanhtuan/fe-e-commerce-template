import styled from 'styled-components'

export const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
`

export const RegisterForm = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;

  & > form {
    text-align: left;
  }
`

export const Title = styled.h1`
  margin-bottom: 24px;
  color: #333;
  font-size: 28px;
  font-weight: 600;
`

export const FooterText = styled.p`
  margin-top: 24px;
  color: #666;
`

export const RegisterLink = styled.a`
  color: #1890ff;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`

export const NameGroup = styled.div`
  display: flex;
  gap: 16px;
`
