import styled from "@emotion/styled"

export const ImageChangeWrap = styled('div')<{open: boolean}>`
  display: ${({open}) => (open ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  max-width: 700px;
  width: 100%;
  border-radius: 8px;
  max-height: 600px;
  background: ${({theme}: any) => `rgb(${theme.background})`};
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  z-index: 999;
  line-height: 1.2;
  .close {
    color: ${({theme}: any) => `rgb(${theme.primary})`};
    position: absolute;
    top: 12px;
    right: 16px;
    cursor: pointer;
  }
`
export const Header = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
  height: 60px;
  border-bottom: 1px solid ${({theme}: any) => `rgb(${theme.primary})`};
  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({theme}: any) => `rgb(${theme.primary})`};
  }
`
export const Body = styled('div')`
  padding: 20px 60px;
`