import { SET_MODE, SET_MOUSE_TRACK } from '../actions';

let defaultSetting =
	window.innerWidth < 1200 ? {
		layout : {
			mode : '2D',
			mouseTrack : false,
		},
	} : {
		layout : {
			mode : '3D',
			mouseTrack : true,
		},
	};
export const setting = (state = defaultSetting, action) => {
	switch (action.type) {
		case SET_MODE:
			console.log (action.payload);
			return {...state, layout : {...state.layout, mode : action.payload}};
		case SET_MOUSE_TRACK:
			return {...state, layout : {...state.layout, mouseTrack : action.payload}};
		default:
			return state;
	}
};


