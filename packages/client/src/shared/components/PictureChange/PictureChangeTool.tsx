import React, {useState} from 'react'
import styled from '@emotion/styled'
import {CgCloseR} from 'react-icons/cg'
import {useRootStore} from '../../infra/mobx'
import {ImageCrop} from '../ImageCrop'

const ChangePictureWrap = styled('div')<{open: boolean}>`
  display: ${({open}) => (open ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  max-width: 700px;
  width: 100%;
  border-radius: 8px;
  height: 600px;
  background: ${({theme}: any) => `rgb(${theme.background})`};
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  z-index: 999;
  line-height: 1.2;
  .close {
    position: absolute;
    top: 12px;
    right: 16px;
    cursor: pointer;
  }
`
const Header = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
  height: 60px;
  border-bottom: 1px solid black;
  h2 {
    font-size: 1.25rem;
    font-weight: 700;
  }
`
const Body = styled('div')`
  padding: 20px 60px;
`
const ChangePicture: React.FC<{
  open: boolean
  reference: React.MutableRefObject<any>
  setOpen: any
  imageFile: any
  setEditorRef: any
  onImageCrop: any
}> = ({open, reference, setOpen, setEditorRef, imageFile, onImageCrop}) => {
  const {layoutStore} = useRootStore()
  const clickHandler = () => {
    layoutStore.toggleOverlay()
    setOpen(false)
  }
  return (
    <ChangePictureWrap open={open} ref={reference}>
      <Header>
        <h2>Atualizar a foto de perfil</h2>
      </Header>
      <span className="close" onClick={clickHandler} role="presentation">
        <CgCloseR size={32} />
      </span>
      <Body>
        <ImageCrop
          imagefile={imageFile}
          setEditorRef={setEditorRef}
          onImageCrop={onImageCrop}
        />
      </Body>
    </ChangePictureWrap>
  )
}

export default ChangePicture
