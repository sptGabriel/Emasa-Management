import {keyframes} from '@emotion/react'

export const emasaAnimation = keyframes`
	2%,64%{
		transform: translate(2px,0) skew(0deg);
	}
	4%,60%{
		transform: translate(-2px,0) skew(2deg);
	}
	62%{
		transform: translate(0,0) skew(50deg); 
	}
`
