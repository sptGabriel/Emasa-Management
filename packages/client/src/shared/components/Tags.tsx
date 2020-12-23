import React, {useState, useEffect, MouseEvent} from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {IconType} from 'react-icons'
import {VscChevronDown} from 'react-icons/vsc'
import {NavLink} from 'react-router-dom'
import {GiSelect} from 'react-icons/gi'
import {FaAngleDown} from 'react-icons/fa'
import {animated, config, useSpring} from 'react-spring'
import {useRootStore} from '../infra/mobx'
import {ITag, IDropdownItems, Tags} from '../utils/MenuTags'
import {useHeight} from '../utils/useHeight'
/* Styles */
type IMenu = {
  open: boolean
  hover: boolean
}
type IDropDown = {
  active?: boolean
  open: boolean
}
//  interface IListWrap {
//  open: boolean
//  isDropDown?: boolean
//  tagActive?: boolean
//  }
interface IListItem {
  open: boolean
  isDropDown?: boolean
  active?: boolean
}
const MenuList = styled.ul<IMenu>`
  color: transparent;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  transition: 0.2s;
  transition-timing-function: ease;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  scrollbar-color: auto;
  scrollbar-width: thin;
  padding: 0 15px;
  &::-webkit-scrollbar {
    width: ${({open}) => (open ? '6px' : '0')};
    height: ${({open}) => (open ? '18px ' : '0')};
  }
  &::-webkit-scrollbar-thumb:vertical {
    height: 6px;
    //border: 4px solid ${({theme}: any) => theme.background};
    background-clip: padding-box;
    background: transparent;
    background: ${({hover, theme, open}: any) =>
      open && hover ? '#ddd' : theme.background};
    border-radius: 100vh;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  &::-webkit-scrollbar-corner {
    background-color: red;
  }
  &::-webkit-scrollbar-track {
    background-clip: content-box;
    margin-top: 10px;
    margin-bottom: 10px;
    /* margin-bottom: 40vh; */
  }
  .title_tagList {
    display: ${({open}) => (open ? 'block' : 'none')};
    opacity: ${({open}) => (open ? '1' : '0')};
    padding: 12px 18px;
    transition: all 0.5s cubic-bezier(0, 1, 0, 1);
    align-items: center;
    position: relative;
    border-radius: 0.25rem;
    color: ${({theme}: any) =>
      theme.sideBar.tittleTag || 'rgba(26, 51, 83, 0.6)'};
    font-size: 0.9rem;
    font-weight: 500;
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    color: #999;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }
`

const OpenedStyled = styled(animated.ul)<IDropDown>`
  position: relative;
  /* display: ${({open}) => (open ? 'flex' : 'none')}; */
  flex-direction: column;
  /* opacity: ${({active}) => (active ? '1' : '0')};
  max-height: ${({active}) => (active ? 'none' : '0')}; */
  transition: max-height 0.5s, opacity 1s;
  transition: padding 300ms;
  padding: 0.5em 0 0 2rem;
  .dropdown-wrap {
    &:hover {
      .svg-drop,
      .tag-optname {
        transform: translateX(5px);
      }
    }
  }
  :before {
    content: '';
    height: 100%;
    opacity: 1;
    width: 3px;
    background: #f6f6f6;
    position: absolute;
    left: 20px;
    top: 0;
    border-radius: 15px;
  }
  .dropdown-tag {
    display: flex;
    align-items: center;
    color: #000;
    -webkit-transition: none;
    border-radius: 4px;
    padding: 5px 0;
  }
  .tag-optname {
    display: block;
    color: ${({theme}: any) => theme.sideBar.menuTag.text};
    line-height: 1.8rem;
    letter-spacing: 0.7px;
    font-family: Roboto;
    text-transform: capitalize;
    font-weight: 400;
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
  }
  .svg-drop {
    width: 12px;
    height: 12px;
    stroke: #565656;
    margin-right: 15px;
    margin-left: 10px;
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
  }
`

const ClosedStyled = styled('ul')`
  display: none;
  max-height: 400px !important;
  max-width: 400px !important;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -ms-transition: all 0.2s;
  -o-transition: all 0.2s;
  transition: all 0.2s;
  list-style-type: none;
  margin: 0;
  padding: 0;
  top: 0;
  left: 100%;
  font-weight: 400;
  position: relative;
  padding: 0px;
  z-index: 2;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #fff;
  & .li-closed {
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 10px 20px;
    svg {
      margin-right: 10px;
    }
  }
  a {
    font-family: 'Ubuntu';
    font-size: 14px;
    font-weight: 300;
    text-decoration: none;
    color: #949e98;
  }
`

const ListItem = styled.li<IListItem>`
  display: block;
  position: relative;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  :focus {
    outline: none; /* no outline - for most browsers */
    box-shadow: none; /* no box shadow - for some browsers or if you are using Bootstrap */
  }
  &:hover {
    .svg-main,
    .tag-name {
      transform: translateX(5px);
    }
  }
  &:hover ${ClosedStyled} {
    display: block;
  }
  .tag-container {
    width: 100%;
  }
  .active-dropheader {
    background: rgba(0, 0, 0, 0.1);
    .tag-optname {
      color: #838598 !important;
      font-weight: 500;
    }
    .svg-drop {
      stroke-width: 3px;
      stroke: #838598 !important;
    }
  }
  .active {
    background: rgba(0, 0, 0, 0.1);
  }
  .svg-arrow {
    position: absolute;
    top: calc(50% - 8px);
    left: 220px;
    color: ${({theme, active}: any) =>
      active ? '#0079db' : theme.sideBar.menuTag.text};
  }
  .tag-name {
    display: ${({open}) => (open ? 'space-between' : 'none')};
    color: ${({theme, active}: any) =>
      active ? '#0079db' : theme.sideBar.menuTag.text};
    line-height: 1.8rem;
    letter-spacing: 0.7px;
    font-family: Roboto;
    text-transform: capitalize;
    font-weight: ${({active}) => (active ? '500' : '400')};
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
  }
  .svg-main {
    width: 24px;
    height: 24px;
    fill: ${({theme, active}: any) =>
      active ? '#0079db' : theme.sideBar.menuTag.text};
    margin-right: ${({open}) => (open ? '14px' : '0')};
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
  }
  .tag-wrapper {
    display: flex;
    height: 48px;
    width: 100%;
    border-radius: 4px;
    padding: ${({open}) => (open ? '10px 14px' : '0')};
    align-items: center;
    background: ${({active, isDropDown}) =>
      active && isDropDown ? '#f6f6f6' : ''};
    justify-content: ${({open}) => (open ? 'flex-start' : 'center')};
    position: relative;
  }
`

/* Styles */
export type TSideBar = {
  open: boolean
}
type ClickHandler = (tag: ITag) => (e: MouseEvent) => void
type ShowHideDropItem = (tag: ITag) => void
interface IDrop {
  active?: boolean
  isOpen: boolean
  dropItems: IDropdownItems[]
  setVisible: ClickHandler
  Icon: IconType
}
interface ITagList {
  clickHandler: ClickHandler
  tag: ITag
  open: boolean
}

const Drop: React.FC<IDrop> = observer(({active, dropItems, isOpen}) => {
  const [heightRef] = useHeight()
  const slideInStyles = useSpring({
    config: {duration: 600},
    from: {opacity: 0, maxHeight: 0},
    to: {
      opacity: active ? 1 : 0,
      maxHeight: active ? 500 : 0,
    },
  })

  return (
    <OpenedStyled
      active={active}
      open={isOpen}
      ref={heightRef}
      style={{...(slideInStyles as any), overflow: 'hidden'}}
    >
      {dropItems.map((item) => (
        <li className="dropdown-wrap" key={JSON.stringify(item.Name)}>
          <NavLink
            to={item.Link}
            className="dropdown-tag"
            activeClassName="active-dropheader"
            end
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="transpa"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="svg-drop"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>

            <span className="tag-optname">{item.Name}</span>
          </NavLink>
        </li>
      ))}
    </OpenedStyled>
  )
})
const TagList: React.FC<ITagList> = observer(({tag, clickHandler, open}) => {
  return (
    <ListItem open={open} isDropDown={!!tag.DropdownItems} active={tag.Active}>
      {tag.Link ? (
        <div
          className="tag-container"
          role="presentation"
          onClick={tag.Active !== undefined ? clickHandler(tag) : undefined}
        >
          <NavLink
            className="tag-wrapper"
            activeClassName="active"
            to={tag.Link}
            end
          >
            <tag.Icon className="svg-main" size={22} />
            <span className="tag-name">{tag.Name}</span>
          </NavLink>
        </div>
      ) : (
        <div
          className="tag-container"
          role="presentation"
          onClick={tag.Active !== undefined ? clickHandler(tag) : undefined}
        >
          <div className="tag-wrapper">
            <tag.Icon className="svg-main" size={22} />
            <span className="tag-name">{tag.Name}</span>
            <span className="svg-arrow">
              {tag.Active === true ? (
                <FaAngleDown />
              ) : (
                <FaAngleDown style={{transform: 'rotate(280deg)'}} />
              )}
            </span>
          </div>
        </div>
      )}
      {tag.DropdownItems ? (
        <Drop
          active={tag.Active}
          dropItems={tag.DropdownItems}
          Icon={tag.Icon}
          isOpen={open}
          setVisible={clickHandler}
        />
      ) : (
        ''
      )}
    </ListItem>
  )
})
const MenuTags: React.FC<{hover: boolean}> = observer(({hover}) => {
  const {layoutStore} = useRootStore()
  const [tags, setTags] = useState<ITag[]>(Tags)
  const showHideDropItem: ShowHideDropItem = (tag) => {
    setTags((items) =>
      items.map((item) => ({
        ...item,
        Active: item.Name === tag.Name ? tag.Active !== true : false,
      })),
    )
  }
  useEffect(() => {
    setTags((items) =>
      items.map((item) => ({
        ...item,
        Active: item.Name === 'Dashboard' ? true : false,
      })),
    )
  }, [])

  const clickHandler: ClickHandler = (tag) => (e) => {
    console.log('a')
    e.preventDefault()
    showHideDropItem(tag)
  }

  return (
    <MenuList
      open={layoutStore.sideBar || layoutStore.onHoverSideState}
      hover={hover}
    >
      {tags.map((item) => (
        <div key={JSON.stringify(item.Name)}>
          {item.Title ? <div className="title_tagList">{item.Title}</div> : ''}
          <TagList
            open={layoutStore.sideBar || layoutStore.onHoverSideState}
            tag={item}
            clickHandler={clickHandler}
          />
        </div>
      ))}
    </MenuList>
  )
})

export default MenuTags
