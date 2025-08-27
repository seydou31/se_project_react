export  async function getWeather({latitude, longitude}, APIkey){
    try{
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`)
  if(response.ok){
      const weatherData = await response.json();
      return weatherData
  }
} catch (err){
    console.error(err)
}
    
}

export function filteredWeatherData (data){
    const result ={};
    result.city = data.name
    result.temp = {F: data.main.temp}
     result.type = getWeatherCondition(result.temp.F);
     result.condition = data.weather[0].main.toLowerCase();
     result.isDay = isDay(data.sys, Date.now());
    return result;
}

 function isDay({sunrise, sunset}, now){
    return sunrise * 1000 < now && now < sunset * 1000;
 }

function getWeatherCondition(temperature){
   if(temperature > 86){
    return "hot"
   } else if(temperature >= 66 && temperature < 86){
return "warm"
   } else {
return "cold"
   }
}