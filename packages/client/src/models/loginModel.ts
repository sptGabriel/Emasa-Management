import {IsNotEmpty} from 'class-validator';
import {makeAutoObservable} from 'mobx';

type TLogin = {
  login: string;
  password: string;
};
export class LoginModel implements TLogin {
  @IsNotEmpty({
    message: 'Por favor, preencha o campo com a nome de usuário.',
  })
  login!: string;

  @IsNotEmpty({
    message: 'Por favor, preencha o campo com a senha de usuário.',
  })
  password!: string;

  constructor() {
    makeAutoObservable(this);
  }
}
