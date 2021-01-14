import styled from '@emotion/styled'
import {NoSelect} from '../../shared/components/NoSelect'
import userAvatar from '../../assets/test.jpg'

export const EditProfileContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  height: calc(100% - 80px);
  align-items: center;
  ${NoSelect}
`
export const UserInfoWrap = styled('div')<{image: any}>`
  flex-grow: 0;
  max-width: 33.333333%;
  flex-basis: 33.333333%;
  padding-right: 12px;
  .user_infos {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .user_avatar {
    position: relative;
    width: 150px;
    height: 150px;
    margin: 1em auto;
    background-image: ${({image}) => `url(${image ? image : userAvatar})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-border-radius: 99em;
    -moz-border-radius: 99em;
		border-radius: -99em;
		cursor: pointer;
    border: 2px solid ${({theme}: any) => `rgb(${theme.primary})`};
    .avatar_cam {
      display: flex;
      align-items: center;
			justify-content: center;
			cursor: pointer;
      height: 36px;
      width: 36px;
      border-radius: 50%;
			background: ${({theme}: any) => `rgba(${theme.primary},0.5)`};
			border-none;
      bottom: 25px;
      right: 25px;
      transform: translate(50%, 50%);
      position: absolute;
      svg {
        color: #fff;
      }
    }
  }
  .user_name {
    color: #263238;
    margin-bottom: 0.35rem;
    font-size: 24px;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 500;
    line-height: 1.167;
    letter-spacing: -0.06px;
  }
  .info-card {
    display: flex;
    justify-content: center;
    align-items: center;
    //box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    //  0 1px 2px 0 rgba(63, 63, 68, 0.15);
    //overflow: hidden;
    //border-radius: 4px;
    height: 400px;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
  }
`
export const EditInfoWrap = styled('div')`
  flex-grow: 0;
  max-width: 66.666667%;
  flex-basis: 66.666667%;
  padding-left: 12px;
  .edit-card {
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
      0 1px 2px 0 rgba(63, 63, 68, 0.15);
    overflow: hidden;
    border-radius: 4px;
    height: 400px;
  }
  .card-content {
    padding: 16px;
  }
`
