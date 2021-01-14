import React from 'react'
import styled from '@emotion/styled'
import {FiSun} from 'react-icons/fi'
import { BreadCrumbWrap } from './styles'

const BreadCrumb: React.FC = () => {
  return (
    <BreadCrumbWrap>
      <div className="bread-header">
        <div className="bread-content">
          <h3 className="page-name">Edit Profile</h3>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <FiSun size={18} />
            </li>
            <li className="breadcrumb-item">/ User</li>
            <li className="breadcrumb-item">/ Edit Profile</li>
          </ol>
        </div>
      </div>
    </BreadCrumbWrap>
  )
}

export default BreadCrumb
