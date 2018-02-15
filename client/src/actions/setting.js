export const SET_MODE = 'SET_MODE';
export const SET_MOUSE_TRACK = 'SET_MOUSE_TRACK';

export const setMode = (mode='2D') => {
	if(window.innerWidth < 1200){
		return {
			type : SET_MODE,
			payload : '2D',
		};
	}
	return {
		type : SET_MODE,
		payload : mode,
	};
};

export const setMouseTrack = (track = false) => {
	if(window.innerWidth < 1200){
		return {
			type : SET_MODE,
			payload : false,
		};
	}
	return {
		type : SET_MOUSE_TRACK,
		payload : track,
	};
};
