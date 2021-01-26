import styled from "@emotion/styled";

export const RadioWrap = styled('label')<{label?: string; bgColor?: string}>`
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: ${({label}) => (label ? '0.4em' : '0')};
  cursor: pointer;
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }
  &:focus-within {
    .radio__label {
      transform: scale(1.05);
      opacity: 1;
    }
  }
  .radio__label {
    display: ${({label}) => (label ? 'flex' : 'none')};
    align-items: center;
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    color: #626262;
    font-weight: 400;
    transition: 180ms all ease-in-out;
    opacity: 1;
    cursor: pointer;
  }
  .radio__input {
    display: flex;
    align-items: center;
    input {
      opacity: 0;
      width: 0;
      height: 0;
      &:checked + .radio__control {
        background: ${({bgColor}) => (bgColor ? `rgb(${bgColor})` : '#0189cf')};
        border-color: ${({bgColor}) =>
          bgColor ? `rgb(${bgColor})` : '#0189cf'};
        box-shadow: 0 3px 8px 0
          ${({bgColor}) =>
            bgColor ? `rgba(${bgColor}, 0.4)` : 'rgba(1, 137, 207, 0.4)'};
      }
    }
  }
  .radio__control {
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${({bgColor}) => (bgColor ? `rgb(${bgColor})` : 'transparent')};
    border: 2px solid rgb(200, 200, 200);
    border-color: rgb(200, 200, 200);
    transform: translateY(-0.05em);
  }
`