import { DISPATCH_BITCOIN, DISPATCH_TESOURO } from '../actions/actionTypes';

const initialState = {
	initialDate: '', // Inicio da aplicação
	finalDate: '', // Fim
	period: '', // Quantos anos
	amount: '', // Valor 
	type: '', // tipo de ativo
	total: '', // quantia final
	profit: '', // lucro
	bitcoinData: {}, // dados para bitcoin
	tesouroData: {} // dados para o tesouro
}

export const Chart = ( state = initialState, action ) => {
	switch (action.type) {
		case DISPATCH_BITCOIN: {
			return {
				...state,
				type: 'Bitcoin',
				period: action.period,
				initialDate: action.initialDate,
				finalDate: action.finalDate,
				amount: action.amount,
				total: action.total,
				profit: action.profit,
				bitcoinData: action.chartData,
			};			
		}
		case DISPATCH_TESOURO: {
			return {
				...state,
				type: 'Tesouro Direto Pré-fixado',
				period: action.period,
				initialDate: action.initialDate,
				finalDate: action.finalDate,
				amount: action.amount,
				total: action.total,
				profit: action.profit,
				tesouroData: action.chartData
			}
		}
		default:
			return state;
	}
}
