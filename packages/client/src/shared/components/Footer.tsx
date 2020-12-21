import React from 'react'
import styled from '@emotion/styled'
import {Container} from './FlexBox'

const Footer = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 0;
  color: #6c757d;
  height: 60px;
  font-size: 0.875rem;
  font-family: Roboto;
  font-weight: 400;
  a {
    margin-left: 2px;
  }
`

const DashBoardFooter: React.FC = () => {
  return (
    <Footer>
      2020 © gbcDev. All Rights Reserved. Created by
      <a href="http://github.com/gbcKillua"> @sptDev</a>
    </Footer>
  )
}

export default DashBoardFooter
