import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../../../shared/infra/mobx'
import {LoginActivity, Test} from './styles'
import {DeviceModel} from '../../../models/deviceModel'
import {getDeviceSVG} from '../../../shared/utils/getDeviceSVG'
import {capitalizeFirstLetter} from '../../../shared/utils/capitalizeFirstLetter'
import {formatAcccess} from '../../../shared/utils/formatAccessDate'

const UserActivity: React.FC = observer(() => {
  const {currentUserStore}: any = useRootStore()
  const [devices, setActive] = useState(
    currentUserStore.currentUser.devices.map((device: any) => {
      return {
        ...device,
        active: false,
      }
    }),
  )
  const RenderDevices = () =>
    devices.map((device: any, index: number) => {
      function over() {
        setActive((devices: any) =>
          devices.map((item: any) => ({
            ...item,
            active: item.id === device.id ? true : false,
          })),
        )
      }
      function out() {
        setActive((devices: any) =>
          devices.map((item: any) => ({
            ...item,
            active: item.id === device.id ? false : false,
          })),
        )
      }
      return (
        <div className="acitivty-item" key={index}>
          <div className="os">
            <img src={getDeviceSVG(device.device)} alt="Windows" />
          </div>
          <div className="deviceInfo">
            <span>
              {capitalizeFirstLetter(device.device)} ·
              <Test
                active={device.active}
                onFocus={over}
                onBlur={out}
                onMouseOver={over}
                onMouseOut={out}
              >
                <div className="ip">IP: {device.ip}</div>
                {device.city
                  ? ` ${capitalizeFirstLetter(device.city)} 
                    ${capitalizeFirstLetter(device.state)}
                    ${capitalizeFirstLetter(device.country)}`
                  : 'Desconhecido'}
              </Test>
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
      )
    })
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
