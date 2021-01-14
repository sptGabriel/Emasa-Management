import React from 'react'
import { RadioWrap } from './styles'

type RadioButtonProps = {
  color?: string
  label?: string
  bgColor?: string
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
  bgColor,
}: RadioButtonProps) => {
  return (
    <RadioWrap label={label} color={color} bgColor={bgColor}>
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
  bgColor: undefined,
}
export default RadioButton
