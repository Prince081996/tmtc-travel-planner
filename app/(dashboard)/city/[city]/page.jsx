"use client"
import Map from '@/app/components/Map'
import WeatherCard from '@/app/components/WeatherCard'
import { filterCity } from '@/app/utils/helper'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

const page = ({params}) => {
  const {city} = params
  const [cityItems,setCityItems] = useState([])
  useEffect(() => {
   const savedCities = JSON.parse(localStorage.getItem("cities"))
    const cityItem = filterCity(savedCities,city)
    if(cityItem?.length >0 ){
      setCityItems(cityItem)
    }

  },[])

  return (
      <div className="p-6 w-full mx-auto">
        {
          cityItems?.length > 0 &&
          <div className='w-full '>
          <div className='flex md:justify-between md:flex-row flex-col'>
            <WeatherCard weather={ cityItems[0]?.[city]?.weather} places={ cityItems[0]?.[city]?.places} country={cityItems[0]?.[city]?.country} isDetailed={true} />
            <Map places={cityItems?.length > 0 && cityItems[0]?.[city]?.places} />
            </div>
            <div>
                   </div>
                   </div>
               
        }
      </div>
  )
}

export default page