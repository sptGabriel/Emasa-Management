import React from 'react'
import MenuTags from './Tags'

const SideMenu: React.FC<{hover: boolean}> = ({hover}) => {
  return <MenuTags hover={hover} />
}

export default SideMenu
