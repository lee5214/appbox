// state is not global state, it's the state this reducer is responsible for
export default function (state = 'a', action) {
	switch (action.type) {
		case 'BOOK_SELECTED':
			return action.payload;
		default:
			return state;
	}

}
