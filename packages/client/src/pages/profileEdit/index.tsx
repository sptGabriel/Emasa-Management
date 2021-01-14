import React, {useRef, useState} from 'react'
import {AiOutlineCamera} from 'react-icons/ai'
import {observer} from 'mobx-react-lite'
import useOnClickOutside from 'use-onclickoutside'
import {runInAction} from 'mobx'
import {useRootStore} from '../../shared/infra/mobx'
import ChangePicture from '../../shared/components/PictureChange/PictureChangeTool'
import {verifyFile} from '../../shared/utils/verifyFile'
import {EditInfoWrap, EditProfileContainer, UserInfoWrap} from './styles'

const EditProfile: React.FC = observer(() => {
  let imageEditor: any = null
  const [selectedFile, setSelectedFile] = useState(null)
  const [userProfileImage, setUserProfile] = useState(null)
  const [open, setOpen] = useState(false)
  const {currentUserStore, layoutStore} = useRootStore()
  const clickHandler = () => {
    layoutStore.toggleOverlay()
    setOpen(!open)
  }
  const setEditorRef = (editor: any) => (imageEditor = editor)
  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    runInAction(() => {
      layoutStore.overlay = false
    })
    setOpen(false)
  })
  const onImageCrop = () => {
    if (imageEditor !== null) {
      const url = imageEditor.getImageScaledToCanvas().toDataURL()
      setUserProfile(url)
    }
    setOpen(false)
    runInAction(() => {
      layoutStore.overlay = false
    })
  }
  const onImageFileChangeHandler = (e: any) => {
    const file = e.target.files[0]
    const acceptedFileExtensions = ['png', 'jpg', 'jpeg', 'gif']
    if (file !== undefined && verifyFile(file, acceptedFileExtensions)) {
      setSelectedFile(file)
      layoutStore.toggleOverlay()
      setOpen(!open)
    }
  }
  return (
    <EditProfileContainer>
      <UserInfoWrap image={userProfileImage || undefined}>
        <div className="info-card">
          <div className="card-content">
            <label>
              <div className="user_avatar" role="presentation">
                <input
                  hidden
                  type="file"
                  name="profileImg"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    onImageFileChangeHandler(e)
                    e.target.value = ''
                  }}
                />
                <div className="avatar_cam" role="presentation">
                  <AiOutlineCamera size={24} />
                </div>
              </div>
            </label>
            <div className="user_infos">
              <h3 className="user_name">
                {currentUserStore.currentUser?.name}
              </h3>
              <p>{currentUserStore.currentUser?.position}</p>
            </div>
          </div>
        </div>
      </UserInfoWrap>
      <EditInfoWrap>
        <div className="edit-card">
          <div className="card-content">a</div>
        </div>
      </EditInfoWrap>
      <ChangePicture
        setEditorRef={setEditorRef}
        imageFile={selectedFile}
        onImageCrop={onImageCrop}
        setOpen={setOpen}
        open={open}
        reference={ref}
      />
    </EditProfileContainer>
  )
})

export default EditProfile
