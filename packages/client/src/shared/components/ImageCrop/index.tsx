import React, {Fragment, useState} from 'react'
import AvatarEditor from 'react-avatar-editor'
import Button from '../Button'
import {Container} from '../FlexBox'

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
        <Button click={onImageCrop}>Cortar Foto</Button>
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
