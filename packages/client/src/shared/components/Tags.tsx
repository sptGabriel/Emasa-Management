import React, {useState, useEffect, MouseEvent} from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {IconType} from 'react-icons'
import {NavLink} from 'react-router-dom'
import {FaAngleDown} from 'react-icons/fa'
import {animated, useSpring} from 'react-spring'
import {useRootStore} from '../infra/mobx'
import {ITag, IDropdownItems, Tags} from '../utils/MenuTags'
import {useHeight} from '../utils/useHeight'
/* Styles */
type IMenu = {
  open: boolean
  hover: boolean
}
type IDropDown = {
  activetag: any
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
  activetag: any
}
const MenuList = styled.ul<IMenu>`
  color: transparent;
  height: 100%;
  width: 100%;
  .title_tagList {
    display: ${({open}) => (open ? 'block' : 'none')};
    opacity: ${({open}) => (open ? '1' : '0')};
    padding: 12px 18px;
    transition: all 0.5s cubic-bezier(0, 1, 0, 1);
    align-items: center;
    position: relative;
    border-radius: 0.25rem;
    color: rgba(26, 51, 83, 0.6);
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
  flex-direction: column;
  padding: ${({activetag, open}) =>
    activetag && open ? '0.8rem 3px 3px 2.5rem !important' : '0'};
  .dropdown-wrap {
    &:hover {
      .svg-drop,
      .tag-optname {
        transform: translateX(5px);
      }
    }
  }
  :after {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    width: 1px;
    height: calc(100% - 1.20625rem - 2.94px);
    background: rgba(185, 199, 212, 0.5);
  }
  .dropdown-tag {
    display: flex;
    align-items: center;
    -webkit-transition: none;
    border-radius: 4px;
    padding: 5px 0;
    ::after {
      content: '';
      position: absolute;
      transform: translateY(-50%);
      left: 21px;
      width: 19px;
      height: 1px;
      background: rgba(185, 199, 212, 0.5);
    }
  }
  .tag-optname {
    display: block;
    color: ${({theme}: any) => theme.text};
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
    width: 10px;
    height: 10px;
    stroke: #565656;
    margin-right: 18px;
    margin-left: 10px;
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
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
  .tag-container {
    width: 100%;
  }
  .active-dropheader {
    background: ${({theme}: any) =>
      `linear-gradient(118deg,rgba(${theme.primary},1),rgba(${theme.primary},0.7))`};
    box-shadow: ${({theme}: any) => `0 0 3px 1px rgba(${theme.primary},0.7)`};
    .tag-optname {
      color: #fff !important;
    }
    .svg-drop {
      stroke-width: 3px;
      stroke: #fff !important;
    }
  }
  .active {
    background: rgba(0, 0, 0, 0.1);
  }
  .svg-arrow {
    position: absolute;
    top: calc(50% - 8px);
    left: 220px;
    color: ${({theme, activetag}: any) => theme.subText};
  }
  .tag-name {
    display: ${({open}) => (open ? 'space-between' : 'none')};
    color: ${({theme, activetag}: any) => theme.text};
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
    fill: ${({theme, activetag}: any) => theme.subText};
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
    padding: ${({open}) => (open ? '10px 9px' : '0')};
    align-items: center;
    background: ${({theme, activetag}: any) =>
      activetag ? `rgba(${theme.backgroundSecondary}, 0.9)` : theme.background};
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
  const openedStyle = useSpring({
    config: {duration: active && isOpen ? 600 : 10},
    from: {padding: 0, overflow: 'hidden', opacity: 0, maxHeight: 0},
    to: {
      opacity: active && isOpen ? 1 : 0,
      maxHeight: active && isOpen ? 500 : 0,
      overflow: active && isOpen ? 'visible' : 'hidden',
    },
  })

  return (
    <OpenedStyled
      activetag={active ? 1 : 0}
      open={isOpen}
      ref={heightRef}
      style={{...(openedStyle as any), overflow: 'hidden', padding: '0'}}
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
    <ListItem
      open={open}
      isDropDown={!!tag.DropdownItems}
      activetag={tag.Active ? 1 : 0}
    >
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
