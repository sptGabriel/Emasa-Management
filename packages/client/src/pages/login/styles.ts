import styled from "styled-components";
import { dynamicFlex } from "../../shared/components/dynamicFlexContainer";
import one from "../../assets/one.png";
import satelite from "../../assets/satelite.png";
import two from "../../assets/two.png";

export const MainCONTAINER = styled(dynamicFlex)`
  min-height: 100vh;
  background-color: #fafafa;
  @media (min-width: 48em) {
    background: url(${one}) no-repeat center bottom,
      url(${satelite}) no-repeat top 200px left 80px,
      url(${two}) no-repeat top 260px right 80px, #fafafa;
  }
`;
export const MainCONTENT = styled(dynamicFlex)`
  flex: 1 1 0%;
  width: 100%;
  max-width: 1000px;
  padding: 32px;
`;
export const LoginCONTAINER = styled(dynamicFlex)`
  flex: 1 1 0%;
  width: 100%;
  padding: 28px 0px 50px;
`;
export const LoginCONTENT = styled(dynamicFlex)`
  width: 100%;
  -webkit-box-pack: justify;
`;
export const LogoCONTAINER = styled(dynamicFlex)`
  align-self: center;
  width: 100%;
  max-width: 480px;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 0px 0 16px 0; */
    margin-bottom: 66px;
  }
  .emasaTXT {
    text-align: center;
    font-family: "Dancing Script", cursive;
    font-size: 25px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #000;
    font-weight: bold;
  }
  .subEmasa {
    font-size: 54px;
    line-height: 64px;
    color: #0077b6;
    margin-bottom: 24px;
    font-family: Roboto, sans-serif;
    font-weight: bold;
  }
  img {
    width: 100px;
    margin-right: 15px;
  }
`;
export const FormCONTAINER = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  background: rgb(32, 32, 36);
  border: 1px solid #e4dada;
  border-radius: 10px;
  padding: 32px;
  .separator {
    align-items: center;
    border-bottom: 0.1px solid #0996dd;
    display: flex;
    margin: 20px 16px;
    text-align: center;
  }
  .gradient-line {
    margin: 20px 16px;
    display: block;
    border: none;
    height: 1px;
    background: #202024;
    background: linear-gradient(
      to right,
      #202024,
      #0071b9,
      #26abff,
      #0071b9,
      #202024
    );
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
  }
  form {
    display: flex;
    flex-direction: column;
  }
`;
export const InputsSECTION = styled.section`
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
`;
export const InputSTYLED = styled.div`
  & > div:first-child {
    display: flex;
    align-items: center;
    & > :first-child {
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
    fill: rgb(40, 39, 44);
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
    background: rgb(18, 18, 20);
    border-color: rgb(18, 18, 20);
    color: rgb(255, 255, 255);
    padding: 0px 1em 0px 2.65em;
    border: none; /* <-- This thing here */
    border: solid 1px rgb(18, 18, 20);
    border-radius: 5px;
  }
  /* input:focus {
    border-color: blue !important;
  } */
  textarea {
    outline: 0px;
    font-family: Roboto, sans-serif;
    transition: border 0.2s ease 0s;
  }
`;
export const LoginBUTTON = styled.button`
  &:disabled {
    background: #0996dd;
    color: rgb(255, 255, 255);
    /* background: rgb(65, 53, 107); */
    /* color: rgba(255, 255, 255, 0.35); */
    cursor: not-allowed;
  }
  margin: 18px 0px 24px;
  background: #166fe5;
  font-size: 16px;
  font-weight: bold;
  height: 50px;
  transition: background 0.2s ease 0s, color 0.2s ease 0s;
  text-transform: uppercase;
  border-radius: 6px;
  border: 0px;
`;
export const WrapRegister = styled.div`
  font-size: 14px;
  padding-top: 6px;
  color: rgb(204, 204, 204);
  text-align: center;
`;
