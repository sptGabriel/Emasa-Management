export interface loginDTO {
  login: string;
  password: string;
  ip: string;
  os: string | null;
  device: string | null;
  longitude: number | null;
  latitude: number | null;
  timezone: string;
}
