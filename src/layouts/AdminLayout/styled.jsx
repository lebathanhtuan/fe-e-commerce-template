import styled, { css } from 'styled-components'

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`

export const AppContent = styled.div`
  margin-left: 0px;
  padding: 16px;
  width: 100%;
  transition: all 0.3s;

  ${(props) =>
    props.$isShowAdminSidebar &&
    css`
      margin-left: 250px;
      width: calc(100% - 250px);
    `}
`
