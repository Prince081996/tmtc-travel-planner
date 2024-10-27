"use client"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function WeatherCard({ weather, places, country,isDetailed }) {
  const city = weather?.name?.split(" ").join("").toLowerCase()
    const pathname = usePathname()
    const router = useRouter()
    return (
      <>
      <div className="shadow-lg rounded-lg p-6 bg-[#f7d6d080] flex flex-col justify-center" >
        {/* Weather Information */}
        <div className="mb-4">
          <h2 className="text-xl font-bold">{weather?.name}, {country?.name?.common}</h2>
          <p className="text-lg">
            {weather?.main?.temp}°C - {weather?.weather[0]?.description}
          </p>
        </div>

  
        {/* Country Information */}
        {country?.capital?.length > 0 &&
        <div className="mb-4">
          <h3 className="text-lg font-bold">Country Info</h3>
          <p><strong>Capital:</strong> {country?.capital}</p>
          <p><strong>Region:</strong> {country?.region}</p>
          <p><strong>Population:</strong> {country?.population}</p>
        </div>
}
  
        {/* Places to Visit */}
        {places?.length > 0 &&
        <div>
          <h3 className="text-lg font-bold">Places to Visit</h3>
          <ul className="list-disc list-inside">
            {isDetailed  ? places?.map((place) => (
              <li className="hover:font-bold cursor-pointer" key={place.fsq_id}>{place?.name}</li>
            )):places?.slice(0, 5).map((place) => (
              <li key={place.fsq_id}>{place?.name}</li>
            ))}
          </ul>
        </div>
}
        {
        pathname === "/dashboard"&&
            <div className="flex justify-center p-2">
            <button onClick= {() => { router.push(`/city/${city}`)}}  className="hidden md:inline-block bg-white hover:bg-[#f7d6d0] px-4 py-2 rounded-lg text-black">
              Discover More
            </button>
            </div>
}
      </div>
      </>
    );
  }