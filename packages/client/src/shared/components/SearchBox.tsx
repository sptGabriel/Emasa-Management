/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react'
import styled from '@emotion/styled/macro'
import {BiSearchAlt} from 'react-icons/bi'
import {IoIosSearch} from 'react-icons/io'
import {css} from '@emotion/react'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../infra/mobx'
import { NoSelect } from './NoSelect'

interface SearchState {
  isOpen: boolean
}
// Search Box
const Vertical = styled.div<SearchState>`
  position: relative;
  padding-left: 0.75rem;
  margin-right: 0.66667rem;
  display: flex;
  align-items: center;
  ${NoSelect}
  .input-holder {
    height: 36px;
    width: ${({isOpen}) => (isOpen ? '210px' : '36px')};
    display: flex;
    align-items: center;
    background: ${({isOpen, theme}: any) =>
      isOpen ? `rgb(${theme.header.searchBg})` : theme.background};
    overflow: hidden;
    border-radius: ${({isOpen}) => (isOpen ? '100vh' : '')};
    overflow: hidden;
    position: relative;
    transition: ${({isOpen}) =>
      isOpen
        ? 'all .5s cubic-bezier(0.000, 0.105, 0.035, 1.570)'
        : 'all 0.3s ease-in-out'};
  }
  .search-input {
    width: calc(100% - 50px);
    padding: 0 0px 0 20px;
    opacity: ${({isOpen}) => (isOpen ? '1' : '0')};
    ${({isOpen}) =>
      !isOpen
        ? css`
            position: absolute;
          `
        : ''}
    background: transparent;
    box-sizing: border-box;
    border: none;
    outline: none;
    color: ${({theme}: any) => `rgb(${theme.header.tools})`};
    ::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: ${({theme}: any) => `rgb(${theme.header.tools})`};
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: ${({theme}: any) => `rgb(${theme.header.tools})`};
      opacity: 1;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: ${({theme}: any) => `rgb(${theme.header.tools})`};
      opacity: 1;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${({theme}: any) => `rgb(${theme.header.tools})`};
    }
    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: ${({theme}: any) => `rgb(${theme.header.tools})`};
    }
    ::placeholder {
      /* Most modern browsers support this now. */
      color: ${({theme}: any) => `rgb(${theme.header.tools})`};
    }
    transform: ${({isOpen}) => (isOpen ? '' : 'translate(0, 60px)')};
    transition: all 0.3s cubic-bezier(0, 0.105, 0.035, 1.57);
    font-size: 0.88rem;
  }
  .search-icon {
    border-radius: 5px;
    border: none;
    outline: none;
    position: relative;
    z-index: 2;
    float: right;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    outline: none !important;
    box-sizing: border-box;
    text-transform: none;
    ${({isOpen}) =>
      isOpen
        ? css`
            width: 42px;
            height: 36px;
            margin: 0;
            border-radius: 30px;
          `
        : ''};
    :hover {
      svg {
        color: ${({theme}: any) => `rgb(${theme.primary})`} !important;
      }
    }
    svg {
      transform: ${({isOpen}) => (isOpen ? 'rotate(0)' : 'rotate(90deg)')};
      color: ${({theme}: any) => `rgb(${theme.header.tools})`};
      transition: all 0.4s cubic-bezier(0.65, -0.6, 0.24, 1.65);
    }
    span {
      width: 22px;
      height: 22px;
      display: inline-block;
      vertical-align: middle;
      position: relative;
      transform: ${(props) =>
        props.isOpen ? 'rotate(-45deg)' : 'rotate(45deg)'};
      transition: all 0.4s cubic-bezier(0.65, -0.6, 0.24, 1.65);
      cursor: pointer;
      ::after {
        width: 14px;
        height: 14px;
        left: 4px;
        top: 0;
        border-radius: 16px;
        border: 2px solid #3e82f7;
        position: absolute;
        content: '';
      }
      ::before {
        width: 4px;
        height: 11px;
        left: 9px;
        top: 13px;
        border-radius: 2px;
        background: #3e82f7;
        position: absolute;
        content: '';
      }
    }
  }
  .close {
    cursor: pointer;
    position: absolute;
    z-index: 1;
    top: 50%;
    right: ${({isOpen}) => (isOpen ? '220px' : '0')};
    width: 20px;
    height: 20px;
    margin-top: -10px;
    cursor: pointer;
    opacity: ${({isOpen}) => (isOpen ? '1' : '0')};
    transform: ${({isOpen}) => (isOpen ? 'rotate(45deg)' : 'rotate(-180deg)')};
    transition: ${(props) =>
      props.isOpen
        ? 'all 0.6s cubic-bezier(0, 0.105, 0.035, 1.57)'
        : 'all 0.2s cubic-bezier(0.285, -0.45, 0.935, 0.11)'};
    transition-delay: ${(props) => (props.isOpen ? '0.5s' : '0.1s')};
    padding: 0;
    background-color: transparent;
    border: 0;
    appearance: none;
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: ${({theme}: any) => theme.header.svg};
    text-shadow: 0 1px 0 #fff;
    outline: none !important;
    :hover::before {
      background: ${({theme}: any) => `rgb(${theme.primary})`} !important;
    }
    :hover::after {
      background: ${({theme}: any) => `rgb(${theme.primary})`} !important;
    }
    ::before {
      width: 2px;
      height: 20px;
      left: 9px;
      top: 0;
      position: absolute;
      content: '';
      background: ${({theme}: any) => `rgb(${theme.header.tools})`};
      border-radius: 2px;
    }
    ::after {
      width: 20px;
      height: 2px;
      left: 0;
      top: 9px;
      position: absolute;
      content: '';
      background: ${({theme}: any) => `rgb(${theme.header.tools})`};
      border-radius: 2px;
    }
  }
`
const Horizontal = styled('div')`
  display: inline-flex;
  align-items: center;
  flex: 1 1 auto;
  border-radius: 5px;
  overflow: hidden;
  padding: 0 5px;
  margin-left: 20px;
  border: 1px solid #ccc;
  svg {
    cursor: pointer;
    margin-right: 10px;
  }

  .searchBox {
    display: flex;
    align-items: center;
    border: 0;
    padding: 0.5rem 0.5rem 0.5rem 0;
    flex: 1;
  }

  .searchButton {
    background: #538ac5;
    border: 0;
    color: white;
    padding: 0.5rem;
    border-radius: 0;
  }
`
const VerticalSearch: React.FC = () => {
  const [isOpen, setOpen] = useState(false)
  const clickHandler = useCallback(() => {
    setOpen(!isOpen)
  }, [isOpen])
  return (
    <Vertical isOpen={isOpen}>
      <div className="input-holder">
        <input type="text" className="search-input" placeholder="Search ..." />
        <button className="search-icon" type="button" onClick={clickHandler}>
          <BiSearchAlt size={24} />
        </button>
      </div>
      <button
        className="close"
        type="button"
        aria-label="Close"
        onClick={clickHandler}
      />
    </Vertical>
  )
}

const HorizontalSearch = () => {
  return (
    <Horizontal>
      <IoIosSearch size={20} />
      <input
        className="searchBox"
        type="search"
        name="search"
        placeholder="Search..."
      />
    </Horizontal>
  )
}

const Search: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  return layoutStore.layoutType === 'vertical' ? (
    <VerticalSearch />
  ) : (
    <HorizontalSearch />
  )
})

export default Search
