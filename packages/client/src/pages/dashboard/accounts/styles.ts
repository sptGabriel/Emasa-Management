import styled from '@emotion/styled'
import {NoSelect} from '../../../shared/components/NoSelect'
import userAvatar from '../../../assets/logo_emasa.png'

export const AccountsWrap = styled('div')`
  background: white;
  border-radius: 3px;
  border: 1px solid #dbdbdb;
  max-width: 935px;
  margin: 0px auto 10px;
  min-height: calc(100% - 60px) !important;
  height: auto;
  overflow: hidden;
  width: 100%;
  flex-grow: 1;
  justify-content: stretch;
  -webkit-box-flex: 1;
  display: flex;
  flex-shrink: 0;
  padding: 0;
`
export const ULSettings = styled(`ul`)`
  flex-basis: 236px;
  -webkit-box-flex: 0;
  flex-grow: 0;
  flex-shrink: 0;
  border-right: 1px solid #dbdbdb;
  list-style: none;
`
export const LISettings = styled(`li`)`
  a {
    color: rgb(38, 38, 38);
    white-space: nowrap;
    text-decoration: none;
    display: block;
    font-size: 16px;
    height: 100%;
    line-height: 20px;
    padding: 16px 16px 16px 30px;
    width: 100%;
    font-family: work-Sans, sans-serif;
  }
  a:hover {
    background-color: #fafafa;
    border-left: 2px solid #dbdbdb !important;
  }
  .active {
    font-weight: 600;
    border-left: 2px solid #262626 !important;
  }
`
export const Article = styled('article')`
  flex: 1 1 400px;
  min-width: 50px;
  -webkit-box-flex: 1;
  align-items: stretch;
  border: 0 solid #000;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  height: 100%;
  flex-direction: column;
  margin: 0;
  padding: 0;
`

export const EditProfileContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-items: center;
  .edit-card {
    background: white;
  }
  ${NoSelect}
`
export const AvatarProfile = styled(`div`)<{image: any}>`
  position: relative;
  width: 70px;
  .avatar_cam {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: ${({theme}: any) => `rgba(${theme.primary},0.5)`};
    top: 40%;
    right: 10px;
    transform: translate(50%, 50%);
    position: absolute;
    svg {
      color: #fff;
    }
  }
  .avatar {
    position: relative;
    width: 60px;
    height: 60px;
    background-image: ${({image}) => `url(${image || userAvatar})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 100vh;
    cursor: pointer;
    border: 2px solid ${({theme}: any) => `rgb(${theme.primary})`};
    label {
      width: 60px !important;
      height: 60px !important;
      input {
        width: 60px !important;
        height: 60px !important;
      }
    }
  }
`
export const UserInfoWrap = styled('div')`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: row;
  margin: 32px 0 16px;
  padding: 0;
  position: relative;
  font-family: work-Sans, sans-serif;
  ${NoSelect}
  .user_infos {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 20px;
    span {
      width: 100%;
      display: flex;
      align-items: center;
      h1 {
        margin-right: 5px;
        font-size: 15px;
        font-weight: 600;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: inherit;
        text-align: left;
      }
    }
    p {
      text-align: left;
      font-size: 14px;
      margin-bottom: 2px;
    }
    .user_name {
      color: ${({theme}: any) => `rgb(${theme.primary})`};
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      margin-bottom: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: inherit;
      text-align: left;
    }
  }
  .card-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    margin: 2px 32px 0 124px;
  }
`
export const Forms = styled('form')<{buttonActive: boolean}>`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 16px;
  height: 100%;
  font-family: work-Sans, sans-serif;
  .subBut {
    margin-top: 16px;
  }
  .error-message {
    width: 100%;
    max-width: 355px;
    margin-top: 4px;
    display: block;
    color: red;
  }
  .form-item {
    flex-direction: row;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    margin-bottom: 16px;
    justify-content: flex-start;
    align-items: stretch;
    border: 0 solid #000;
    flex-shrink: 0;
    position: relative;
    display: flex;
  }
  .form-name {
    padding-left: 32px;
    padding-right: 32px;
    text-align: right;
    color: rgba(38, 38, 38);
    flex: 0 0 194px;
    font-size: 14.2px;
    font-weight: 600;
    line-height: 16px;
    margin-top: 6px;
    font-family: work-Sans, sans-serif;
  }
  .form-input {
    flex-basis: 355px;
    flex-direction: row;
    padding-right: 60px;
    color: #262626;
    flex-grow: 1;
    font-size: 16px;
    -webkit-box-flex: 1;
    justify-content: flex-start;
    align-items: stretch;
    border: 0 solid #000;
    flex-shrink: 0;
    margin: 0;
    position: relative;
  }
  .wrap-input {
    width: 100%;
    max-width: 355px;
    flex: 0 0 auto;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    display: inline-block;
    flex-direction: column;
    button {
      background: ${({buttonActive}) =>
        buttonActive
          ? 'rgba(0, 149, 246, 1)'
          : 'rgba(0, 149, 246, 0.3)'} !important;
      opacity: 1;
      border: 1px solid transparent;
      border-radius: 4px;
      color: white;
      background: 0 0;
      cursor: pointer;
      display: block;
      font-weight: 600;
      padding: 5px 9px;
      text-align: center;
      text-transform: inherit;
      text-overflow: ellipsis;
      user-select: none;
      width: auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 18px;
    }
    textarea {
      padding: 10px 10px !important;
      resize: none;
      height: 62px !important;
      line-height: 18px;
    }
    input:focus,
    textarea:focus {
      border: 1px solid ${({theme}: any) => `rgb(${theme.primary})`} !important;
    }
    input,
    textarea {
      background: 0 0;
      border: 1px solid rgba(219, 219, 219, 1);
      color: rgba(38, 38, 38, 1);
      border-radius: 3px;
      flex: 0 1 355px;
      font-size: 16px;
      height: 32px;
      padding: 0 10px;
      width: 100%;
      line-height: 18px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Helvetica, Arial, sans-serif;
    }
    input[type='password'] {
      background: rgba(250, 250, 250, 1) !important;
      outline: 0 !important;
      border-radius: 6px !important;
      border: 1px solid rgba(219, 219, 219, 1) !important;
      flex-grow: 1 !important;
      font-size: 15px !important;
      min-height: 35px;
      line-height: 30px !important;
      padding: 12px 12px !important;
      :focus {
        border: 1px solid ${({theme}: any) => `rgb(${theme.primary})`} !important;
      }
    }
  }
`
export const LoginActivity = styled('div')`
  margin-top: 32px;
  margin-right: 55px;
  margin-left: 55px;
  margin-bottom: 16px;
  height: 100%;
  div:last-of-type {
    border: none;
  }
  .deviceInfo {
    display: flex;
    flex-direction: column;
  }
  .acitivty-item {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 12px;
    padding-top: 12px;
    font-size: 14px;
    display: flex;
  }
  .os {
    display: flex;
    align-items: center;
    margin-right: 16px;
    img {
      height: 30px;
      width: 30px;
    }
  }
  .header {
    flex: 0 0 auto;
    justify-content: flex-start;
    align-items: stretch;
    h1 {
      margin-bottom: 20px;
      margin-top: 8px;
    }
    h2 {
      color: #262626;
      font-size: 22px;
      line-height: 26px;
      font-weight: 300;
      font-family: work-Sans, sans-serif;
    }
  }
`
