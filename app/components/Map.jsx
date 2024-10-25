'use client';
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};




const Map = ({ places }) => {
    const center = {
        lat: places?.[0]?.geocodes?.main?.latitude, // Default center, change as needed
        lng: places?.[0]?.geocodes?.main?.longitude,
      };
    {places.slice(0,5).map((location, index) => (
        console.log(location?.geocodes?.main?.latitude,"yessjbjkb",location?.geocodes?.main?.longitude)
      ))}
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {places.slice(0,5).map((location, index) => (
          <Marker key={index} position={{ lat: location?.geocodes?.main?.latitude, lng: location?.geocodes?.main?.longitude }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map