import React, {memo, useCallback} from 'react'
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
  max-width: 90vw;
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
  .colors_preference,
  .nav_colors {
    //.container {
    //  width: 2.5rem !important;
    //  height: 2.5rem !important;
    //}
    //.checkmark {
    //  width: 2rem !important;
    //  height: 2rem !important;
    //  border: 0 !important;
    //  border-radius: 0.5rem !important;
    //  background-color: rgb(115, 103, 240);
    //}
    //input:checked ~ .container {
    //  border-color: #dae1e7;
    //}
    //input:checked ~ .checkmark {
    //  box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.5) !important;
    //  background-color: rgb(115, 103, 240);
    //}
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
    label {
      margin-right: 10px;
    }
  }
`
const CustomizerBody: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) =>
    layoutStore.setTheme(e.target.value)
  const handleOrientation = (e: React.ChangeEvent<HTMLInputElement>) =>
    layoutStore.changeLayoutOrientation(e.target.value)
  return (
    <Body>
      <div className="colors_preference">
        <h1>Cores Temas</h1>
        <div className="options">
          {/* <RadioButton
            onChange={handleInputChange}
            id="vertical"
            value="vertical"
            checked={layoutStore.layoutType === 'vertical'}
          />
          <RadioButton
            onChange={handleInputChange}
            value="horizontal"
            checked={layoutStore.layoutType === 'horizontal'}
          />
          <RadioButton
            onChange={handleInputChange}
            value="horizontal"
            checked={layoutStore.layoutType === 'horizontal'}
          />  */}
        </div>
      </div>
      <div className="nav_colors">
        <h1>Cor da Barra de Navegação</h1>
        <div className="options">
          {/* <RadioButton
            onChange={handleInputChange}
            value="vertical"
            checked={layoutStore.layoutType === 'vertical'}
          />
          <RadioButton
            onChange={handleInputChange}
            value="horizontal"
            checked={layoutStore.layoutType === 'horizontal'}
          />
          <RadioButton
            onChange={handleInputChange}
            value="horizontal"
            checked={layoutStore.layoutType === 'horizontal'}
          />  */}
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
                  (layoutStore.theme.type !== 'dark' &&
                    layoutStore.theme.type !== 'semidark' &&
                    layoutStore.theme.type !== 'light') ||
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
