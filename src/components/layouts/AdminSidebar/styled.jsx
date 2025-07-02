import styled from 'styled-components'

export const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.isShowSidebar ? '0' : '-250px')};
  width: 250px;
  background-color: #dfdfdf;
  padding: 16px 16px 16px 32px;
  height: 100%;
  flex-shrink: 0;
  transition: all 0.3s;
`
