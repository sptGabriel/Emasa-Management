import React, {useRef, useState} from 'react'
import {AiOutlineCamera} from 'react-icons/ai'
import {observer} from 'mobx-react-lite'
import useOnClickOutside from 'use-onclickoutside'
import {runInAction} from 'mobx'
import {toast} from 'react-toastify'
import {useRootStore} from '../../shared/infra/mobx'
import {verifyFile} from '../../shared/utils/verifyFile'
import {EditInfoWrap, EditProfileContainer, UserInfoWrap} from './styles'
import ImageChanger from '../../shared/components/ImageCrop'

const ProfileChanger: React.FC = observer(() => {
  let imageEditor: any = null
  const [selectedFile, setSelectedFile] = useState(null)
  const [userProfileImage, setUserProfile] = useState(null)
  const [open, setOpen] = useState(false)
  const {currentUserStore, layoutStore, AxiosStore} = useRootStore()
  const setEditorRef = (editor: any) => (imageEditor = editor)
  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    runInAction(() => {
      layoutStore.overlay = false
    })
    setOpen(false)
  })
  //  await AxiosStore.post(`/users/change_profile_image`, {
  //  method: 'POST',
  //  body: JSON.stringify({data: url}),
  //  headers: {'Content-Type': 'application/json'},
  //  })
  //  .then(() => {
  //    console.log('sucess')
  //    toast.success('Image uploaded successfully')
  //  })
  //  .catch((err) => {
  //    console.log(err)
  //    toast.error(err.message)
  //    setOpen(false)
  //    runInAction(() => {
  //      layoutStore.overlay = false
  //    })
  //  })
  const onImageCrop = async () => {
    if (imageEditor !== null) {
      const url = imageEditor.getImageScaledToCanvas().toDataURL()
      setUserProfile(url)
      AxiosStore.post(
        `/users/change_profile_image`,
        JSON.stringify({data: url}),
      )
        .then(() => {
          toast.success('Image uploaded successfully')
        })
        .catch((err) => {
          toast.error(err.message)
          setOpen(false)
          runInAction(() => {
            layoutStore.overlay = false
          })
        })
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

  const RenderCurrentUser = () => (
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
            <h3 className="user_name">{currentUserStore.currentUser?.name}</h3>
            <p>{currentUserStore.currentUser?.position}</p>
          </div>
        </div>
      </div>
    </UserInfoWrap>
  )
  const RenderEdit = () => (
    <EditInfoWrap>
      <div className="edit-card">
        <div className="card-content">a</div>
      </div>
    </EditInfoWrap>
  )
  return (
    <EditProfileContainer>
      {RenderCurrentUser()}
      {RenderEdit()}
      <ImageChanger
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

export default ProfileChanger
