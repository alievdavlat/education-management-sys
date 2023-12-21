import { useSelector } from "react-redux"


const useAuth = () => {
  const {isAuth} = useSelector(state => state.account)

  return isAuth
}

export default useAuth