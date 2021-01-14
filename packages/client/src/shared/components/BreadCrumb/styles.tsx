import styled from "@emotion/styled";

export const BreadCrumbWrap = styled('div')`
  width: 100%;
  height: 80px;
  .bread-header {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .page-name {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  .bread-content {
    display: flex;
    align-items: center;
  }
  ol {
    margin-left: 30px;
    display: flex;
    li:nth-of-type(n + 2) {
      padding-left: 0.5rem;
      color: #6c757d;
    }
  }
`