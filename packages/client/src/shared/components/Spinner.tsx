import React from 'react'
import styled from '@emotion/styled'

const ESpinnerWrap = styled('div')`
  width: 60px;
  height: 60px;
`
const SVGSpinner = () => {
  return (
    <ESpinnerWrap>
      <svg viewBox="-70 -70 140 140" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="gradient"
            gradientUnits="userSpaceOnUse"
            x2="1"
            y2="-.5"
          >
            <stop stopColor="#076ADB" />
            <stop stopColor="#0189CF" />
            <animateTransform
              attributeName="gradientTransform"
              dur="1s"
              type="rotate"
              values="0; 360"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0.25 0.36 0.75"
            />
          </linearGradient>
        </defs>
        <path
          stroke="url(#gradient)"
          strokeDasharray="90"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.35"
          d="M-5 -61a10 10 0 0110 0l45 26a10 10 0 015 9v52a10 10 0 01-5 9L15 61a10 10 0 01-10 0l-45-26a10 10 0 01-5-9v-52a10 10 0 015-9z"
        >
          <animate
            attributeName="stroke-dashoffset"
            dur="1s"
            repeatCount="indefinite"
            calcMode="spline"
            values="360; 0"
            keySplines="0.64 0.25 0.36 0.75"
          />
        </path>
      </svg>
    </ESpinnerWrap>
  )
}

const ESpinner: React.FC = () => {
  return <SVGSpinner />
}

export default ESpinner
