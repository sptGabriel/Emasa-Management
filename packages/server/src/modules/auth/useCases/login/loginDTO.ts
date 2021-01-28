import { Device, OS } from "@modules/users/domain/authorizedUser.entity";
import {Big} from 'big.js'

export interface loginDTO {
  login: string;
  password: string;
  ip: string;
  os: string | null;
  device: string | null;
  longitude: Big | null;
  latitude: Big | null;
  timezone: string;
}
