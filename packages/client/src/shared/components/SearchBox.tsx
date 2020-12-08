/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import styled from '@emotion/styled/macro'
import { BiSearchAlt } from 'react-icons/bi'
import { css } from '@emotion/react'

interface SearchState {
  isOpen: boolean
}
// Search Box
export const SearchWrapper = styled.div<SearchState>`
  position: relative;
  margin-right: 0.66667rem;
  .input-holder {
    height: 42px;
    width: ${(props) => (props.isOpen ? '290px' : '42px')};
    background: ${(props) =>
    props.isOpen ? ' rgba(0,0,0,0.05)' : 'rgba(255,255,255,0)'};
    overflow: hidden;
    border-radius: ${(props) => (props.isOpen ? '50px' : '')};
    overflow: hidden;
    position: relative;
    transition: ${(props) =>
    props.isOpen
      ? 'all .5s cubic-bezier(0.000, 0.105, 0.035, 1.570)'
      : 'all 0.3s ease-in-out'};
  }
  .search-input {
    width: 100%;
    padding: 0 70px 0 20px;
    opacity: ${(props) => (props.isOpen ? '1' : '0')};
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    box-sizing: border-box;
    border: none;
    outline: none;
    color: #455560;
    transform: ${(props) =>
    props.isOpen ? 'translate(0, 11px)' : 'translate(0, 60px)'};
    transition: all 0.3s cubic-bezier(0, 0.105, 0.035, 1.57);
    transition-delay: 0.3s;
    font-size: 0.88rem;
  }
  .search-icon {
    width: 42px;
    height: 42px;
    border: none;
    padding: 0;
    outline: none;
    position: relative;
    z-index: 2;
    float: right;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 30px;
    outline: none !important;
    box-sizing: border-box;
    text-transform: none;
    ${(props) =>
    props.isOpen
      ? css`
            width: 42px;
            height: 42px;
            margin: 0;
            border-radius: 30px;
          `
      : ''};
    :hover {
      svg {
        opacity: 0.7;
      }
    }
    svg {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(0)' : 'rotate(90deg)')};
      color: #3e82f7;
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
    left: 0;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    cursor: pointer;
    opacity: 0 !important;
    transform: rotate(-180deg);
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
    color: #000;
    text-shadow: 0 1px 0 #fff;
    outline: none !important;
    ${(props) =>
    props.isOpen
      ? css`
            left: 300px;
            opacity: 1 !important;
            transform: rotate(45deg);
          `
      : ''};
    :hover::before {
      opacity: 0.5;
    }
    :hover::after {
      opacity: 0.5;
    }
    ::before {
      width: 2px;
      height: 20px;
      left: 9px;
      top: 0;
      position: absolute;
      content: '';
      background: #ff0000;
      border-radius: 2px;
    }
    ::after {
      width: 20px;
      height: 2px;
      left: 0;
      top: 9px;
      position: absolute;
      content: '';
      background: #ff0000;
      border-radius: 2px;
    }
  }
`

const Search: React.FC = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <SearchWrapper isOpen={isOpen}>
      <div className="input-holder">
        <input type="text" className="search-input" placeholder="Search ..." />
        <button
          className="search-icon"
          type="button"
          onClick={() => setOpen(!isOpen)}
        >
          <BiSearchAlt size={32} />
        </button>
      </div>
      <button
        className="close"
        type="button"
        aria-label="Close"
        onClick={() => setOpen(!isOpen)}
      />
    </SearchWrapper>
  )
}

export default Search
