import styled from '@emotion/styled'

export const BreadCrumbWrap = styled('div')`
  width: 100%;
  height: 80px;
  .bread-header {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .page-name {
    color: ${({theme}: any) => `rgb(${theme.primary})`};
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    font-family: Poppins;
  }
  .bread-content {
    display: flex;
    align-items: center;
  }
  ol {
    svg {
      color: ${({theme}: any) => `rgb(${theme.primary})`};
    }
    margin-left: 30px;
    display: flex;
    li:nth-of-type(n + 2) {
      padding-left: 0.5rem;
      color: ${({theme}: any) =>
        theme.type === 'semidark' || theme.type === 'light'
          ? '#6c757d'
          : 'white'};
    }
  }
`
