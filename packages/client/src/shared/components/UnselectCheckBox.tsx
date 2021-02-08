import React from 'react'
import styled from '@emotion/styled'

const Checkbox = styled('label')`
  width: 100%;
  display: flex;
  align-items: inherit;
  justify-content: inherit;
  color: rgba(52, 49, 76, 0.54);
  cursor: pointer;
  input {
    top: 0;
    left: 0;
    width: 100%;
    cursor: inherit;
    height: 100%;
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
export default function UnselectCheckBox({
  name,
  value,
  tick,
  onCheck,
  label,
}: {
  name: string
  value: any
  tick: any
  onCheck: any
  label?: string
}) {
  return (
    <Checkbox>
      <input
        name={name}
        type="checkbox"
        value={value}
        checked={tick || false}
        onChange={onCheck}
      />
      <svg
        className="icon"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {tick ? (
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
          </svg>
        ) : (
          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        )}
      </svg>
    </Checkbox>
  )
}
UnselectCheckBox.defaultProps = {
  label: undefined,
}
