import React from 'react'
import { useDispatch } from 'react-redux'
import {  Outlet, useNavigate } from 'react-router-dom'
import { getItemAtStorage, removeItemAtStorage  } from '../hooks/useStorage'
import { UseAxios } from '../hooks/useAxios'
import { login, logout } from '../redux/userAccountSlice'
import { Navbar, Sidebar } from '../components'


const MainLayout = () => {
  const token = getItemAtStorage('token')
  const role = getItemAtStorage('role')  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ company , setCompany] = React.useState()


  const getSelfInfo = async () => {
    const axios = UseAxios();
    try {
        const companyInfResponse = await axios({ url: '/company' });

        if (companyInfResponse?.response?.status == 403) {
                removeItemAtStorage('token')
                removeItemAtStorage('role')
                window.location.reload()
            }

           setCompany(companyInfResponse.data?.data);

        if (token) {
            const userProfileResponse = await axios({ url: '/account' });
            const { data } = userProfileResponse?.data;
            if (data) {
                dispatch(login(data));
            } else {
                dispatch(logout());
                navigate('/login');
            }
        }
    } catch (err) {
        console.log(err);
    }
};


  React.useEffect(() => {
    getSelfInfo()
    if (role) {
      navigate('/dashboard')
    }
},[])

  return (
    <>
      
    <div className='hero_nav'>
      <Sidebar  company={company ? company : 'Education Managemant System' }/>
      <div className='hero-main'>
      <header>
      <Navbar/>
    </header>

    <main>
      <Outlet/>
    </main>
      </div>
    </div>
    
   
    </>
  )
}

export default MainLayout