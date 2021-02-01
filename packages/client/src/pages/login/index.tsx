import React, {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled/macro'
import {GiPadlock} from 'react-icons/gi'
import {FaUser} from 'react-icons/fa'
import {observer} from 'mobx-react-lite'
import {toast} from 'react-toastify'
import {PuffLoader} from 'react-spinners'
import {useErrorHandler} from 'react-error-boundary'
import {useNavigate} from 'react-router-dom'
import {emasaAnimation} from '../../shared/components/LogoAnimation'
import logo from '../../assets/logo_emasa.png'
import {Container} from '../../shared/components/FlexBox'
import one from '../../assets/one.png'
import satelite from '../../assets/satelite.png'
import two from '../../assets/two.png'
import BoundInput from '../../shared/components/Input'
import {useRootStore} from '../../shared/infra/mobx'
import 'react-toastify/dist/ReactToastify.css'

const ContainerFluid = styled('div')`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 0 !important;
  background-color: #f2fcff;
`
const Row = styled(Container)``
const Col = styled('div')`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
`
const LoginCard = styled(Container)`
  min-height: 100vh;
  margin: 0 auto;
  border-radius: 8px;
  @media (min-width: 48em) {
    background: url(${one}) no-repeat center bottom,
      url(${satelite}) no-repeat top 200px left 80px,
      url(${two}) no-repeat top 260px right 80px, #f2fcff;
  }
  background-position: 50%;
  padding: 30px 0;
  .text-5 {
    color: #0189cf;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    animation: ${emasaAnimation} 1s linear infinite;
  }
  .logo {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    text-align: center;
    img {
      margin-right: 20px;
      max-width: 60px;
      height: auto;
      vertical-align: middle;
      border-style: none;
    }
  }
`
const LoginMain = styled('div')`
  position: relative;
  border-top-left-radius: 0;
  height: 100%;
  box-shadow: 0 0 37px rgba(8, 21, 66, 0.05);
  margin: 0 auto;
  background-color: #fff;
  width: 450px;
  padding: 40px;
  border-radius: 10px;
`
const LoginContent = styled('div')`
  height: auto;
`
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  .separator {
    align-items: center;
    border-bottom: 0.1px solid #dddfe2;
    display: flex;
    margin: 20px 16px;
    text-align: center;
  }
  .gradient-line {
    margin: 20px 16px;
    display: block;
    border: none;
    height: 1px;
    background: #dddfe2;
  }
  a {
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #0996dd;
    opacity: 0.8;
    transition: opacity 0.2s ease 0s;
    align-self: flex-start;
    font-family: Rubik, sans-serif;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  .forgot {
    display: flex;
    justify-content: center;
    padding-right: 16px;
    font-size: 14px;
    font-weight: 600;
    color: #0996dd;
    opacity: 0.8;
    transition: opacity 0.2s ease 0s;
    font-family: Rubik, sans-serif;
  }
`
const SecInputs = styled.section`
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
  color: #898989;
  margin-bottom: 10px;
  h1 {
    margin-top: 1rem;
  }
`
const StyledInput = styled.div`
  & > div:first-of-type {
    display: flex;
    align-items: center;
    & > :first-of-type {
      position: relative;
      flex: 1 1 0%;
      &:focus-within > svg {
        fill: #0996dd;
      }
    }
  }
  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    fill: #898989;
    font-size: 16px;
    transition: fill 0.2s ease 0s;
  }
  &:focus-within input:not(:read-only) {
    border-color: #0996dd;
  }
  input {
    width: 100%;
    height: 50px;
    font-size: 16px;
    background: #fff;
    border-color: #dddfe2;
    font-family: Rubik, sans-serif;
    color: rgb(255, 255, 255);
    padding: 0px 1em 0px 2.65em;
    border: none; /* <-- This thing here */
    border: solid 1px #dddfe2;
    border-radius: 5px;
    color: #898989;
    ::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: #898989;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #898989;
      opacity: 1;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #898989;
      opacity: 1;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #898989;
    }
    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: #898989;
    }
    ::placeholder {
      /* Most modern browsers support this now. */
      color: #898989;
    }
  }
  textarea {
    outline: 0px;
    font-family: Rubik, sans-serif;
    transition: border 0.2s ease 0s;
  }
`
const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  &:disabled {
    background: rgb(72, 131, 161);
    color: rgba(255, 255, 255, 0.35);
    /* background: rgb(65, 53, 107); */
    /* color: rgba(255, 255, 255, 0.35); */
    cursor: not-allowed;
  }
  margin: 15px 0px 15px;
  background: #0996dd;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 0.8rem 0;
  transition: background 0.2s ease 0s, color 0.2s ease 0s;
  text-transform: uppercase;
  border-radius: 6px;
  border: 0px;
`
const WrapRegister = styled.div`
  font-size: 14px;
  padding-top: 6px;
  color: #898989;
  text-align: center;
`
const Inputs: React.FunctionComponent = observer(() => {
  const {authStore} = useRootStore()
  return (
    <SecInputs>
      <h1> Digite o seu login </h1>
      <StyledInput>
        <div>
          <div>
            <FaUser size={18} />
            <BoundInput
              model={authStore.loginModel}
              property="login"
              required
              autoComplete="off"
              id="login"
              placeholder="Digite o seu usuário "
            />
          </div>
        </div>
      </StyledInput>
      <h1> Digite a sua senha </h1>
      <StyledInput>
        <div>
          <div>
            <GiPadlock size={18} />
            <BoundInput
              model={authStore.loginModel}
              property="password"
              type="password"
              required
              autoComplete="off"
              id="password"
              placeholder="Digite a sua senha "
            />
          </div>
        </div>
      </StyledInput>
    </SecInputs>
  )
})

const Form: React.FunctionComponent = observer(() => {
  const isMounted = useRef(true)
  const navigate = useNavigate()
  const {authStore} = useRootStore()
  const [loading, setLoading] = useState(false)
  const {password, login} = authStore.loginModel
  const handleError = useErrorHandler()
  const loginHanlder = (event: any) => {
    event.preventDefault()
    setLoading(true)
    setTimeout(() => {
      authStore
        .login()
        .then(() => {
          authStore.loginModel.password = ''
          authStore.loginModel.login = ''
          navigate('../dashboard', {replace: true})
        })
        .catch((err) => {
          console.log(err)
          if (err && err.response.status === 404) handleError(err)
          authStore.loginModel.password = ''
          authStore.loginModel.login = ''
          toast.error(err.response.data.message)
        })
    }, 1000)
  }
  useEffect(() => {
    return () => {
      setLoading(false)
      authStore.loginModel.password = ''
      authStore.loginModel.login = ''
      isMounted.current = false
    }
  }, [])
  return (
    <FormContainer onSubmit={(event) => loginHanlder(event)}>
      <Inputs />
      <LoginButton
        disabled={
          !login ||
          login.length < 1 ||
          !password ||
          password.length < 1 ||
          loading ||
          false
        }
        type="submit"
      >
        {loading ? (
          <PuffLoader size={18} color="#fff" loading={loading} />
        ) : (
          'Entrar'
        )}
      </LoginButton>
      <a className="forgot" href="#/">
        Esqueci minha senha
      </a>
      <hr className="gradient-line" />
      <WrapRegister>
        Não tem uma conta?
        <a href="#/"> Registre-se</a>
      </WrapRegister>
    </FormContainer>
  )
})
const Login: React.FC = () => {
  return (
    <ContainerFluid>
      <Row wrap="true" flexColumn>
        <Col>
          <LoginCard align="center" justify="center" flexColumn>
            <div>
              <div className="logo">
                <img src={logo} alt="Emasa" />
                <div className="text-5 text tooltip">
                  <span>Emasa</span>
                </div>
              </div>
            </div>
            <LoginMain>
              <LoginContent>
                <Form />
              </LoginContent>
            </LoginMain>
          </LoginCard>
        </Col>
      </Row>
    </ContainerFluid>
  )
}

export default Login
