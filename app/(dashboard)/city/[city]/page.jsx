"use client"
import Map from '@/app/components/Map'
import { filterCity } from '@/app/utils/helper'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'


const page = ({params}) => {
  const [cityItems,setCityItems] = useState()
  useEffect(() => {
   const savedCities = JSON.parse(localStorage.getItem("cities"))
    const cityItem = filterCity(savedCities,params?.city)
    setCityItems(cityItem)
  },[])

  return (
    <div>
        {/* List of Places */}
        <Head>
        <title>{params?.city ? `${params?.city} - City Information` : "City Information"}</title>
        <meta name="description" content={`Learn about ${params?.city}'s current weather, places to visit, and country information.`} />
        <meta property="og:title" content={`${params?.city ? `${params?.city} - City Information` : "City Information"}`} />
        <meta property="og:description" content={`Find out more about ${params?.city}: weather, tourist spots, and country details.`} />
      </Head>
        <div className="w-full flex justify-center  lg:w-1/2 space-y-4">
          <div className="w-full   bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Place Names</h2>
          <ul className="max-h-48 overflow-y-auto space-y-2">
            {cityItems?.length > 0 && cityItems[0]?.[params?.city]?.places?.map((place,index)=> (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                {place.name}
              </li>
            ))}
          </ul>
          <Map places={cityItems?.length > 0 && cityItems[0]?.[params?.city]?.places} />
        </div>
      </div>
   
    </div>
  )
}

export default page