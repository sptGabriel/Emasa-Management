import styled from '@emotion/styled'
import {animated} from 'react-spring'
import {NoSelect} from '../NoSelect'
import {Container} from '../FlexBox'

export const SideBarCustomizer = styled(animated.div)`
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
export const WrapCustomizer = styled(Container)`
  padding: 0 1.5rem;
`

export const HeaderCustomizer = styled(Container)`
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
export const BodyCustomizer = styled('div')`
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
