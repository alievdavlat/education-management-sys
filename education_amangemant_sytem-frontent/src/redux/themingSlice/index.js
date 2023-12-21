import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cName:'',
  tabContent:'archive companies'
}

export const themingSlice = createSlice({
  name: "Theming",
  initialState,
  reducers:{
    changeMode(state, action){
      localStorage.setItem('mode', action.payload)
      state.cName = action.payload
    },
    changeTab(state, action){
      state.tabContent = action.payload
    }
  }

})


export const { changeMode, changeTab  } = themingSlice.actions

export default themingSlice.reducer


