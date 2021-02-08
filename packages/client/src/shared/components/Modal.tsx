import {css} from '@emotion/react'
import styled from '@emotion/styled'
import React, {useEffect, useRef} from 'react'
import {createPortal} from 'react-dom'
import useOnClickOutside from 'use-onclickoutside'

const modal = document.getElementById('emasa-modal')

const ModalWrap = styled('div')<{isShowing: boolean}>`
  opacity: ${({isShowing}) => (isShowing ? '1' : '0')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({isShowing}) => (isShowing ? '999' : '0')};
  border-radius: 10px;
  padding: 33px;
  max-width: 768px;
  max-height: 90vh;
  width: 100%;
  background: rgb(32, 32, 36);
  box-shadow: rgb(0 0 0 / 56%) 0px 5px 30px;
  border-radius: 5px;
  overflow-y: auto;
  text-align: left;
  cursor: default;
  .tittle {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 1.33em;
    color: rgb(255, 255, 255);
  }
`
const ModalContainer = styled('div')<{isShowing: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({isShowing}) => (isShowing ? '999' : '0')};
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
`

const Modal = ({isShowing, hide, hideWithOutSide, children, tittle}: any) => {
  const ref: any = useRef()
  useOnClickOutside(ref, () => {
    hideWithOutSide(false)
  })

  useEffect(() => {
    console.log(isShowing)
  }, [isShowing])

  function portal() {
    if (!modal) return null
    return createPortal(
      <ModalContainer isShowing={isShowing}>
        <ModalWrap isShowing={isShowing} ref={ref}>
          <h1 className="tittle">{tittle}</h1>
        </ModalWrap>
      </ModalContainer>,
      modal,
    )
  }

  return portal()
}

export default Modal
