import {
    configureStore,
    combineReducers} from "@reduxjs/toolkit";
import  addCitiesReducer from "../Slices/CitySlice";
export const appReducer = combineReducers({
    cities:addCitiesReducer
})

export const store = configureStore({
  reducer: appReducer,
  devTools: true,
});
  
  export default store;