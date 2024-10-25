"use client"


import Map from '@/app/components/Map'
import WeatherCard from '@/app/components/WeatherCard'
import React, { useEffect, useState } from 'react'
const page = () => {
    const [data,setData] = useState()
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("data"))
        console.log(storedData,"storedData...")
        if(storedData?.length > 0){
            setData(storedData)
        }    
    },[])
console.log(".....")
  return (
    <>
    <h1 className='p-4 font-bold md:text-2xl'>List of Saved Cities</h1>
    <div className='flex md:flex-row flex-col p-2'>
        {
            data?.map((item) => { return(
                <div key={item?.id} className='m-4'>
                <WeatherCard  
                weather={item?.weather}
                places={item?.places}
                country={item?.country} />
                <Map places={item?.places} />
                </div>
            )
            })
        }
    </div>
    </>
  )
}

export default page