import React from 'react'
import './style.css'
import {  LogOut, Palette, Settings2, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { removeItemAtStorage } from '../../../hooks/useStorage'
import { useNavigate } from 'react-router-dom'

const Settingss = ({setIsModalOpen}) => {
  const [t ] = useTranslation()
  const navigate = useNavigate()
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleLogOut = () => {
    
    removeItemAtStorage('token')
    removeItemAtStorage('role')
    navigate('/login')
  }

  return (
    <div className="settings_modal">
  <button className="settings_modal_items">
    <User className='settings_icon'/>
      {t('navbar.setmodalProfile')}
  </button>
  <button className="settings_modal_items">
  <Settings2 className='settings_icon'/>
    {t('navbar.setmodalEdit')}
  </button>
  <button className="settings_modal_items" onClick={() => showModal()}>
  <Palette className='settings_icon'/>  
   {t('navbar.setModalthem')}
  </button>
  <button className="settings_modal_items" onClick={() => handleLogOut()}>
  <LogOut className='settings_icon'/>  
   {t('navbar.setmodalLogout')}
  </button>
 
  
</div>
  )
}

export default Settingss