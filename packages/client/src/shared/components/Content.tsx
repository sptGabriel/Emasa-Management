/* eslint-disable react/prop-types */
import React from 'react'
import styled from '@emotion/styled/macro'
import {Outlet} from 'react-router-dom'
import {Container} from './FlexBox'
import DashBoardFooter from './Footer'
/* Content Styles Start */
const ContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: auto;
  background: transparent;
  min-height: 0;
  padding-left: 250px;
  overflow-x: hidden;
  min-height: 0;
`
const AppContent = styled('div')`
  padding: 25px;
  margin-top: 70px;
  min-height: calc(100vh - 130px);
  background: transparent;
  position: relative;
`
const DashBoardContent: React.FC = ({children}) => {
  return (
    <ContentContainer>
      <AppContent>{children}</AppContent>
      {/* <DashBoardFooter />  */}
    </ContentContainer>
  )
}

export default DashBoardContent
