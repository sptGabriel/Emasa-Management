import React, {memo, useEffect, useRef, useState} from 'react'
import {NavLink, Outlet, useLocation} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {runInAction} from 'mobx'
import useOnClickOutside from 'use-onclickoutside'
import {toast} from 'react-toastify'
import {AiOutlineCamera} from 'react-icons/ai'
import {useTheme} from '@emotion/react'
import {
  AccountsWrap,
  Article,
  AvatarProfile,
  LISettings,
  ULSettings,
  UserInfoWrap,
} from './styles'
import BreadCrumb from '../../../shared/components/BreadCrumb'
import {createBackgroundImage} from '../../../shared/utils/createCloudinaryBG'
import {useRootStore} from '../../../shared/infra/mobx'
import {verifyFile} from '../../../shared/utils/verifyFile'
import {ValidateSize} from '../../../shared/utils/validateSize'
import ImageChanger from '../../../shared/components/ImageCrop'
import CepSpinner from '../../../shared/components/Spinner/cepSpinner'

export interface ISettingsTag {
  id: number
  Name: string
  Url: string
}
const SettingsTag: ISettingsTag[] = [
  {
    id: 1,
    Name: 'Editar perfil',
    Url: '',
  },
  {
    id: 2,
    Name: 'Alterar senha',
    Url: 'password/change',
  },
  {
    id: 3,
    Name: 'Alterar endereço',
    Url: 'address/change',
  },
  {
    id: 4,
    Name: 'Atividade de login',
    Url: 'login_activity',
  },
]

const RenderAvatar = observer(() => {
  let imageEditor: any = null
  const Location = useLocation()
  const theme: any = useTheme()
  const {currentUserStore, layoutStore} = useRootStore()
  const [selectedFile, setSelectedFile] = useState(null)
  const [open, setOpen] = useState(false)
  //  editor ref
  const setEditorRef = (editor: any) => (imageEditor = editor)
  //  outside click
  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    runInAction(() => {
      layoutStore.overlay = false
    })
    setOpen(false)
  })
  //  outside click
  //  image crop event
  const onImageCrop = async () => {
    if (imageEditor !== null) {
      const url = imageEditor.getImageScaledToCanvas().toDataURL()
      if (!url) return
      currentUserStore
        .changeAvatar(url)
        .then(() => toast.success('Image uploaded successfully'))
        .catch((err) => toast.error(err.message))
      setOpen(false)
      layoutStore.setOverlay(false)
    }
  }
  //  image changer
  const onImageFileChangeHandler = (e: any) => {
    const file = e.target.files[0]
    const acceptedFileExtensions = ['jpg', 'jpeg', 'png']
    const validSize = ValidateSize(file, 2)
    const validFileExt = verifyFile(file, acceptedFileExtensions)
    if (!file) return
    if (!validSize) {
      toast.error('File size must under 2MiB!')
      return
    }
    if (!validFileExt) {
      toast.error('Invalid file Format!')
      return
    }
    setSelectedFile(file)
    layoutStore.setOverlay(true)
    setOpen(!open)
    return undefined
  }
  return (
    <>
      <UserInfoWrap
        style={{
          display:
            Location.pathname === '/dashboard/accounts/login_activity'
              ? 'none'
              : 'flex',
        }}
      >
        <div className="card-content">
          <AvatarProfile
            image={createBackgroundImage(currentUserStore.currentUser.avatar)}
          >
            {Location.pathname === '/dashboard/accounts/edit' ? (
              <label>
                <div className="avatar">
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
                  <div className="avatar_cam">
                    <AiOutlineCamera size={20} />
                  </div>
                </div>
              </label>
            ) : (
              <div className="avatar" style={{cursor: 'auto'}} />
            )}
          </AvatarProfile>
          <div className="user_infos">
            <h1 className="user_name">
              {`${currentUserStore.currentUser.first_name}
           ${currentUserStore.currentUser.last_name}`}
            </h1>
            <span>
              <h1>Cargo: </h1>
              <p>{currentUserStore.currentUser?.position}</p>
            </span>
          </div>
        </div>
      </UserInfoWrap>
      <ImageChanger
        setEditorRef={setEditorRef}
        imageFile={selectedFile}
        onImageCrop={onImageCrop}
        setOpen={setOpen}
        open={open}
        reference={open ? ref : null}
      />
    </>
  )
})

const MemoizedAvatar = memo(RenderAvatar)

const Accounts: React.FC = observer(() => {
  // const Location = useLocation()
  const {layoutStore} = useRootStore()
  // const [breadCrumb, setBreadCrum] = useState([''])
  const [accountsTags] = useState(SettingsTag)
  // useEffect(() => {
  //   switch (Location.pathname) {
  //     case '/dashboard/accounts/login_activity':
  //       return setBreadCrum(['Dashboard', 'Conta', 'Atividade de login'])
  //     case '/dashboard/accounts/edit':
  //       return setBreadCrum(['Dashboard', 'Conta', 'Alterar Informações'])
  //     case '/dashboard/accounts/password/change':
  //       return setBreadCrum(['Dashboard', 'Conta', 'Alterar senha'])
  //     case '/dashboard/accounts/address/change':
  //       return setBreadCrum(['Dashboard', 'Conta', 'Alterar endereço'])
  //     default:
  //       return setBreadCrum(['Dashboard', 'Conta', 'Alterar Informações'])
  //   }
  // }, [Location.pathname])
  return (
    <>
      {/* <BreadCrumb path={breadCrumb} /> */}
      <AccountsWrap>
        <ULSettings>
          {accountsTags.map((item) => (
            <LISettings key={item.id}>
              <NavLink activeClassName="active" to={item.Url} end replace>
                {item.Name}
              </NavLink>
            </LISettings>
          ))}
        </ULSettings>
        <Article>
          <MemoizedAvatar />
          <Outlet />
        </Article>
      </AccountsWrap>
      {layoutStore.CepSearching ? (
        <div
          style={{
            width: '200px',
            height: '200px',
            display: 'flex',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CepSpinner />
        </div>
      ) : (
        ''
      )}
    </>
  )
})

export default Accounts
