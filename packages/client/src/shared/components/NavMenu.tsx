import React, {
  useState,
  useEffect,
  MouseEvent,
  useCallback,
  useRef,
} from 'react'
import {IconType} from 'react-icons'
import styled from '@emotion/styled/macro'
import {NavLink, useLocation} from 'react-router-dom'
import {FaAngleDown} from 'react-icons/fa'
import {animated} from 'react-spring'
import useOnClickOutside from 'use-onclickoutside'
import {ITag, IDropdownItems, TagHorizontal} from '../utils/MenuTags'
import {Container} from './FlexBox'

/* Styles */
type IDropDown = {
  activetag: any
}
type ClickHandler = (tag: ITag) => (e: MouseEvent) => void
type ShowHideDropItem = (tag: ITag) => void
interface IDrop {
  active?: boolean
  dropItems: IDropdownItems[]
  baseUrl: string
  // setVisible: ClickHandler
  Icon: IconType
}
interface ITagList {
  tag: ITag
  setTags: any
}
interface IListItem {
  isDropDown?: boolean
  activetag: any
}
const Ul = styled('ul')<{isSticky: boolean}>`
  display: flex;
  flex-wrap: wrap;
  align-items: ${({isSticky}) => (isSticky ? 'flex-start' : 'flex-end')};
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  width: 100%;
  height: 100%;
  z-index: 99;
`
const Menu = styled('div')<{isSticky: boolean}>`
  display: flex;
  align-items: center;
  width: 100% !important;
  height: 70px;
  position: relative;
  background: ${({theme}: any) => `rgb(${theme.primary})`};
  box-shadow: 11px 0 0 rgba(0, 0, 0, 0.13);
`

const DropDown = styled(animated.ul)<IDropDown>`
  position: absolute;
  flex-direction: column;
  display: ${({activetag}) => (activetag ? 'block' : 'none')};
  top: 100%;
  padding: 15px 0;
  min-width: 215px;
  min-height: 52px;
  background: ${({theme}: any) => `rgb(${theme.navBar.dropdownBg})`};
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.24);
  z-index: 999;
  border-radius: 4px;
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
    cursor: pointer;
    padding: 0.75rem 1.5rem;
  }
  .tag-optname {
    display: block;
    color: ${({theme}: any) => `rgb(${theme.navBar.dropdownTxt})`};
    font-size: 1rem;
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
    stroke: ${({theme}: any) => `rgb(${theme.navBar.dropdownTxt})`};
    margin-right: 0.75rem !important;
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
  }
  .active-dropheader {
    background: ${({theme}: any) => `rgb(${theme.navBar.dropdownBgOptActive})`};
    .svg-drop {
      stroke: ${({theme}: any) => `rgb(${theme.navBar.dropdownTextOptActive})`};
    }
    .tag-optname {
      color: ${({theme}: any) => `rgb(${theme.navBar.dropdownTextOptActive})`};
    }
  }
`

const NavItem = styled.li<IListItem>`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 0.75rem;
  .active {
    /* background: #2a2a72; */
    background: ${({theme}: any) => `rgb(${theme.navBar.activeBgButton})`};
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: ${({theme}: any) => `rgb(${theme.navBar.text})`};
    cursor: pointer;
    border-radius: 0.42rem;
    padding: 0.65rem 1rem;
    .tag-svg {
      margin-right: 10px;
    }
    .tag-name {
      color: ${({theme}: any) => `rgb(${theme.navBar.text})`};
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.5;
      text-transform: initial;
      font-family: Poppins, Helvetica, sans-serif;
    }
  }
  .svg-arrow {
    margin-left: 6px;
    display: flex;
    align-items: center;
  }
`
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
const NavTag: React.FC<ITagList> = ({tag, setTags}) => {
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
