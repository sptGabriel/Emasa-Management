import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../../shared/infra/mobx'
import DashBoardFooter from '../../shared/components/Footer'
import NavBar from '../../shared/components/NavBar'
import {Container} from '../../shared/components/FlexBox'

const DashBoardContainer = styled('div')`
  height: 100%;
  width: 100%;
  position: relative;
  background: ${({theme}: any) => `rgb(${theme.background})` || 'lightgrey'};
  ::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: inset 0 0 25px 25px transparent;
    border: solid 3px transparent;
  }
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`
const DashBoardMain = styled('div')<{sticky: boolean}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* height: ${({sticky}) => (sticky ? '100%' : '100%')}; */
  background: ${({theme}: any) => `rgb(${theme.background})` || 'lightgrey'};
  /* display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 60px; */
`
export const OutletWrapper = styled('div')`
  width: 100%;
  min-height: calc(100vh - 130px);
`
export const HorizontalDashBoard: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  const [isSticky, setSticky] = useState(false)
  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 70) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])
  return (
    <DashBoardContainer>
      <NavBar orientation={layoutStore.layoutType} isSticky={isSticky} />
      <DashBoardMain sticky={isSticky}>
        <Container
          wrap="no-wrap"
          flexColumn
          style={{
            maxWidth: '1140px',
            width: '100%',
            padding: '0 12px',
            height: '100%',
            margin: '0 auto',
            flex: '1 1 auto',
          }}
        >
          <div
            style={{
              height: '100vh',
              padding: '50px 0',
            }}
          >
            test
          </div>
        </Container>
        <Container
          wrap="no-wrap"
          flexColumn
          style={{
            maxWidth: '1140px',
            width: '100%',
            padding: '0 12px',
            height: '100%',
            margin: '0 auto',
            flex: '1 1 auto',
          }}
        >
          <div
            style={{
              height: '100vh',
              padding: '50px 0',
            }}
          >
            test
          </div>
        </Container>
        <Container
          wrap="no-wrap"
          flexColumn
          style={{
            maxWidth: '1140px',
            width: '100%',
            padding: '0 12px',
            height: '100%',
            margin: '0 auto',
            flex: '1 1 auto',
          }}
        >
          <div
            style={{
              height: '100vh',
              padding: '50px 0',
            }}
          >
            test
          </div>
        </Container>
        <DashBoardFooter orientation={layoutStore.layoutType}>
          .footer
        </DashBoardFooter>
      </DashBoardMain>
    </DashBoardContainer>
  )
})
