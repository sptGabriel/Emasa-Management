import React from 'react'
import styled from '@emotion/styled'
import {Container} from '../FlexBox'

const Footer = styled('div')<{orientation: string}>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 0;
  color: ${({theme}: any) => `rgb(${theme.footer.text})`};
  height: 60px;
  font-size: 0.875rem;
  font-family: Roboto;
  font-weight: 400;
  background: ${({theme, orientation}: any) =>
    orientation === 'horizontal'
      ? `rgb(${theme.footer.background})`
      : 'transparent'};
  a {
    margin-left: 2px;
  }
`

const DashBoardFooter: React.FC<{orientation: string}> = ({orientation}) => {
  return (
    <Footer orientation={orientation}>
      {orientation === 'horizontal' ? (
        <Container
          wrap="no-wrap"
          style={{
            maxWidth: '1140px',
            width: '100%',
            padding: '0 12px',
            height: '100%',
            margin: '0 auto',
          }}
        >
          2020 © gbcDev. All Rights Reserved. Created by
          <a href="http://github.com/gbcKillua"> @sptDev</a>
        </Container>
      ) : (
        <span>
          2020 © gbcDev. All Rights Reserved. Created by
          <a href="http://github.com/gbcKillua"> @sptDev</a>
        </span>
      )}
    </Footer>
  )
}

export default DashBoardFooter
