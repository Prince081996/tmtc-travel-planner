import { createSlice } from "@reduxjs/toolkit";
import { addCitiesReducer } from "../Reducers/CityReducer";

const initialState = {
  cities: [],
};

const addCitiesSlice = createSlice({
  name: "addCities",
  initialState,
  reducers: addCitiesReducer,
});

export const { addCities,setCities } = addCitiesSlice.actions;
export default addCitiesSlice.reducer;