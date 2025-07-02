import styled, { css } from 'styled-components'
import { Button } from 'antd'

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const CustomButton = styled(Button)`
  background-color: cyan;
`

export const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`

export const ContentContainer = styled.div`
  margin-left: 0;
  background-color: white;
  padding: 16px;
  flex-grow: 1;
  transition: all 0.3s;

  ${(props) =>
    props.isShowSidebar &&
    css`
      margin-left: 250px;
    `}
`
