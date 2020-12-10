/* eslint-disable indent */
import React, { useState, useEffect, MouseEvent } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled/macro'
import { observer } from 'mobx-react-lite'
import { shade } from 'polished'
import { IconType } from 'react-icons'
import { FaGhost } from 'react-icons/fa'
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc'
import { useRootStore } from '../infra/mobx'
import { ITag, IDropdownItems, Tags } from '../utils/MenuTags'
/* Styles */
type IMenu = {
  open: boolean
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
const TitleItem = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  transition: all 0.5s cubic-bezier(0, 1, 0, 1);
  align-items: center;
  position: relative;
  border-radius: 0.25rem;
  color: rgba(26, 51, 83, 0.6);
  font-size: 0.75rem;
  padding: 0.75rem 1.525rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0.9375rem;
`
const MenuList = styled.ul<IMenu>`
  position: relative;
  background: #fff;
  padding: ${({ open }) => (open ? '0' : '1rem 0')};
  color: transparent;
  margin-top: 20px;
  margin-bottom: 30px;
`

const OpenedStyled = styled.ul<IDropDown>`
  position: relative;
  opacity: ${({ active }) => (active ? '1' : '0')};
  max-height: ${({ active }) => (active ? '500px' : '0')};
  transition: max-height 0.5s, opacity 1s;
  overflow: hidden;
  background: #fff;
  transition: padding 300ms;
  padding: 0.5em 0 0 2rem;
  :before {
    content: '';
    height: 100%;
    opacity: 1;
    width: 3px;
    background: #e0f3ff;
    position: absolute;
    left: 20px;
    top: 0;
    border-radius: 15px;
  }
  li {
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 8px 20px 8px 20px;
    :hover {
      border-radius: 0.25rem;
      a {
        font-weight: 500;
        color: #10387e !important;
      }
    }
    margin-top: 2px;
    svg {
      margin-right: 20px;
    }
  }
  a {
    color: #2c323f;
    letter-spacing: 0.7px;
    font-family: Roboto;
    text-transform: capitalize;
    font-weight: 500;
  }
  & .li-open:hover > .icon-li-drop {
    color: orange;
    transition: color 0.5s;
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
  position: absolute;
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
    :hover > a {
      color: orange;
    }
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

const ListWrap = styled.div<IListWrap>`
  padding: ${({ open }) =>
    open ? '8px 1rem 8px 1.2rem' : '8px 1rem 8px 1.2rem'};
  display: flex;
  transition: all 0.5s cubic-bezier(0, 1, 0, 1);
  justify-content: ${({ open }) => (open ? 'space-between' : 'center')};
  align-items: center;
  position: relative;
  border-radius: 10px;
  background: ${({ tagActive, open }) =>
    tagActive && open ? 'rgb(202 240 248 / 0.4)' : '#fff'};
  transition: all 0.5s ease;
  padding: 12px 10px;
  :hover {
    background: ${({ open }) => (open ? 'rgb(202 240 248 / 0.3)' : '')};
    a {
      svg {
        fill: #10387e;
        stroke: #10387e;
        transition: all 0.3s ease;
      }
      span {
        color: #10387e;
      }
    }
  }
  a {
    display: flex;
    align-items: center;
    span {
      color: ${({ tagActive }) => (tagActive ? '#10387e' : '#2c323f')};
      margin-bottom: -2px;
    }
    svg {
      fill: ${({ tagActive }) => (tagActive ? '#10387e' : '#2c323f')};
      margin-right: ${({ open }) => (open ? '10px' : '0')};
      transition: all 0.5s cubic-bezier(0, 1, 0, 1);
    }
  }
  & .icon-li {
    margin-right: 10px;
  }
  & .down-up_svg,
  .li-name {
    display: ${({ open }) => (open ? 'space-between' : 'none')};
    color: ${({ tagActive }) => (tagActive ? '#10387e' : '#2c323f')};
    letter-spacing: 0.7px;
    font-family: Roboto;
    text-transform: capitalize;
    font-weight: 500;
  }
  & .svg-arrow {
    color: #222;
  }
`

const ListItem = styled.li<IListItem>`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: ${({ open }) => (open ? '20px' : '15px')};
  padding-right: 15px;
  justify-content: ${({ open }) => (open ? 'space-between' : 'center')};
  cursor: pointer;
  margin-bottom: 8px;
  &:hover ${ClosedStyled} {
    display: block;
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
  sideBarStatus: boolean
  tag: ITag
}
const TagList: React.FC<ITagList> = observer(
  ({ sideBarStatus, tag, clickHandler }) => {
    return (
      <>
        {sideBarStatus === true ? (
          <ListWrap
            open={sideBarStatus}
            onClick={tag.Active !== undefined ? clickHandler(tag) : undefined}
            tagActive={tag.Active}
            isDropDown={!!tag.DropdownItems}
          >
            <a href="#/">
              <tag.Icon size={22} />
              <span className="li-name">{tag.Name}</span>
            </a>
            {tag.DropdownItems ? (
              <span className="svg-arrow">
                {tag.Active === true ? <VscChevronUp /> : <VscChevronDown />}
              </span>
            ) : (
              ''
            )}
          </ListWrap>
        ) : (
          <ListWrap open={sideBarStatus}>
            <a href="#/">
              <tag.Icon size={24} />
              <span className="li-name">{tag.Name}</span>
            </a>
          </ListWrap>
        )}
      </>
    )
  }
)

const Drop: React.FC<IDrop> = observer(({ active, dropItems, isOpen }) => {
  return (
    <>
      {isOpen === true ? (
        <OpenedStyled active={active}>
          {dropItems.map((item) => (
            <li className="li-open" key={item.Name}>
              <a href="#/">{item.Name}</a>
            </li>
          ))}
        </OpenedStyled>
      ) : (
        <ClosedStyled>
          {dropItems.map((item) => (
            <li className="li-closed" key={item.Name}>
              <FaGhost size={18} />
              <a href="#/">{item.Name}</a>
            </li>
          ))}
        </ClosedStyled>
      )}
    </>
  )
})
interface IMenuTags {
  open: boolean
}
const MenuTags: React.FC = observer(() => {
  const { layoutStore } = useRootStore()
  const [tags, setTags] = useState<ITag[]>(Tags)
  const showHideDropItem: ShowHideDropItem = (tag) => {
    setTags((items) =>
      items.map((item) => ({
        ...item,
        Active: item.Name === tag.Name ? tag.Active !== true : false
      }))
    )
  }
  useEffect(() => {
    setTags((items) =>
      items.map((item) => ({
        ...item,
        Active: false
      }))
    )
  }, [layoutStore.sideBar])

  const clickHandler: ClickHandler = (tag) => (e) => {
    e.preventDefault()
    showHideDropItem(tag)
  }

  return (
    <MenuList open={layoutStore.sideBar}>
      {tags.map((item, index) => (
        <>
          {item.Title ? (
            <TitleItem open={layoutStore.sideBar}>{item.Title}</TitleItem>
          ) : (
            ''
          )}
          <ListItem
            key={item.Name}
            open={layoutStore.sideBar}
            isDropDown={!!item.DropdownItems}
            active={item.Active}
          >
            <TagList
              sideBarStatus={layoutStore.sideBar}
              tag={item}
              clickHandler={clickHandler}
            />
            {item.DropdownItems ? (
              <Drop
                active={item.Active}
                dropItems={item.DropdownItems}
                Icon={item.Icon}
                isOpen={layoutStore.sideBar}
                setVisible={clickHandler}
              />
            ) : (
              ''
            )}
          </ListItem>
        </>
      ))}
    </MenuList>
  )
})

export default MenuTags
