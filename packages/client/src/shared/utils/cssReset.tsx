import React from 'react'
import {Global, css} from '@emotion/react'
// export const CSSReset = createGlobalStyle`
//         @import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
//         @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
//         @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
//         @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;1,300&display=swap');
//         @import url('https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap');
//         @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
//         body > #root {
//           height: 100%;
//         }

//         * {
//           margin: 0px;
//         padding: 0px;
//         box-sizing: border-box;
//         }
//         /* *,
//         *::before,
//         *::after {
//           box-sizing: border-box;
//         } */
//         *:focus {
//           outline: 0;
//           outline: none;
//         }
//         input:-webkit-autofill,
//         input:-webkit-autofill:hover,
//         input:-webkit-autofill:focus,
//         input:-webkit-autofill:active {
//             transition: all 5000s ease-in-out 0s;
//             transition-property: background-color, color;
//         }
//         a {
//           text-decoration: none;
//           color: inherit;
//           cursor: pointer;
//         }
//         button {
//           background-color: transparent;
//           color: inherit;
//           border-width: 0;
//           padding: 0;
//           cursor: pointer;
//         }
//         figure {
//           margin: 0;
//         }
//         input::-moz-focus-inner {
//           border: 0;
//           padding: 0;
//           margin: 0;
//         }
//         ul,
//         ol,
//         dd {
//           margin: 0;
//           padding: 0;
//           list-style: none;
//         }
//         h1,
//         h2,
//         h3,
//         h4,
//         h5,
//         h6 {
//           margin: 0;
//           font-size: inherit;
//           font-weight: inherit;
//         }
//         p {
//           margin: 0;
//         }
//         cite {
//           font-style: normal;
//         }
//         fieldset {
//           border-width: 0;
//           padding: 0;
//           margin: 0;
//         }
//         html {
//           height: 100%;
//           font-size: 62.5%;
//         }
//         body {
//           height: 100%;
//           font-family: Roboto, sans-serif, Poppins;
//           background: rgb(18, 18, 20);
//           text-rendering: optimizelegibility !important;
//           -webkit-font-smoothing: antialiased !important;
//           /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
//             'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
//             sans-serif; */
//         }
// `
const GlobalStyle: React.FC = () => {
  // const Theme: any = useTheme();
  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600&display=swap');
        body > #emasa {
          height: 100%;
        }
        * {
          margin: 0px;
          padding: 0px;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }
        /* *,
        *::before,
        *::after {
          box-sizing: border-box;
        } */
        *:focus {
          outline: 0;
          outline: none !important;
          box-shadow: none;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          transition: all 5000s ease-in-out 0s;
          transition-property: background-color, color;
        }
        a {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        button {
          background-color: transparent;
          color: inherit;
          border-width: 0;
          padding: 0;
          cursor: pointer;
        }
        figure {
          margin: 0;
        }
        input::-moz-focus-inner {
          border: 0;
          padding: 0;
          margin: 0;
        }
        ul,
        ol,
        dd {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          font-size: inherit;
          font-weight: inherit;
        }
        p {
          margin: 0;
        }
        cite {
          font-style: normal;
        }
        fieldset {
          border-width: 0;
          padding: 0;
          margin: 0;
        }
        html {
          line-height: 1.5;
          letter-spacing: 0.01rem;
        }
        body {
          height: 100%;
          ::-webkit-scrollbar-track {
            background: transparent;
            box-shadow: inset 0 0 25px 25px transparent;
            border: solid 3px transparent;
          }
          ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
          overflow-x: hidden;
          font-family: Roboto, sans-serif, Poppins;
          background-color: #fafafb;
          text-rendering: optimizelegibility !important;
          -webkit-font-smoothing: antialiased !important;
          /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif; */
        }
      `}
    />
  )
}

export default GlobalStyle
