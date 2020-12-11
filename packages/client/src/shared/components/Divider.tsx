import React from 'react'
import styled from '@emotion/styled'

const VerticalSplit = styled('li')`
  display: block !important;
  width: 1px;
  margin: 10px 20px;
  background: #838598;
  height: 40px;
`
const VerticalDivider: React.FC = () => {
  return <VerticalSplit />
}

export default VerticalSplit
