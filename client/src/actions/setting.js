export const SET_MODE = 'SET_MODE';
export const SET_MOUSE_TRACK = 'SET_MOUSE_TRACK';

export const setMode = (mode) => {
	return {
		type : SET_MODE,
		payload : mode,
	};
};

export const setMouseTrack = (track = false) => {
	return {
		type : SET_MOUSE_TRACK,
		payload : track,
	};
};
