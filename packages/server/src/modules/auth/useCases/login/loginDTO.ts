import { Device, OS } from "@modules/users/domain/passwordLogs.entity";

export interface loginDTO {
  login: string;
  password: string;
  ip: string;
  os: OS;
  device: Device;
  longitude: number | null;
  latitude: number | null;
  timezone: string;
}
