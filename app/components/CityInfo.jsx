"use client"
import { useState } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import { GET_FOUR_SQUARE_PLACES, GET_OPEN_WEATHER, GET_REST_COUNTRIES } from '../constants/apiEndpoint';
import { useDispatch, useSelector } from 'react-redux';
import Toaster from '../utils/Toaster/toaster';
import { addCities } from '../Redux/Slices/CitySlice';
import axiosInstance from '../utils/apiHandle';
import { ClipLoader } from 'react-spinners';
import { filterCity } from '../utils/helper';



export default function CityInfo() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabled,setDisabled] = useState(false)
  const dispatch = useDispatch()
// const  savedCities = useSelector((state) => state?.cities?.cities)
  const fetchCountryDetails = async(country) => {
    const endPoint =   `${GET_REST_COUNTRIES}${country}?fullText=${true}`
    const countryRes = await axiosInstance.get(endPoint)
    if(countryRes.status === 200){
      return countryRes?.data[0]
    }
  }

  const fetchPlaces = async () => {
    const endPoint =`${GET_FOUR_SQUARE_PLACES}/search?query=${city}&near=${city}`
    const placesRes = await axiosInstance.get(endPoint,{headers: {
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    }})
    if(placesRes?.status === 200){
      console.log(placesRes,"placesss")
      return  placesRes?.data?.results
    
    }
  }

  const fetchWeatherDetails = async() => {
    let resObj = { }
    let endPoint =  `${GET_OPEN_WEATHER}?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    try {
      setLoading(true);
      const weatherRes =  await axiosInstance.get(endPoint)
      if(weatherRes.status ===200){
        const countryRes = await fetchCountryDetails(weatherRes?.data?.sys?.country)
        const placesRes = await fetchPlaces()
          resObj = {
          weather: weatherRes?.data,
          places: placesRes,
          country: countryRes,
        }
        setData(resObj);
        setLoading(false);
        console.log(countryRes,placesRes,"fetches...")
      }
    } catch (error) {
      setData(null)
      setLoading(false);
    }
   
  } 
  const handleSearch = async () => {
    const savedCities = JSON.parse(localStorage.getItem("cities"))
    let cityName = city.split(" ").join("").toLowerCase()
    const cityItem = filterCity(savedCities,city)
    if(cityItem?.length > 0){
   setData({
      weather:cityItem[0][cityName]?.weather,
      country:cityItem[0][cityName]?.country,
      places:cityItem[0][cityName]?.places
    })
    setDisabled(true)
    return
    }
    if (city.trim()) {
      setDisabled(false)
      fetchWeatherDetails()
  };


}
const handleSaveCity = () => {
  let cityObj = {
    [data?.weather?.name.split(" ").join("").toLowerCase()]:{
      weather:data?.weather,
      places:data?.places,
      country:data?.country
    }
  }
  let cityArr=[cityObj]
  const savedCities = JSON.parse(localStorage.getItem("cities"))
  console.log(savedCities,"savedCities...")
  if(savedCities?.length > 0){
    savedCities?.push(cityObj)
    localStorage.setItem("cities", JSON.stringify(savedCities))
  }else {
    localStorage.setItem("cities", JSON.stringify(cityArr))
  }

  dispatch(addCities(
    cityObj
))
setDisabled(true)
  Toaster("success","City Save To Dashboard Successfully!")
}
const handleClear = () => {
  setCity("")
  setData()
}
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
};
console.log(disabled,"disabled...")
const handleInputChange = (e) => {
  if(e.target.value === ""){
    if(disabled){
      setDisabled(false)
    }
    setData()
  }
  setCity(e.target.value)
}
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">City Weather & Guide</h1>

      <div className="flex py-4 items-center w-full max-w-md mx-auto mt-4">
      <div className="relative flex-grow">
        <input
          type="text"
          value={city}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full px-4 py-2 pr-10 text-gray-800 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {city && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {/* SVG Cross Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
      </div>
      <button
          className="bg-blue-500 text-white p-2 ml-2 rounded-md"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
    </div>

<div className='flex justify-center items-center'>
{loading ? <ClipLoader /> :
      data && (
        <div className="flex flex-col items-center">
          <WeatherCard
            weather={data.weather}
            places={data.places}
            country={data.country}
          />
                  <button  disabled={disabled} onClick={(e) => { 
                    handleSaveCity(e)
           
                }
                  
                  }  className={`${disabled ? "bg-[#808080]" :"bg-green-500"} max-w-[40%] text-white p-2 mt-4 rounded cursor-pointer`}>
        Save to Dashboard
      </button>
        </div>
      )
      // :
      // <div>
      //   <span className='text-xl text-center font-medium'>No Results Found From The Given Keyword!</span>
      // </div>
      }
   
    </div>
    </div>
  );
}