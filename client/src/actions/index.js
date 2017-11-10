export function selectBook (str) {
	return {
		type : 'BOOK_SELECTED',
		payload : str,
	};
}

