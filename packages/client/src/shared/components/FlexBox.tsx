import styled from '@emotion/styled'
import {css} from '@emotion/react'

export type flexDynamic = {
  flexColumn?: boolean
  wrap?: string
  justify?: string
  align?: string
  isHidden?: boolean
  width?: string
}

export const FlexDynamicCSS = (props: flexDynamic) => css`
  display: 'flex';
  flex-direction: ${props.flexColumn ? 'column' : 'row'};
  flex-wrap: ${props.wrap ? 'wrap' : 'nowrap'};
  justify-content: ${props.justify || 'flex-start'};
  align-items: ${props.align || 'stretch'};
  overflow: ${props.isHidden ? 'hidden' : 'visible'};
`

export const Container = styled('div')((props: flexDynamic) => ({
  display: 'flex',
  flexDirection: props.flexColumn ? 'column' : 'row',
  flexWrap: props.wrap ? 'wrap' : 'nowrap',
  justifyContent: props.justify || 'flex-start',
  alignItems: props.align || 'stretch',
  overflow: props.isHidden ? 'hidden' : 'visible',
}))
