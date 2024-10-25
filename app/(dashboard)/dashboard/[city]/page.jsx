import Map from '@/app/components/Map'
import React from 'react'

const page = async({params}) => {
    console.log(await params,"params")
  return (
    <div>
        {params?.city}
        <Map />
    </div>
  )
}

export default page