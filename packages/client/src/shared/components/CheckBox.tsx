import React from 'react'
import styled from '@emotion/styled'
import {zIndex} from 'styled-system'

const Checkbox = styled('label')`
  width: auto;
  display: flex;
  align-items: inherit;
  justify-content: inherit;
  color: rgba(52, 49, 76, 0.54);
  cursor: pointer;
  input {
    top: 0;
    left: 0;
    width: auto;
    cursor: inherit;
    height: auto;
    margin: 0;
    opacity: 0;
    padding: 0;
    z-index: 1;
    position: absolute;
  }
  .icon {
    fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 1.5rem;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    flex-shrink: 0;
    user-select: none;
    color: rgba(52, 49, 76, 0.54);
  }
`
export default function CheckBox({
  name,
  value,
  tick,
  onCheck,
  label,
  color,
}: {
  name: string
  value: any
  tick: any
  onCheck: any
  label?: string
  color?: string
}) {
  return (
    <label
      style={{alignItems: 'inherit', justifyContent: 'inherit'}}
      className={`fill-current text-current w-auto flex cursor-pointer`}
    >
      <input
        name={name}
        style={{cursor: 'inherit', color}}
        className="top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
        type="checkbox"
        value={value}
        checked={tick || false}
        onChange={onCheck}
      />
      <svg
        className={`fill-current text-current w-6 h-6 inline-flex inline-flex flex-shrink-0 select-none`}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {tick ? (
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        ) : (
          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        )}
      </svg>
    </label>
  )
}
CheckBox.defaultProps = {
  label: undefined,
  color: 'rgba(52, 49, 76, 0.54)',
}
