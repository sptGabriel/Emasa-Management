import windows from '../../assets/windows.svg'
import phone from '../../assets/smartphone.svg'
import linux from '../../assets/linux.svg'
import random from '../../assets/desconhecido.svg'
import ios from '../../assets/ios.svg'
import mac from '../../assets/mac.svg'

export function getDeviceSVG(device: string) {
  switch (device) {
    case 'windows':
      return windows
    case 'linux':
      return linux
    case 'mac':
      return mac
    case 'android':
      return phone
    case 'ios':
      return ios
    case 'desconhecido':
      return random
    default:
      return random
  }
}
