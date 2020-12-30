import React, {useState, useEffect, MouseEvent, memo, useCallback} from 'react'
import {IconType} from 'react-icons'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
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

interface IListItem {
  open: boolean
  isDropDown?: boolean
  activetag: any
}
const MenuList = styled.ul<IMenu>`
  color: transparent;
  height: 100vh;
  width: inherit;
  padding-right: 11px;
  padding-left: 11px;
  overflow-y: scroll;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 11px;
  padding-right: 5px;
  transition: 0.2s;
  transition-timing-function: ease;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  scrollbar-color: auto;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: ${({open}) => (open ? '6px' : '0')};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:vertical {
    border-radius: 10px;
    background: ${({theme, hover, open}: any) =>
      hover && open ? `#9c9c9c` : `rgba(${theme.background})`};
    /* border-left: 6px solid ${({theme}: any) =>
      `rgba(${theme.background})`}; */
    /* border-right: 2px solid ${({theme}: any) => `rgba(${theme.background})`};
    background-clip: padding-box;
    background: ${({theme, hover, sideisOpen}: any) =>
      hover && sideisOpen ? `#9c9c9c` : `rgba(${theme.background})`};
    border-radius: 4px; */
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
  }
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

const DropDown = styled(animated.ul)<IDropDown>`
  position: relative;
  flex-direction: column;
  padding: ${({activetag, open}) =>
    activetag && open ? '0.8rem 4px 5px 2.5rem !important' : '0'};
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
    height: calc(100% - 1.20625rem - 4.34px);
    background: rgba(185, 199, 212, 0.5);
  }
  .dropdown-tag {
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 8px 0;
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
    letter-spacing: 0.7px;
    font-family: Roboto;
    font-size: 0.9rem;
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
  cursor: pointer;
  margin-bottom: 7px;
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
    border: none !important;
    z-index: 1;
  }
  .active-dropheader {
    background: ${({theme}: any) =>
      `linear-gradient(118deg,rgba(${theme.primary},1),rgba(${theme.primary},0.7))`};
    box-shadow: ${({theme}: any) => `0 0 5px 1px rgba(${theme.primary},0.7)`};
    .tag-optname {
      color: #fff !important;
    }
    .svg-drop {
      stroke-width: 3px;
      stroke: #fff !important;
    }
  }
  .active {
    background: ${({theme}: any) =>
      `linear-gradient(118deg,rgba(${theme.primary},1),rgba(${theme.primary},0.7))`} !important;
    box-shadow: ${({theme}: any) =>
      `0 0 5px 1px rgba(${theme.primary},0.7)`} !important;
    .tag-name {
      color: #fff !important;
    }
    .svg-main {
      fill: #fff !important;
    }
  }
  .svg-arrow {
    position: absolute;
    top: calc(50% - 8px);
    left: 200px;
    color: ${({theme}: any) => theme.subText};
  }
  .tag-name {
    display: ${({open}) => (open ? 'space-between' : 'none')};
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
  .svg-main {
    width: 24px;
    height: 24px;
    fill: ${({theme}: any) => theme.subText};
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
      activetag
        ? `rgba(${theme.backgroundSecondary}, 0.9)`
        : `rgb(${theme.background})`};
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
  tag: ITag
  open: boolean
  setTags: any
}
const DropDownItems: React.FC<IDrop> = observer(
  ({active, dropItems, isOpen}) => {
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
      <DropDown
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
      </DropDown>
    )
  },
)
//  tag navlink
const MemoidNavLink: React.FC<{
  Icon: IconType
  Link?: string
  Name: string
  OnClick: any
  HasChildren?: boolean
  Active?: boolean
}> = memo(({Icon, Link, Name, OnClick, HasChildren, Active}) => {
  return (
    <div className="tag-container" role="presentation" onClick={OnClick}>
      {!HasChildren && Link ? (
        <NavLink className="tag-wrapper" activeClassName="active" to={Link} end>
          <Icon className="svg-main" size={22} />
          <span className="tag-name">{Name}</span>
        </NavLink>
      ) : (
        <div className="tag-wrapper">
          <Icon className="svg-main" size={22} />
          <span className="tag-name">{Name}</span>
          <span className="svg-arrow">
            {Active === true ? (
              <FaAngleDown />
            ) : (
              <FaAngleDown style={{transform: 'rotate(280deg)'}} />
            )}
          </span>
        </div>
      )}
    </div>
  )
})
//  Tag Wrapper
const TagList: React.FC<ITagList> = observer(({tag, open, setTags}) => {
  const showHideDropItem: ShowHideDropItem = useCallback((tag) => {
    setTags((items: any) =>
      items.map((item: any) => ({
        ...item,
        Active: item.Name === tag.Name ? tag.Active !== true : false,
      })),
    )
  }, [])
  const clickHandler: ClickHandler = useCallback(
    (tag) => (e) => {
      e.preventDefault()
      showHideDropItem(tag)
    },
    [],
  )
  return (
    <ListItem
      open={open}
      isDropDown={!!tag.DropdownItems}
      activetag={tag.Active ? 1 : 0}
    >
      {tag.Link ? (
        <MemoidNavLink
          OnClick={tag.Active !== undefined ? clickHandler(tag) : undefined}
          Icon={tag.Icon}
          Link={tag.Link}
          Name={tag.Name}
        />
      ) : (
        <MemoidNavLink
          OnClick={tag.Active !== undefined ? clickHandler(tag) : undefined}
          Icon={tag.Icon}
          Name={tag.Name}
          Active={tag.Active}
          HasChildren={tag.DropdownItems ? true : undefined}
        />
      )}
      {tag.DropdownItems ? (
        <DropDownItems
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
//  memoizedTags
const MemoizedTags = memo(TagList)
//  Menu
const MenuTags: React.FC<{hover: boolean}> = observer(({hover}) => {
  const {layoutStore} = useRootStore()
  const [tags, setTags] = useState<ITag[]>(Tags)

  useEffect(() => {
    setTags((items) =>
      items.map((item) => ({
        ...item,
        Active: item.Name === 'Dashboard' ? true : false,
      })),
    )
  }, [])
  return (
    <MenuList
      open={layoutStore.sideBar || layoutStore.onHoverSideState}
      hover={hover}
    >
      {tags.map((item) => (
        <div key={JSON.stringify(item.Name)}>
          {item.Title ? <div className="title_tagList">{item.Title}</div> : ''}
          <MemoizedTags
            setTags={setTags}
            open={layoutStore.sideBar || layoutStore.onHoverSideState}
            tag={item}
          />
        </div>
      ))}
    </MenuList>
  )
})

export default MenuTags
