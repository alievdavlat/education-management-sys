import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'


const SideBarItems = ({id, text, icon, resizeSide, path}) => {
  return (
    <Link to={path} style={{width:'100% !important'}}>
    <li className={`sidebar_items ${resizeSide ? 'resizedItem' : ''}`}>
      <span>
         <i className={icon}></i>
      </span>
        <span className={`${resizeSide ? 'resizedText' :''}`}>
          {text}
        </span>
    </li>
    </Link>
  )
}

export default SideBarItems