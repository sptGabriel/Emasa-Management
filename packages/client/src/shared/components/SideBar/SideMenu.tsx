import React, {useState, useEffect, MouseEvent, memo, useCallback} from 'react'
import {IconType} from 'react-icons'
import {observer} from 'mobx-react-lite'
import {NavLink} from 'react-router-dom'
import {FaAngleDown} from 'react-icons/fa'
import {useSpring} from 'react-spring'
import {ITag, IDropdownItems, Tags} from '../../utils/MenuTags'
import {useHeight} from '../../utils/useHeight'
import { ListItem, MenuList, DropDown } from './styles'

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
const TagList: React.FC<ITagList> = ({tag, open, setTags}) => {
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
}
//  memoizedTags
const MemoizedTags = memo(TagList)
//  Menu
const MenuTags: React.FC<{hover: boolean; open: boolean}> = ({hover, open}) => {
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
    <MenuList open={open} hover={hover}>
      {tags.map((item) => (
        <div key={JSON.stringify(item.Name)}>
          {item.Title ? <div className="title_tagList">{item.Title}</div> : ''}
          <MemoizedTags setTags={setTags} open={open} tag={item} />
        </div>
      ))}
    </MenuList>
  )
}

export default MenuTags
