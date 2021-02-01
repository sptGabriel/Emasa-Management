import React, {useState} from 'react'
import {observer} from 'mobx-react-lite'
import {toast} from 'react-toastify'
import {useRootStore} from '../../../shared/infra/mobx'
import {sleep} from '../../../shared/utils/sleep'
import {Forms} from './styles'
import {UserModel} from '../../../models/userModel'

const EditInformations: React.FC = observer(() => {
  const {currentUserStore}: any = useRootStore()
  const [onChangeFields, setChanged] = useState(false)
  const [user, setUser] = useState(new UserModel(currentUserStore.currentUser))
  const submitHandler = (event: any) => {
    event.preventDefault()
    currentUserStore
      .editProfile(user)
      .then(async () => {
        await sleep(
          toast.success('Informações trocadas com sucesso !!!', {
            autoClose: 3000,
          }),
          3250,
        )
      })
      .catch((err: any) => {
        toast.error(
          err && err.response
            ? err.response.data.message
            : 'Please try again later',
        )
      })
    setUser({
      ...user,
      last_name: '',
      first_name: '',
      email: '',
      biografia: '',
      username: '',
    })
  }
  const RenderForms = () => {
    return (
      <Forms
        onSubmit={(event) => submitHandler(event)}
        buttonActive={onChangeFields}
      >
        <div className="form-item">
          <div className="form-name">
            <label>Nome</label>
          </div>
          <div className="form-input">
            <div className="wrap-input">
              <input
                value={user.first_name}
                onChange={(e) => {
                  setUser({...user, first_name: e.target.value})
                  setChanged(true)
                }}
                required
                autoComplete="off"
                id="name"
              />
            </div>
          </div>
        </div>
        <div className="form-item">
          <div className="form-name">
            <label>Sobre nome</label>
          </div>
          <div className="form-input">
            <div className="wrap-input">
              <input
                value={user.last_name}
                onChange={(e) => {
                  setUser({...user, last_name: e.target.value})
                  setChanged(true)
                }}
                required
                autoComplete="off"
                id="last_name"
              />
            </div>
          </div>
        </div>
        <div className="form-item">
          <div className="form-name">
            <label>Nome de usuário</label>
          </div>
          <div className="form-input">
            <div className="wrap-input">
              <input
                value={user.username}
                onChange={(e) => {
                  setUser({...user, username: e.target.value})
                  setChanged(true)
                }}
                required
                autoComplete="off"
                id="username"
              />
            </div>
          </div>
        </div>
        <div className="form-item">
          <div className="form-name">
            <label>Biografia</label>
          </div>
          <div className="form-input">
            <div className="wrap-input">
              <input
                value={user.biografia ? user.biografia : ''}
                onChange={(e) => {
                  setUser({...user, biografia: e.target.value})
                  setChanged(true)
                }}
                required
                autoComplete="off"
                id="biografia"
              />
            </div>
          </div>
        </div>
        <div className="form-item">
          <div className="form-name">
            <label>Endereço de email</label>
          </div>
          <div className="form-input">
            <div className="wrap-input">
              <input
                value={user.email}
                onChange={(e) => {
                  setUser({...user, email: e.target.value})
                  setChanged(true)
                }}
                required
                autoComplete="off"
                id="email"
              />
            </div>
          </div>
        </div>
        <div className="form-item">
          <div className="form-name">
            <label>Departamento</label>
          </div>
          <div className="form-input">
            <div className="wrap-input">
              <input
                value={user.departament.departament_name}
                disabled
                autoComplete="off"
                id="departament"
              />
            </div>
          </div>
        </div>
        <div className="form-item subBut">
          <div className="form-name" />
          <div className="form-input">
            <div className="wrap-input">
              <button type="submit">Enviar</button>
            </div>
          </div>
        </div>
      </Forms>
    )
  }
  return RenderForms()
})

export default EditInformations
