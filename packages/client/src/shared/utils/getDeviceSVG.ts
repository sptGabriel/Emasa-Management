import windows from '../../assets/windows.svg'
import phone from '../../assets/smartphone.svg'
import linux from '../../assets/linux.svg'
import random from '../../assets/desconhecido.svg'

export function getDeviceSVG(device: string) {
  switch (device) {
    case 'windows':
      return windows
    case 'linux':
      return linux
    case 'mac':
      return windows
    case 'android':
      return phone
    case 'ios':
      return phone
    case 'desconhecido':
      return random
    default:
      return random
  }
}
