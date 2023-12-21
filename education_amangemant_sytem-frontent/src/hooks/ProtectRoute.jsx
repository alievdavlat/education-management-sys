import { Outlet, Navigate } from "react-router-dom"
import useAuth from "./useAuth"
import { getItemAtStorage } from "./useStorage"


const PrivateRoute = () => {
    let auth = useAuth()
    const token = getItemAtStorage('token')

    return(
     token ? <Outlet/> : <Navigate to='/login' replace />
    )
  }

  export default PrivateRoute