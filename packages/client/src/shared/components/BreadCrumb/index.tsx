import React, {useState} from 'react'
import {BiHomeAlt} from 'react-icons/bi'
import {useLocation} from 'react-router-dom'
import {capitalizeFirstLetter} from '../../utils/capitalizeFirstLetter'
import {BreadCrumbWrap} from './styles'

const BreadCrumb: React.FC<{path: string[]}> = ({path}) => {
  return (
    <BreadCrumbWrap>
      <div className="bread-header">
        <div className="bread-content">
          <h3 className="page-name">{path[path.length - 1]}</h3>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <BiHomeAlt size={18} />
            </li>
            {path.map((item, index) => {
              if (index !== 0)
                return (
                  <li className="breadcrumb-item" key={index}>
                    / {capitalizeFirstLetter(item)}
                  </li>
                )
              return undefined
            })}
            {/* <li className="breadcrumb-item">/ User</li>
            <li className="breadcrumb-item">/ Edit Profile</li> */}
          </ol>
        </div>
      </div>
    </BreadCrumbWrap>
  )
}

export default BreadCrumb
