import {css} from '@emotion/react'
import styled from '@emotion/styled'
import React, {useEffect, useRef} from 'react'
import {createPortal} from 'react-dom'
import useOnClickOutside from 'use-onclickoutside'

const modal = document.getElementById('emasa-modal')

const ModalWrap = styled('div')<{isShowing: boolean}>`
  position: relative;
  width: 100%;
  max-width: 768px;
  max-height: 90vh;
  padding: 33px;
  background: white;
  opacity: ${({isShowing}) => (isShowing ? '1' : '0')};
  border-radius: 5px;
  transform: ${({isShowing}) =>
    isShowing ? 'translateY(0px)' : 'translateY(20px)'};
  transition: transform 0.2s ease-in 0s, opacity 0.2s ease-in 0s;
  overflow-y: auto;
  text-align: left;
  cursor: default;
  .tittle {
    font-size: 24px;
    font-weight: bold;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    margin-bottom: 0.5em;
    color: #000;
  }
`
const EmasaModal = styled('div')<{isShowing: boolean}>`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  visibility: ${({isShowing}) => (isShowing ? 'visible' : 'hidden')};
  opacity: ${({isShowing}) => (isShowing ? '1' : '0')};
  transition: all 0.3s ease 0s;
  cursor: pointer;
`
const ModalContainer = styled('div')<{isShowing: boolean}>`
  position: fixed;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.365);
  color: rgb(255, 255, 255);
  z-index: 9998;
  font-size: 16px;
  opacity: ${({isShowing}) => (isShowing ? '1' : '0')};
  visibility: ${({isShowing}) => (isShowing ? 'visible' : 'hidden')};
  transition: all 0.3s ease 0s;
`

const Modal = ({isShowing, hide, hideWithOutSide, children, tittle}: any) => {
  const ref: any = useRef()
  useOnClickOutside(ref, () => {
    hideWithOutSide(false)
  })

  function portal() {
    if (!modal) return null
    return createPortal(
      <EmasaModal isShowing={isShowing}>
        <ModalContainer isShowing={isShowing}>
          <ModalWrap isShowing={isShowing} ref={ref}>
            <h1 className="tittle">{tittle}</h1>
            {children}
          </ModalWrap>
        </ModalContainer>
      </EmasaModal>,
      modal,
    )
  }

  return portal()
}

export default Modal
