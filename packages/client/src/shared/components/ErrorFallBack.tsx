import React from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../infra/mobx'
import {Container} from './FlexBox'
import errorSvg from '../../assets/error.svg'
import errorBg from '../../assets/bgerror.svg'

export const ErrorBoundaryContainer = styled(Container)<{isAuth: boolean}>`
  min-height: ${({isAuth}) => (isAuth ? 'calc(100vh - 130px)' : '100vh')};
  width: 500px;
  margin: 0 auto;
  border-radius: 8px;
  .buttons {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    button:nth-of-type(2) {
      background: #4285f4;
      color: #fff;
      transition: background-color 0.3s, color 0.3s;
      border-radius: 5px;
      border: 1px solid #0868c2;
      :hover {
        background: #0868c2;
      }
    }
    button:first-of-type {
      margin-right: 15px;
      color: #a2d1fc;
      background: transparent;
      border: 1px solid #a2d1fc;
      transition: background-color 0.3s, color 0.3s;
      border-radius: 5px;
      /* :hover {
        color: #fff;
        background: #a2d1fc;
        border: 1px solid #a2d1fc;
      } */
    }
    button {
      float: left;
      min-width: 150px;
      max-width: 250px;
      display: block;
      margin-top: 1em;
      padding: 0.8em 2.4em;
      border: none;
      background: none;
      position: relative;
      z-index: 1;
      overflow: hidden;
      transition: color 0.3s;
      font-size: 1em;
    }
  }
  img {
    width: 200px;
    margin-bottom: 20px;
  }
  .title_wrong {
    color: #076adb;
    font-size: 2.5rem;
    white-space: nowrap;
    font-weight: bold;
    letter-spacing: 2px;
    font-family: Rubik, sans-serif;
    margin-bottom: 5px;
  }
  .subtittle_wrong {
    color: #595b5f;
    white-space: nowrap;
    font-size: 0.8rem;
    font-family: Rubik, sans-serif;
    margin-bottom: 5px;
  }
`
const ContainerFluid = styled('div')<{isAuth: boolean}>`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  overflow: hidden;
  padding: 0 !important;
  background: ${({theme, isAuth}: any) =>
    isAuth ? theme.backgroundSecondary : '#fff'};
  /* background: url(${errorBg}), ${({theme}: any) => theme.background};
  background-repeat: no-repeat;
  background-size: 100% 100%; */
`
const Row = styled(Container)``

const Col = styled('div')`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
`

const ErrorFallback = observer(() => {
  const {authStore} = useRootStore()
  return (
    <ContainerFluid isAuth={authStore.isAuth}>
      <Row wrap="true" flexColumn>
        <Col>
          <ErrorBoundaryContainer
            isAuth={authStore.isAuth}
            align="center"
            justify="center"
            flexColumn
          >
            <img src={errorSvg} alt="error" />
            <h1 className="title_wrong">Something went wrong!</h1>
            <p className="subtittle_wrong">
              {` Looks like this page is missing. Don't worry though. Our best man
              is on the case. `}
            </p>
            <p className="subtittle_wrong">
              Report error or back to home page.
            </p>
            <div className="buttons">
              <button className="report" type="button">
                Error Details
              </button>
              <button className="reload" type="button">
                Back To Home
              </button>
            </div>
          </ErrorBoundaryContainer>
        </Col>
      </Row>
    </ContainerFluid>
  )
})
export default ErrorFallback
