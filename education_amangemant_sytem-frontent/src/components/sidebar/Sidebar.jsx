import React from 'react'


import './style.css'
import { Boxes } from 'lucide-react'
import {  sidebarItemsDetails } from '../../utils/constants'
import { getItemAtStorage } from '../../hooks/useStorage'
import SideBarItems from './SideBarItems'
import { AvatarNav } from '../index'
import { useSelector } from 'react-redux'



const Sidebar = ({company}) => {
  const [resizeSide , setResizeSide ] = React.useState(false)
  const role = getItemAtStorage('role')

  React.useEffect(() => {
    if (window.screen.width <= 420 || window.screen.width <= 1000 ) {
      setResizeSide(true)
    }
  }, [])

  return (
    <>
    
    {
      <aside className={`aside ${resizeSide ? 'resized' :' '}`}>
          <button  className='aside_resize_btn' onClick={() => setResizeSide(!resizeSide)}><Boxes style={{color:'var(--resize-col)', width:'30px'}} /></button>
        <div className={`aside_header ${resizeSide ? 'resized_header' : ''}`}>
        {
          resizeSide 
           ? 
          <h3 className='company_name'>
              {company?.company_name ? company?.company_name : 'Crm system' }
          </h3>
          :  
            company?.logo ?  <img src="https://najottalim.uz/_next/static/media/logo-img.2935c262.svg" alt="logo"  className='aside_logo'/> : <h1 className='company_name2' style={{fontSize:"20px"}}>Crm Manage System</h1>
          }
        </div>
        <ul className={`aside_body ${resizeSide ? 'resizedbody' :''}`}>
            {
              sidebarItemsDetails.filter(items => items.view.includes(role)).map(item => <SideBarItems resizeSide={resizeSide} key={item.id} {...item}/>)
            }
        </ul>

    </aside>
    
    }
    </>
  )
}

export default Sidebar