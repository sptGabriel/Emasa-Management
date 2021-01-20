import styled from '@emotion/styled'

export const Overlay = styled('div')<{isOn: boolean}>`
  visibility: ${({isOn}) => (isOn ? 'visible ' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({isOn}) => (isOn ? '0.5' : '0')};
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  transition: all 0.2s ease;
`
