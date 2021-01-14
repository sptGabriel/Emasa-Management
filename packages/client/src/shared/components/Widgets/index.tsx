import React from 'react'
import {observer} from 'mobx-react-lite'
import {BiMoon} from 'react-icons/bi'
import {FiBell, FiSun} from 'react-icons/fi'
import {AiOutlineCompress} from 'react-icons/ai'
import {useRootStore} from '../../infra/mobx'
import { WrapperTools } from './styles'

const Widgets: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  return (
    <WrapperTools open={layoutStore.sideBar} justify="flex-end">
      <button
        className="tool_widget"
        onClick={layoutStore.setDarkTheme}
        type="button"
      >
        {layoutStore.theme.type === 'dark' ||
        layoutStore.theme.type === 'semidark' ? (
          <BiMoon size={18} />
        ) : (
          <FiSun size={18} />
        )}
      </button>
      <button className="tool_widget bell" type="button">
        <FiBell size={18} />
      </button>
      <button className="tool_widget" type="button">
        <AiOutlineCompress size={18} />
      </button>
      {/* <VerticalSplit /> */}
    </WrapperTools>
  )
})
export default Widgets