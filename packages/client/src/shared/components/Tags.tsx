import React, {useState, useEffect, MouseEvent} from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {IconType} from 'react-icons'
import {VscChevronDown} from 'react-icons/vsc'
import {NavLink} from 'react-router-dom'
import {GiSelect} from 'react-icons/gi'
import {useRootStore} from '../infra/mobx'
import {ITag, IDropdownItems, Tags} from '../utils/MenuTags'
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
  }
`

const OpenedStyled = styled.ul<IDropDown>`
  position: relative;
  display: ${({open}) => (open ? 'flex' : 'none')};
  flex-direction: column;
  opacity: ${({active}) => (active ? '1' : '0')};
  max-height: ${({active}) => (active ? 'none' : '0')};
  transition: max-height 0.5s, opacity 1s;
  transition: padding 300ms;
  .dropdown-wrap {
    &:hover {
      .svg-drop,
      .tag-optname {
        transform: translateX(5px);
      }
    }
  }
  .dropdown-tag {
    display: flex;
    align-items: center;
    color: #000;
    -webkit-transition: none;
    border-radius: 4px;
    padding: 10px 15px 10px 20px;
  }
  .tag-optname {
    display: block
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
    width: 10.5px;
    height: 10.5px;
    fill: ${({theme}: any) => theme.sideBar.menuTag.text};
    margin-right: 20px;
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
  }
  .active {
    background: rgba(0, 0, 0, 0.1);
  }
  .svg-arrow {
    position: absolute;
    left: 220px;
    color: ${({theme}: any) => theme.sideBar.menuTag.text};
  }
  .tag-name {
    display: ${({open}) => (open ? 'space-between' : 'none')};
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
  .svg-main {
    width: 24px;
    height: 24px;
    fill: ${({theme}: any) => theme.sideBar.menuTag.text};
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
  return (
    <OpenedStyled active={active} open={isOpen}>
      {dropItems.map((item) => (
        <li className="dropdown-wrap" key={JSON.stringify(item.Name)}>
          <NavLink
            to={item.Link}
            className="dropdown-tag"
            activeClassName="active-dropheader"
          >
            <GiSelect className="svg-drop" size={12} />
            <span className="tag-optname">{item.Name}</span>
          </NavLink>
        </li>
      ))}
    </OpenedStyled>
  )
})
const TagList: React.FC<ITagList> = observer(({tag, clickHandler, open}) => {
  const tagHandleClick = (e: any) => {
    console.log('enter on handler children')
    e.preventDefault()
    if (tag.Active !== undefined) clickHandler(tag)
  }
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
                <VscChevronDown />
              ) : (
                <VscChevronDown style={{transform: 'rotate(280deg)'}} />
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
  const [tags, setTags] = useState<ITag[]>(
    Tags.map((tag) => {
      return {
        ...tag,
        Active: tag.Name === 'Dashboard' ? true : false,
      }
    }),
  )
  const showHideDropItem: ShowHideDropItem = (tag) => {
    setTags((items) =>
      items.map((item) => ({
        ...item,
        Active: item.Name === tag.Name ? tag.Active !== true : false,
      })),
    )
  }
  //  useEffect(() => {
  //  setTags((items) =>
  //    items.map((item) => ({
  //      ...item,
  //      Active: false,
  //    })),
  //  )
  //  }, [])

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
