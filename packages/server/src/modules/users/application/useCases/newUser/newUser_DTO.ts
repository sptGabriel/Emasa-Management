interface IPicture {
  bytes: number;
  public_id: string;
  url: string;
}
export interface newUserDTO {
  matricula: string;
  login: string;
  password: string;
  ip_address: string;
  picture:  IPicture;
}
