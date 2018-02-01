const axios = require ('axios');
const keys = require ('../config/credentials')

module.exports = (app) => {
	app.post ('/api/city/getCityInfo', async (req, res, next) => {
		console.log ('/api/city/getCityInfo receive =>', req.body);
		const {cityName,unit} = req.body

		// prefix to change http to https
		let WEATHER_URL;
		if (process.env.NODE_ENV === 'production') {
			WEATHER_URL = 'https://cors.now.sh/http://api.openweathermap.org/data/2.5';
		} else {
			WEATHER_URL = 'http://api.openweathermap.org/data/2.5';
		}
		// forecast 5d/3h
		const forecastURL = `${WEATHER_URL}/forecast?APPID=${keys.OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
		// get current weather
		const currentURL = `${WEATHER_URL}/weather?APPID=${keys.OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
		const NYT_NEWS_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

		const cityForecastTemp = await axios.get (forecastURL);
		const cityCurrentTemp = await axios.get (currentURL);
		const NYT_URL = `${NYT_NEWS_URL}?api-key=${keys.NYT_Key}&q=${cityName}`;
		const cityWeather = {...cityForecastTemp.data, ...cityCurrentTemp.data};
		const cityNews = await axios.get (NYT_URL).then ((item) => item.data.response);
		res.send ({cityWeather,cityNews});
		console.log('cityInfo sent to frontend =>',cityWeather,cityNews)
		next();
	});
	app.get('/api/city/getCityWeather', (req,res) =>{
		const cityName = 'San Francisco'
		const unit = 'Imperial'
		let WEATHER_URL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5';
		const forecastURL = `${WEATHER_URL}/forecast?APPID=${keys.OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
		const cityForecastTemp = axios.get (forecastURL);
		console.log(cityForecastTemp)
		res.json (cityForecastTemp);
	})
}
