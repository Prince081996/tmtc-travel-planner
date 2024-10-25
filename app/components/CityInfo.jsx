"use client"
import { useState } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import { GET_FOUR_SQUARE_PLACES, GET_OPEN_WEATHER, GET_REST_COUNTRIES } from '../constants/apiEndpoint';


export default function CityInfo() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
        let data = JSON.parse(localStorage.getItem("data"))
        console.log(data,"data")
        let resObj = {

        }
       let totalData = []
      // Fetch weather from OpenWeather
      const weatherRes = await axios.get(
        `${GET_OPEN_WEATHER}?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      );

      // Fetch places from Foursquare
      const placesRes = await axios.get(
        `${GET_FOUR_SQUARE_PLACES}/search?query=${city}&near=${city}`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
          },
        }
      );

      // Fetch country info from RestCountries API
      const countryRes = await axios.get(
        `${GET_REST_COUNTRIES}${weatherRes.data.sys.country}?fullText=${true}`
      );
      resObj = {
        weather: weatherRes.data,
        places: placesRes.data.results,
        country: countryRes.data[0],
      }
      if(data?.length > 0){
        data = [...data,resObj]
      }else {
        data = [resObj]
      }
     
       console.log(weatherRes,countryRes,placesRes,"...my");
      console.log(resObj,totalData,"....")
      setData(resObj);
      localStorage.setItem("data",JSON.stringify(data))
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    setLoading(false);
  };
// console.log(JSON.parse(localStorage.getItem("data",data)))
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">City Weather & Guide</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 ml-2 rounded-md"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <WeatherCard
            weather={data.weather}
            places={data.places}
            country={data.country}
          />
                  <button  className="bg-green-500 text-white p-2 mt-4 rounded">
        Save to Dashboard
      </button>
        </div>
      )}
   
    </div>
  );
}