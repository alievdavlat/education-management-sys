import { createSlice } from "@reduxjs/toolkit";


  const initialState = {
    user:null,
    company:null,
    isAuth:false
  }
  

const userAccountSlice = createSlice({
  name:'userAccountSlice',
  initialState,
  reducers:{
    login(state, action){
        state.user = action.payload
        state.isAuth = true
    },
    logout(state){
      state.user = null
      state.isAuth = false
    } ,
    setUserCompany(state, action){
        state.company = action.payload
    }
  }
})


export const { login, logout,setUserCompany } = userAccountSlice.actions
export default userAccountSlice.reducer