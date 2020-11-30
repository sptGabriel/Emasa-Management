import React from 'react';
import {
  MainCONTENT,
  MainCONTAINER,
  LoginCONTAINER,
  LoginCONTENT,
  FormCONTAINER,
  InputsSECTION,
  InputSTYLED,
  LoginBUTTON,
  WrapRegister,
} from './styles';
import { FaUser } from 'react-icons/fa';
import { AiTwotoneLock } from 'react-icons/ai';
const Inputs: React.FunctionComponent = () => {
  return (
    <InputsSECTION>
      <InputSTYLED>
        <div>
          <div>
            <FaUser />
            <input name="login" type="text" id="login" placeholder="Usuário " />
          </div>
        </div>
      </InputSTYLED>
      <InputSTYLED>
        <div>
          <div>
            <AiTwotoneLock />
            <input
              name="password"
              type="text"
              id="password"
              aria-label="senha"
              placeholder="Senha"
            />
          </div>
        </div>
      </InputSTYLED>
    </InputsSECTION>
  );
};
const Form: React.FunctionComponent = () => {
  return (
    <FormCONTAINER>
      <Inputs />
      <LoginBUTTON disabled type="submit">
        Entrar
      </LoginBUTTON>
      <a>Esqueci minha senha</a>
      {/* <div className="separator" /> */}
      <hr className="gradient-line" />
      <WrapRegister>
        Não tem uma conta? <a>Registre-se</a>
      </WrapRegister>
    </FormCONTAINER>
  );
};
// const LogoSection: React.FunctionComponent = () => {
//   return (
//     <LogoCONTAINER column>
//       <div>
//         <img src={LogoImg} />
//         {/* <h1>Emasa</h1> */}
//         {/* <h1 className="emasaTXT">Emasa</h1> */}
//       </div>
//       <h1 className="subEmasa">
//         Faça seu login <br /> na plataforma
//       </h1>
//     </LogoCONTAINER>
//   )
// }
export const LoginComponent: React.FC = () => {
  return (
    <MainCONTAINER column align="center">
      <MainCONTENT column align="center">
        <LoginCONTAINER align="center" justify="center">
          <LoginCONTENT align="center" justify="center">
            <Form />
          </LoginCONTENT>
        </LoginCONTAINER>
      </MainCONTENT>
    </MainCONTAINER>
  );
};
