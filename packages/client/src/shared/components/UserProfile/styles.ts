import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const UserProfileContainer = styled('div')<{open: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
  position: relative;
  :hover {
    .svg-arrow,
    .user_text > span:first-of-type {
      filter: brightness(1.2);
    }
  }
  & .svg-arrow {
    color: ${({theme}: any) => `rgb(${theme.header.tools})`} !important;
    ${({open}) =>
      open
        ? css`
            transform: rotate(180deg);
          `
        : ''}
  }
  & .user_text {
    cursor: pointer;
    display: flex !important;
    flex-direction: column;
    padding-left: 0.75rem !important;
    span:first-of-type {
      font-size: 0.8rem;
      color: ${({theme}: any) =>
        `rgb(${theme.header.userSection.userName})`} !important;
      letter-spacing: 0.7px;
      font-family: Roboto;
      text-transform: capitalize;
      font-weight: 500;
    }
    span:last-of-type {
      font-size: 0.8rem;
      color: ${({theme}: any) =>
        `rgb(${theme.header.userSection.userPosition})`} !important;
      letter-spacing: 0.7px;
      font-family: Roboto;
      text-transform: capitalize;
      font-weight: 500;
      white-space: nowrap;
    }
  }
  & .user_avatar {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    transition: border-color 0.2s;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
export const UserCanvas = styled('div')<{open: boolean; orientation?: string}>`
  position: absolute;
  width: 100%;
  display: ${({open}) => (open ? 'flex' : 'none')};
  flex-direction: column;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.24);
  transform: ${({orientation}) =>
    orientation === 'vertical' ? 'translateY(104%)' : 'translateY(102%)'};
  bottom: 0;
  font-size: 1rem;
  background: ${({theme}: any) =>
    `rgb(${theme.header.userSection.bg})`} !important;
  z-index: 999;
  padding: 0.5rem 0.3rem;
  border-radius: 0.3rem;
  .header_txt {
    padding: 0.5rem 1rem;
    white-space: nowrap;
    color: ${({theme}: any) =>
      `rgb(${theme.header.userSection.text})`} !important;
    font-size: 0.625rem;
    text-transform: uppercase;
    font-weight: bold;
    font-family: Open Sans, sans-serif;
  }
  button {
    display: flex;
    padding: 0.5rem 1rem;
    align-items: center;
    color: ${({theme}: any) =>
      `rgb(${theme.header.userSection.text})`} !important;
    :hover {
      background: ${({theme}: any) =>
        `rgb(${theme.header.userSection.activeBg})`} !important;
      color: ${({theme}: any) =>
        `rgb(${theme.header.userSection.activeText})`} !important;
    }
  }
  svg {
    margin-right: 1rem;
    font-size: 1rem;
    vertical-align: -17%;
  }
  .dropdown-divider {
    height: 0;
    margin: 0.5rem 0;
    overflow: hidden;
    border-top: 1px solid #f0f0f0;
  }
`
