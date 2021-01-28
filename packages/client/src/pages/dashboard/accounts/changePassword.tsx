import React from 'react'
import {observer, useLocalStore} from 'mobx-react-lite'
import {Forms} from './styles'
import BoundInput from '../../../shared/components/Input'

interface IChangePassword {
  oldPassword: string | null
  newPassword: string | null
  confirmNewPassword: string | null
}
const ChangePassword: React.FC = observer(() => {
  const passwordStore = useLocalStore(() => ({
    changePassword: {
      confirmNewPassword: null,
      newPassword: null,
      oldPassword: null,
    } as IChangePassword,
  }))
  const submitHandler = (event: any) => {
    event.preventDefault()
  }
  const RenderForms = () => (
    <Forms
      onSubmit={(event) => submitHandler(event)}
      buttonActive={
        (passwordStore.changePassword.confirmNewPassword &&
          passwordStore.changePassword.newPassword &&
          passwordStore.changePassword.oldPassword) !== null
      }
    >
      <div className="form-item">
        <div className="form-name">
          <label>Senha antiga</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <BoundInput
              model={passwordStore.changePassword}
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
              model={passwordStore.changePassword}
              property="newPassword"
              required
              type="password"
              autoComplete="off"
              id="newPassword"
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
              model={passwordStore.changePassword}
              property="confirmNewPassword"
              required
              type="password"
              autoComplete="off"
              id="confirmNewPassword"
            />
          </div>
        </div>
      </div>
      <div className="form-item subBut">
        <div className="form-name" />
        <div className="form-input">
          <div className="wrap-input">
            <button type="button">Alterar senha</button>
          </div>
        </div>
      </div>
    </Forms>
  )
  return RenderForms()
})

export default ChangePassword
