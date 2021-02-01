import React, {useState} from 'react'
import {observer} from 'mobx-react-lite'
import {toast} from 'react-toastify'
import {PuffLoader} from 'react-spinners'
import {useRootStore} from '../../../shared/infra/mobx'
import {sleep} from '../../../shared/utils/sleep'
import {Forms} from './styles'
import {UserModel} from '../../../models/userModel'

const EditInformations: React.FC = observer(() => {
  const {currentUserStore}: any = useRootStore()
  const [editSection, setEdition] = useState({
    loading: false,
    fieldChange: false,
    user: new UserModel(currentUserStore.currentUser),
  })
  const submitHandler = async (event: any) => {
    event.preventDefault()
    setEdition({...editSection, loading: true})
    await currentUserStore
      .editProfile(editSection.user)
      .then(async () => {
        await currentUserStore.pullUser()
        await sleep(
          toast.success('Informações atualizadas com sucesso !!!', {
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
    setEdition({...editSection, loading: false})
  }
  return (
    <Forms
      onSubmit={(event) => submitHandler(event)}
      buttonActive={editSection.fieldChange}
    >
      <div className="form-item">
        <div className="form-name">
          <label>Nome</label>
        </div>
        <div className="form-input">
          <div className="wrap-input">
            <input
              value={editSection.user.first_name}
              onChange={(e) => {
                setEdition({
                  ...editSection,
                  fieldChange: true,
                  user: {...editSection.user, first_name: e.target.value},
                })
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
              value={editSection.user.last_name}
              onChange={(e) => {
                setEdition({
                  ...editSection,
                  fieldChange: true,
                  user: {...editSection.user, last_name: e.target.value},
                })
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
              value={editSection.user.username}
              onChange={(e) => {
                setEdition({
                  ...editSection,
                  fieldChange: true,
                  user: {...editSection.user, username: e.target.value},
                })
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
              value={
                editSection.user.biografia ? editSection.user.biografia : ''
              }
              onChange={(e) => {
                setEdition({
                  ...editSection,
                  fieldChange: true,
                  user: {...editSection.user, biografia: e.target.value},
                })
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
              value={editSection.user.email}
              onChange={(e) => {
                setEdition({
                  ...editSection,
                  fieldChange: true,
                  user: {...editSection.user, email: e.target.value},
                })
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
              value={editSection.user.departament.departament_name}
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
            <button type="submit">
              {editSection.loading ? (
                <PuffLoader
                  size={18}
                  color="#fff"
                  loading={editSection.loading}
                />
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </div>
      </div>
    </Forms>
  )
})

export default EditInformations
