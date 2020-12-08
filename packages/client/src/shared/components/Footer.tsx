import React from 'react'
import styled from '@emotion/styled'
import { Container } from './FlexBox'

const Footer = styled(Container)`
  background: transparent;
  border-top: 1px solid #edf2f9;
  justify-content: space-between;
  margin: 0 25px;
  height: 60px;
`

const DashBoardFooter: React.FC = () => {
  return (
    <Footer align="center" justify="space-between">
      <p>a</p>
    </Footer>
  )
}

export default DashBoardFooter
