import React, {useRef} from 'react'
import styled from '@emotion/styled'
import {IoMdClose} from 'react-icons/io'
import {createPortal} from 'react-dom'
import useOnClickOutside from 'use-onclickoutside'

const modal = document.getElementById('emasa-modal')

const Modal = ({
  isShowing,
  hide,
  hideWithOutSide,
  children,
  tittle,
  width,
}: any) => {
  const ref: any = useRef()
  useOnClickOutside(ref, () => {
    hideWithOutSide(false)
  })

  function portal() {
    if (!modal) return null
    return createPortal(
      <div
        style={{
          visibility: isShowing ? 'visible' : 'hidden',
          opacity: isShowing ? 1 : 0,
        }}
        className="fixed flex top-0 right-0 bottom-0 left-0 z-999"
      >
        <div
          style={{
            visibility: isShowing ? 'visible' : 'hidden',
            opacity: isShowing ? 1 : 0,
          }}
          className="grid grid-rows-modal grid-cols-modal w-full h-full overflow-hidden bg-modal"
        >
          <div
            style={{
              opacity: isShowing ? 1 : 0,
              outline: 'none',
            }}
            className="transition transform motion-reduce:transition-none motion-reduce:transform-none scale-100	col-start-2 row-start-2 min-h-full"
          >
            <div
              ref={ref}
              style={{
                minWidth: '296px',
                maxWidth: width ? width : '600px',
                margin: '0 auto',
                maxHeight: 'calc(100vh - 80px)',
              }}
              className="w-full col-start-2 rounded-md shadow-md overflow-hidden bg-white flex flex-col"
            >
              <div
                style={{boxShadow: 'inset 0 -1px #e3e8ee'}}
                className="px-5 py-5 flex-auto font-medium text-base"
              >
                <h1 className="tittle">{tittle}</h1>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>,
      modal,
    )
  }

  return portal()
}

export default Modal
