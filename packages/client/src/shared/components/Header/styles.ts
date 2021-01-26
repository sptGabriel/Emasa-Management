import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Container } from "../FlexBox"
import { NoSelect } from "../NoSelect"

export const NavBar = styled('div')`
  display: flex;
  width: 100%;
  height: 70px;
  background: ${({theme}: any) => `rgb(${theme.header.background})`};
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.13);
  z-index: 3;
  ${NoSelect}
`
export const LogoHeader = styled(Container)<{open: boolean}>`
  width: ${({open}) => (open ? '260px' : '70px')};
  height: 70px;
  margin-bottom: 20px !important;
  .hamburger-react {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100vh;
    position: relative;
    padding: 0;
    width: 35px !important;
    height: 35px !important;
    color: ${({theme}: any) => `rgb(${theme.header.tools})`};
    margin-right: ${({open}) => (open ? '16px' : '0')};
    ${({open}) =>
      open
        ? css`
            transform: translateX(-10px) !important;
          `
        : ''};
    :hover {
      color: ${({theme}: any) => `rgb(${theme.header.toolsHover})`};
    }
    :active {
      background: ${({theme}: any) => `rgb(${theme.backgroundSecondary})`};
    }
    & > div {
      left: calc(50% - 9.5px) !important;
      right: 0;
    }
    div:nth-of-type(1) {
      top: calc(50% - 6px) !important;
    }
    div:nth-of-type(2) {
      top: calc(50% - 1px) !important;
    }
    div:nth-of-type(3) {
      top: calc(50% + 4px) !important;
    }
  }
  ${({open}) =>
    open
      ? css`
          padding: 0 24px 0 24px;
        `
      : ''}
  background: ${({theme}: any) => theme.background};
`
export const WrapperTools = styled(Container)<{open: boolean}>`
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: ${({open}) => (open ? 'calc(100% - 260px)' : 'calc(100% - 70px)')};
`