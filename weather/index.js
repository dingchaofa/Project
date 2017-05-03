#!/usr/bin/env node

var axios = require('axios')
var data = {}
if(process.argv[2]){
	data.params = {
	city:process.argv[2]
	}
}
axios.get('http://api.jirengu.com/weather.php',data)
	.then(function (response){
		let weather = response.data.results[0].weather_data[0]
		console.log(weather.date)
		//console.log(response.data.results[0].currentCity)
		console.log("最高温度~最低温度 "+weather.temperature)
		console.log(weather.weather,weather.wind)
		
		})
	.catch(function (error){
		console.log(error)
		})
