import { current } from "@reduxjs/toolkit";

export const addCitiesReducer = {
  addCities: (state, action) => {
    const { payload } = action;
    state.cities.push(payload)
  },
  setCities: (state, action) => {
    console.log(action?.payload,"payloadd")
    state.cities = action.payload; // Set items from localStorage
  },
};
