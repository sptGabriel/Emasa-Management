import React from 'react'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../../../shared/infra/mobx'
import {LoginActivity} from './styles'
import windows from '../../../assets/windows.svg'
import {DeviceModel} from '../../../models/deviceModel'
import {getDeviceSVG} from '../../../shared/utils/getDeviceSVG'
import {capitalizeFirstLetter} from '../../../shared/utils/capitalizeFirstLetter'
import {formatAcccess} from '../../../shared/utils/formatAccessDate'

const UserActivity: React.FC = observer(() => {
  const {currentUserStore}: any = useRootStore()
  const RenderDevices = () =>
    currentUserStore.currentUser.devices.map((device: DeviceModel) => (
      <div className="acitivty-item">
        <div className="os">
          <img src={getDeviceSVG(device.device)} alt="Windows" />
        </div>
        <div className="deviceInfo">
          <span>
            {capitalizeFirstLetter(device.device)} ·
            <span>
              {` ${capitalizeFirstLetter(device.city)}`},
              {` ${capitalizeFirstLetter(device.state)}`},
              {` ${capitalizeFirstLetter(device.country)}`}
            </span>
          </span>
          <span>
            {capitalizeFirstLetter(device.browser)} ·
            <span style={{color: device.online ? 'green' : '#5E6269'}}>
              {` ${
                device.online
                  ? 'Ativo/a agora'
                  : formatAcccess(device.accessTime)
              }`}
            </span>
          </span>
        </div>
      </div>
    ))
  return (
    <LoginActivity>
      <div className="header">
        <h2>Atividade de login</h2>
        <h1>Sessões iniciadas</h1>
      </div>
      {RenderDevices()}
    </LoginActivity>
  )
})

export default UserActivity
