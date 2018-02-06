export const CHANGE_MODE_TO = 'CHANGE_MODE_TO';

export const changeModeTo = (mode) => {
	return {
		type : CHANGE_MODE_TO,
		payload : {
			mode
		},
	};
};
