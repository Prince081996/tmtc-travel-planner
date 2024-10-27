"use client"
import { setCities } from '@/app/Redux/Slices/CitySlice'
import WeatherCard from '@/app/components/WeatherCard'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const page = () => {
    const savedCities = useSelector((state => state?.cities?.cities))
    const dispatch = useDispatch()
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("cities"))
        if(storedData?.length > 0){
            dispatch(setCities(storedData))
        }    
    },[])
  return (
    <>   
   {       
  savedCities?.length > 0 ?
  <div>
      <h1 className='p-4 font-bold md:text-3xl'>List Of Saved Cities!</h1>
      <div className='flex flex-col md:flex-row md:flex-wrap'>
     {savedCities?.map((item,index) => { 
        return(
            <div key={index}> 
       { Object.values(item)?.map((cityInfo,index) => (
                <div  key={index} className='transition-transform transform hover:scale-105 cursor-pointer p-2 m-4'>
                <WeatherCard  
                weather={cityInfo?.weather}
                places={cityInfo?.places}
                country={cityInfo?.country} />
                </div>
            
        ))}
    </div>)
    })
}
</div>
</div>
   :   <div className='flex flex-col justify-center items-center'>
            <h1 className='p-4 font-bold md:text-2xl'>You Don't have any saved cities!</h1>
            <Link className='styled-link' href="/search">Click To Search For City</Link>
            </div>
            }
    </>
  )
}

export default page