import _ from 'lodash';
import { FETCH_SURVEYS } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_SURVEYS:
			return _.keyBy(action.payload, '_id');
		default:
			return state;
	}
}
