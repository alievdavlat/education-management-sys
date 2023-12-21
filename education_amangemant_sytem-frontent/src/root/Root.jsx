import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layout/Layout.jsx'

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from '../utils/locales/en'
import { ru } from '../utils/locales/ru'
import { uzKrill } from '../utils/locales/uzKrill'
import { uzLotin } from '../utils/locales/uzLotin'
import {  useSelector } from 'react-redux';
import { Login,NotFoundPage, Unauthorized, Adding, Eadmins, Creatinig, Dashboard, Stafs, Students, Groups, Courses, Branches, Companies, Archive, Profile } from '../pages/index.js';
import PrivateRoute from '../hooks/ProtectRoute.jsx';


const Root = () => {
const {cName} = useSelector(state => state.theming)
const [mode , setMode] = React.useState('')


React.useEffect(() => {
 const theming = localStorage.getItem('mode')
  setMode(theming)
},[cName])

  const { lang } = useSelector(state => state.locale)
  const resources = {
    en: {
      translation: en
    },
    ru: {
      translation:ru 
    },
    krill: {
      translation:uzKrill 
    },
    uz: {
      translation:uzLotin 
    },
  }
  

  i18n.use(initReactI18next).init({
    resources,
    lng:lang, 
    fallbackLng: lang, 
    interpolation: {
      escapeValue: false, 
    },
  });

  
  return (
        <div className={`layout theming-${cName ? cName : mode}`}>

        <Routes>
         
        <Route element={<PrivateRoute/>} >
        
         <Route path='/' element={<MainLayout />} >
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/companies' element={<Companies/>}/>
              <Route path='/create' element={<Creatinig/>}/>
              <Route path='/adding' element={<Adding/>}/>
              <Route path='/eadmins' element={<Eadmins/>}/>
              <Route path='/branches' element={<Branches/>}/>
              <Route path='/stafs' element={<Stafs/>}/>
              <Route path='/students' element={<Students/>}/>
              <Route path='/groups' element={<Groups/>}/>
              <Route path='/courses' element={<Courses/>}/>
              <Route path='/archive' element={<Archive/>}/>
              <Route path='/profile' element={<Profile/>}/>
        </Route>
        
        </Route>
          
          {/* another pages  */}
          <Route path="*" element={<NotFoundPage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path="/unauthorized" element={<Unauthorized/>} />
        </Routes>
      
        </div>

    )
} 

export default Root