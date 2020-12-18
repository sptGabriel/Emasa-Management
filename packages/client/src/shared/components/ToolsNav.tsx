import React, {useState} from 'react'
import {css, keyframes} from '@emotion/react'
import styled from '@emotion/styled/macro'
import useOnClickOutside from 'use-onclickoutside'
import {observer} from 'mobx-react-lite'
import {BiChevronDown, BiMoon} from 'react-icons/bi'
import {FiBell, FiSun} from 'react-icons/fi'
import {IoIosSettings} from 'react-icons/io'
import {CgLogOff, CgProfile} from 'react-icons/cg'
import {AiOutlineCompress} from 'react-icons/ai'
import {Container} from './FlexBox'
import userAvatar from '../../assets/user.png'
import VerticalSplit from './Divider'
import Search from './SearchBox'
import {useRootStore} from '../infra/mobx'

const bellAnimation = keyframes`
  0% {
    transform: scaleX(1);
  }
  10% {
    transform: scale3d(.9,.9,.9) rotate(-3deg);
  }
  20% {
    transform: scale3d(.9,.9,.9) rotate(-3deg);
  }
  30% {
    transform: scale3d(1.1,1.1,1.1) rotate(3deg);
  }
  50% {
    transform: scale3d(1.1,1.1,1.1) rotate(3deg);
  }
  70% {
    transform: scale3d(1.1,1.1,1.1) rotate(3deg);
  }
  90% {
    transform: scale3d(1.1,1.1,1.1) rotate(3deg);
  }
  40% {
    transform: scale3d(1.1,1.1,1.1) rotate(-3deg);
  }
  60% {
    transform: scale3d(1.1,1.1,1.1) rotate(-3deg);
  }
  80% {
    transform: scale3d(1.1,1.1,1.1) rotate(-3deg);
  }
  100% {
    transform: scaleX(1);
  }
`
/* SideBar Styles Start */
export interface SideBarState {
  open: boolean
}
/* InterFaces Start */
interface IUserCanvas {
  open: boolean
}
interface IUserProfile {
  open: boolean
}
/* User Profile Styles Section */
const UserProfile = styled('div')<IUserProfile>`
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
    color: ${({theme}: any) => theme.sideBar.menuTag.activeText};
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
      color: ${({theme}: any) => theme.sideBar.menuTag.activeText};
      letter-spacing: 0.7px;
      font-family: Roboto;
      text-transform: capitalize;
      font-weight: 500;
    }
    span:last-of-type {
      font-size: 0.8rem;
      color: #838598 !important;
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
  border: 1px solid
    ${({theme}: any) => (theme.type === 'dark' ? '#2e2b3f' : '#f0f0f0')};
  ${({theme}: any) =>
    theme.type === 'light'
      ? css`
          box-shadow: 0 0 20px rgba(89, 102, 122, 0.1);
        `
      : ''};
  transform: translateY(104%);
  bottom: 0;
  font-size: 1rem;
  color: #fff;
  background: ${({theme}: any) => (theme.type === 'dark' ? '#232033' : '#fff')};
  padding: 0.5rem 0;
  border-radius: 0.3rem;
  .header_txt {
    padding: 0.5rem 1rem;
    white-space: nowrap;
    color: ${({theme}: any) => (theme.type === 'dark' ? '#fff' : '#2c323f')};
    font-size: 0.625rem;
    text-transform: uppercase;
    font-weight: bold;
    font-family: Open Sans, sans-serif;
  }
  button {
    display: flex;
    padding: 0.5rem 1rem;
    align-items: center;
    color: ${({theme}: any) => theme.sideBar.menuTag.text};
    :hover {
      background: ${({theme}: any) =>
        theme.type === 'dark' ? '#2e2b3f' : '#f0f0f0'};
      color: ${({theme}: any) => theme.sideBar.menuTag.activeText};
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
    border-top: 1px solid
      ${({theme}: any) => (theme.type === 'dark' ? '#2e2b3f' : '#f0f0f0')};
  }
`
const WrapperTools = styled(Container)<SideBarState>`
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  display: flex;
  margin-left: auto;
  position: relative;
  & .bell {
    animation: ${bellAnimation} 1.5s ease infinite;
  }
  & .tool_widget {
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    transition: background 0.2s ease 0s;
    cursor: pointer;
    list-style: none;
    width: 46px;
    height: 46px;
    color: ${({theme}: any) =>
      theme.type === 'dark' ? 'rgb(168, 168, 179)' : '#0079db'};
    :hover {
      background: ${({theme}: any) =>
        theme.type === 'dark' ? '#221F2E' : '#f0f0f0'};
      svg {
        filter: brightness(1.5);
      }
    }
  }
`
const ContentUserSection: React.FC<IUserCanvas> = observer(
  ({open}: IUserCanvas) => {
    const {authStore} = useRootStore()
    return (
      <UserCanvas open={open}>
        <div className="header_txt">Welcome !</div>
        <button type="button" className="dropdown-itemx">
          <CgProfile size={24} />
          <span>My Profile</span>
        </button>
        <button type="button" className="dropdown-itemx">
          <IoIosSettings size={24} />
          <span>Settings</span>
        </button>
        <div className="dropdown-divider" />
        <button
          type="button"
          className="dropdown-itemx"
          onClick={() => authStore.logout()}
        >
          <CgLogOff className="logout" size={24} />
          <span>Logout</span>
        </button>
      </UserCanvas>
    )
  },
)
const UserSection: React.FC = () => {
  const [open, setOpen] = useState(false)
  const ref = React.useRef(null)
  useOnClickOutside(ref, () => setOpen(false))
  return (
    <UserProfile ref={ref} onClick={() => setOpen(!open)} open={open}>
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
      <ContentUserSection open={open} />
    </UserProfile>
  )
}
const ToolsNav: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  return (
    <WrapperTools justify="space-between" open={layoutStore.sideBar}>
      <Search />
      <button
        className="tool_widget"
        onClick={layoutStore.toggleDarkMode}
        type="button"
      >
        {layoutStore.isDarkMode ? <BiMoon size={24} /> : <FiSun size={24} />}
      </button>
      <button className="tool_widget bell" type="button">
        <FiBell size={24} />
      </button>
      <button className="tool_widget" type="button">
        <AiOutlineCompress size={24} />
      </button>
      <VerticalSplit />
      <UserSection />
    </WrapperTools>
  )
})

export default ToolsNav
