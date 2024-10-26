'use client';
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};
const mapContainerStyle = { width: "100%", height: "100%" }; 
const Map = ({ places }) => {
    const center = {
        lat: places?.[0]?.geocodes?.main?.latitude, // Default center, change as needed
        lng: places?.[0]?.geocodes?.main?.longitude,
      };
  return (
    <div className='w-full h-96 md:h-[500px] lg:h-[600px] rounded-lg shadow-lg overflow-hidden'>
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap  mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        {places?.length > 0 && places?.slice(0,5).map((location, index) => (
          <Marker key={index} position={{ lat: location?.geocodes?.main?.latitude, lng: location?.geocodes?.main?.longitude }} />
        ))}
      </GoogleMap>
    </LoadScript>
    </div>
  );
};

export default Map