/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react'
import {BiSearchAlt} from 'react-icons/bi'
import {IoIosSearch} from 'react-icons/io'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../../infra/mobx'
import { Horizontal, Vertical } from './styles'

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
