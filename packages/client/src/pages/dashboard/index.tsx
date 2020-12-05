import styled from '@emotion/styled'
import React from 'react'
import { Outlet } from 'react-router-dom'
import ContentBox from '../../shared/components/Content'
import { Container } from '../../shared/components/FlexBox'
import DashBoardHeader from '../../shared/components/Header'
import ASide from '../../shared/components/SideBar'

const DashBoardContainer = styled(Container)`
  display: flex;
  flex: auto;
  background: transparent;
  min-height: 0;
`

const DashBoard: React.FC = () => {
  return (
    <DashBoardContainer isHidden flexColumn>
      <DashBoardHeader />
      <ASide />
      <ContentBox>
        <Outlet />
      </ContentBox>
    </DashBoardContainer>
  )
}

export default DashBoard
