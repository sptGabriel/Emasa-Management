import React, {memo, useCallback, useRef, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {BiChevronDown} from 'react-icons/bi'
import {CgLogOff, CgProfile} from 'react-icons/cg'
import {IoIosSettings} from 'react-icons/io'
import useOnClickOutside from 'use-onclickoutside'
import {NavLink} from 'react-router-dom'
import userAvatar from '../../../assets/logo_emasa.png'
import {useRootStore} from '../../infra/mobx'
import {UserCanvas, UserProfileContainer} from './styles'
import {createBackgroundImage} from '../../utils/createCloudinaryBG'
/* User Profile Styles Section */
const ContentUserSection: React.FC<{open: boolean}> = observer(({open}) => {
  const {authStore, layoutStore} = useRootStore()
  const onLogout = useCallback(() => authStore.logout(), [])
  return (
    <UserCanvas open={open} orientation={layoutStore.layoutType}>
      <div className="header_txt">Welcome !</div>
      <button type="button" className="dropdown-itemx">
        <NavLink to="accounts/edit" end>
          <CgProfile size={18} />
          <span>My Profile</span>
        </NavLink>
      </button>
      <button type="button" className="dropdown-itemx">
        <NavLink to="accounts/" end>
          <IoIosSettings size={18} />
          <span>Settings</span>
        </NavLink>
      </button>
      <div className="dropdown-divider" />
      <button type="button" className="dropdown-itemx" onClick={onLogout}>
        <NavLink to=".." end>
          <CgLogOff className="logout" size={18} />
          <span>Logout</span>
        </NavLink>
      </button>
    </UserCanvas>
  )
})
const MemoizedLogout = memo(ContentUserSection)
const UserProfile: React.FC = observer(() => {
  const {currentUserStore} = useRootStore()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))
  const clickHandler = () => setOpen(!open)
  return (
    <UserProfileContainer ref={ref} onClick={clickHandler} open={open}>
      <div className="user_avatar">
        <img
          src={
            currentUserStore.currentUser?.avatar
              ? createBackgroundImage(currentUserStore.currentUser?.avatar)
              : userAvatar
          }
          alt="Logo"
        />
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
})
export default memo(UserProfile)
