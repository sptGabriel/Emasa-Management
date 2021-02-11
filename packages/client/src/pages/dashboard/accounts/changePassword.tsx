import React, {useState} from 'react'
import {observer} from 'mobx-react-lite'
import {toast} from 'react-toastify'
import {PuffLoader} from 'react-spinners'
import {Forms} from './styles'
import BoundInput from '../../../shared/components/Input'
import {ChangePassword} from '../../../models/changePasswordModel'
import {useRootStore} from '../../../shared/infra/mobx'
import {sleep} from '../../../shared/utils/sleep'

const ChangeUserPassword: React.FC = observer(() => {
  const {currentUserStore, authStore} = useRootStore()
  const [changePasswordSection, setChange] = useState({
    passwordModel: new ChangePassword({
      oldPassword: '',
      password: '',
      confirmPassword: '',
    }),
    changeState: false,
  })
  const submitHandler = async (event: any) => {
    event.preventDefault()
    setChange({...changePasswordSection, changeState: true})
    await sleep({timeout: 1000})
    await currentUserStore
      .changePassword(changePasswordSection.passwordModel)
      .then(() => {
        sleep({
          fn: toast.success(
            'Senha alterada com sucesso, por favor entre novamente.',
            {autoClose: 2000},
          ),
          timeout: 2000,
        })
        authStore.logout()
      })
      .catch((err) => {
        console.log(err)
        toast.error(
          err && err.response
            ? err.response.data.message
            : 'Please try again later',
        )
      })
    setChange({
      passwordModel: new ChangePassword({
        oldPassword: '',
        password: '',
        confirmPassword: '',
      }),
      changeState: false,
    })
  }
  return (
    <Forms
      onSubmit={(event) => submitHandler(event)}
      buttonActive={
        !changePasswordSection.changeState &&
        changePasswordSection.passwordModel.confirmPassword.length > 4 &&
        changePasswordSection.passwordModel.password.length > 4 &&
        changePasswordSection.passwordModel.oldPassword.length > 4
      }
    >
      <div className="form-item">
        <div className="form-name">
          <label>Senha antiga</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <BoundInput
              model={changePasswordSection.passwordModel}
              property="oldPassword"
              type="password"
              required
              autoComplete="off"
              id="oldpassword"
            />
          </div>
        </div>
      </div>
      <div className="form-item">
        <div className="form-name">
          <label>Nova senha</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <BoundInput
              model={changePasswordSection.passwordModel}
              property="password"
              required
              type="password"
              autoComplete="off"
              id="password"
            />
          </div>
        </div>
      </div>
      <div className="form-item">
        <div className="form-name">
          <label>Confirmar nova senha</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <BoundInput
              model={changePasswordSection.passwordModel}
              property="confirmPassword"
              required
              type="password"
              autoComplete="off"
              id="confirmPassword"
            />
          </div>
        </div>
      </div>
      <div className="form-item subBut">
        <div className="form-name" />
        <div className="form-input">
          <div className="wrap-input">
            <button
              type="submit"
              style={{
                minWidth: 104.09,
                cursor:
                  !changePasswordSection.changeState &&
                  changePasswordSection.passwordModel.confirmPassword.length >
                    4 &&
                  changePasswordSection.passwordModel.password.length > 4 &&
                  changePasswordSection.passwordModel.oldPassword.length > 4
                    ? 'pointer'
                    : 'default',
                pointerEvents:
                  !changePasswordSection.changeState &&
                  changePasswordSection.passwordModel.confirmPassword.length >
                    4 &&
                  changePasswordSection.passwordModel.password.length > 4 &&
                  changePasswordSection.passwordModel.oldPassword.length > 4
                    ? 'auto'
                    : 'none',
              }}
            >
              {changePasswordSection.changeState ? (
                <PuffLoader
                  size={18}
                  color="#fff"
                  loading={changePasswordSection.changeState}
                />
              ) : (
                'Alterar senha'
              )}
            </button>
          </div>
        </div>
      </div>
    </Forms>
  )
})

export default ChangeUserPassword
