import React, {useState, useEffect, MouseEvent} from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {IconType} from 'react-icons'
import {FaGhost} from 'react-icons/fa'
import {VscChevronDown, VscChevronUp} from 'react-icons/vsc'
import {Navigate, NavLink} from 'react-router-dom'
import {runInAction} from 'mobx'
import {useRootStore} from '../infra/mobx'
import {ITag, IDropdownItems, Tags} from '../utils/MenuTags'
/* Styles */
type IMenu = {
  open: boolean
  hover: boolean
}
type IDropDown = {
  active?: boolean
}
interface IListWrap {
  open: boolean
  isDropDown?: boolean
  tagActive?: boolean
}
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
    /* display: ${({open}) => (open ? 'block' : 'none')}; */
    opacity: ${({open}) => (open ? '1' : '0')};
    padding: 12px 18px;
    transition: all 0.5s cubic-bezier(0, 1, 0, 1);
    align-items: center;
    position: relative;
    border-radius: 0.25rem;
    color: ${({theme}: any) =>
      theme.sideBar.tittleTag || 'rgba(26, 51, 83, 0.6)'};
    font-size: 0.75rem;
    font-weight: bold;
    font-family: Roboto, sans-serif;
    text-transform: uppercase;
  }
`

const OpenedStyled = styled.ul<IDropDown>`
  position: relative;
  opacity: ${({active}) => (active ? '1' : '0')};
  display: ${({active}) => (active ? 'block' : 'none')};
  /* max-height: ${({active}) => (active ? '500px' : '0')}; */
  transition: max-height 0.5s, opacity 1s;
  transition: padding 300ms;
  padding: 0.5em 0 0 2rem;
  :before {
    content: '';
    height: 100%;
    opacity: 1;
    width: 3px;
    background: rgb(202 240 248 / 0.4);
    position: absolute;
    left: 20px;
    top: 0;
    border-radius: 15px;
  }
  li {
    display: flex;
    align-items: center;
    /* white-space: nowrap; */
    padding: 8px 20px 8px 20px;
    :hover {
      border-radius: 0.25rem;
      a {
        font-weight: 500;
        color: ${({theme}: any) => theme.sideBar.menuTag.activeText};
      }
    }
    margin-top: 2px;
    svg {
      margin-right: 20px;
    }
  }
  a {
    color: ${({theme}: any) => theme.sideBar.menuTag.text};
    letter-spacing: 0.7px;
    font-family: Roboto;
    text-transform: capitalize;
    font-weight: 500;
  }
  & .icon-li-drop {
    margin-right: 10px;
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
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  &:hover ${ClosedStyled} {
    display: block;
  }
  .tag-wrapper {
    display: flex;
    height: 48px;
    width: 100%;
    //transition: all 0.5s cubic-bezier(0, 1, 0, 1);
    align-items: center;
    justify-content: ${({open}) => (open ? 'flex-start' : 'center')};
    position: relative;
    padding: 0 ${({open}) => (open ? '24px' : '0')};
    .svg-main {
      width: 24px;
      height: 24px;
      fill: ${({active, theme}: any) =>
        active ? theme.sideBar.menuTag.activeText : theme.sideBar.menuTag.text};
      margin-right: ${({open}) => (open ? '24px' : '0')};
    }
    .tag-name {
      display: ${({open}) => (open ? 'space-between' : 'none')};
      color: ${({active, theme}: any) =>
        active ? theme.sideBar.menuTag.activeText : theme.sideBar.menuTag.text};
      line-height: 1.8rem;
      letter-spacing: 0.7px;
      font-family: Roboto;
      text-transform: capitalize;
      font-weight: 400;
    }
    .svg-arrow {
      position: absolute;
      left: 240px;
      color: ${({active, theme}: any) =>
        active ? theme.sideBar.menuTag.activeText : theme.sideBar.menuTag.text};
    }
    :hover {
      background: ${({open, theme}: any) => (open ? '#e7e7e7' : '')};
      .menu_txt {
        svg {
          fill: ${({theme}: any) => theme.sideBar.menuTag.activeText};
          stroke: ${({theme}: any) => theme.sideBar.menuTag.activeText};
          transition: all 0.3s ease;
        }
        span {
          color: ${({theme}: any) => theme.sideBar.menuTag.activeText};
        }
      }
    }
    .menu_txt {
      display: flex;
      align-items: center;
      span {
        color: ${({active, theme}: any) =>
          active
            ? theme.sideBar.menuTag.activeText
            : theme.sideBar.menuTag.text};
        margin-bottom: -2px;
      }
      svg {
        fill: ${({active, theme}: any) =>
          active
            ? theme.sideBar.menuTag.activeText
            : theme.sideBar.menuTag.text};
        margin-right: ${({open}) => (open ? '10px' : '0')};
        transition: all 0.5s cubic-bezier(0, 1, 0, 1);
      }
    }
    & .icon-li {
      margin-right: 10px;
    }
    & .down-up_svg,
    .li-name {
      display: ${({open}) => (open ? 'space-between' : 'none')};
      color: ${({active, theme}: any) =>
        active ? theme.sideBar.menuTag.activeText : theme.sideBar.menuTag.text};
      letter-spacing: 0.7px;
      font-family: Roboto;
      text-transform: capitalize;
      font-weight: 500;
    }
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
    <>
      {isOpen === true ? (
        <OpenedStyled active={active}>
          {dropItems.map((item) => (
            <li className="li-open" key={JSON.stringify(item.Name)}>
              <a href="#/">{item.Name}</a>
            </li>
          ))}
        </OpenedStyled>
      ) : (
        <ClosedStyled>
          {dropItems.map((item) => (
            <li className="li-closed" key={JSON.stringify(item.Name)}>
              <FaGhost size={18} />
              <a href="#/">{item.Name}</a>
            </li>
          ))}
        </ClosedStyled>
      )}
    </>
  )
})
const TagList: React.FC<ITagList> = observer(({tag, clickHandler, open}) => {
  return (
    <ListItem
      open={open}
      isDropDown={!!tag.DropdownItems}
      active={tag.Active}
      onClick={tag.Active !== undefined ? clickHandler(tag) : undefined}
    >
      {open === true ? (
        <NavLink className="tag-wrapper" to={tag.Link}>
          <tag.Icon className="svg-main" size={22} />
          <span className="tag-name">{tag.Name}</span>
          {tag.DropdownItems ? (
            <span className="svg-arrow">
              {tag.Active === true ? (
                <VscChevronDown />
              ) : (
                <VscChevronDown style={{transform: 'rotate(280deg)'}} />
              )}
            </span>
          ) : (
            ''
          )}
        </NavLink>
      ) : (
        <NavLink className="tag-wrapper" to={tag.Link}>
          <tag.Icon className="svg-main" size={24} />
          <span className="li-name">{tag.Name}</span>
        </NavLink>
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
        Active: false,
      })),
    )
  }, [layoutStore.sideBar, layoutStore.onHoverSideState])

  const clickHandler: ClickHandler = (tag) => (e) => {
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
