import { createSlice } from "@reduxjs/toolkit";
import { setItemToStorage, getItemAtStorage } from '../../hooks/useStorage'

const locale = getItemAtStorage('locale')

const initialState = {
lang: locale || 'en'
}


const localeSlice = createSlice({
  name:'localeSlice',
  initialState,
  reducers:{
    changeLang(state, action) {
      state.lang = action.payload
      setItemToStorage('locale', state.lang)
    }
  }
})


export  const  { changeLang } = localeSlice.actions;

export default localeSlice.reducer;