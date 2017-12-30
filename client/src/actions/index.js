import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	// will return updated user so passing back through fetch user will update user w/ new credits...
	dispatch({ type: FETCH_USER, payload: res.data });
};

// old syntax
// export function fetchUser() {
// 	return dispatch => {
// 		axios.get('/api/current_user').then(response => {
// 			return dispatch({
// 				type: FETCH_USER,
// 				payload: response.data
// 			});
// 		});
// 	};
// }
