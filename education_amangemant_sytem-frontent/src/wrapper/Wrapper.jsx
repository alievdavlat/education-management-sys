//third party
import React from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        

//styles an others
import '../index.css'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";    


const Wrapper = ({children}) => {
  return (
<React.StrictMode>
<ConfigProvider >
<BrowserRouter>
<Provider store={store}>
<PrimeReactProvider>
  {children}
</PrimeReactProvider>
</Provider>
</BrowserRouter>
</ConfigProvider>
</React.StrictMode>
  )
}

export default Wrapper



