import React, {memo, useCallback, useState} from 'react'
import styled from '@emotion/styled'
import {useSpring, animated} from 'react-spring'
import {observer} from 'mobx-react-lite'
import useOnClickOutside from 'use-onclickoutside'
import {runInAction} from 'mobx'
import {IoIosClose} from 'react-icons/io'
import {useRootStore} from '../infra/mobx'
import GearTheming from './GearTheming'
import {Container} from './FlexBox'
import RadioButton from './RadioButton'
import {NoSelect} from './NoSelect'
import {isJson} from '../utils/isJson'

//  const Customizer = styled('div')`
//  margin: 0;
//  padding: 0;
//  box-sizing: border-box;
//  outline: none;
//  text-transform: none;
//  text-decoration: none;
//  `
const SideBar = styled(animated.div)`
  display: block;
  position: fixed;
  z-index: 52000;
  width: 400px;
  max-width: 400px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  right: 0;
  left: auto;
  padding: 1rem 0;
  border-radius: 4px 0 0 4px;
  height: auto !important;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  ${NoSelect}
`
const Wrap = styled(Container)`
  padding: 0 1.5rem;
`

const Header = styled(Container)`
  padding-bottom: 0.8rem;
  padding-top: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  svg {
    cursor: pointer;
  }
  div {
    h1 {
      font-weight: 500;
      color: #2c2c2c;
      font-size: 14.48px;
      white-space: nowrap;
    }
  }
`
const Body = styled('div')`
  display: block;
  width: 100%;
  padding: 1.2rem 0 !important;
  height: auto;
  h1 {
    font-weight: 500;
    color: #2c2c2c;
    font-size: 14.48px;
    white-space: nowrap;
    margin-bottom: 0.5rem !important;
  }
  .colors_preference {
    .radio__control {
      display: block;
      width: 25px !important;
      height: 25px !important;
      border-radius: 5px !important;
      border: none !important;
      transform: translateY(-0.05em);
    }
  }
  .orientation_mode,
  .colors_preference,
  .nav_colors {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 0.8rem;
  }
  .options {
    display: flex;
    align-items: center;
    min-height: 16px;
    padding-bottom: 14px;
    fieldset {
      display: flex;
    }
    label {
      margin-right: 10px;
    }
  }
`
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
    <Body>
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
    </Body>
  )
})
const CustomizerHeader: React.FC = () => {
  const {layoutStore} = useRootStore()
  const toggleSideTheme = useCallback(() => {
    layoutStore.toggleThemeSideBar()
  }, [])
  return (
    <Header justify="space-between" align="center">
      <div>
        <h1>CUSTOMIZE O SEU DASHBOARD</h1>
      </div>
      <IoIosClose size={32} onClick={toggleSideTheme} />
    </Header>
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
      <SideBar ref={ref} style={customizerAnimate as any}>
        <Wrap flexColumn>
          <CustomizerHeader />
          <CustomizerBody />
        </Wrap>
      </SideBar>
    </>
  )
})

export default memo(SideThemeBar)
