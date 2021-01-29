import React, {useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../../../shared/infra/mobx'
import {LoginActivity} from './styles'
import {UserModel} from '../../../models/userModel'
import windows from '../../../assets/windows.svg'

const UserActivity: React.FC = observer(() => {
  const {currentUserStore}: any = useRootStore()
  const [onChangeFields, setChanged] = useState(false)
  const [user, setUser] = useState(new UserModel(currentUserStore.currentUser))
  const submitHandler = (event: any) => {
    event.preventDefault()
    console.log(user, 'user local')
    console.log(currentUserStore.currentUser, 'store')
  }
  const RenderForms = () => {
    return (
      <LoginActivity>
        <div className="header">
          <h2>Atividade de login</h2>
          <h1>Sessões iniciadas</h1>
        </div>
        <div className="acitivty-item">
          <div className="os">
            <img src={windows} alt="Windows" />
          </div>
          <div className="deviceInfo">
            <span>
              Windows ·<span> Itabuna, BA, Brazil</span>
            </span>
            <span>
              Chrome ·<span style={{color: 'green'}}> Ativo/a agora</span>
            </span>
          </div>
        </div>
      </LoginActivity>
    )
  }
  return RenderForms()
})

export default UserActivity
