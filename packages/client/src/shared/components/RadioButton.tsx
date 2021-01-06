import styled from '@emotion/styled/macro'
import React from 'react'

type RadioButtonProps = {
  color?: string
  label?: string
  name: string
  id: string
  value: string
  checked?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const RadioButton = ({
  onChange,
  value,
  label,
  checked,
  name,
  color,
  id,
}: RadioButtonProps) => {
  return (
    <RadioWrap label={label} color={color}>
      <span className="radio__input">
        <input
          type="radio"
          className="radio"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <span className="radio__control" />
      </span>
      <span className="radio__label">{label}</span>
    </RadioWrap>
  )
}

RadioButton.defaultProps = {
  checked: false,
  label: undefined,
  color: '#000',
}

const RadioWrap = styled('label')<{label?: string}>`
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
        background: #0189cf;
        border-color: #0189cf;
        box-shadow: 0 3px 12px 0 rgba(1, 137, 207, 0.4);
      }
    }
  }
  .radio__control {
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgb(200, 200, 200);
    border-color: rgb(200, 200, 200);
    transform: translateY(-0.05em);
  }
`

//  const RadioButton = ({onChange, value, label, checked}: RadioButtonProps) => {
//  return (
//    <RadioButtonWrapper onClick={() => onChange(value)} label={label}>
//      <label className="container">
//        {label}
//        <input type="radio" name={value} value={value} checked={checked} />
//        <span className="checkmark" />
//      </label>
//    </RadioButtonWrapper>
//  )
//  }

//  const RadioButtonWrapper = styled('div')<{label?: string}>`
//  font-family: Montserrat, Helvetica, Arial, sans-serif;
//  line-height: 1;
//  color: #626262;
//  font-weight: 400;
//  .container {
//    display: flex;
//    align-items: center;
//    position: relative;
//    padding-left: ${({label}) => (label ? '25px' : '0')};
//    min-height: 18px;
//    min-width: 18px;
//    cursor: pointer;
//    -webkit-user-select: none;
//    -moz-user-select: none;
//    -ms-user-select: none;
//    user-select: none;
//  }
//  input {
//    position: absolute;
//    opacity: 0;
//    cursor: pointer;
//    height: 0;
//    width: 0;
//  }
//  .checkmark {
//    position: absolute;
//    top: -2px;
//    left: 0;
//    height: 18px;
//    width: 18px;
//    background: transparent;
//    border: 2px solid rgb(200, 200, 200);
//    border-radius: 100vh;
//  }
//  input:checked ~ .checkmark {
//    background-color: #2196f3;
//    border: 2px solid #2196f3;
//    box-shadow: 0 3px 12px 0 rgba(33, 150, 243, 0.4);
//  }
//  .checkmark:after {
//    content: '';
//    position: absolute;
//    display: none;
//  }
//  input:checked ~ .checkmark:after {
//    display: block;
//  }
//  `

export default RadioButton
