export const filterCity = (cities,city) => {
    let cityName = city.split(" ").join("").toLowerCase()
    const cityItem = cities?.length > 0 && cities.filter((item) => {
        if(item[cityName]){
          return item
        }
    })
    return cityItem
}