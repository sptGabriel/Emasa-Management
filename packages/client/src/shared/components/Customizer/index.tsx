import React, {memo, useCallback, useState} from 'react'
import {useSpring} from 'react-spring'
import {observer} from 'mobx-react-lite'
import useOnClickOutside from 'use-onclickoutside'
import {runInAction} from 'mobx'
import {IoIosClose} from 'react-icons/io'
import {useRootStore} from '../../infra/mobx'
import {isJson} from '../../utils/isJson'
import RadioButton from '../RadioButton/RadioButton'
import GearTheming from '../GearTheme/GearTheming'
import {
  BodyCustomizer,
  HeaderCustomizer,
  SideBarCustomizer,
  WrapCustomizer,
} from './styles'

const CustomizerBody: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  const [activeCustomTheme, setActiveCustomTheme] = useState(
    (() => {
      const [err, storage] = isJson(localStorage.getItem('t-col'))
      if (err) return null
      return storage
    })(),
  )
  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) =>
    layoutStore.setTheme(e.target.value)
  const handleOrientation = (e: React.ChangeEvent<HTMLInputElement>) =>
    layoutStore.changeLayoutOrientation(e.target.value)
  const handleCustomTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    layoutStore.setCustomTheme(e.target.value)
    setActiveCustomTheme(e.target.value)
  }
  return (
    <BodyCustomizer>
      <div className="colors_preference">
        <h1>Cores Temas</h1>
        <div className="options">
          <form>
            <fieldset id="color_themes">
              <RadioButton
                bgColor="0, 107, 166"
                onChange={handleCustomTheme}
                id="blue"
                color="#c8c8c8"
                name="color_themes"
                value="#006ba6"
                checked={activeCustomTheme === '#006ba6' || !activeCustomTheme}
              />
              <RadioButton
                bgColor="255, 64, 0"
                onChange={handleCustomTheme}
                id="red"
                color="#c8c8c8"
                name="color_themes"
                value="#ff4000"
                checked={activeCustomTheme === '#ff4000'}
              />
              <RadioButton
                bgColor="21, 214, 63"
                onChange={handleCustomTheme}
                id="green"
                color="#c8c8c8"
                name="color_themes"
                value="#15d63f"
                checked={activeCustomTheme === '#15d63f'}
              />
              <RadioButton
                bgColor="161, 0, 255"
                onChange={handleCustomTheme}
                id="pink"
                color="#c8c8c8"
                name="color_themes"
                value="#a100ff"
                checked={activeCustomTheme === '#a100ff'}
              />
              <RadioButton
                bgColor="107, 11, 163"
                onChange={handleCustomTheme}
                id="purple"
                color="#c8c8c8"
                name="color_themes"
                value="#6b0ba3"
                checked={activeCustomTheme === '#6b0ba3'}
              />
            </fieldset>
          </form>
        </div>
      </div>
      <div className="orientation_mode">
        <h1>Orientação do Dashboard</h1>
        <div className="options">
          <form>
            <fieldset id="orientation_mode">
              <RadioButton
                onChange={handleOrientation}
                id="vertical"
                color="#c8c8c8"
                name="orientation_mode"
                label="Vertical"
                value="vertical"
                checked={layoutStore.layoutType === 'vertical'}
              />
              <RadioButton
                id="horizontal"
                color="#c8c8c8"
                name="orientation_mode"
                onChange={handleOrientation}
                label="Horizontal"
                value="horizontal"
                checked={layoutStore.layoutType === 'horizontal'}
              />
            </fieldset>
          </form>
        </div>
      </div>
      <div className="theme_modes">
        <h1>Modo de Tema</h1>
        <div className="options">
          <form>
            <fieldset id="theme_modes">
              <RadioButton
                id="dark"
                name="theme_modes"
                onChange={handleTheme}
                label="Dark"
                value="dark"
                checked={layoutStore.theme.type === 'dark'}
              />
              <RadioButton
                id="semidark"
                name="theme_modes"
                onChange={handleTheme}
                label="Semi Dark"
                value="semidark"
                checked={layoutStore.theme.type === 'semidark'}
              />
              <RadioButton
                id="light"
                name="theme_modes"
                onChange={handleTheme}
                label="Light"
                value="light"
                checked={
                  // (layoutStore.theme.type !== 'dark' &&
                  //   layoutStore.theme.type !== 'semidark' &&
                  //   layoutStore.theme.type !== 'light') ||
                  layoutStore.theme.type === 'light'
                }
              />
            </fieldset>
          </form>
        </div>
      </div>
    </BodyCustomizer>
  )
})
const CustomizerHeader: React.FC = () => {
  const {layoutStore} = useRootStore()
  const toggleSideTheme = useCallback(() => {
    layoutStore.toggleThemeSideBar()
  }, [])
  return (
    <HeaderCustomizer justify="space-between" align="center">
      <div>
        <h1>CUSTOMIZE O SEU DASHBOARD</h1>
      </div>
      <IoIosClose size={32} onClick={toggleSideTheme} />
    </HeaderCustomizer>
  )
}
const SideThemeBar: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  const ref = React.useRef(null)
  useOnClickOutside(ref, () =>
    runInAction(() => {
      if (layoutStore.themeSideBar) layoutStore.themeSideBar = false
    }),
  )
  const customizerAnimate = useSpring({
    config: {duration: 200},
    to: {
      maxWidth: layoutStore.themeSideBar ? 400 : 0,
    },
    from: {maxWidth: 0},
  })

  return (
    <>
      <GearTheming />
      <SideBarCustomizer ref={ref} style={customizerAnimate as any}>
        <WrapCustomizer flexColumn>
          <CustomizerHeader />
          <CustomizerBody />
        </WrapCustomizer>
      </SideBarCustomizer>
    </>
  )
})

export default memo(SideThemeBar)
