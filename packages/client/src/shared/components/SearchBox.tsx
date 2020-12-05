import React from 'react'
import styled from '@emotion/styled/macro'
import { AiOutlineSearch } from 'react-icons/ai'

export const SearchBox = styled.div`
  min-width: 300px;
  width: 100%;
  & > :first-child {
    position: relative;
    flex: 1 1 0%;
    &:focus-within > svg {
      fill: #3e82f7;
    }
  }
  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    fill: rgb(40, 39, 44);
    font-size: 20px;
    transition: fill 0.2s ease 0s;
  }
  &:focus-within input:not(:read-only) {
    border-color: #3e82f7;
    border-right-width: 1px !important;
  }
  input {
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    font-size: 16px;
    background-color: #fafafb;
    color: #72849a;
    padding: 0px 1em 0px 2.65em;
    border: none; /* <-- This thing here */
    border: solid 1px #edf2f9;
    border-radius: 0.625rem;
  }
  /* input:focus {
    border-color: blue !important;
  } */
  textarea {
    outline: 0px;
    font-family: Roboto, sans-serif;
    transition: border 0.2s ease 0s;
  }
`

const Search: React.FC = () => {
  return (
    <SearchBox>
      <div>
        <AiOutlineSearch />
        <input name="login" type="text" id="login" placeholder="Search ... " />
      </div>
    </SearchBox>
  )
}

export default Search
