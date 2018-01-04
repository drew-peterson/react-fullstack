import _ from 'lodash';
import { FETCH_SURVEYS, DELETE_SURVEY } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_SURVEYS:
			return _.keyBy(action.payload, '_id');
		case DELETE_SURVEY:
			return _.omit(state, action.payload);
		default:
			return state;
	}
}
