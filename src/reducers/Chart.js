import { DISPATCH_BITCOIN, DISPATCH_TESOURO } from '../actions/actionTypes';

const initialState = {
	bitcoinData: {},
	tesouroData: {}
}

export const Chart = ( state = initialState, action ) => {
	switch (action.type) {
		case DISPATCH_BITCOIN: {
			return {
				...state,
				bitcoinData: action.chartData,
			};			
		}
		case DISPATCH_TESOURO: {
			return {
				...state,
				tesouroData: action.chartData
			}
		}
		default:
			return state;
	}
}
