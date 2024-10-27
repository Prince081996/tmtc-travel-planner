export const addCitiesReducer = {
  addCities: (state, action) => {
    const { payload } = action;
    state.cities.push(payload)
  },
  setCities: (state, action) => {
    state.cities = action.payload; // Set items from localStorage
  },
};
