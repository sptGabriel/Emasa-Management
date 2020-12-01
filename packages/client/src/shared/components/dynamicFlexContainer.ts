/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export type TDynamicFlex = {
  column?: boolean;
  align?: string;
  justify?: string;
};
export const dynamicFlex = styled.div<TDynamicFlex>`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  align-items: ${(props) => (props.align ? props.align : 'stretch')};
  justify-content: ${(props) => (props.justify ? props.justify : '	flex-start')};
`;
