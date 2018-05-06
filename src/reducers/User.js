import { SAVE_CREDENTIALS } from '../actions/actionTypes';

const initialState = {
	userName: 'Alexandre',
	userEmail: 'testing',
	userPass: '1234',
}

export const User = ( state = initialState, action ) => {
	switch (action.type) {
		case SAVE_CREDENTIALS:
			return {
				...state,
				userName: action.name,
				userEmail: action.email,
				userPass: action.pass,
			};
		default:
			return state;
	}
}