import React, {Fragment, useState} from 'react'
import AvatarEditor from 'react-avatar-editor'
import {AiOutlineClose} from 'react-icons/ai'
import {useRootStore} from '../../infra/mobx'
import Button from '../Button'
import {Container} from '../FlexBox'
import {ImageChangeWrap, Header, Body} from './styles'

export const ImageCrop: React.FC<{
  imagefile: any
  setEditorRef: any
  onImageCrop: any
}> = ({setEditorRef, onImageCrop, imagefile}) => {
  const [scaleValue, setScaleValue] = useState(1)

  const onScaleChange = (e: any) => {
    const value = parseFloat(e.target.value)
    setScaleValue(value)
  }

  const renderEditor = () => (
    <Container
      align="center"
      justify="center"
      flexColumn
      style={{marginBottom: '20px'}}
    >
      <AvatarEditor
        image={imagefile}
        border={5}
        scale={scaleValue}
        rotate={0}
        ref={setEditorRef}
      />
    </Container>
  )

  const renderInputScale = () => (
    <Container align="center" justify="center" flexColumn>
      <div style={{marginBottom: '15px'}}>
        <input
          type="range"
          value={scaleValue}
          min="1"
          max="10"
          className="actions"
          onChange={(e) => onScaleChange(e)}
        />
      </div>
      <div>
        <Button
          click={(e: any) => {
            onImageCrop()
            setScaleValue(1)
          }}
        >
          Trocar foto de perfil
        </Button>
      </div>
    </Container>
  )
  return (
    <Fragment>
      {renderEditor()}
      {renderInputScale()}
    </Fragment>
  )
}

const ImageChanger: React.FC<{
  open: boolean
  reference: React.MutableRefObject<any> | null
  setOpen: any
  imageFile: any
  setEditorRef: any
  onImageCrop: any
}> = ({open, reference, setOpen, setEditorRef, imageFile, onImageCrop}) => {
  const {layoutStore} = useRootStore()
  const clickHandler = () => {
    layoutStore.setOverlay(false)
    setOpen(false)
  }
  return (
    <ImageChangeWrap open={open} ref={reference}>
      <Header>
        <h2>Atualizar a foto de perfil</h2>
      </Header>
      <span className="close" onClick={clickHandler} role="presentation">
        <AiOutlineClose size={32} />
      </span>
      <Body>
        <ImageCrop
          imagefile={imageFile}
          setEditorRef={setEditorRef}
          onImageCrop={onImageCrop}
        />
      </Body>
    </ImageChangeWrap>
  )
}

export default ImageChanger
