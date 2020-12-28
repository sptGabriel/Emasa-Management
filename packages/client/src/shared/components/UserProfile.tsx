import React, {memo, useCallback, useRef, useState} from 'react'
import {css} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {BiChevronDown} from 'react-icons/bi'
import {CgLogOff, CgProfile} from 'react-icons/cg'
import {IoIosSettings} from 'react-icons/io'
import useOnClickOutside from 'use-onclickoutside'
import userAvatar from '../../assets/user.png'
import {useRootStore} from '../infra/mobx'

interface IUserProfile {
  open: boolean
}
interface IUserCanvas {
  open: boolean
}
/* User Profile Styles Section */
const UserProfileContainer = styled('div')<IUserProfile>`
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
    color: ${({theme}: any) => theme.text} !important;
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
      color: ${({theme}: any) => theme.textActive} !important;
      letter-spacing: 0.7px;
      font-family: Roboto;
      text-transform: capitalize;
      font-weight: 500;
    }
    span:last-of-type {
      font-size: 0.8rem;
      color: ${({theme}: any) => theme.text} !important;
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
const UserCanvas = styled.div<IUserCanvas>`
  position: absolute;
  width: 100%;
  display: ${({open}) => (open ? 'flex' : 'none')};
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.1);
  transform: translateY(104%);
  bottom: 0;
  font-size: 1rem;
  background: ${({theme}: any) => theme.background} !important;
  z-index: 999;
  padding: 0.5rem 0.2rem;
  border-radius: 0.3rem;
  .header_txt {
    padding: 0.5rem 1rem;
    white-space: nowrap;
    color: ${({theme}: any) => theme.text} !important;
    font-size: 0.625rem;
    text-transform: uppercase;
    font-weight: bold;
    font-family: Open Sans, sans-serif;
  }
  button {
    display: flex;
    padding: 0.5rem 1rem;
    align-items: center;
    color: ${({theme}: any) => theme.text} !important;
    :hover {
      background: ${({theme}: any) => `rgb(${theme.primary})`} !important;
      color: #fff !important;
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
const ContentUserSection: React.FC<IUserCanvas> = observer(({open}) => {
  const {authStore} = useRootStore()
  const onLogout = useCallback(() => authStore.logout(), [])
  return (
    <UserCanvas open={open}>
      <div className="header_txt">Welcome !</div>
      <button type="button" className="dropdown-itemx">
        <CgProfile size={18} />
        <span>My Profile</span>
      </button>
      <button type="button" className="dropdown-itemx">
        <IoIosSettings size={18} />
        <span>Settings</span>
      </button>
      <div className="dropdown-divider" />
      <button type="button" className="dropdown-itemx" onClick={onLogout}>
        <CgLogOff className="logout" size={18} />
        <span>Logout</span>
      </button>
    </UserCanvas>
  )
})
const MemoizedLogout = memo(ContentUserSection)
const UserProfile: React.FC = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))
  const clickHandler = useCallback(() => setOpen(!open), [])
  return (
    <UserProfileContainer ref={ref} onClick={clickHandler} open={open}>
      <div className="user_avatar">
        <img src={userAvatar} alt="Logo" />
      </div>
      <span className="svg-arrow">
        <BiChevronDown />
      </span>
      <div className="user_text">
        <span>SpiriT</span>
        <span>Web Developer</span>
      </div>
      <MemoizedLogout open={open} />
    </UserProfileContainer>
  )
}
export default memo(UserProfile)
