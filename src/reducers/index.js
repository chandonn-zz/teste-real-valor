import { User } from './User';
import { Chart } from './Chart';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
	User: User,
	Chart: Chart
})