import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #282c34;
  color: white;
`

export const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  border: none;
  background-color: red;
  color: white;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`
