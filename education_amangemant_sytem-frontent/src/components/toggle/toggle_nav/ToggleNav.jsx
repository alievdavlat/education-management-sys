import React from 'react'
import './style.css'

const ToggleNav = ({children,isOpenToggleSide}) => {
  return (
    <div className={`toggle_nav ${isOpenToggleSide ? 'toggleSide' : ''}`}>
      {
        children
      }
    </div>
  )
}

export default ToggleNav