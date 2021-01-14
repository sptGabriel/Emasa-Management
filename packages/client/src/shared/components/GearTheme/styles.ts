import styled from "@emotion/styled"
import { animated } from "react-spring"

export const GearWrap = styled(animated.div)`
  position: fixed;
  top: calc(50% - 42px);
  right: 0;
  left: auto;
  z-index: 99;
`
export const GearButton = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: ${({theme}: any) =>
    `linear-gradient(to right, rgb(${theme.primary}), rgb(${theme.primary}))`};
  cursor: pointer;
  margin: 0;
  box-shadow: -4px 0 8px rgba(255, 182, 77, 0.16), -6px 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px 0 0 30px;
  border: 0 none;
  svg {
    color: #fff !important;
    fill: #fff;
  }
`