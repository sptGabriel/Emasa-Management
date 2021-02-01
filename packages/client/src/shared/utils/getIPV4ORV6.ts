import {v4, v6} from 'public-ip'

export async function getIPV4ORV6() {
  const ipV6 = await v6().catch((err) => null)
  return ipV6 ? ipV6 : v4().catch((err) => null)
}
