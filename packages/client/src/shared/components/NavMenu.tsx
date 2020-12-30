import React, {useState, useEffect, MouseEvent, memo, useCallback} from 'react'
import {IconType} from 'react-icons'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {NavLink} from 'react-router-dom'
import {FaAngleDown} from 'react-icons/fa'
import {animated, useSpring} from 'react-spring'
import {css, keyframes} from '@emotion/react'
import {useRootStore} from '../infra/mobx'
import {ITag, IDropdownItems, Tags, TagHorizontal} from '../utils/MenuTags'
import {useHeight} from '../utils/useHeight'
import {Container} from './FlexBox'
/* Styles */
type IDropDown = {
  activetag: any
  open: boolean
}
export const navAnimation = keyframes`
	0%{
		height: 90px;
	}
	100%{
		height: 70px;
	}
`
interface IListItem {
  open: boolean
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
  position: relative;
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
  overflow: hidden;
  background: #0088d1;
  ${({isSticky}) =>
    isSticky
      ? css`
          position: fixed;
          top: 0;
          left: 0;
          border-bottom: 1px solid #ebedf2;
          background: #0171aa;
          animation: ${navAnimation} 0.15s forwards;
        `
      : ''}
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
    height: calc(100% - 1.20625rem - 4.94px);
    background: rgba(185, 199, 212, 0.5);
  }
  .dropdown-tag {
    display: flex;
    align-items: center;
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

const NavItem = styled.li<IListItem>`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 0.75rem;
  .active {
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: #fff;
    border-radius: 0.42rem;
    padding: 0.65rem 6px;
    .tag-svg {
      margin-right: 10px;
    }
    .tag-name {
      color: #fff;
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.5;
      text-transform: initial;
      font-family: Poppins, Helvetica, sans-serif;
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
    <>
      {!HasChildren && Link ? (
        <NavLink className="nav-link" activeClassName="active" to={Link} end>
          <Icon className="tag-svg" size={22} />
          <span className="tag-name">{Name}</span>
        </NavLink>
      ) : (
        <div className="tag-wrapper">
          <Icon className="svg-main" size={22} />
          <span className="tag-name">{Name}</span>
          <span className="svg-arrow">
            {Active === true ? (
              <FaAngleDown style={{transform: 'rotate(0)'}} />
            ) : (
              <FaAngleDown style={{transform: 'rotate(280deg)'}} />
            )}
          </span>
        </div>
      )}
    </>
  )
})
//  Tag Wrapper
const NavTag: React.FC<ITagList> = observer(({tag, open, setTags}) => {
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
      {/* {tag.DropdownItems ? (
        <DropDownItems
          active={tag.Active}
          dropItems={tag.DropdownItems}
          Icon={tag.Icon}
          isOpen={open}
          setVisible={clickHandler}
        />
      ) : (
        ''
      )} */}
    </NavItem>
  )
})
//  Menu
const MenuTags: React.FC<{isSticky: boolean}> = observer(({isSticky}) => {
  const {layoutStore} = useRootStore()
  const [tags, setTags] = useState<ITag[]>(TagHorizontal)

  useEffect(() => {
    setTags((items) =>
      items.map((item) => ({
        ...item,
        Active: false,
      })),
    )
  }, [])
  return (
    <Menu isSticky={isSticky}>
      <Container
        align="center"
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
              open={layoutStore.sideBar || layoutStore.onHoverSideState}
              tag={item}
            />
          ))}
        </Ul>
      </Container>
    </Menu>
  )
})

export default MenuTags
