import React, {useState} from 'react'
import {observer} from 'mobx-react-lite'
import {toast} from 'react-toastify'
import {Forms} from './styles'
import BoundInput from '../../../shared/components/Input'
import {ChangePassword} from '../../../models/changePasswordModel'
import {useRootStore} from '../../../shared/infra/mobx'
import {sleep} from '../../../shared/utils/sleep'

interface IChangePassword {
  oldPassword: string | null
  newPassword: string | null
  confirmNewPassword: string | null
}
const ChangeUserPassword: React.FC = observer(() => {
  const {currentUserStore, authStore} = useRootStore()
  const [changeState, setState] = useState(false)
  const [passwordModel, setModel] = useState(
    new ChangePassword({
      oldPassword: '',
      password: '',
      confirmPassword: '',
    }),
  )
  const submitHandler = (event: any) => {
    event.preventDefault()
    setState(true)
    currentUserStore
      .changePassword(passwordModel)
      .then(async () => {
        setModel({password: '', confirmPassword: '', oldPassword: ''})
        await sleep(
          toast.success(
            'Senha alterada com sucesso, por favor entre novamente.',
            {autoClose: 3000},
          ),
          3250,
        )
        await authStore.logout()
      })
      .catch((err) => {
        setModel({password: '', confirmPassword: '', oldPassword: ''})
        toast.error(
          err && err.response
            ? err.response.data.message
            : 'Please try again later',
        )
      })
    setState(false)
  }
  return (
    <Forms
      onSubmit={(event) => submitHandler(event)}
      buttonActive={
        passwordModel.confirmPassword.length > 4 &&
        passwordModel.password.length > 4 &&
        passwordModel.oldPassword.length > 4
      }
    >
      <div className="form-item">
        <div className="form-name">
          <label>Senha antiga</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <BoundInput
              model={passwordModel}
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
              model={passwordModel}
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
              model={passwordModel}
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
              disabled={
                changeState
                  ? true
                  : false ||
                    (passwordModel.confirmPassword.length < 4 &&
                      passwordModel.password.length < 4 &&
                      passwordModel.oldPassword.length < 4)
              }
            >
              Alterar senha
            </button>
          </div>
        </div>
      </div>
    </Forms>
  )
})

export default ChangeUserPassword
