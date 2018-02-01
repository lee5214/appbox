import { FETCH_CITY } from '../actions/city';

// export function cityWeatherInfo (state = [], action) {
// 	switch (action.type) {
// 		case FETCH_CITY_WEATHER:
// 			return [action.payload, ...state];
//
// 		default:
// 			return state;
//
// 	}
// }
//
// export function  cityNews (state= [],action) {
// 	switch(action.type){
// 		case FETCH_CITY_NEWS:
// 			return [action.payload, ...state]
// 		default:
// 			return state
// 	}
// }

export const city = (state = [], action) => {
	console.log ('cityInfoReducer receive new payload=>', action.payload);
	switch (action.type) {
		case FETCH_CITY:
			return [ action.payload, ...state ];
		default:
			return state;
	}
};


// export function cityReducer (state=[], action){
// 	switch (action.type){
// 		case
// 	}
// }

// export function fetchCurrentCityTemp (state = null, action) {
// 	switch (action.type) {
// 		case FETCH_CITY_CURRENT_TEMP:
// 			return action.payload.data;
// 		default:
// 			return state;
// 	}
// }
