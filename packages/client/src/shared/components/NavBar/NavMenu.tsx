import React, {
  useState,
  useEffect,
  MouseEvent,
  useCallback,
  useRef,
} from 'react'
import {IconType} from 'react-icons'
import {NavLink, useLocation} from 'react-router-dom'
import {FaAngleDown} from 'react-icons/fa'
import useOnClickOutside from 'use-onclickoutside'
import {ITag, IDropdownItems, TagHorizontal} from '../../utils/MenuTags'
import {Container} from '../FlexBox'
import {DropDown, Menu, NavItem, Ul} from './styles'

/* Styles */
type ClickHandler = (tag: ITag) => (e: MouseEvent) => void
type ShowHideDropItem = (tag: ITag) => void
interface IDrop {
  active?: boolean
  dropItems: IDropdownItems[]
  baseUrl: string
  // setVisible: ClickHandler
  Icon: IconType
}

const DropDownItems: React.FC<IDrop> = ({active, dropItems, baseUrl}) => {
  return (
    <DropDown activetag={active ? 1 : 0}>
      {dropItems.map((item) => (
        <li className="dropdown-wrap" key={JSON.stringify(item.Name)}>
          <NavLink
            to={`${baseUrl}/${item.Link}`}
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
}
//  Tag Wrapper
const NavTag: React.FC<{tag: ITag; setTags: any}> = ({tag, setTags}) => {
  const location = useLocation()
  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    if (tag.DropdownItems) {
      setTags((items: any) =>
        items.map((item: any) => ({
          ...item,
          Active: false,
        })),
      )
    }
  })
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
    <NavItem
      ref={tag.DropdownItems ? ref : undefined}
      onClick={tag.Active !== undefined ? clickHandler(tag) : undefined}
      isDropDown={!!tag.DropdownItems}
      activetag={tag.Active ? 1 : 0}
    >
      {!tag.DropdownItems && tag.Link ? (
        <NavLink
          className="nav-link"
          activeClassName="active"
          to={tag.Link}
          end
        >
          <tag.Icon className="tag-svg" size={22} />
          <span className="tag-name">{tag.Name}</span>
        </NavLink>
      ) : (
        <div
          role="presentation"
          className={
            location.pathname.split('/')[2] === tag.BaseUrl
              ? `nav-link active`
              : `nav-link`
          }
        >
          <tag.Icon className="tag-svg" size={22} />
          <span className="tag-name">{tag.Name}</span>
          <span className="svg-arrow">
            {tag.Active === true ? <FaAngleDown /> : <FaAngleDown />}
          </span>
        </div>
      )}
      {tag.DropdownItems && tag.BaseUrl ? (
        <DropDownItems
          baseUrl={tag.BaseUrl}
          active={tag.Active}
          dropItems={tag.DropdownItems}
          Icon={tag.Icon}
        />
      ) : (
        ''
      )}
    </NavItem>
  )
}
//  Menu
const MenuTags: React.FC<{isSticky: boolean}> = ({isSticky}) => {
  const [tags, setTags] = useState<ITag[]>(
    TagHorizontal.map((item) => ({
      ...item,
      Active: false,
    })),
  )

  useEffect(() => {
    if (isSticky) {
      setTags((items) =>
        items.map((item) => ({
          ...item,
          Active: false,
        })),
      )
    }
  }, [isSticky])
  return (
    <Menu isSticky={isSticky}>
      <Container
        align="center"
        justify="space-between"
        style={{
          maxWidth: '1140px',
          width: '100%',
          height: '100%',
          padding: '0 12px',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        <Ul isSticky={isSticky}>
          {tags.map((item) => (
            <NavTag
              setTags={setTags}
              key={JSON.stringify(item.Name)}
              tag={item}
            />
          ))}
        </Ul>
      </Container>
    </Menu>
  )
}

export default MenuTags
