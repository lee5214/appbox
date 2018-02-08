import { SET_MODE, SET_MOUSE_TRACK } from '../actions';

let defaultSetting = {
	layout: {
		mode: '3D',
		mouseTrack: false,
	}
}
export const setting = (state = defaultSetting, action) => {
	switch (action.type) {
		case SET_MODE:
			console.log(action.payload)
			return {...state,layout:{...state.layout,mode:action.payload}}
		case SET_MOUSE_TRACK:
			return {...state,layout:{...state.layout,mouseTrack: action.payload}}
		default:
			return state;
	}
};


