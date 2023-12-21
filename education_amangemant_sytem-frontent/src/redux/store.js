import { configureStore } from "@reduxjs/toolkit";
import localeSlice from "./localeSlice";
import userAccountSlice from "./userAccountSlice";
import themingSlice from "./themingSlice";

export const store = configureStore({
  reducer:{
    locale : localeSlice,
    account:userAccountSlice,
    theming:themingSlice

  }
})