export interface changePasswordDTO {
  id:string;
  oldPassword:string;
  password:string;
  confirmPassword:string;
  token: string;
}